import { GithubIcon, LinkedinIcon, TwitterIcon, GlobeIcon } from "lucide-react";

export interface ProfileData {
    name: string;
    email: string;
    avatar: string;
    role: string;
    bio: string;
    location: string;
    experience: number;
    skills: string[];
    languages: { name: string; proficiency: number }[];
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    achievements: string[];
    preferredRoles: string[];
    education: {
        degree: string;
        institution: string;
        year: string;
    };
}

export const defaultProfile: ProfileData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/avatars/default.svg",
    role: "Full Stack Developer",
    bio: "Passionate developer with expertise in modern web technologies. Love building scalable applications and contributing to open source.",
    location: "San Francisco, CA",
    experience: 5,
    skills: [
        "React", "TypeScript", "Node.js", "Python",
        "AWS", "Docker", "GraphQL", "Next.js"
    ],
    languages: [
        { name: "JavaScript", proficiency: 95 },
        { name: "Python", proficiency: 85 },
        { name: "Java", proficiency: 75 },
        { name: "Go", proficiency: 65 }
    ],
    github: "github.com/alexj-dev",
    linkedin: "linkedin.com/in/alexj-dev",
    twitter: "twitter.com/alexj_dev",
    website: "alexj.dev",
    achievements: [
        "Led development of a microservices architecture serving 1M+ users",
        "Contributed to popular open source projects with 1000+ stars",
        "Speaker at React Conf 2023",
        "AWS Certified Solutions Architect"
    ],
    preferredRoles: [
        "Full Stack Developer",
        "Frontend Engineer",
        "Cloud Architect"
    ],
    education: {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2019"
    }
}; 