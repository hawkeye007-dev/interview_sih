export interface InterviewSlot {
  id: string;
  company: {
    name: string;
    logo: string;
    industry: string;
  };
  position: {
    title: string;
    level: string;
    department: string;
    location: string;
    remote: boolean;
  };
  schedule: {
    date: string;
    time: string;
    duration: string;
    timeZone: string;
  };
  requirements: {
    experience: string;
    skills: string[];
    education: string[];
  };
  compensation: {
    salary: string;
    equity: boolean;
    benefits: string[];
  };
  description: string;
  responsibilities: string[];
  interviewProcess: {
    rounds: number;
    types: string[];
    duration: string;
  };
  applicationDeadline: string;
  postedDate: string;
  applicants: number;
  status: 'open' | 'closing-soon' | 'urgent' | 'new';
  recruiter: {
    name: string;
    title: string;
    avatar?: string;
  };
}

export const MOCK_INTERVIEW_SLOTS: InterviewSlot[] = [
  // Google Positions
  {
    id: "google-swe-001",
    company: {
      name: "Google",
      logo: "/companies/google-alt.svg",
      industry: "Technology"
    },
    position: {
      title: "Senior Software Engineer",
      level: "L5",
      department: "Search Infrastructure",
      location: "Bengaluru, India",
      remote: false
    },
    schedule: {
      date: "2025-10-15",
      time: "2:00 PM",
      duration: "4 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "5+ years",
      skills: ["Java", "Python", "C++", "Distributed Systems", "Machine Learning"],
      education: ["Bachelor's in Computer Science", "Master's preferred"]
    },
    compensation: {
      salary: "₹45,00,000 - ₹65,00,000",
      equity: true,
      benefits: ["Health Insurance", "401k Match", "Free Meals", "Gym Access", "Education Reimbursement"]
    },
    description: "Join Google's Search Infrastructure team to build and maintain the systems that power Google Search for billions of users worldwide. Work on cutting-edge distributed systems and help improve search relevance and performance.",
    responsibilities: [
      "Design and implement large-scale distributed systems",
      "Optimize search algorithms for performance and relevance",
      "Collaborate with cross-functional teams on product features",
      "Mentor junior engineers and contribute to technical decisions",
      "Participate in code reviews and maintain high code quality standards"
    ],
    interviewProcess: {
      rounds: 5,
      types: ["Phone Screen", "Coding Interview", "System Design", "Behavioral", "Team Match"],
      duration: "4-6 weeks"
    },
    applicationDeadline: "2025-10-10",
    postedDate: "2025-09-20",
    applicants: 847,
    status: 'urgent',
    recruiter: {
      name: "Sarah Chen",
      title: "Senior Technical Recruiter",
      avatar: "/avatars/sarah-chen.jpg"
    }
  },
  {
    id: "google-pm-001",
    company: {
      name: "Google",
      logo: "/companies/google-alt.svg",
      industry: "Technology"
    },
    position: {
      title: "Product Manager",
      level: "L4-L5",
      department: "YouTube",
      location: "Gurgaon, India",
      remote: true
    },
    schedule: {
      date: "2025-10-18",
      time: "10:00 AM",
      duration: "5 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "3+ years",
      skills: ["Product Strategy", "Data Analysis", "A/B Testing", "User Research", "SQL"],
      education: ["Bachelor's degree required", "MBA preferred"]
    },
    compensation: {
      salary: "₹35,00,000 - ₹55,00,000",
      equity: true,
      benefits: ["Health Insurance", "401k Match", "Free Meals", "Wellness Stipend", "Parental Leave"]
    },
    description: "Drive product strategy and execution for YouTube's creator economy features. Work with engineering, design, and data science teams to build products that help creators succeed and grow their audiences.",
    responsibilities: [
      "Define product vision and roadmap for creator tools",
      "Analyze user data and feedback to inform product decisions",
      "Collaborate with engineering teams on feature development",
      "Conduct user research and competitive analysis",
      "Present to executive leadership and drive strategic initiatives"
    ],
    interviewProcess: {
      rounds: 4,
      types: ["Phone Screen", "Product Design", "Analytical", "Leadership"],
      duration: "3-5 weeks"
    },
    applicationDeadline: "2025-10-12",
    postedDate: "2025-09-25",
    applicants: 623,
    status: 'open',
    recruiter: {
      name: "Michael Rodriguez",
      title: "Product Recruiting Lead"
    }
  },

  // Netflix Positions
  {
    id: "netflix-swe-001",
    company: {
      name: "Netflix",
      logo: "/companies/netflix.svg",
      industry: "Entertainment & Media"
    },
    position: {
      title: "Senior Software Engineer - Content Platform",
      level: "Senior",
      department: "Content Engineering",
      location: "Mumbai, India",
      remote: true
    },
    schedule: {
      date: "2025-10-20",
      time: "11:00 AM",
      duration: "4 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "6+ years",
      skills: ["Java", "Spring Boot", "Microservices", "AWS", "Kafka", "MongoDB"],
      education: ["Bachelor's in Computer Science or equivalent experience"]
    },
    compensation: {
      salary: "₹50,00,000 - ₹85,00,000",
      equity: true,
      benefits: ["Health Insurance", "Unlimited PTO", "Stock Options", "Wellness Stipend", "Learning Budget"]
    },
    description: "Build the next generation of content management and delivery systems at Netflix. Work on highly scalable microservices that serve hundreds of millions of users globally with 99.99% uptime requirements.",
    responsibilities: [
      "Design and build microservices for content ingestion and processing",
      "Optimize system performance for global content delivery",
      "Implement monitoring and observability solutions",
      "Collaborate with content teams on new feature requirements",
      "Participate in on-call rotation for production systems"
    ],
    interviewProcess: {
      rounds: 4,
      types: ["Technical Screen", "System Design", "Coding Interview", "Culture Interview"],
      duration: "2-3 weeks"
    },
    applicationDeadline: "2025-10-14",
    postedDate: "2025-09-28",
    applicants: 392,
    status: 'new',
    recruiter: {
      name: "Jessica Park",
      title: "Senior Technical Recruiter"
    }
  },
  {
    id: "netflix-data-001",
    company: {
      name: "Netflix",
      logo: "/companies/netflix.svg",
      industry: "Entertainment & Media"
    },
    position: {
      title: "Data Scientist - Personalization",
      level: "Senior",
      department: "Machine Learning",
      location: "Hyderabad, India",
      remote: true
    },
    schedule: {
      date: "2025-10-22",
      time: "1:00 PM",
      duration: "3 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "4+ years",
      skills: ["Python", "Machine Learning", "TensorFlow", "A/B Testing", "SQL", "Statistics"],
      education: ["PhD in Statistics, ML, or related field", "MS with relevant experience"]
    },
    compensation: {
      salary: "₹42,00,000 - ₹75,00,000",
      equity: true,
      benefits: ["Health Insurance", "Unlimited PTO", "Stock Options", "Home Office Stipend", "Conference Budget"]
    },
    description: "Drive personalization algorithms that help 230+ million Netflix members discover content they love. Work with recommendation systems, ranking models, and experimentation platforms.",
    responsibilities: [
      "Develop and improve recommendation algorithms",
      "Design and analyze A/B experiments for personalization features",
      "Build statistical models for content ranking and discovery",
      "Collaborate with product and engineering teams",
      "Present insights to leadership and influence product strategy"
    ],
    interviewProcess: {
      rounds: 4,
      types: ["Technical Screen", "Case Study", "Statistical Modeling", "Behavioral"],
      duration: "3-4 weeks"
    },
    applicationDeadline: "2025-10-16",
    postedDate: "2025-09-26",
    applicants: 278,
    status: 'open',
    recruiter: {
      name: "Alex Kumar",
      title: "Data Science Recruiting Manager"
    }
  },

  // Amazon Positions
  {
    id: "amazon-sde-001",
    company: {
      name: "Amazon",
      logo: "/companies/amazon.svg",
      industry: "E-commerce & Cloud"
    },
    position: {
      title: "Software Development Engineer II",
      level: "SDE II",
      department: "AWS Lambda",
      location: "Chennai, India",
      remote: false
    },
    schedule: {
      date: "2025-10-16",
      time: "9:00 AM",
      duration: "5 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "3+ years",
      skills: ["Java", "Python", "Go", "Distributed Systems", "AWS Services", "Docker"],
      education: ["Bachelor's in Computer Science or equivalent"]
    },
    compensation: {
      salary: "₹32,00,000 - ₹48,00,000",
      equity: true,
      benefits: ["Health Insurance", "401k", "Stock Units", "Career Development Fund", "Relocation Assistance"]
    },
    description: "Join the AWS Lambda team to build and scale serverless computing infrastructure. Work on systems that process trillions of invocations per month with millisecond latencies.",
    responsibilities: [
      "Design and implement serverless computing features",
      "Optimize Lambda runtime performance and cold start times",
      "Build monitoring and debugging tools for serverless applications",
      "Collaborate with service teams across AWS",
      "Participate in operational excellence and incident response"
    ],
    interviewProcess: {
      rounds: 5,
      types: ["Online Assessment", "Technical Phone Screen", "Coding Interview", "System Design", "Behavioral (Leadership Principles)"],
      duration: "4-6 weeks"
    },
    applicationDeadline: "2025-10-11",
    postedDate: "2025-09-22",
    applicants: 1205,
    status: 'closing-soon',
    recruiter: {
      name: "David Kim",
      title: "Senior SDE Recruiter"
    }
  },

  // Microsoft Positions
  {
    id: "microsoft-swe-001",
    company: {
      name: "Microsoft",
      logo: "/companies/microsoft.svg",
      industry: "Technology"
    },
    position: {
      title: "Principal Software Engineer",
      level: "63-64",
      department: "Azure AI",
      location: "Bengaluru, India",
      remote: true
    },
    schedule: {
      date: "2025-10-19",
      time: "10:30 AM",
      duration: "6 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "8+ years",
      skills: ["C#", "Python", "Machine Learning", "Azure", "Kubernetes", "Distributed Systems"],
      education: ["Bachelor's in Computer Science", "Advanced degree preferred"]
    },
    compensation: {
      salary: "₹50,00,000 - ₹85,00,000",
      equity: true,
      benefits: ["Health Insurance", "401k Match", "Stock Awards", "Education Benefits", "Flexible Work Arrangements"]
    },
    description: "Lead the development of next-generation AI services on Microsoft Azure. Drive technical vision and architecture for machine learning platforms serving millions of developers worldwide.",
    responsibilities: [
      "Architect and build scalable AI/ML platforms on Azure",
      "Lead cross-functional technical initiatives",
      "Mentor senior engineers and drive technical excellence",
      "Collaborate with product management on AI strategy",
      "Represent Microsoft at technical conferences and standards bodies"
    ],
    interviewProcess: {
      rounds: 5,
      types: ["Technical Screen", "Architecture Design", "Coding Interview", "Leadership Interview", "Team Match"],
      duration: "3-5 weeks"
    },
    applicationDeadline: "2025-10-13",
    postedDate: "2025-09-24",
    applicants: 456,
    status: 'open',
    recruiter: {
      name: "Lisa Thompson",
      title: "Principal Engineering Recruiter"
    }
  },

  // Apple Positions
  {
    id: "apple-swe-001",
    company: {
      name: "Apple",
      logo: "/companies/apple.svg",
      industry: "Consumer Electronics"
    },
    position: {
      title: "Senior Software Engineer - iOS",
      level: "ICT4",
      department: "iOS System Experience",
      location: "Bengaluru, India",
      remote: false
    },
    schedule: {
      date: "2025-10-21",
      time: "2:30 PM",
      duration: "4 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "5+ years",
      skills: ["Swift", "Objective-C", "iOS Development", "UIKit", "SwiftUI", "Performance Optimization"],
      education: ["Bachelor's in Computer Science or equivalent experience"]
    },
    compensation: {
      salary: "₹42,00,000 - ₹70,00,000",
      equity: true,
      benefits: ["Health Insurance", "Stock Purchase Plan", "Product Discounts", "Fitness Centers", "Commuter Benefits"]
    },
    description: "Shape the future of iOS by building fundamental system experiences. Work on features that millions of users interact with daily across iPhone and iPad platforms.",
    responsibilities: [
      "Develop core iOS system features and frameworks",
      "Optimize performance for battery life and responsiveness",
      "Collaborate with hardware teams on system integration",
      "Implement accessibility features across iOS",
      "Participate in iOS release cycles and beta programs"
    ],
    interviewProcess: {
      rounds: 4,
      types: ["Technical Phone Screen", "Coding Interview", "System Design", "Behavioral"],
      duration: "3-4 weeks"
    },
    applicationDeadline: "2025-10-15",
    postedDate: "2025-09-27",
    applicants: 689,
    status: 'urgent',
    recruiter: {
      name: "Jennifer Wu",
      title: "iOS Engineering Recruiter"
    }
  },

  // Meta Positions
  {
    id: "meta-swe-001",
    company: {
      name: "Meta",
      logo: "/companies/meta.svg",
      industry: "Social Media & VR"
    },
    position: {
      title: "Software Engineer - Infrastructure",
      level: "E4-E5",
      department: "Core Infrastructure",
      location: "Gurgaon, India",
      remote: true
    },
    schedule: {
      date: "2025-10-17",
      time: "3:00 PM",
      duration: "4 hours",
      timeZone: "IST"
    },
    requirements: {
      experience: "3+ years",
      skills: ["C++", "Python", "Distributed Systems", "Linux", "Performance Optimization", "Networking"],
      education: ["Bachelor's in Computer Science or related field"]
    },
    compensation: {
      salary: "₹40,00,000 - ₹60,00,000",
      equity: true,
      benefits: ["Health Insurance", "401k", "RSUs", "Food & Transportation", "Wellness Programs"]
    },
    description: "Build the infrastructure that powers Facebook, Instagram, WhatsApp, and the metaverse. Work on distributed systems serving billions of users with sub-millisecond latencies.",
    responsibilities: [
      "Design and implement high-performance distributed systems",
      "Optimize infrastructure for cost and efficiency",
      "Build tools and frameworks used by thousands of engineers",
      "Collaborate on capacity planning and architectural decisions",
      "Participate in oncall rotations for critical infrastructure"
    ],
    interviewProcess: {
      rounds: 4,
      types: ["Technical Phone Screen", "Coding Interview", "System Design", "Behavioral"],
      duration: "3-4 weeks"
    },
    applicationDeadline: "2025-10-12",
    postedDate: "2025-09-23",
    applicants: 934,
    status: 'open',
    recruiter: {
      name: "Carlos Martinez",
      title: "Infrastructure Engineering Recruiter"
    }
  }
];

export const INTERVIEW_STATUSES = {
  'open': {
    label: 'Open',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: '●'
  },
  'closing-soon': {
    label: 'Closing',
    color: 'bg-orange-50 text-orange-700 border-orange-200', 
    icon: '◐'
  },
  'urgent': {
    label: 'Urgent',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: '!'
  },
  'new': {
    label: 'New',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: '★'
  }
} as const;