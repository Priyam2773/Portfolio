import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Send, Minus, RefreshCw, FileText, Sparkles } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';

// Helper to format custom markdown to HTML-like JSX/React nodes
function formatMessage(text) {
    if (!text) return "";
    const lines = text.split('\n');
    return lines.map((line, idx) => {
        let content = line;
        const isBullet = content.trim().startsWith('•') || content.trim().startsWith('-');
        if (isBullet) {
            content = content.replace(/^([•\-])\s*/, '');
        }

        const parts = [];
        let remaining = content;
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let match;
        let lastIndex = 0;

        while ((match = boldRegex.exec(remaining)) !== null) {
            if (match.index > lastIndex) {
                parts.push(remaining.substring(lastIndex, match.index));
            }
            parts.push(<strong key={match.index} className="font-semibold text-white">{match[1]}</strong>);
            lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < remaining.length) {
            parts.push(remaining.substring(lastIndex));
        }

        if (isBullet) {
            return (
                <li key={idx} className="ml-4 list-disc text-gray-300 text-xs leading-relaxed mb-1 font-sans">
                    {parts.length > 0 ? parts : content}
                </li>
            );
        }

        return (
            <p key={idx} className="text-gray-300 text-xs leading-relaxed mb-2 font-sans">
                {parts.length > 0 ? parts : content}
            </p>
        );
    });
}

// Q&A Knowledge Base
const KNOWLEDGE_BASE = [
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
        answer: "### MediAura – AI Medical Chatbot\n\n- **Purpose**: Acts as an AI-powered conversational medical triage agent.\n- **Features**: Interactive symptom checking, LangChain-orchestrated LLM prompts, secure JWT-based auth routes, and session-persistent MongoDB chat history.\n- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, LangChain, LLM APIs\n- **GitHub**: [MediAura Repository](https://github.com/Priyam2773/MediAura-Chatbot)\n- **Live Demo**: Available on the repository page!"
    },
    {
        keywords: [/diabetes/i, /prediction/i, /pima/i],
        answer: "### Diabetes Prediction System\n\n- **Purpose**: Assesses diabetes risk using patient health telemetry signals.\n- **Features**: Achieved **75.32% accuracy** on the PIMA Indians dataset. Includes Streamlit telemetry sliders and charts, data scaling pipelines, and algorithm comparisons.\n- **Tech Stack**: Python, Scikit-learn, Pandas, NumPy, Streamlit\n- **GitHub**: [Diabetes Prediction Repository](https://github.com/Priyam2773/Diabetes-Prediction-System-)"
    },
    {
        keywords: [/weather/i, /forecast/i],
        answer: "### Weather App\n\n- **Purpose**: Displays real-time outdoor forecasts, temperature, and humidity metrics.\n- **Features**: Integrates open weather API nodes, features glassmorphic visual weather cards (changes styling conditionally based on Sunny/Blizzard conditions).\n- **Tech Stack**: React.js, JavaScript, HTML, CSS, OpenWeather API\n- **GitHub**: [Weather App Repository](https://github.com/Priyam2773/Weather-App)"
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

// React-friendly Error Boundary
class CanvasErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn("WebGL Canvas failed, drawing 3D features: fallback triggered.", error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// 3D GLB Robot Assistant model using official 3D assets
function RobotModel({ robotState, mousePos }) {
    const groupRef = useRef();
    const headBoneRef = useRef();

    // Load Robot model from public folder
    const { scene, animations } = useGLTF('/robot.glb');
    const { actions } = useAnimations(animations, groupRef);

    // Initial load setup for materials & targeting head bone
    useEffect(() => {
        if (!scene) return;

        // Clone scene so it does not conflict with multiple mounts
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // High-end shiny futuristic metallic white body material
                if (child.material) {
                    child.material.metalness = 0.85;
                    child.material.roughness = 0.15;
                    child.material.color.set('#f8fafc');
                }

                // Eyes and face screen glow customization
                const nameLower = child.name.toLowerCase();
                if (nameLower.includes('eye') || nameLower.includes('light') || nameLower.includes('face') || nameLower.includes('head_2')) {
                    child.material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color("#38bdf8")
                    });
                }
            }

            // Capture Head bone for interactive mouse cursor tracking
            if (child.isBone && child.name.toLowerCase() === 'head') {
                headBoneRef.current = child;
            }
        });
    }, [scene]);

    // Handle animation clip transitions based on robotState
    useEffect(() => {
        if (!actions) return;

        let activeClip = 'Idle';
        if (robotState === 'wave') activeClip = 'Wave';
        else if (robotState === 'happy') activeClip = 'ThumbsUp';
        else if (robotState === 'talking' || robotState === 'thinking') activeClip = 'Standing';

        const action = actions[activeClip];
        if (action) {
            action.reset().fadeIn(0.25).play();
            return () => {
                action.fadeOut(0.25);
            };
        }
    }, [robotState, actions]);

    // Animation frame loops
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // 1. Hover/Floating effect
        if (groupRef.current) {
            groupRef.current.position.y = -1.0 + Math.sin(time * 1.5) * 0.08;
        }

        // 2. Cursor head tracking
        if (headBoneRef.current) {
            headBoneRef.current.rotation.y = THREE.MathUtils.lerp(headBoneRef.current.rotation.y, mousePos.x * 0.6, 0.08);
            headBoneRef.current.rotation.x = THREE.MathUtils.lerp(headBoneRef.current.rotation.x, -mousePos.y * 0.4, 0.08);
        }

        // 3. Talking nodding movements
        if (robotState === 'talking' && headBoneRef.current) {
            headBoneRef.current.rotation.x += Math.sin(time * 14) * 0.06;
        }

        // 4. Thinking vibration details
        if (robotState === 'thinking' && headBoneRef.current) {
            headBoneRef.current.rotation.y += Math.sin(time * 8) * 0.02;
        }
    });

    return (
        <group ref={groupRef} scale={[0.34, 0.34, 0.34]} position={[0, -0.9, 0]}>
            <primitive object={scene} />
        </group>
    );
}

