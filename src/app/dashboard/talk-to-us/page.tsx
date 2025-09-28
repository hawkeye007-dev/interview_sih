"use client";

import { useState } from "react";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleIcon, PhoneIcon, MailIcon, SendIcon, VideoIcon, HelpCircleIcon } from "lucide-react";

const supportChannels = [
    {
        icon: MessageCircleIcon,
        title: "Live Chat",
        description: "Get instant help from our support team",
        action: "Start Chat",
        available: "Available 24/7"
    },
    {
        icon: VideoIcon,
        title: "Video Call",
        description: "Schedule a personalized consultation",
        action: "Book Meeting",
        available: "Mon-Fri, 9AM-6PM EST"
    },
    {
        icon: MailIcon,
        title: "Email Support",
        description: "Send us detailed questions",
        action: "Send Email",
        available: "Response within 24h"
    }
];

const faqItems = [
    {
        question: "How quickly can I expect a response?",
        answer: "We aim to respond to all inquiries within 2 hours during business hours (9AM-6PM EST). For urgent technical issues, our priority support responds within 30 minutes."
    },
    {
        question: "What should I include when reporting an issue?",
        answer: "Please include your account email, a detailed description of the issue, steps to reproduce the problem, and any error messages you've encountered. Screenshots are also very helpful."
    },
    {
        question: "Can I schedule a one-on-one consultation?",
        answer: "Yes! We offer personalized consultations for interview preparation strategies and technical guidance. You can book a session through our calendar or contact us directly."
    }
];

const TalkToUs = () => {
    const [formData, setFormData] = useState({
        subject: "",
        category: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormData({ subject: "", category: "", message: "" });
        setIsSubmitting(false);
        alert("Message sent successfully! We'll get back to you soon.");
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                <MagicCard
                    gradientFrom="#38bdf8"
                    gradientTo="#3b82f6"
                    className="p-8 rounded-2xl text-center mb-8"
                    gradientColor="rgba(59,130,246,0.1)"
                >
                    <MessageCircleIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h1 className="text-3xl font-heading font-medium mb-4">How Can We Help?</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Choose your preferred way to connect with our support team or send us a message directly.
                    </p>
                </MagicCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {supportChannels.map((channel, index) => (
                        <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <channel.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{channel.title}</CardTitle>
                                        <CardDescription className="text-xs">
                                            {channel.available}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {channel.description}
                                </p>
                                <Button className="w-full">
                                    {channel.action}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Send Us a Message</CardTitle>
                            <CardDescription>
                                We'll get back to you as soon as possible
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select onValueChange={(value) => handleChange("category", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Technical Support</SelectItem>
                                            <SelectItem value="account">Account Help</SelectItem>
                                            <SelectItem value="feedback">Product Feedback</SelectItem>
                                            <SelectItem value="billing">Billing & Pricing</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief description of your inquiry"
                                        value={formData.subject}
                                        onChange={(e) => handleChange("subject", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        required
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <SendIcon className="h-4 w-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <HelpCircleIcon className="h-5 w-5 text-primary" />
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible>
                                    {faqItems.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <AccordionTrigger className="text-left">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-muted-foreground">
                                                    {faq.answer}
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">support@interviewai.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Live chat available 24/7</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TalkToUs; 