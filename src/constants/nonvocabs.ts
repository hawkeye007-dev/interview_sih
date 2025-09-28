export const COMPANIES = [
    {
        id: "amazon",
        name: "Amazon",
        color: "bg-orange-500",
        textColor: "text-orange-500"
    },
    {
        id: "microsoft",
        name: "Microsoft",
        color: "bg-blue-600",
        textColor: "text-blue-600"
    },
    {
        id: "netflix",
        name: "Netflix",
        color: "bg-red-600",
        textColor: "text-red-600"
    }
];

export const NON_VERBAL_QUESTIONS = [
    {
        id: 1,
        question: "Tell me about yourself?",
        category: "Introduction",
        difficulty: "Easy"
    },
    {
        id: 2,
        question: "Describe the best project you've made till now?",
        category: "Technical",
        difficulty: "Medium"
    },
    {
        id: 3,
        question: "What are your strengths and weaknesses?",
        category: "Self-Assessment",
        difficulty: "Medium"
    },
    {
        id: 4,
        question: "Why do you want to work for our company?",
        category: "Motivation",
        difficulty: "Medium"
    },
    {
        id: 5,
        question: "Where do you see yourself in 5 years?",
        category: "Career Goals",
        difficulty: "Hard"
    },
    {
        id: 6,
        question: "Tell me about a challenging situation you faced and how you handled it?",
        category: "Problem Solving",
        difficulty: "Hard"
    },
    {
        id: 7,
        question: "What motivates you to do your best work?",
        category: "Motivation",
        difficulty: "Easy"
    },
    {
        id: 8,
        question: "Describe a time when you had to work with a difficult team member?",
        category: "Teamwork",
        difficulty: "Hard"
    }
];

export interface Answer {
    questionId: number;
    companyId: string;
    content: string;
    lastModified: string;
    isEnhanced?: boolean;
}

export const getStorageKey = (questionId: number, companyId: string): string => {
    return `nonvocab_answer_${questionId}_${companyId}`;
};

export const saveAnswer = (questionId: number, companyId: string, content: string): void => {
    const answer: Answer = {
        questionId,
        companyId,
        content,
        lastModified: new Date().toISOString(),
        isEnhanced: false
    };
    localStorage.setItem(getStorageKey(questionId, companyId), JSON.stringify(answer));
};

export const getAnswer = (questionId: number, companyId: string): Answer | null => {
    const stored = localStorage.getItem(getStorageKey(questionId, companyId));
    return stored ? JSON.parse(stored) : null;
};

export const enhanceAnswer = (questionId: number, companyId: string, enhancedContent: string): void => {
    const answer: Answer = {
        questionId,
        companyId,
        content: enhancedContent,
        lastModified: new Date().toISOString(),
        isEnhanced: true
    };
    localStorage.setItem(getStorageKey(questionId, companyId), JSON.stringify(answer));
};

export const saveAnswerToFile = async (questionId: number, companyId: string, content: string, isEnhanced: boolean = false): Promise<Answer | null> => {
    try {
        const response = await fetch('/api/save-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId,
                companyId,
                content,
                isEnhanced
            }),
        });

        const data = await response.json();

        if (data.success) {
            const answer: Answer = {
                questionId,
                companyId,
                content,
                lastModified: new Date().toISOString(),
                isEnhanced
            };
            localStorage.setItem(getStorageKey(questionId, companyId), JSON.stringify(answer));
            return data.answer;
        } else {
            console.error('Failed to save answer to file:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error saving answer to file:', error);
        return null;
    }
};

export const getAnswerFromFile = async (questionId: number, companyId: string): Promise<Answer | null> => {
    try {
        const response = await fetch(`/api/save-answer?questionId=${questionId}&companyId=${companyId}`);
        const data = await response.json();

        if (data.success && data.answer) {
            localStorage.setItem(getStorageKey(questionId, companyId), JSON.stringify(data.answer));
            return data.answer;
        }
        return null;
    } catch (error) {
        console.error('Error getting answer from file:', error);
        return null;
    }
};

export const enhanceAnswerWithAI = async (questionId: number, companyId: string, currentAnswer: string, question: string): Promise<string | null> => {
    try {
        const response = await fetch('/api/enhance-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: currentAnswer,
                question: question
            }),
        });

        const data = await response.json();

        if (data.success && data.enhancedAnswer) {
            await saveAnswerToFile(questionId, companyId, data.enhancedAnswer, true);
            return data.enhancedAnswer;
        } else {
            console.error('Failed to enhance answer:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error enhancing answer:', error);
        return null;
    }
};

export const deleteAnswerFromFile = async (questionId: number, companyId: string): Promise<boolean> => {
    try {
        const response = await fetch('/api/save-answer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId,
                companyId
            }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.removeItem(getStorageKey(questionId, companyId));
            return true;
        } else {
            console.error('Failed to delete answer from file:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Error deleting answer from file:', error);
        return false;
    }
}; 