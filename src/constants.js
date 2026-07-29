export const DEVELOPER_INFO = {
    name: "Priyam Rai",
    title: "AI & Full Stack Developer",
    subtitle: "Computer Science Engineering Student",
    bio: "Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, with practical experience in full-stack web development and hands-on machine learning projects. Proficient in Python, Java, C++, React.js, SQL, RESTful APIs, and the MERN stack. Passionate about building scalable software solutions and AI-powered applications to solve real-world challenges.",
    email: "priyamrai282@gmail.com",
    github: "https://github.com/Priyam2773",
    linkedin: "https://www.linkedin.com/in/priyam-rai-613470308/",
    twitter: "https://twitter.com",
    resumeUrl: "/PriyamRai_CSE(AIML).pdf"
};

export const SKILL_CATEGORIES = [
    {
        name: "Programming Languages",
        skills: [
            { name: "Python", level: 90 },
            { name: "Java", level: 85 },
            { name: "C++", level: 88 },
            { name: "JavaScript", level: 85 },
            { name: "SQL", level: 80 }
        ]
    },
    {
        name: "Web Technologies",
        skills: [
            { name: "React.js", level: 90 },
            { name: "HTML5", level: 95 },
            { name: "CSS3", level: 90 },
            { name: "Bootstrap", level: 80 },
            { name: "Node.js", level: 85 },
            { name: "Express.js", level: 82 }
        ]
    },
    {
        name: "Machine Learning",
        skills: [
            { name: "Scikit-learn", level: 85 },
            { name: "Pandas", level: 90 },
            { name: "NumPy", level: 88 },
            { name: "Data Preprocessing", level: 85 },
            { name: "Model Evaluation", level: 80 }
        ]
    },
    {
        name: "Databases & Core",
        skills: [
            { name: "MongoDB", level: 85 },
            { name: "SQL", level: 80 },
            { name: "DBMS", level: 82 },
            { name: "Data Structures & Algos", level: 90 },
            { name: "Object-Oriented Programming", level: 88 }
        ]
    },
    {
        name: "Developer Tools & Cloud",
        skills: [
            { name: "Git", level: 88 },
            { name: "GitHub", level: 90 },
            { name: "VS Code", level: 95 },
            { name: "Postman", level: 85 },
            { name: "MATLAB", level: 80 },
            { name: "AWS Fundamentals", level: 75 }
        ]
    }
];

export const PROJECTS = [
    {
        id: 1,
        title: "QuickDine – Restaurant Table Booking System",
        category: "Full-Stack",
        description: "A full-stack MERN application that allows users to discover restaurants, reserve tables online, manage bookings, and securely authenticate using JWT. Includes role-based access for users and restaurant owners, responsive UI, and RESTful APIs.",
        fullDescription: "QuickDine is a MERN-stack application built for real-time table reservations. It features role-based authentication (JWT) for users and restaurant managers, interactive dynamic slot selectors, responsive booking forms, and a robust RESTful API layer managing restaurant metadata, booking confirmations, and conflict resolution.",
        imageType: "quickdine",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
        liveUrl: "",
        githubUrl: "https://github.com/Priyam2773/QuickDine",
        highlights: [
            "Implemented role-based dashboard for clients and restaurant hosts.",
            "Designed a dynamic booking engine to manage real-time seating inventory.",
            "Integrated secure JSON Web Token authentication with cookie parsing.",
            "Crafted a mobile-responsive interface styled with Tailwind and Framer Motion."
        ]
    },
    {
        id: 2,
        title: "MediAura – AI Medical Chatbot",
        category: "MERN & AI",
        description: "An AI-powered healthcare chatbot built using the MERN stack and LangChain. It provides intelligent medical assistance, secure authentication, chat history, and responsive user experience with RESTful APIs.",
        fullDescription: "MediAura is a clinical chatbot interface designed built on top of LLM platforms and LangChain. It features modular custom agent reasoning that analyzes described user symptoms to issue first-aid diagnostics. Includes secured JWT cookie auth, user session controls, and persistent MongoDB chat memory storage.",
        imageType: "mediaura",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "LangChain", "LLM"],
        liveUrl: "https://github.com/Priyam2773/MediAura-Chatbot",
        githubUrl: "https://github.com/Priyam2773/MediAura-Chatbot",
        highlights: [
            "Engineered an AI-powered healthcare chatbot using MERN and LangChain.",
            "Integrated JWT authentication and role-based authorization for secure sessions.",
            "Designed more than ten RESTful API endpoints supporting consultations and profiles.",
            "Optimized front-end responsiveness with custom React state hooks."
        ]
    },
    {
        id: 3,
        title: "Diabetes Prediction System",
        category: "Machine Learning",
        description: "A machine learning web application that predicts diabetes risk using health parameters. Built with Scikit-learn and deployed with Streamlit, featuring data preprocessing, model evaluation, and an interactive interface.",
        fullDescription: "An interactive ML diagnostic widget evaluating standard health markers (glucose levels, BMI, insulin, age). Uses classification algorithms trained with Scikit-learn on the PIMA Indians dataset and wraps the model checkpoint in a clean Streamlit interface with diagnostic telemetry charts.",
        imageType: "diabetes",
        tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
        liveUrl: "https://github.com/Priyam2773/Diabetes-Prediction-System-",
        githubUrl: "https://github.com/Priyam2773/Diabetes-Prediction-System-",
        highlights: [
            "Achieved 75.32% classification accuracy on the PIMA dataset.",
            "Performed data preprocessing, feature scaling, and feature engineering.",
            "Built and deployed an interactive Streamlit UI for user parameters check.",
            "Evaluated multiple ML algorithms to select the optimal model."
        ]
    },
    {
        id: 4,
        title: "Weather App",
        category: "API & UI",
        description: "A responsive weather application that displays real-time weather conditions, temperature, humidity, wind speed, and forecasts using a weather API. Designed with a clean, modern user interface.",
        fullDescription: "Weather App is a clean modern weather dashboard fetching meteorology conditions at custom location queries. Provides intuitive UI visual transitions changing corresponding weather cards (Sunny, Rainy, Blizzard) with sleek glassmorphism panels.",
        imageType: "weather",
        tags: ["React.js", "JavaScript", "HTML", "CSS", "Weather API"],
        liveUrl: "https://github.com/Priyam2773/Weather-App",
        githubUrl: "https://github.com/Priyam2773/Weather-App",
        highlights: [
            "Configured asynchronous lookup queries linking open weather REST nodes.",
            "Crafted beautiful CSS weather transition cards.",
            "Created smart autocomplete suggestions saving searched logs.",
            "Tested cross-device responsive grid designs."
        ]
    }
];

