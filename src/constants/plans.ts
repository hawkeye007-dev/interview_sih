export type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    annuallyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "basic",
        title: "Basic Prep",
        desc: "Perfect for freshers and students starting their interview preparation journey with AI-powered practice.",
        monthlyPrice: 499,
        annuallyPrice: 4999,
        buttonText: "Start Basic Prep",
        features: [
            "5 AI Mock Interviews/month",
            "Basic technical interviews",
            "Interview performance analytics",
            "Common question bank access",
            "Basic feedback reports",
            "Email support",
            "Interview preparation guides"
        ],
        link: "#"
    },
    {
        id: "pro",
        title: "Pro Interview",
        desc: "Ideal for experienced professionals seeking comprehensive interview preparation with advanced AI feedback.",
        monthlyPrice: 1499,
        annuallyPrice: 14999,
        badge: "Most Popular",
        buttonText: "Upgrade to Pro",
        features: [
            "15 AI Mock Interviews/month",
            "Advanced technical interviews",
            "Personality assessments",
            "Custom interview scenarios",
            "Detailed feedback with improvement tips",
            "24/7 chat support",
            "Interview recording & analysis"
        ],
        link: "#"
    }
];

export const PLANS_FAQ = [
    {
        id: 1,
        question: "How do AI mock interviews work?",
        answer: "Our AI conducts realistic interview simulations, analyzing your responses, body language, and communication skills to provide comprehensive feedback for improvement."
    },
    {
        id: 2,
        question: "What types of interviews are supported?",
        answer: "We support technical interviews, HR rounds, behavioral interviews, and role-specific interviews across various industries and experience levels."
    },
    {
        id: 3,
        question: "Is there a discount for annual subscriptions?",
        answer: "Yes, you can save approximately 15% by choosing annual billing over monthly billing for any of our plans."
    },
    {
        id: 4,
        question: "Can I practice specific company interviews?",
        answer: "Yes, our Pro plan includes custom interview scenarios tailored to specific companies and roles you're targeting."
    },
    {
        id: 5,
        question: "How accurate is the AI feedback?",
        answer: "Our AI is trained on thousands of real interviews and provides detailed, objective feedback based on industry standards and best practices."
    },
    {
        id: 6,
        question: "What kind of support do you provide?",
        answer: "We offer email support for Basic plans and 24/7 chat support for Pro plans, along with comprehensive interview guides and resources."
    },
    {
        id: 7,
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. Upgrades are effective immediately, while downgrades take effect in the next billing cycle."
    },
    {
        id: 8,
        question: "Is there a mobile app available?",
        answer: "Yes, all plans include access to our mobile app for iOS and Android, allowing you to practice interviews on the go."
    },
    {
        id: 9,
        question: "How do you ensure privacy and data security?",
        answer: "We use enterprise-grade encryption and follow strict data protection protocols. Your interview recordings and data are completely private and secure."
    }
];

export const PLANS_TABLE = [
    {
        id: 1,
        title: 'Basic Prep',
        priceMonthly: '₹499',
        priceYearly: "₹4,999",
        buttonText: 'Start free trial',
        usage: {
            interviews: '5 interviews/mo',
            interviewTypes: 'Basic Technical',
            feedback: 'Basic feedback',
            resources: 'Standard resources',
        },
        features: [
            'AI-powered mock interviews',
            'Basic performance analytics',
            'Interview guides',
            'Common question bank',
            'Email support',
            'Mobile app access',
            'Basic feedback reports',
            'Practice exercises',
        ],
    },
    {
        id: 2,
        title: 'Pro Interview',
        priceMonthly: '₹1,499',
        priceYearly: "₹14,999",
        buttonText: 'Go Pro',
        usage: {
            interviews: '15 interviews/mo',
            interviewTypes: 'All interview types',
            feedback: 'Advanced feedback',
            resources: 'Premium resources',
        },
        features: [
            'Advanced AI interviews',
            'Personality assessments',
            'Custom scenarios',
            'Detailed analytics',
            'Interview recording',
            'Performance tracking',
            '24/7 chat support',
            'Premium resources',
            'Company-specific prep',
        ],
    }
];
