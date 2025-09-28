"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuitIcon, SendIcon, BotIcon, UserIcon, LoaderIcon, SparklesIcon, MapIcon, ExternalLinkIcon } from "lucide-react";
import { containsProfanity, getRandomFunnyResponse } from "@/constants/profanity-filter";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    roadmapData?: {
        url: string;
        technology: string;
        previewSections?: Array<{
            title: string;
            description: string;
        }>;
    };
}

const AITutorPro = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestedQuestions = [
        "Explain binary search algorithm",
        "System design for a chat application",
        "Best practices for React optimization",
        "How to prepare for FAANG interviews?",
        "React roadmap",
        "Python learning path"
    ];

    // Initialize welcome message after component mounts to avoid hydration mismatch
    useEffect(() => {
        if (!isInitialized) {
            const welcomeMessage: Message = {
                id: '1',
                role: 'assistant',
                content: "Hello! I'm your AI Tutor Pro, specialized in technical interview preparation and software engineering. I can help you with data structures, algorithms, system design, coding best practices, career guidance, and create personalized learning roadmaps. What would you like to work on today?",
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            };
            setMessages([welcomeMessage]);
            setIsInitialized(true);
        }
    }, [isInitialized]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTimestamp = (): string => {
        return new Date().toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Check for profanity first
        if (containsProfanity(content)) {
            const userMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: content.trim(),
                timestamp: formatTimestamp()
            };

            const funnyResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: getRandomFunnyResponse(),
                timestamp: formatTimestamp()
            };

            setMessages(prev => [...prev, userMessage, funnyResponse]);
            setInput('');
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: formatTimestamp()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            console.log('Sending message to API:', content);
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                }),
            });

            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Response error:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response data:', data);

            if (data.success && data.message) {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.message,
                    timestamp: formatTimestamp(),
                    roadmapData: data.roadmapGenerated ? {
                        url: data.roadmapUrl,
                        technology: data.technology,
                        previewSections: data.previewSections
                    } : undefined
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                throw new Error(data.error || 'No message received from API');
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I apologize, but I'm having trouble responding right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again in a moment.`,
                timestamp: formatTimestamp()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const RoadmapButton = ({ roadmapData }: { roadmapData: Message['roadmapData'] }) => {
        if (!roadmapData) return null;

        return (
            <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <MapIcon className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm text-green-800">
                        {roadmapData.technology.toUpperCase()} Roadmap Generated
                    </span>
                </div>
                
                {roadmapData.previewSections && roadmapData.previewSections.length > 0 && (
                    <div className="mb-3 text-xs text-muted-foreground">
                        <p className="mb-1">Preview sections:</p>
                        <ul className="space-y-1">
                            {roadmapData.previewSections.slice(0, 2).map((section, index) => (
                                <li key={index} className="flex items-start gap-1">
                                    <span className="text-green-600">•</span>
                                    <span>{section.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => router.push(roadmapData.url)}
                >
                    <ExternalLinkIcon className="h-3 w-3 mr-2" />
                    View Learning Roadmap
                </Button>
            </div>
        );
    };

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                <MagicCard
                    gradientFrom="#38bdf8"
                    gradientTo="#3b82f6"
                    className="p-6 rounded-2xl text-center mb-6"
                    gradientColor="rgba(59,130,246,0.1)"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BrainCircuitIcon className="h-12 w-12 text-primary" />
                        <SparklesIcon className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-heading font-medium mb-2">AI Tutor Pro</h1>
                    <p className="text-muted-foreground">
                        Your personal technical interview coach and programming mentor
                    </p>
                    <div className="mt-4">
                        <Badge variant="secondary" className="mr-2">
                            🧠 Technical Coaching
                        </Badge>
                        <Badge variant="secondary">
                            🗺️ Learning Roadmaps
                        </Badge>
                    </div>
                </MagicCard>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Suggested Questions Sidebar */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-sm">Suggested Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {suggestedQuestions.map((question, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-left justify-start h-auto p-3 text-xs"
                                    onClick={() => sendMessage(question)}
                                    disabled={isLoading}
                                >
                                    {question}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Chat Interface */}
                    <Card className="lg:col-span-3 flex flex-col">
                        <CardHeader className="border-b flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <BotIcon className="h-5 w-5 text-primary" />
                                <CardTitle>AI Tutor Pro Chat</CardTitle>
                                <Badge variant="secondary" className="ml-auto">
                                    Online
                                </Badge>
                            </div>
                        </CardHeader>

                        {/* Messages Area */}
                        <CardContent className="flex-1 p-0 overflow-hidden">
                            <ScrollArea className="h-[500px] p-4">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${
                                                message.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            {message.role === 'assistant' && (
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <BotIcon className="h-4 w-4 text-primary" />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[75%] rounded-lg p-3 break-words ${
                                                    message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                                <span className="text-xs opacity-70 mt-1 block">
                                                    {message.timestamp}
                                                </span>
                                                <RoadmapButton roadmapData={message.roadmapData} />
                                            </div>
                                            {message.role === 'user' && (
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                                    <UserIcon className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-3 justify-start">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <BotIcon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="bg-muted rounded-lg p-3">
                                                <LoaderIcon className="h-4 w-4 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        </CardContent>

                        {/* Input Area */}
                        <div className="border-t p-4 flex-shrink-0">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me about algorithms, system design, or request a roadmap (e.g., 'React roadmap')"
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading || !input.trim()}>
                                    <SendIcon className="h-4 w-4" />
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground mt-2">
                                AI Tutor Pro can generate learning roadmaps and provide technical guidance. Try asking for a roadmap!
                            </p>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default AITutorPro; 