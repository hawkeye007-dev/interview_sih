export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };
  professionalSummary: string;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    frameworks: string[];
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    responsibilities: string[];
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
    achievements?: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    achievements: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }>;
}

interface BaseQuestion {
  key: string;
  question: string;
  placeholder: string;
  required: boolean;
  atsContext: string;
  conditional?: string;
}

interface TextQuestion extends BaseQuestion {
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea';
}

interface SelectQuestion extends BaseQuestion {
  type: 'select';
  options: string[];
}

type ResumeQuestion = TextQuestion | SelectQuestion;

interface ResumeSection {
  id: string;
  title: string;
  questions: ResumeQuestion[];
}

export const ATS_RESUME_QUESTIONS: ResumeSection[] = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    questions: [
      {
        key: 'fullName',
        question: 'What is your full name?',
        placeholder: 'Enter your full name as it appears on official documents',
        type: 'text',
        required: true,
        atsContext: 'Use your full professional name. Avoid nicknames or abbreviations.'
      },
      {
        key: 'email',
        question: 'What is your professional email address?',
        placeholder: 'your.name@email.com',
        type: 'email',
        required: true,
        atsContext: 'Use a professional email with your name. Avoid unprofessional handles.'
      },
      {
        key: 'phone',
        question: 'What is your phone number?',
        placeholder: '+1 (555) 123-4567',
        type: 'tel',
        required: true,
        atsContext: 'Include country code and use standard formatting for better ATS parsing.'
      },
      {
        key: 'location',
        question: 'What is your location (City, State/Country)?',
        placeholder: 'San Francisco, CA',
        type: 'text',
        required: true,
        atsContext: 'Include city and state/country. This helps with location-based filtering.'
      },
      {
        key: 'portfolio',
        question: 'Do you have a portfolio website?',
        placeholder: 'https://yourname.com',
        type: 'url',
        required: false,
        atsContext: 'Include if relevant to your field. Use a professional domain.'
      },
      {
        key: 'linkedin',
        question: 'What is your LinkedIn profile URL?',
        placeholder: 'https://linkedin.com/in/yourprofile',
        type: 'url',
        required: false,
        atsContext: 'LinkedIn profiles are highly valued by recruiters and ATS systems.'
      },
      {
        key: 'github',
        question: 'Do you have a GitHub profile?',
        placeholder: 'https://github.com/yourusername',
        type: 'url',
        required: false,
        atsContext: 'Essential for technical roles. Shows your coding activity and projects.'
      }
    ]
  },
  {
    id: 'professional-summary',
    title: 'Professional Summary',
    questions: [
      {
        key: 'professionalSummary',
        question: 'Write a compelling professional summary (2-3 sentences)',
        placeholder: 'Experienced software engineer with 5+ years developing scalable web applications...',
        type: 'textarea',
        required: true,
        atsContext: 'Include keywords from your target job description. Mention years of experience and key achievements.'
      }
    ]
  },
  {
    id: 'skills',
    title: 'Skills & Technologies',
    questions: [
      {
        key: 'technical',
        question: 'List your technical skills (separate with commas)',
        placeholder: 'JavaScript, Python, React, Node.js, PostgreSQL',
        type: 'text',
        required: true,
        atsContext: 'Use exact technology names as they appear in job descriptions. Include versions when relevant.'
      },
      {
        key: 'soft',
        question: 'What are your key soft skills?',
        placeholder: 'Leadership, Communication, Problem Solving, Team Collaboration',
        type: 'text',
        required: true,
        atsContext: 'Include skills that match job requirements. Use action-oriented language.'
      },
      {
        key: 'languages',
        question: 'What programming languages do you know?',
        placeholder: 'JavaScript, Python, Java, TypeScript',
        type: 'text',
        required: true,
        atsContext: 'List languages you can actively code in. Order by proficiency level.'
      },
      {
        key: 'frameworks',
        question: 'Which frameworks and tools are you proficient with?',
        placeholder: 'React, Express.js, Django, Docker, AWS',
        type: 'text',
        required: true,
        atsContext: 'Include frameworks, libraries, and tools relevant to your target roles.'
      }
    ]
  },
  {
    id: 'experience',
    title: 'Work Experience',
    questions: [
      {
        key: 'hasExperience',
        question: 'Do you have work experience to add?',
        placeholder: 'Yes/No',
        type: 'select',
        options: ['Yes', 'No'],
        required: true,
        atsContext: 'Work experience is crucial for ATS scoring. Include internships and part-time roles.'
      },
      {
        key: 'company',
        question: 'What is your most recent company name?',
        placeholder: 'Google, Microsoft, Startup Inc.',
        type: 'text',
        required: false,
        atsContext: 'Use the official company name as it appears on LinkedIn or their website.',
        conditional: 'hasExperience=Yes'
      },
      {
        key: 'position',
        question: 'What was your job title?',
        placeholder: 'Software Engineer, Frontend Developer, Data Analyst',
        type: 'text',
        required: false,
        atsContext: 'Use the exact title from your offer letter. Include level if applicable (e.g., Senior, Junior).',
        conditional: 'hasExperience=Yes'
      },
      {
        key: 'duration',
        question: 'What was your employment duration?',
        placeholder: 'Jan 2022 - Present, Jun 2020 - Dec 2021',
        type: 'text',
        required: false,
        atsContext: 'Use Month Year format. Be precise with dates as ATS systems check for gaps.',
        conditional: 'hasExperience=Yes'
      },
      {
        key: 'responsibilities',
        question: 'Describe your key responsibilities and achievements (one per line)',
        placeholder: 'Developed and maintained React applications\nImproved page load speed by 40%\nLed a team of 3 developers',
        type: 'textarea',
        required: false,
        atsContext: 'Start with action verbs. Quantify achievements with numbers. Use keywords from target job descriptions.',
        conditional: 'hasExperience=Yes'
      }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    questions: [
      {
        key: 'institution',
        question: 'What is your highest educational institution?',
        placeholder: 'University of California, Berkeley',
        type: 'text',
        required: true,
        atsContext: 'Use the full, official name of the institution for better ATS recognition.'
      },
      {
        key: 'degree',
        question: 'What degree did you earn?',
        placeholder: 'Bachelor of Science, Master of Engineering',
        type: 'text',
        required: true,
        atsContext: 'Include the full degree name. Mention honors if applicable (Magna Cum Laude, etc.).'
      },
      {
        key: 'field',
        question: 'What was your field of study/major?',
        placeholder: 'Computer Science, Information Technology, Engineering',
        type: 'text',
        required: true,
        atsContext: 'Use standard field names. Include minor if relevant to your target role.'
      },
      {
        key: 'graduationYear',
        question: 'What year did you graduate (or expected graduation)?',
        placeholder: '2023, Expected 2024',
        type: 'text',
        required: true,
        atsContext: 'Include month and year. For current students, mention "Expected" with date.'
      },
      {
        key: 'gpa',
        question: 'What was your GPA? (Optional - include if 3.5+)',
        placeholder: '3.8/4.0',
        type: 'text',
        required: false,
        atsContext: 'Only include GPA if it\'s 3.5 or higher. Include the scale (e.g., 3.8/4.0).'
      }
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    questions: [
      {
        key: 'hasProjects',
        question: 'Do you have projects to showcase?',
        placeholder: 'Yes/No',
        type: 'select',
        options: ['Yes', 'No'],
        required: true,
        atsContext: 'Projects demonstrate practical skills and initiative, especially important for new graduates.'
      },
      {
        key: 'projectName',
        question: 'What is your most impressive project name?',
        placeholder: 'E-commerce Platform, Task Management App, ML Prediction Model',
        type: 'text',
        required: false,
        atsContext: 'Use descriptive, professional names that clearly indicate the project type.',
        conditional: 'hasProjects=Yes'
      },
      {
        key: 'projectDescription',
        question: 'Describe this project and your role',
        placeholder: 'Built a full-stack e-commerce platform using React and Node.js...',
        type: 'textarea',
        required: false,
        atsContext: 'Focus on your contributions, technologies used, and the impact/results achieved.',
        conditional: 'hasProjects=Yes'
      },
      {
        key: 'projectTechnologies',
        question: 'What technologies did you use? (comma-separated)',
        placeholder: 'React, Node.js, MongoDB, AWS, Docker',
        type: 'text',
        required: false,
        atsContext: 'List specific technologies, frameworks, and tools. Match keywords from job descriptions.',
        conditional: 'hasProjects=Yes'
      },
      {
        key: 'projectLink',
        question: 'Project link (GitHub, live demo, etc.)',
        placeholder: 'https://github.com/username/project',
        type: 'url',
        required: false,
        atsContext: 'Include working links to GitHub repos or live demos. Ensure code is clean and documented.',
        conditional: 'hasProjects=Yes'
      }
    ]
  }
];

export const ATS_OPTIMIZATION_TIPS = {
  formatting: [
    'Use standard section headings like "Experience", "Education", "Skills"',
    'Choose simple, clean fonts like Arial, Calibri, or Times New Roman',
    'Keep formatting consistent throughout the document',
    'Use bullet points for easy scanning',
    'Avoid tables, text boxes, and complex graphics'
  ],
  keywords: [
    'Include exact keywords from the job description',
    'Use industry-standard terminology',
    'Include both acronyms and full forms (e.g., "AI" and "Artificial Intelligence")',
    'Quantify achievements with numbers and percentages'
  ],
  content: [
    'Start bullet points with strong action verbs',
    'Include specific technologies, tools, and methodologies',
    'Mention relevant certifications and education',
    'Keep content relevant to the target position'
  ]
};

export const RESUME_SECTIONS_ORDER = [
  'personalInfo',
  'professionalSummary',
  'skills',
  'experience',
  'projects',
  'education',
  'certifications'
]; 