export const ACHIEVEMENTS = [
    {
        title: "Solved 200+ DSA Problems",
        organization: "LeetCode",
        description: "Solved 200+ Data Structures and Algorithms problems using C++ and Java.",
        date: "Ongoing"
    },
    {
        title: "Full-Stack AI Creator",
        organization: "MERN Stack",
        description: "Developed AI-powered and full-stack applications using MERN and machine learning.",
        date: "2026"
    },
    {
        title: "Security & API Specialist",
        organization: "API Platform",
        description: "Built secure RESTful APIs with JWT authentication and MongoDB integration.",
        date: "2025"
    },
    {
        title: "Certified ML & IoT Developer",
        organization: "NPTEL & IBM",
        description: "Completed certifications in Machine Learning, Cloud Computing, IoT, and MATLAB.",
        date: "2024"
    }
];

export const CERTIFICATIONS = [
    {
        name: "Applied Machine Learning in Python",
        issuer: "University of Michigan",
        issueDate: "2024",
        credentialId: "UOM-AML-4482",
        verifyUrl: "#"
    },
    {
        name: "Machine Learning with Python",
        issuer: "IBM",
        issueDate: "2024",
        credentialId: "IBM-ML-9912",
        verifyUrl: "#"
    },
    {
        name: "Cloud Computing",
        issuer: "NPTEL IIT Kharagpur",
        issueDate: "2024",
        credentialId: "NPTEL-CC-8092",
        verifyUrl: "#"
    },
    {
        name: "Internet of Things (IoT)",
        issuer: "NPTEL IIT Kharagpur",
        issueDate: "2023",
        credentialId: "NPTEL-IOT-7621",
        verifyUrl: "#"
    },
    {
        name: "MATLAB Onramp",
        issuer: "MathWorks",
        issueDate: "2023",
        credentialId: "MATH-ON-5541",
        verifyUrl: "#"
    }
];

export const SOCIAL_PROFILES = [
    {
        name: "GitHub",
        url: "https://github.com/Priyam2773",
        description: "Explore my source code repositories, open-source contributions, and engineering projects.",
        icon: "github",
        accent: "group-hover:shadow-[0_0_35px_rgba(255,255,255,0.08)] border-white/10 text-white"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyam-rai-613470308/",
        description: "Connect with me professionally, read my research articles, and view my milestones.",
        icon: "linkedin",
        accent: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] border-blue-500/20 text-blue-400"
    },
    {
        name: "LeetCode",
        url: "https://leetcode.com/u/Priyamrai/",
        description: "Check out my algorithmic achievements, programming problem solutions, and contest stats.",
        icon: "leetcode",
        accent: "group-hover:shadow-[0_0_35px_rgba(248,159,27,0.15)] border-orange-500/20 text-orange-400"
    }
];