// 3D Particles
function RobotFloatingParticles() {
    const pointsRef = useRef();
    const count = 30;

    const positions = React.useMemo(() => {
        const arr = new Float32Array(count * 3);
        const l = count;
        for (let i = 0; i < l; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 2.5;
            arr[i * 3 + 1] = Math.random() * 2.5 - 1.25;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
        }
        return arr;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            const arr = pointsRef.current.geometry.attributes.position.array;
            const l = count;
            for (let i = 0; i < l; i++) {
                arr[i * 3 + 1] += 0.005;
                if (arr[i * 3 + 1] > 1.5) {
                    arr[i * 3 + 1] = -1.2;
                }
                arr[i * 3] += Math.sin(time + i) * 0.002;
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#38bdf8"
                size={0.05}
                transparent
                opacity={0.6}
            />
        </points>
    );
}

// High Quality animated 2D Vector robot fallback (renders if WebGL fails)
function RobotFallback2D({ robotState }) {
    const mouthHeight = robotState === 'talking' ? [2, 10, 2] : [2, 2];
    const hoverY = [0, -6, 0];
    const rightArmRotation = robotState === 'wave' ? [-40, -10, -40] : [0, 0];
    const chestGlow = robotState === 'thinking' ? ["#a855f7", "#38bdf8", "#a855f7"] : ["#38bdf8", "#38bdf8"];

    return (
        <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            className="select-none pointer-events-none"
            animate={{ y: hoverY }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <defs>
                <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
            </defs>

            <ellipse cx="60" cy="105" rx="30" ry="8" fill="url(#portalGlow)" />
            <motion.ellipse
                cx="60"
                cy="105"
                rx="25"
                ry="5"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1.5"
                animate={{ rx: [22, 28, 22], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <rect x="42" y="55" width="36" height="38" rx="10" fill="url(#bodyGrad)" stroke="#64748b" strokeWidth="1" />
            <rect x="46" y="59" width="28" height="30" rx="8" fill="#1e293b" />

            <motion.circle
                cx="60"
                cy="74"
                r="10"
                fill="none"
                stroke={chestGlow[0]}
                strokeWidth="1.5"
                animate={{
                    stroke: chestGlow,
                    scale: robotState === 'thinking' ? [1, 1.15, 1] : [1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <text x="60" y="77" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                PR
            </text>

            <rect x="54" y="47" width="12" height="10" rx="2" fill="#334155" />

            <rect x="38" y="16" width="44" height="34" rx="14" fill="url(#bodyGrad)" stroke="#64748b" strokeWidth="1" />
            <rect x="43" y="21" width="34" height="20" rx="6" fill="#090d16" />

            <motion.circle
                cx="52"
                cy="29"
                r="3.5"
                fill="#38bdf8"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
                cx="68"
                cy="29"
                r="3.5"
                fill="#38bdf8"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            />

            <motion.rect
                x="54"
                y="35"
                width="12"
                height="2"
                rx="1"
                fill="#38bdf8"
                animate={{ height: mouthHeight }}
                transition={{ duration: 0.15, repeat: robotState === 'talking' ? Infinity : 0 }}
            />

            <rect x="34" y="58" width="6" height="24" rx="3" fill="url(#bodyGrad)" stroke="#64748b" strokeWidth="0.5" />

            <motion.g
                transform="translate(80, 58)"
                animate={{ rotate: rightArmRotation }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <rect x="0" y="0" width="6" height="24" rx="3" fill="url(#bodyGrad)" stroke="#64748b" strokeWidth="0.5" />
            </motion.g>

            <circle cx="36" cy="33" r="2.5" fill="#a855f7" />
            <circle cx="84" cy="33" r="2.5" fill="#a855f7" />
        </motion.svg>
    );
}

export default function PortfolioAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: "👋 Hello! I'm Priyam's AI Assistant.\n\nI'm here to answer questions about Priyam's education, skills, projects, achievements, certifications, resume, coding profiles, and contact information.\n\nAsk me anything!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [robotState, setRobotState] = useState('idle'); // idle, wave, talking, thinking, happy
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initial greeting slide-in wave animation
    useEffect(() => {
        setRobotState('wave');
        const timer1 = setTimeout(() => {
            setRobotState('idle');
        }, 2250);
        return () => clearTimeout(timer1);
    }, []);

    // Track mouse coordinates
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setRobotState('wave');
            const timer = setTimeout(() => {
                setRobotState('idle');
                inputRef.current?.focus();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSendMessage = (textToSend) => {
        const query = textToSend.trim();
        if (!query) return;

        const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { sender: 'user', text: query, timestamp: userTime }]);
        setInputValue('');

        setRobotState('thinking');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setRobotState('talking');

            let foundAnswer = "";
            for (const item of KNOWLEDGE_BASE) {
                if (item.keywords.some(regex => regex.test(query))) {
                    foundAnswer = item.answer;
                    break;
                }
            }

            if (!foundAnswer) {
                foundAnswer = "I don't have that information yet. Please contact Priyam directly for more details.";
            }

            const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prev => [...prev, { sender: 'ai', text: foundAnswer, timestamp: aiTime }]);

            setTimeout(() => {
                setRobotState('happy');
                setTimeout(() => {
                    setRobotState('idle');
                }, 1500);
            }, 1200);

        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputValue);
        }
    };

    const handleSuggestionClick = (question) => {
        if (question === 'Download Resume') {
            handleSendMessage("Can I download the resume?");
        } else {
            handleSendMessage(question);
        }
    };

    const clearChat = () => {
        setMessages([
            {
                sender: 'ai',
                text: "👋 Hello! I'm Priyam's AI Assistant.\n\nI'm here to answer questions about Priyam's education, skills, projects, achievements, certifications, resume, coding profiles, and contact information.\n\nAsk me anything!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
        setRobotState('happy');
        setTimeout(() => setRobotState('idle'), 1000);
    };

    const suggestions = [
        "Tell me about Priyam",
        "Show Skills",
        "Projects",
        "Explain QuickDine",
        "Explain MediAura",
        "Certifications",
        "Download Resume",
        "Contact Me"
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end pointer-events-none gap-4">

            {/* 1. Chat Window Panel (Appears beside the standing robot) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 30 }}
                        className="glass-panel pointer-events-auto w-[85vw] sm:w-[350px] h-[450px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/95 backdrop-blur-lg mb-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <div>
                                    <h4 className="text-xs font-bold text-white tracking-wide">3D Robot Assistant</h4>
                                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">
                                        JARVIS Core v1.2
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearChat}
                                    title="Clear Chat"
                                    className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                >
                                    <RefreshCw size={13} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Minus size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Messages panel */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                            {messages.map((msg, index) => {
                                const isAi = msg.sender === 'ai';
                                return (
                                    <div key={index} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-xs ${isAi
                                                    ? 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                                                    : 'bg-gradient-accent text-white font-medium rounded-tr-none shadow-md shadow-blue-500/10'
                                                }`}>
                                                {msg.text === 'RESUME_PROMPT' ? (
                                                    <div className="space-y-3 font-sans">
                                                        <p className="text-gray-350">Sure! Click the button below to download my latest resume:</p>
                                                        <a
                                                            href={DEVELOPER_INFO.resumeUrl}
                                                            download="PriyamRai_CSE(AIML).pdf"
                                                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 cursor-pointer shadow-sm"
                                                        >
                                                            <FileText size={15} />
                                                            Download Resume
                                                        </a>
                                                    </div>
                                                ) : msg.text === 'CONTACT_PROMPT' ? (
                                                    <div className="space-y-2.5 font-sans text-xs">
                                                        <p className="text-gray-350">You can contact Priyam through these active channels:</p>
                                                        <div className="space-y-1.5 font-medium">
                                                            <a href="mailto:priyamrai282@gmail.com" className="flex items-center gap-2 text-blue-400 hover:underline">
                                                                ✉ priyamrai282@gmail.com
                                                            </a>
                                                            <div className="text-gray-400">
                                                                📞 +91 9369816003
                                                            </div>
                                                            <a href="https://www.linkedin.com/in/priyam-rai-613470308/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 hover:underline">
                                                                🔗 LinkedIn Profile
                                                            </a>
                                                            <a href="https://github.com/Priyam2773" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-purple-400 hover:underline">
                                                                💻 GitHub Profile
                                                            </a>
                                                            <a href="https://leetcode.com/u/Priyamrai/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-orange-400 hover:underline">
                                                                📊 LeetCode stats
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    formatMessage(msg.text)
                                                )}
                                            </div>
                                            <span className="text-[9px] text-gray-500 font-mono mt-1 px-1">
                                                {msg.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 font-sans">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Suggestion Chips */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-white/5 bg-slate-950/20 scrollbar-none whitespace-nowrap">
                            {suggestions.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(item)}
                                    className="px-2.5 py-1 bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-gray-300 hover:text-blue-400 rounded-full text-[10px] font-semibold transition-all duration-300 cursor-pointer"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div className="p-3 border-t border-white/5 bg-slate-950/40 flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about Priyam..."
                                className="flex-grow bg-white/5 border border-white/10 focus:border-blue-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all duration-300 w-full"
                            />
                            <button
                                onClick={() => handleSendMessage(inputValue)}
                                className="p-2 ml-1 rounded-xl bg-gradient-accent text-white flex items-center justify-center cursor-pointer shadow-md hover:shadow-blue-500/15 transition-all"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Standing 3D Robot Assistant (Always visible, standing next to the chat panel) */}
            <div className="pointer-events-auto flex flex-col items-center relative">

                {/* Speech balloon / Tooltip */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-slate-950/90 text-white border border-white/10 rounded-2xl px-4 py-2 text-[10px] font-semibold mb-2 shadow-2xl backdrop-blur-md max-w-[200px] text-center border-glow select-none z-10"
                        >
                            <Sparkles size={11} className="inline-block text-purple-400 mr-1.5 animate-spin" />
                            Guide open! Ask me anything.
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Robotic Canvas Frame - Sized precisely according to guidelines */}
                {/* Desktop: 280–350px tall | Tablet: 220px tall | Mobile: 160–180px tall */}
                <div className="w-[130px] h-[170px] sm:w-[170px] sm:h-[220px] lg:w-[240px] lg:h-[320px] relative group select-none">

                    {/* Transparent Click Overlay covering the Robot, toggles chat window */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute inset-0 z-30 cursor-pointer pointer-events-auto rounded-3xl"
                        title="Click to chat with AI Guide"
                    />

                    {/* Futuristic holographic emitter light under the Canvas */}
                    <div className="absolute inset-x-4 bottom-1 h-3 bg-blue-500/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <CanvasErrorBoundary fallback={<RobotFallback2D robotState={robotState} />}>
                        <Suspense fallback={<RobotFallback2D robotState={robotState} />}>
                            <Canvas
                                camera={{ position: [0, 0.1, 1.8], fov: 60 }}
                                gl={{ antialias: true, alpha: true }}
                                className="w-full h-full"
                                style={{ pointerEvents: 'none' }}
                                shadows
                            >
                                <ambientLight intensity={1.2} />
                                <directionalLight
                                    position={[2, 4, 3]}
                                    intensity={2.0}
                                    castShadow
                                    shadow-mapSize={[1024, 1024]}
                                />
                                <pointLight position={[-2, -1, 1]} intensity={0.9} color="#a855f7" />
                                <pointLight position={[2, 1, 1]} intensity={1.2} color="#38bdf8" />

                                {/* Base futuristic rotating holographic pad */}
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
                                    <ringGeometry args={[0.7, 0.8, 32]} />
                                    <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.7} />
                                </mesh>
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.04, 0]}>
                                    <circleGeometry args={[0.7, 32]} />
                                    <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.15} wireframe />
                                </mesh>

                                <RobotModel robotState={robotState} mousePos={mousePos} />
                                <RobotFloatingParticles />
                            </Canvas>
                        </Suspense>
                    </CanvasErrorBoundary>
                </div>
            </div>

        </div>
    );
}

// Preload the GLB assets aggressively
useGLTF.preload('/robot.glb');
