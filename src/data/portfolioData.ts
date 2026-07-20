export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  metrics?: string;
  features: string[];
  githubUrl: string;
  liveUrl: string;
  folderName: string;
  featured: boolean;
  date: string;
  architecture?: string;
  challenges?: string;
  solutions?: string;
  futureImprovements?: string[];
  screenshots?: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number; version: string; experience: string }[];
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
  tag: string;
  metric?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
  tag: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export const PERSONAL_INFO = {
  name: 'Suman Vernekar',
  role: 'MERN Stack & Full Stack Developer',
  tagline: 'Building Scalable Web Apps & AI-Powered Solutions',
  summary: 'Final-year Computer Science and Engineering student with hands-on experience in MERN Stack development, RESTful API development, JWT authentication, MongoDB, and AI-powered OCR applications. Passionate about building scalable web applications and continuously improving problem-solving skills through Data Structures and Algorithms.',
  college: 'Government Engineering College, Mosalehosahalli, Hassan',
  degree: 'Bachelor of Engineering (Computer Science and Engineering)',
  cgpa: 'CGPA: 7.72',
  higherSecondary: 'Higher Secondary Education (PCMB) - Arvind PU College, GG Palya Gate, Kunigal TQ, Tumakuru (Percentage: 90.00%)',
  training: 'JSpiders Training & Development Center - MERN Stack Development Trainee (Jan 2026 - Present, Bengaluru, India)',
  location: 'Bengaluru / Hassan, Karnataka, India',
  email: 'sumanvernekarvernekar@gmail.com',
  phone: '+91-7625086715',
  github: 'https://github.com/suman-vernekar',
  githubUsername: 'suman-vernekar',
  linkedin: 'https://linkedin.com/in/suman-vernekar',
  leetcode: 'https://leetcode.com/u/MgefjlC9PM/',
  hackerrank: 'https://hackerrank.com/suman-vernekar',
  languages: ['English', 'Hindi', 'Kannada', 'Marathi'],
  interests: [
    'Full Stack Development',
    'MERN Stack Development',
    'Backend Development',
    'REST API Development',
    'Web Application Development'
  ],
  softSkills: [
    'Communication', 'Leadership', 'Teamwork', 'Problem-Solving',
    'Critical Thinking', 'Time Management', 'Adaptability', 'Quick Learning'
  ],
  nodeJsConcepts: [
    'NPM', 'CommonJS & ES Modules', 'File System (FS)', 'Path Module', 'OS Module',
    'HTTP Module', 'URL Module', 'Event Loop', 'Event Emitter', 'Streams',
    'Buffers', 'Process Object', 'Environment Variables (.env)', 'Non-Blocking I/O', 'Asynchronous Programming'
  ],
  authSecurity: [
    'JWT', 'bcrypt', 'Cookies', 'Input Validation', 'Secure Password Storage',
    'Environment Variables', 'CORS', 'Helmet', 'Rate Limiting'
  ],
  coreConcepts: [
    'Object-Oriented Programming (OOP)', 'Data Structures & Algorithms (DSA)',
    'DBMS', 'Operating Systems', 'Computer Networks', 'SDLC', 'Client–Server Architecture', 'REST Architecture'
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'weather-app',
    title: 'Weather Forecasting Web Application',
    category: 'Full-Stack MERN & REST APIs',
    summary: 'Developed a full-stack MERN application providing real-time weather forecasting using REST APIs with AI-based crop recommendation.',
    description: 'Developed a full-stack MERN application providing real-time weather forecasting using REST APIs. Implemented AI-based crop recommendation features based on weather conditions. Designed responsive user interfaces and integrated backend APIs with MongoDB for efficient data management.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    metrics: 'Integrated 5+ live weather data points & AI recommendation engine',
    features: [
      'Developed a full-stack MERN application providing real-time weather forecasting using REST APIs.',
      'Implemented AI-based crop recommendation features based on weather conditions.',
      'Designed responsive user interfaces and integrated backend APIs with MongoDB for efficient data management.'
    ],
    githubUrl: 'https://github.com/suman-vernekar/weather-forecasting-app',
    liveUrl: 'https://weather-crop-forecast.vernekar.dev',
    folderName: 'Weather_App',
    featured: true,
    date: '2024 - 2025',
    architecture: 'Client-Server Architecture with React frontend, Express REST API gateway, and MongoDB database cluster.',
    challenges: 'Handling real-time geolocation API latency and caching weather data for AI recommendations.',
    solutions: 'Implemented client-side debounce with Axios interceptors and memory caching on Express server.',
    futureImprovements: ['Add 7-day extended radar maps', 'Push notifications for extreme weather warnings']
  },
  {
    id: 'medical-ocr',
    title: 'Medical Handwritten Transcription Summarizer',
    category: 'Python, OpenCV, Tesseract OCR, NLP',
    summary: 'Built an AI-powered OCR application to extract and summarize handwritten medical notes.',
    description: 'Built an AI-powered OCR application to extract and summarize handwritten medical notes. Automated the transcription pipeline, reducing manual effort by 30%. Generated structured digital summaries to improve accessibility and document processing efficiency.',
    techStack: ['Python', 'OpenCV', 'Tesseract OCR', 'NLP'],
    metrics: 'Automated transcription pipeline, reducing manual effort by 30%',
    features: [
      'Built an AI-powered OCR application to extract and summarize handwritten medical notes.',
      'Automated the transcription pipeline, reducing manual effort by 30%.',
      'Generated structured digital summaries to improve accessibility and document processing efficiency.'
    ],
    githubUrl: 'https://github.com/suman-vernekar/MedicaltranscriptionSummarizes',
    liveUrl: 'https://medical-ocr-summarizer.vernekar.dev',
    folderName: 'Medical_OCR_AI',
    featured: true,
    date: '2024',
    architecture: 'Python pipeline utilizing OpenCV image binarization, Tesseract OCR engine, and NLP transformer summarizer.',
    challenges: 'High variance in doctor handwriting legibility and noisy image backgrounds.',
    solutions: 'Applied adaptive thresholding and morphological transformations before feeding frames to Tesseract OCR.',
    futureImprovements: ['Fine-tune LLM for prescription medication safety checks', 'Add multi-language translation']
  },
  {
    id: 'interior-blog',
    title: 'Interior Design and Garden Blog Website',
    category: 'HTML5, CSS3, JavaScript, React.js',
    summary: 'Developed a responsive website showcasing interior design concepts and gardening tips.',
    description: 'Developed a responsive website showcasing interior design concepts and gardening tips. Implemented dynamic blog content, interactive image galleries, and reusable React components. Enhanced user experience through responsive layouts and cross-browser compatibility.',
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js'],
    metrics: 'Enhanced user experience through responsive layouts & cross-browser compatibility',
    features: [
      'Developed a responsive website showcasing interior design concepts and gardening tips.',
      'Implemented dynamic blog content, interactive image galleries, and reusable React components.',
      'Enhanced user experience through responsive layouts and cross-browser compatibility.'
    ],
    githubUrl: 'https://github.com/suman-vernekar/Interior-Design-Gardening-Website-Collection',
    liveUrl: 'https://interior-garden-blog.vernekar.dev',
    folderName: 'Interior_Blog',
    featured: false,
    date: '2023 - 2024',
    architecture: 'Component-driven React SPA with modular CSS modules and lazy-loaded image galleries.',
    challenges: 'Optimizing high-resolution interior image rendering without layout shifts.',
    solutions: 'Used explicit aspect ratio placeholders and progressive WebP image loading.',
    futureImprovements: ['Add 3D room planner canvas simulator', 'User comment section with Firebase auth']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: 'Code',
    skills: [
      { name: 'JavaScript (ES6+)', level: 92, version: 'ES2023', experience: '3+ Years' },
      { name: 'Java (Basic)', level: 75, version: 'JDK 17', experience: '1.5 Years' },
      { name: 'HTML5', level: 95, version: 'W3C Standard', experience: '3+ Years' },
      { name: 'CSS3', level: 92, version: 'CSS Grid & Flexbox', experience: '3+ Years' }
    ]
  },
  {
    category: 'Frontend Development',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 90, version: 'v18 / v19', experience: '2+ Years' },
      { name: 'React Router', level: 88, version: 'v6.x', experience: '2+ Years' },
      { name: 'Context API & Hooks', level: 88, version: 'React State', experience: '2+ Years' },
      { name: 'Axios', level: 90, version: 'HTTP Client', experience: '2+ Years' },
      { name: 'Tailwind CSS', level: 88, version: 'v3 / v4', experience: '2+ Years' },
      { name: 'Responsive Web Design', level: 94, version: 'Flexbox / Grid', experience: '3+ Years' }
    ]
  },
  {
    category: 'Backend Development',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 88, version: 'v20.x LTS', experience: '2+ Years' },
      { name: 'Express.js', level: 88, version: 'v4.x', experience: '2+ Years' },
      { name: 'RESTful APIs', level: 90, version: 'OpenAPI Spec', experience: '2+ Years' },
      { name: 'CRUD Operations', level: 92, version: 'Data Pipeline', experience: '2+ Years' },
      { name: 'JWT Authentication', level: 86, version: 'Tokens & Session', experience: '1.5 Years' },
      { name: 'Cookies, CORS, Helmet', level: 85, version: 'Express Security', experience: '1.5 Years' },
      { name: 'Rate Limiting & Multer', level: 84, version: 'File Upload & Security', experience: '1.5 Years' },
      { name: 'MVC Architecture', level: 88, version: 'Design Pattern', experience: '2 Years' }
    ]
  },
  {
    category: 'Database & Security',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 86, version: 'v7.0 Community', experience: '2+ Years' },
      { name: 'Mongoose', level: 86, version: 'v8.x ODM', experience: '2+ Years' },
      { name: 'Schema Design & Validation', level: 85, version: 'Data Modeling', experience: '2 Years' },
      { name: 'Aggregation Framework', level: 82, version: 'Pipeline (Basic)', experience: '1.5 Years' },
      { name: 'Query Operators & Pagination', level: 88, version: 'Performance Indexing', experience: '2 Years' }
    ]
  },
  {
    category: 'Developer & AI Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 90, version: 'v2.4x', experience: '3 Years' },
      { name: 'VS Code & Cursor AI', level: 95, version: 'IDE', experience: '3 Years' },
      { name: 'Postman', level: 88, version: 'v10 API Testing', experience: '2 Years' },
      { name: 'Chrome DevTools & npm', level: 92, version: 'Web Tools', experience: '3 Years' },
      { name: 'ChatGPT, Copilot, Ollama', level: 92, version: 'AI Prompting', experience: '2 Years' },
      { name: 'Python, OpenCV, Tesseract OCR', level: 80, version: 'v4.x', experience: '1 Year' }
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-mern',
    title: 'Full-Stack MERN Development Masterclass',
    issuer: 'JSpiders Training & Development Center',
    date: '2026',
    credentialId: 'JSP-MERN-2026-9812',
    link: 'https://jspiders.com/verify/JSP-MERN-2026-9812',
    tag: 'Full-Stack'
  },
  {
    id: 'cert-dsa',
    title: 'Data Structures & Algorithms Proficiency',
    issuer: 'LeetCode / Hackerrank',
    date: '2025',
    credentialId: 'DSA-PROBLEM-SOLVER-500',
    link: 'https://leetcode.com/u/MgefjlC9PM/',
    tag: 'Algorithms'
  },
  {
    id: 'cert-python-ocr',
    title: 'Python Computer Vision & Tesseract OCR',
    issuer: 'AI & CV Academy',
    date: '2024',
    credentialId: 'CV-OCR-PY-2024-30',
    link: 'https://github.com/suman-vernekar/medical-ocr-summarizer',
    tag: 'AI / CV'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How I Reduced Medical Transcription Effort by 30% using Python & Tesseract OCR',
    date: 'July 15, 2026',
    readTime: '5 min read',
    summary: 'A deep dive into preprocessing handwritten medical documents using OpenCV image filtering and extracting structured data with Tesseract.',
    tags: ['Python', 'OpenCV', 'AI', 'OCR'],
    content: 'Building an automated medical transcription summarizer requires careful handling of image noise, contrast adjustment, and OCR thresholding...'
  },
  {
    id: 'post-2',
    title: 'Architecting Scalable REST APIs in Express.js with JWT & Rate Limiting',
    date: 'June 28, 2026',
    readTime: '6 min read',
    summary: 'Best practices for securing MERN stack backends using HTTP-only cookies, bcrypt password hashing, CORS, and Helmet middleware.',
    tags: ['Node.js', 'Express', 'JWT', 'Security'],
    content: 'Security is paramount when developing production-ready web services. In this guide, we explore MVC controller patterns and middleware chain validation...'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Data Structures & Algorithms',
    date: '2023 - Present',
    description: 'Solved and implemented problems covering Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Hashing, Sorting, Searching, Recursion, Two Pointers, Sliding Window, Binary Search, and Dynamic Programming (Basic).',
    tag: 'Algorithms'
  },
  {
    title: 'Full-Stack Development',
    date: '2024 - Present',
    description: 'Designed and developed multiple MERN Stack applications with RESTful APIs, JWT authentication, MongoDB integration, and responsive user interfaces.',
    tag: 'Full-Stack'
  },
  {
    title: 'Hackathons',
    date: '2024',
    description: 'Participated in 24-hour Buildathon and Prompt War Hackathons, collaborating with teams to develop innovative software solutions under strict deadlines.',
    tag: 'Hackathons'
  },
  {
    title: 'AI Application Development',
    date: '2024',
    description: 'Built an AI-powered Medical Handwritten Transcription Summarizer using Python, OpenCV, Tesseract OCR, and NLP techniques, reducing manual transcription effort by 30%.',
    tag: 'AI & OCR',
    metric: '30% Effort Reduction'
  }
];

