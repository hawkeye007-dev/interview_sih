export const DASHBOARD_NAV_LINKS = [
    {
        name: "Dashboard",
        href: "/dashboard"
    },
    {
        name: "Campus listings",
        href: "/dashboard/mock-interviews"
    },
    {
        name: "NonVocabs training",
        href: "/dashboard/non-vocabs"
    },
    {
        name: "Practice questions",
        href: "/dashboard/practice"
    },
    {
        name: "AI Tutor Pro",
        href: "/dashboard/ai-tutor-pro"
    },
    {
        name: "ResumeChecker by college",
        href: "/dashboard/resume-checker"
    },
    {
        name: "TalkToUs",
        href: "/dashboard/talk-to-us"
    }
];

export function getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

export const DASHBOARD_STATS = [
    {
        title: "Mock Interviews",
        value: "12",
        change: "+8% from last month",
        icon: "mic"
    },
    {
        title: "Practice Sessions",
        value: "47",
        change: "+23% from last week",
        icon: "play"
    },
    {
        title: "AI Feedback Score",
        value: "8.5/10",
        change: "+0.7 improvement",
        icon: "star"
    },
    {
        title: "Resume Score",
        value: "92%",
        change: "+5% improvement",
        icon: "file"
    }
];

export const RECENT_ACTIVITIES = [
    {
        id: 1,
        type: "interview",
        title: "Technical Interview - React Developer",
        time: "2 hours ago",
        score: "8.2/10"
    },
    {
        id: 2,
        type: "practice",
        title: "System Design Practice",
        time: "1 day ago",
        score: "7.8/10"
    },
    {
        id: 3,
        type: "resume",
        title: "Resume Analysis Completed",
        time: "2 days ago",
        score: "92%"
    }
]; 