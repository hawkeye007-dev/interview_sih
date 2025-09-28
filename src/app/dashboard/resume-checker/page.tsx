"use client";

import { useState, useEffect } from "react";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    FileTextIcon, 
    CheckCircleIcon, 
    InfoIcon, 
    ArrowRightIcon, 
    ArrowLeftIcon,
    EditIcon,
    SparklesIcon,
    DownloadIcon,
    BriefcaseIcon,
    GraduationCapIcon,
    FolderIcon
} from "lucide-react";
import { ATS_RESUME_QUESTIONS, ATS_OPTIMIZATION_TIPS } from "@/constants/resume-data";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeQuestion {
    key: string;
    question: string;
    placeholder: string;
    type: string;
    required: boolean;
    atsContext: string;
    conditional?: string;
    options?: string[];
}

interface ResumeSection {
    id: string;
    title: string;
    questions: ResumeQuestion[];
}

const ResumeChecker = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [resumeData, setResumeData] = useState<Record<string, any>>({});
    const [showSummary, setShowSummary] = useState(false);
    const [enhancedData, setEnhancedData] = useState<Record<string, any>>({});
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');

    const currentSection = ATS_RESUME_QUESTIONS[currentStep] as ResumeSection;
    const currentQuestion = currentSection?.questions[currentQuestionIndex] as ResumeQuestion;
    const totalQuestions = ATS_RESUME_QUESTIONS.reduce((acc, section) => acc + section.questions.length, 0);
    const answeredQuestions = ATS_RESUME_QUESTIONS.slice(0, currentStep).reduce((acc, section) => acc + section.questions.length, 0) + currentQuestionIndex;

    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resume-data');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setResumeData(parsed);
            if (Object.keys(parsed).length > 0) {
                setShowSummary(true);
            }
        }
    }, []);

    // Save data to localStorage
    const saveData = (data: Record<string, any>) => {
        localStorage.setItem('resume-data', JSON.stringify(data));
        setResumeData(data);
    };

    // Check if current question should be shown based on conditions
    const shouldShowQuestion = (question: ResumeQuestion) => {
        if (!question.conditional) return true;
        
        const [key, value] = question.conditional.split('=');
        const sectionData = resumeData[currentSection.id] || {};
        return sectionData[key] === value;
    };

    const handleAnswerSubmit = (value: string) => {
        if (!currentQuestion) return;

        const newData = { ...resumeData };
        
        // Initialize section if doesn't exist
        if (!newData[currentSection.id]) {
            newData[currentSection.id] = {};
        }

        // Handle different data types
        if (currentSection.id === 'skills' && ['technical', 'soft', 'languages', 'frameworks'].includes(currentQuestion.key)) {
            newData[currentSection.id][currentQuestion.key] = value.split(',').map(s => s.trim()).filter(Boolean);
        } else if (currentQuestion.key === 'responsibilities' && currentSection.id === 'experience') {
            newData[currentSection.id][currentQuestion.key] = value.split('\n').map(s => s.trim()).filter(Boolean);
        } else {
            newData[currentSection.id][currentQuestion.key] = value;
        }

        saveData(newData);
        moveToNextQuestion();
    };

    const moveToNextQuestion = () => {
        let nextQuestionIndex = currentQuestionIndex + 1;
        let nextStep = currentStep;

        // Find next valid question (considering conditionals)
        while (nextStep < ATS_RESUME_QUESTIONS.length) {
            const section = ATS_RESUME_QUESTIONS[nextStep] as ResumeSection;
            
            if (nextQuestionIndex >= section.questions.length) {
                nextStep++;
                nextQuestionIndex = 0;
                continue;
            }

            const question = section.questions[nextQuestionIndex] as ResumeQuestion;
            if (!question.conditional || shouldShowQuestion(question)) {
                setCurrentStep(nextStep);
                setCurrentQuestionIndex(nextQuestionIndex);
                setCurrentAnswer('');
                return;
            }
            
            nextQuestionIndex++;
        }

        // If we've gone through all questions, show summary
        setShowSummary(true);
    };

    const moveToPreviousQuestion = () => {
        let prevQuestionIndex = currentQuestionIndex - 1;
        let prevStep = currentStep;

        // Find previous valid question
        while (prevStep >= 0) {
            if (prevQuestionIndex < 0) {
                prevStep--;
                if (prevStep >= 0) {
                    prevQuestionIndex = (ATS_RESUME_QUESTIONS[prevStep] as ResumeSection).questions.length - 1;
                }
                continue;
            }

            const section = ATS_RESUME_QUESTIONS[prevStep] as ResumeSection;
            const question = section.questions[prevQuestionIndex] as ResumeQuestion;
            
            if (!question.conditional || shouldShowQuestion(question)) {
                setCurrentStep(prevStep);
                setCurrentQuestionIndex(prevQuestionIndex);
                setCurrentAnswer('');
                return;
            }
            
            prevQuestionIndex--;
        }
    };

    const enhanceWithAI = async () => {
        setIsEnhancing(true);
        try {
            // Simulate AI enhancement - integrate with OpenRouter API here
            setTimeout(() => {
                const enhanced = { ...resumeData };
                
                // AI enhancements
                if (enhanced['professional-summary']?.professionalSummary) {
                    enhanced['professional-summary'].professionalSummary = 
                        `${enhanced['professional-summary'].professionalSummary} Demonstrated expertise in delivering high-impact solutions with proven track record of success and strong technical leadership capabilities.`;
                }

                if (enhanced.skills?.technical) {
                    enhanced.skills.technical = [...enhanced.skills.technical, 'Advanced Problem Solving', 'Technical Leadership', 'Cross-functional Collaboration'];
                }

                if (enhanced.experience?.responsibilities) {
                    enhanced.experience.responsibilities = enhanced.experience.responsibilities.map((resp: string) => 
                        resp.startsWith('•') ? resp : `• ${resp}`
                    );
                }

                setEnhancedData(enhanced);
                setIsEnhancing(false);
            }, 2000);
        } catch (error) {
            console.error('Enhancement failed:', error);
            setIsEnhancing(false);
        }
    };

    const getCurrentValue = () => {
        if (!currentQuestion) return '';
        
        const sectionData = resumeData[currentSection.id] || {};
        const value = sectionData[currentQuestion.key];
        
        if (Array.isArray(value)) {
            return value.join(currentQuestion.key === 'responsibilities' ? '\n' : ', ');
        }
        
        return value || '';
    };

    if (showSummary) {
        return (
            <div className="py-8 px-4 md:px-8">
                <Container>
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircleIcon className="h-8 w-8 text-green-500" />
                            <h1 className="text-3xl font-heading font-medium">Resume Analysis Complete</h1>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            Review your information and get AI-powered enhancements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Current Data */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <EditIcon className="h-5 w-5" />
                                Your Resume Information
                            </h2>
                            
                            {/* Personal Information */}
                            {resumeData['personal-info'] && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p><strong>Name:</strong> {resumeData['personal-info'].fullName}</p>
                                        <p><strong>Email:</strong> {resumeData['personal-info'].email}</p>
                                        <p><strong>Phone:</strong> {resumeData['personal-info'].phone}</p>
                                        <p><strong>Location:</strong> {resumeData['personal-info'].location}</p>
                                        {resumeData['personal-info'].linkedin && (
                                            <p><strong>LinkedIn:</strong> <a href={resumeData['personal-info'].linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{resumeData['personal-info'].linkedin}</a></p>
                                        )}
                                        {resumeData['personal-info'].github && (
                                            <p><strong>GitHub:</strong> <a href={resumeData['personal-info'].github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{resumeData['personal-info'].github}</a></p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Professional Summary */}
                            {resumeData['professional-summary'] && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Professional Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{resumeData['professional-summary'].professionalSummary}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Skills */}
                            {resumeData.skills && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {resumeData.skills.technical && (
                                            <div>
                                                <h4 className="font-medium mb-2">Technical Skills</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {resumeData.skills.technical.map((skill: string, i: number) => (
                                                        <Badge key={i} variant="secondary">{skill}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {resumeData.skills.languages && (
                                            <div>
                                                <h4 className="font-medium mb-2">Programming Languages</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {resumeData.skills.languages.map((lang: string, i: number) => (
                                                        <Badge key={i} variant="outline">{lang}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {resumeData.skills.frameworks && (
                                            <div>
                                                <h4 className="font-medium mb-2">Frameworks & Tools</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {resumeData.skills.frameworks.map((framework: string, i: number) => (
                                                        <Badge key={i} variant="default">{framework}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Experience */}
                            {resumeData.experience && resumeData.experience.hasExperience === 'Yes' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BriefcaseIcon className="h-5 w-5" />
                                            Work Experience
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold">{resumeData.experience.position}</h4>
                                            <p className="text-muted-foreground">{resumeData.experience.company} • {resumeData.experience.duration}</p>
                                        </div>
                                        {resumeData.experience.responsibilities && (
                                            <div>
                                                <h5 className="font-medium mb-1">Key Achievements:</h5>
                                                <ul className="text-sm space-y-1">
                                                    {resumeData.experience.responsibilities.map((resp: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-primary mt-1">•</span>
                                                            <span>{resp}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Education */}
                            {resumeData.education && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCapIcon className="h-5 w-5" />
                                            Education
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <h4 className="font-semibold">{resumeData.education.degree} in {resumeData.education.field}</h4>
                                            <p className="text-muted-foreground">{resumeData.education.institution} • {resumeData.education.graduationYear}</p>
                                            {resumeData.education.gpa && (
                                                <p className="text-sm text-muted-foreground mt-1">GPA: {resumeData.education.gpa}</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Projects */}
                            {resumeData.projects && resumeData.projects.hasProjects === 'Yes' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FolderIcon className="h-5 w-5" />
                                            Featured Project
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold">{resumeData.projects.projectName}</h4>
                                            {resumeData.projects.projectLink && (
                                                <a href={resumeData.projects.projectLink} className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                                                    View Project →
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-sm">{resumeData.projects.projectDescription}</p>
                                        {resumeData.projects.projectTechnologies && (
                                            <div>
                                                <h5 className="font-medium mb-2">Technologies Used:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {resumeData.projects.projectTechnologies.split(',').map((tech: string, i: number) => (
                                                        <Badge key={i} variant="outline">{tech.trim()}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* AI Enhancement Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <SparklesIcon className="h-5 w-5 text-primary" />
                                    AI Enhancement
                                </h2>
                                {!enhancedData['personal-info'] && (
                                    <Button onClick={enhanceWithAI} disabled={isEnhancing}>
                                        {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                                    </Button>
                                )}
                            </div>

                            {isEnhancing && (
                                <MagicCard
                                    gradientFrom="#38bdf8"
                                    gradientTo="#3b82f6"
                                    className="p-6 rounded-2xl text-center"
                                    gradientColor="rgba(59,130,246,0.1)"
                                >
                                    <SparklesIcon className="h-8 w-8 mx-auto mb-2 text-primary animate-pulse" />
                                    <p>AI is analyzing and enhancing your resume...</p>
                                </MagicCard>
                            )}

                            {enhancedData['professional-summary'] && (
                                <Card className="border-green-200">
                                    <CardHeader>
                                        <CardTitle className="text-green-700">Enhanced Content</CardTitle>
                                        <CardDescription>AI-improved version of your resume</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Enhanced Summary:</h4>
                                                <p className="text-sm">{enhancedData['professional-summary'].professionalSummary}</p>
                                            </div>
                                            
                                            {enhancedData.skills?.technical && (
                                                <div>
                                                    <h4 className="font-medium mb-2">Enhanced Skills:</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {enhancedData.skills.technical.slice(-3).map((skill: string, i: number) => (
                                                            <Badge key={i} variant="secondary" className="text-xs bg-green-100 text-green-800">{skill}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Button className="w-full mt-4">
                                            <DownloadIcon className="mr-2 h-4 w-4" />
                                            Download Enhanced Resume
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            {/* ATS Tips */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <InfoIcon className="h-5 w-5" />
                                        ATS Optimization Tips
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Formatting</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            {ATS_OPTIMIZATION_TIPS.formatting.slice(0, 3).map((tip, i) => (
                                                <li key={i}>• {tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Keywords</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            {ATS_OPTIMIZATION_TIPS.keywords.slice(0, 2).map((tip, i) => (
                                                <li key={i}>• {tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button variant="outline" onClick={() => {
                            setShowSummary(false);
                            setCurrentStep(0);
                            setCurrentQuestionIndex(0);
                        }}>
                            Edit Information
                        </Button>
                        <Button onClick={() => {
                            setShowSummary(false);
                            setCurrentStep(0);
                            setCurrentQuestionIndex(0);
                            setResumeData({});
                            localStorage.removeItem('resume-data');
                        }}>
                            Start Over
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 md:px-8">
            <Container>
                {/* Header */}
                <MagicCard
                    gradientFrom="#38bdf8"
                    gradientTo="#3b82f6"
                    className="p-8 rounded-2xl text-center mb-8"
                    gradientColor="rgba(59,130,246,0.1)"
                >
                    <FileTextIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h1 className="text-3xl font-heading font-medium mb-4">ATS-Friendly Resume Builder</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                        Build an ATS-optimized resume with our AI-powered guidance. Answer step-by-step questions to create a professional resume that passes through Applicant Tracking Systems.
                    </p>
                    
                    {/* Progress */}
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{answeredQuestions} / {totalQuestions}</span>
                        </div>
                        <Progress value={(answeredQuestions / totalQuestions) * 100} className="mb-4" />
                        <Badge variant="secondary">
                            {currentSection?.title} - Question {currentQuestionIndex + 1} of {currentSection?.questions.length}
                        </Badge>
                    </div>
                </MagicCard>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentStep}-${currentQuestionIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Container delay={0.2}>
                            <Card className="max-w-2xl mx-auto">
                                <CardHeader>
                                    <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
                                    <CardDescription className="text-base">
                                        <strong>ATS Context:</strong> {currentQuestion?.atsContext}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const value = formData.get('answer') as string || currentAnswer;
                                        if (value.trim()) {
                                            handleAnswerSubmit(value.trim());
                                        }
                                    }}>
                                        <div className="space-y-4">
                                            {currentQuestion?.type === 'select' ? (
                                                <Select onValueChange={setCurrentAnswer} defaultValue={getCurrentValue()}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={currentQuestion.placeholder} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {currentQuestion.options?.map((option: string) => (
                                                            <SelectItem key={option} value={option}>
                                                                {option}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : currentQuestion?.type === 'textarea' ? (
                                                <Textarea
                                                    name="answer"
                                                    placeholder={currentQuestion.placeholder}
                                                    defaultValue={getCurrentValue()}
                                                    required={currentQuestion.required}
                                                    rows={4}
                                                />
                                            ) : (
                                                <Input
                                                    name="answer"
                                                    type={currentQuestion?.type || 'text'}
                                                    placeholder={currentQuestion?.placeholder}
                                                    defaultValue={getCurrentValue()}
                                                    required={currentQuestion?.required}
                                                />
                                            )}
                                            
                                            <div className="flex justify-between">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={moveToPreviousQuestion}
                                                    disabled={currentStep === 0 && currentQuestionIndex === 0}
                                                >
                                                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                                    Previous
                                                </Button>
                                                <Button type="submit">
                                                    Next
                                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </div>
    );
};

export default ResumeChecker; 