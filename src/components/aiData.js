// Suggestion Chips list
export const SUGGESTIONS = [
    "Tell me about Priyam",
    "Show Skills",
    "Projects",
    "Explain QuickDine",
    "Explain MediAura",
    "Certifications",
    "Download Resume",
    "Contact Me"
];

// Q&A Knowledge Base for portfolio responses
export const KNOWLEDGE_BASE = [
    {
        keywords: [/hi/i, /hello/i, /hey/i, /greetings/i],
        answer: "Hello! I'm Priyam Rai's AI Assistant. How can I help you today? Feel free to ask about his skills, projects, certifications, or how to contact him!"
    },
    {
        keywords: [/who are you/i, /what is your name/i],
        answer: "I'm Priyam Rai's AI Portfolio Assistant. I can tell you everything about Priyam's education, skills, projects, achievements, certifications, and career."
    },
    {
        keywords: [/who is/i, /tell me about/i, /priyam/i, /background/i, /about/i],
        answer: "Priyam Rai is an AI & Full Stack Developer and a Computer Science Engineering student specializing in **Artificial Intelligence and Machine Learning** at **Vellore Institute of Technology (VIT), Bhopal**. \n\nHe has a CGPA of **8.63/10.0** and has hands-on experience building full-stack web applications and machine learning classification systems."
    },
    {
        keywords: [/education/i, /academic/i, /school/i, /college/i, /university/i],
        answer: "Here is Priyam's education history:\n\n- **B.Tech in Computer Science Engineering (AI & ML)**\n  Vellore Institute of Technology (VIT), Bhopal (2023 - 2027)\n  CGPA: **8.63/10.0**\n- **Senior Secondary (12th)**\n  Prasad International School, Jaunpur (Passed 2022)\n  Percentage: **69%**\n- **Secondary School (10th)**\n  Prasad International School, Jaunpur (Passed 2020)\n  Percentage: **72.6%**"
    },
    {
        keywords: [/skills/i, /tech stack/i, /languages/i, /technologies/i, /frameworks/i],
        answer: "Priyam is skilled in the following areas:\n\n- **Languages**: Python, Java, C++, JavaScript, SQL\n- **Web Tech**: React.js, HTML5, CSS3, Node.js, Express.js, Bootstrap\n- **Machine Learning**: Scikit-learn, Pandas, NumPy, Preprocessing, Feature Engineering, Model Evaluation\n- **Databases & Core**: MongoDB, SQL, DBMS, DSA (200+ solved on LeetCode), OOP, Operating Systems, Computer Networks\n- **Tools**: Git, GitHub, VS Code, Postman, MATLAB, Vite, AWS Fundamentals"
    },
    {
        keywords: [/react/i, /node/i, /express/i, /mongodb/i, /mern/i, /full stack/i],
        answer: "Priyam has experience building MERN stack applications. He works with **React.js** for the frontend, **Node.js** & **Express.js** for RESTful API backend routers, and **MongoDB** for database collection schemas. His full-stack projects include **QuickDine** and **MediAura**."
    },
    {
        keywords: [/machine learning/i, /ml/i, /python/i, /scikit/i, /pandas/i],
        answer: "Priyam is specializing in ML (AI/ML track at VIT Bhopal). He utilizes **Python**, **Scikit-learn**, **Pandas**, and **NumPy** for data preprocessing, feature scaling, model training, evaluation, and Streamlit-based web deployments. His main ML project is the **Diabetes Prediction System**."
    },
    {
        keywords: [/quickdine/i, /booking/i, /restaurant/i],
        answer: "### QuickDine – Restaurant Table Booking System\n\n- **Purpose**: Allows users to find restaurants, reserve tables, and manage seating availability cycles.\n- **Features**: Role-based access control for client and restaurant hosts, JWT cookie security, dynamic slot allocation filters, and RESTful API endpoints.\n- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS\n- **GitHub**: [QuickDine Repository](https://github.com/Priyam2773/QuickDine)"
    },
    {
        keywords: [/mediaura/i, /chatbot/i, /medical/i, /healthcare/i, /ai project/i],
        answer: "### MediAura – AI Medical Chatbot\n\n- **Purpose**: Allows patients/users to chat with an AI triage assistant.\n- **Features**: Symptom checking advice, LangChain prompt routing, React context chat logs, and session-persistent MongoDB storage.\n- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, LangChain, LLM APIs\n- **GitHub**: [MediAura Repository](https://github.com/Priyam2773/MediAura-Chatbot)"
    },
    {
        keywords: [/diabetes/i, /prediction/i, /pima/i],
        answer: "### Diabetes Prediction System\n\n- **Purpose**: Medical assistant evaluating diabetes risk from health diagnostic signals.\n- **Features**: High clinical-grade accuracy (75.32%) on PIMA Indians dataset, interactive Streamlit telemetry inputs, data scaling models, and comparative report dashboards.\n- **Tech Stack**: Python, Scikit-learn, Pandas, NumPy, Streamlit\n- **GitHub**: [Diabetes Prediction Repository](https://github.com/Priyam2773/Diabetes-Prediction-System-)"
    },
    {
        keywords: [/weather/i, /forecast/i],
        answer: "### Weather App\n\n- **Purpose**: Displays meteorological data and forecasts.\n- **Features**: Integrates open weather API, fluid glassmorphic weather cards modifying UI layout conditionally (Sunny, Snowy, Stormy).\n- **Tech Stack**: React.js, JavaScript, HTML, CSS, OpenWeather API\n- **GitHub**: [Weather App Repository](https://github.com/Priyam2773/Weather-App)"
    },
    {
        keywords: [/projects/i, /what has he built/i, /portfolio items/i],
        answer: "Priyam has built several key software applications:\n\n- **QuickDine**: Restaurant Table Booking System (MERN Stack, JWT, Tailwind)\n- **MediAura**: AI Healthcare Chatbot (React, Node, MongoDB, LangChain, LLM)\n- **Diabetes Prediction**: Diagnostic ML Interface (Python, Scikit-learn, Streamlit)\n- **Weather App**: Meteorology Dashboard (React, OpenWeather API, HSL gradients)\n\nAsk me about any specific project (e.g. 'Tell me about MediAura') to explore its tech details!"
    },
    {
        keywords: [/achievements/i, /milestones/i, /leetcode/i, /solved/i],
        answer: "Here are some of Priyam's key career milestones:\n\n- **Solved 200+ DSA Problems** on LeetCode utilizing Java and C++.\n- Developed AI-powered and full-stack applications using MERN and machine learning.\n- Constructed secure RESTful APIs with JWT cookie state variables and MongoDB indexes.\n- Completed 5 professional certifications in Machine Learning, IoT, and Cloud Computing."
    },
    {
        keywords: [/certifications/i, /certified/i, /courses/i],
        answer: "Priyam holds these professional certifications:\n\n- **Applied Machine Learning in Python** – University of Michigan\n- **Machine Learning with Python** – IBM\n- **Cloud Computing** – NPTEL IIT Kharagpur\n- **Internet of Things (IoT)** – NPTEL IIT Kharagpur\n- **MATLAB Onramp** – Mathworks"
    },
    {
        keywords: [/download/i, /resume/i, /pdf/i, /cv/i],
        answer: "RESUME_PROMPT"
    },
    {
        keywords: [/contact/i, /email/i, /phone/i, /number/i, /reach/i, /hire/i, /social/i, /linkedin/i, /github/i, /leetcode/i],
        answer: "CONTACT_PROMPT"
    }
];