export const EXPERIENCE_ITEMS = [
  {
    role: 'Student Developer',
    organization: 'Academic & Personal Projects',
    location: 'Remote / College',
    period: 'Dec 2022 – Present',
    details: [
      'Designed and developed full-stack web applications using the MERN Stack, implementing responsive user interfaces, RESTful APIs, and MongoDB database integration.',
      'Built secure backend services with JWT authentication, bcrypt password hashing, middleware, CRUD operations, cookies, CORS, and MVC architecture.',
      'Developed an AI-powered Medical Handwritten Transcription Summarizer using Python, OpenCV, Tesseract OCR, and NLP techniques, reducing manual transcription effort by 30%.',
      'Integrated third-party REST APIs to build dynamic web applications, including real-time weather forecasting and AI-based crop recommendation features.',
      'Collaborated in 24-hour Buildathon and Prompt War hackathons, delivering innovative software solutions under strict deadlines while strengthening teamwork and problem-solving skills.'
    ]
  }
];

export const EDUCATION_ITEMS = [
  {
    degree: 'Bachelor of Engineering (Computer Science and Engineering)',
    institution: 'Government Engineering College, Mosalehosahalli, Hassan',
    period: '2022 – 2026',
    score: 'CGPA: 7.72'
  },
  {
    degree: 'Higher Secondary Education (PCMB)',
    institution: 'Arvind PU College, GG Palya Gate, Kunigal TQ, Tumakuru',
    period: '2020 – 2022',
    score: 'Percentage: 90.00%'
  }
];
