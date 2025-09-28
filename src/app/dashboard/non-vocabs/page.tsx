"use client";

import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
    COMPANIES, 
    NON_VERBAL_QUESTIONS, 
    saveAnswer, 
    getAnswer, 
    saveAnswerToFile,
    getAnswerFromFile,
    enhanceAnswerWithAI,
    type Answer 
} from "@/constants/nonvocabs";
import { 
    BookOpenIcon, 
    EditIcon, 
    SaveIcon, 
    SparklesIcon,
    XIcon,
    StarIcon,
    TrendingUpIcon,
    BuildingIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";

const NonVocabs = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<typeof NON_VERBAL_QUESTIONS[0] | null>(null);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [tempAnswer, setTempAnswer] = useState("");
    const [enhancing, setEnhancing] = useState(false);

    // Load answers from both localStorage and file on component mount
    useEffect(() => {
        const loadAnswers = async () => {
            const loadedAnswers: Record<string, Answer> = {};
            
            for (const question of NON_VERBAL_QUESTIONS) {
                // First try to get from localStorage for speed
                let answer = getAnswer(question.id, "general");
                
                // If not in localStorage, try to get from file
                if (!answer) {
                    answer = await getAnswerFromFile(question.id, "general");
                }
                
                if (answer) {
                    loadedAnswers[question.id.toString()] = answer;
                }
            }
            
            setAnswers(loadedAnswers);
        };

        loadAnswers();
    }, []);

    const handleSaveAnswer = async () => {
        if (!selectedQuestion) return;
        const content = tempAnswer || "";
        
        if (content.trim()) {
            // Save to both localStorage and file
            saveAnswer(selectedQuestion.id, "general", content);
            const savedAnswer = await saveAnswerToFile(selectedQuestion.id, "general", content);
            
            if (savedAnswer) {
                setAnswers(prev => ({
                    ...prev,
                    [selectedQuestion.id.toString()]: savedAnswer
                }));
            }
        }
        setIsEditing(false);
        setTempAnswer("");
    };

    const handleEnhanceWithAI = async () => {
        if (!selectedQuestion) return;
        const currentAnswer = answers[selectedQuestion.id.toString()]?.content || tempAnswer || "";
        
        if (!currentAnswer.trim()) return;
        
        setEnhancing(true);
        
        try {
            const enhancedContent = await enhanceAnswerWithAI(
                selectedQuestion.id, 
                "general", 
                currentAnswer, 
                selectedQuestion.question
            );
            
            if (enhancedContent) {
                const newAnswer: Answer = {
                    questionId: selectedQuestion.id,
                    companyId: "general",
                    content: enhancedContent,
                    lastModified: new Date().toISOString(),
                    isEnhanced: true
                };
                
                setAnswers(prev => ({
                    ...prev,
                    [selectedQuestion.id.toString()]: newAnswer
                }));
                
                if (isEditing) {
                    setTempAnswer(enhancedContent);
                }
            }
        } catch (error) {
            console.error('Enhancement failed:', error);
        } finally {
            setEnhancing(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy": return "bg-green-100 text-green-800";
            case "Medium": return "bg-yellow-100 text-yellow-800";
            case "Hard": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getQuestionRating = (questionId: number) => {
        // Simulate high-rated companies for questions
        const ratings = {
            1: ["amazon", "microsoft"],
            2: ["microsoft", "netflix"],
            3: ["amazon", "netflix"],
            4: ["amazon", "microsoft", "netflix"],
            5: ["microsoft"],
            6: ["amazon", "netflix"],
            7: ["amazon", "microsoft"],
            8: ["netflix", "microsoft"]
        };
        return ratings[questionId as keyof typeof ratings] || [];
    };

    const getCompanyNames = (companyIds: string[]) => {
        return companyIds.map(id => COMPANIES.find(c => c.id === id)?.name).filter(Boolean);
    };

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpenIcon className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-heading font-medium">NonVocabs Practice</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Select a question to prepare your answer for non-verbal interview questions.
                    </p>
                </div>

                {/* Question Grid */}
                <Container delay={0.2}>
                    <MagicCard
                        gradientFrom="#38bdf8"
                        gradientTo="#3b82f6"
                        className="p-6 rounded-2xl"
                        gradientColor="rgba(59,130,246,0.1)"
                    >
                        <h2 className="text-xl font-semibold mb-6">Choose Your Interview Question</h2>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {NON_VERBAL_QUESTIONS.map((question) => {
                                const highRatedCompanies = getQuestionRating(question.id);
                                const hasAnswer = !!answers[question.id.toString()];
                                return (
                                    <motion.button
                                        key={question.id}
                                        onClick={() => setSelectedQuestion(question)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "p-5 rounded-xl text-left transition-all border bg-card hover:bg-card/80 border-border hover:border-primary/50 group relative",
                                            hasAnswer && "ring-2 ring-blue-500/20"
                                        )}
                                    >
                                        {hasAnswer && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge className={getDifficultyColor(question.difficulty)}>
                                                {question.difficulty}
                                            </Badge>
                                            <div className="flex items-center gap-1">
                                                <BuildingIcon className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {highRatedCompanies.length} companies
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm font-medium mb-3 group-hover:text-primary transition-colors">
                                            {question.question}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-xs">
                                                {question.category}
                                            </Badge>
                                            {highRatedCompanies.length > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <TrendingUpIcon className="h-3 w-3 text-green-500" />
                                                    <span className="text-xs text-green-600 font-medium">Popular</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </MagicCard>
                </Container>

                {/* Question Modal Overlay */}
                <AnimatePresence>
                    {selectedQuestion && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedQuestion(null)}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            />
                            
                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-2xl shadow-2xl z-50 overflow-hidden"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Modal Header */}
                                    <div className="p-6 border-b border-border bg-card/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                                                        {selectedQuestion.difficulty}
                                                    </Badge>
                                                    <Badge variant="outline">{selectedQuestion.category}</Badge>
                                                    {getQuestionRating(selectedQuestion.id).length > 0 && (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                                                            Popular Question
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h2 className="text-xl font-semibold mb-2">{selectedQuestion.question}</h2>
                                                
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-muted-foreground">Asked by:</span>
                                                    <div className="flex items-center gap-2">
                                                        {getQuestionRating(selectedQuestion.id).map(companyId => {
                                                            const company = COMPANIES.find(c => c.id === companyId);
                                                            return company ? (
                                                                <div key={company.id} className="flex items-center gap-1">
                                                                    <div className={cn("w-2 h-2 rounded-full", company.color)} />
                                                                    <span className="text-sm font-medium">{company.name}</span>
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedQuestion(null);
                                                    setIsEditing(false);
                                                    setTempAnswer("");
                                                }}
                                                className="shrink-0"
                                            >
                                                <XIcon className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="flex-1 overflow-auto p-6">
                                        <div className="max-w-3xl mx-auto">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="border rounded-xl p-6 bg-card/50"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-semibold">Your Answer</h3>
                                                    <div className="flex items-center gap-2">
                                                        {answers[selectedQuestion.id.toString()]?.isEnhanced && (
                                                            <Badge className="bg-blue-100 text-blue-800">
                                                                <SparklesIcon className="h-3 w-3 mr-1" />
                                                                Enhanced
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        <Textarea
                                                            placeholder="Write your answer here..."
                                                            value={tempAnswer}
                                                            onChange={(e) => setTempAnswer(e.target.value)}
                                                            rows={8}
                                                            className="w-full resize-none"
                                                        />
                                                        <div className="flex gap-3">
                                                            <Button
                                                                onClick={handleSaveAnswer}
                                                                className="flex-1"
                                                            >
                                                                <SaveIcon className="h-4 w-4 mr-2" />
                                                                Save Answer
                                                            </Button>
                                                            
                                                            {tempAnswer.trim() && (
                                                                <Button
                                                                    onClick={handleEnhanceWithAI}
                                                                    disabled={enhancing}
                                                                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                                                                >
                                                                    <SparklesIcon className="h-4 w-4 mr-2" />
                                                                    {enhancing ? "Enhancing..." : "Polish Answer"}
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    setIsEditing(false);
                                                                    setTempAnswer("");
                                                                }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="min-h-[200px] p-4 bg-background rounded-lg mb-4">
                                                            {answers[selectedQuestion.id.toString()]?.content ? (
                                                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                                                    {answers[selectedQuestion.id.toString()].content}
                                                                </p>
                                                            ) : (
                                                                <div className="flex flex-col items-center justify-center h-full text-center">
                                                                    <BookOpenIcon className="h-12 w-12 text-muted-foreground mb-3" />
                                                                    <p className="text-muted-foreground mb-2">No answer written yet.</p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Click "Edit Answer" to add your response for this question.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex gap-3">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setIsEditing(true);
                                                                    setTempAnswer(answers[selectedQuestion.id.toString()]?.content || "");
                                                                }}
                                                                className="flex-1"
                                                            >
                                                                <EditIcon className="h-4 w-4 mr-2" />
                                                                Edit Answer
                                                            </Button>
                                                            {answers[selectedQuestion.id.toString()]?.content && (
                                                                <Button
                                                                    onClick={handleEnhanceWithAI}
                                                                    disabled={enhancing}
                                                                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                                                                >
                                                                    <SparklesIcon className="h-4 w-4 mr-2" />
                                                                    {enhancing ? "Enhancing..." : "Polish Answer"}
                                                                </Button>
                                                            )}
                                                        </div>
                                                        
                                                        {answers[selectedQuestion.id.toString()]?.lastModified && (
                                                            <p className="text-xs text-muted-foreground mt-3">
                                                                Last updated: {new Date(answers[selectedQuestion.id.toString()].lastModified).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    );
};

export default NonVocabs; 