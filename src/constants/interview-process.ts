import { BrainCircuitIcon, CodeIcon, DatabaseIcon, NetworkIcon, UsersIcon, WrenchIcon, GitBranchIcon, BarChartIcon, ServerIcon, ShieldIcon, PhoneIcon } from "lucide-react";

export const COMPANY_INTERVIEW_PROCESSES = {
    microsoft: {
        name: "Microsoft",
        logo: "/companies/microsoft.svg",
        description: "Microsoft's interview process is known for its focus on problem-solving and system design capabilities.",
        averageDuration: "4-8 weeks",
        rounds: [
            {
                name: "Initial Screen",
                icon: PhoneIcon,
                duration: "30-45 minutes",
                description: "Technical phone screen with a Microsoft engineer focusing on coding and problem-solving",
                focus: ["Basic coding questions", "Data structures", "Algorithms"]
            },
            {
                name: "Online Assessment",
                icon: CodeIcon,
                duration: "90 minutes",
                description: "Coding assessment with 2-3 algorithmic problems",
                focus: ["Algorithm implementation", "Code optimization", "Time complexity analysis"]
            },
            {
                name: "Technical Rounds (1-2)",
                icon: BrainCircuitIcon,
                duration: "45-60 minutes each",
                description: "Deep dive into technical concepts and coding challenges",
                focus: ["Data structures", "Algorithms", "System design basics"]
            },
            {
                name: "System Design",
                icon: DatabaseIcon,
                duration: "60 minutes",
                description: "Design scalable systems and discuss architectural decisions",
                focus: ["Distributed systems", "Scalability", "Performance"]
            },
            {
                name: "Behavioral & Culture",
                icon: UsersIcon,
                duration: "45 minutes",
                description: "Assess cultural fit and behavioral competencies",
                focus: ["Past experiences", "Leadership", "Collaboration"]
            }
        ]
    },
    amazon: {
        name: "Amazon",
        logo: "/companies/amazon.svg",
        description: "Amazon's interview process heavily emphasizes leadership principles and technical excellence.",
        averageDuration: "3-6 weeks",
        rounds: [
            {
                name: "Online Assessment",
                icon: CodeIcon,
                duration: "120 minutes",
                description: "Work style survey and coding assessment",
                focus: ["Coding problems", "Debugging", "Logical reasoning"]
            },
            {
                name: "Technical Phone Screen",
                icon: PhoneIcon,
                duration: "45-60 minutes",
                description: "Technical discussion with an Amazon engineer",
                focus: ["Data structures", "Algorithms", "Problem-solving approach"]
            },
            {
                name: "Leadership & Behavioral",
                icon: UsersIcon,
                duration: "45 minutes",
                description: "Assessment based on Amazon's Leadership Principles",
                focus: ["Leadership principles", "Past experiences", "Decision making"]
            },
            {
                name: "System Design",
                icon: NetworkIcon,
                duration: "60 minutes",
                description: "Design large-scale distributed systems",
                focus: ["Architecture", "Scalability", "Trade-offs"]
            },
            {
                name: "Technical Deep Dive",
                icon: WrenchIcon,
                duration: "60 minutes",
                description: "In-depth technical discussion and coding",
                focus: ["Code review", "Best practices", "Technical depth"]
            },
            {
                name: "Bar Raiser",
                icon: BarChartIcon,
                duration: "45 minutes",
                description: "Final round with a senior interviewer",
                focus: ["Overall assessment", "Cultural fit", "Long-term potential"]
            }
        ]
    },
    netflix: {
        name: "Netflix",
        logo: "/companies/netflix.svg",
        description: "Netflix's interview process focuses on technical excellence, culture fit, and real-world problem solving.",
        averageDuration: "2-4 weeks",
        rounds: [
            {
                name: "Technical Screen",
                icon: CodeIcon,
                duration: "60 minutes",
                description: "Initial technical assessment with a Netflix engineer",
                focus: ["Coding proficiency", "Problem-solving", "Technical communication"]
            },
            {
                name: "System Design & Architecture",
                icon: ServerIcon,
                duration: "60 minutes",
                description: "Design scalable streaming systems",
                focus: ["Distributed systems", "Microservices", "Cloud architecture"]
            },
            {
                name: "Technical Deep Dive",
                icon: GitBranchIcon,
                duration: "60 minutes",
                description: "In-depth technical discussion and coding challenges",
                focus: ["Code quality", "Engineering practices", "Technical decisions"]
            },
            {
                name: "Culture & Values",
                icon: UsersIcon,
                duration: "45 minutes",
                description: "Assess alignment with Netflix culture",
                focus: ["Freedom & Responsibility", "Innovation", "Inclusion"]
            },
            {
                name: "Security & Performance",
                icon: ShieldIcon,
                duration: "45 minutes",
                description: "Focus on security practices and performance optimization",
                focus: ["Security best practices", "Performance tuning", "Scalability"]
            }
        ]
    }
} as const; 