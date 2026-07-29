import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Send, Minus, RefreshCw, FileText, Sparkles, Terminal, Activity, ShieldAlert } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';
import { KNOWLEDGE_BASE, SUGGESTIONS } from './aiData';

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
            parts.push(<strong key={match.index} className="font-semibold text-cyan-400">{match[1]}</strong>);
            lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < remaining.length) {
            parts.push(remaining.substring(lastIndex));
        }

        if (isBullet) {
            return (
                <li key={idx} className="ml-4 list-disc text-gray-300 text-xs leading-relaxed mb-1 font-mono">
                    {parts.length > 0 ? parts : content}
                </li>
            );
        }

        return (
            <p key={idx} className="text-gray-300 text-xs leading-relaxed mb-2 font-mono">
                {parts.length > 0 ? parts : content}
            </p>
        );
    });
}

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

// 3D GLB Robot Assistant model with laser rings & emissive animations
function RobotModel({ robotState, mousePos }) {
    const groupRef = useRef();
    const headBoneRef = useRef();
    const eyeLRef = useRef();
    const eyeRRef = useRef();
    const eyeMaterialRef = useRef();

    // Load model from public folder
    const { scene, animations } = useGLTF('/robot.glb');
    const { actions } = useAnimations(animations, groupRef);

    // Initial load setup for materials & targeting head bone
    useEffect(() => {
        if (!scene) return;

        // Custom emissive shiny material for eyes and visor
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#00E5FF"), // Neon Cyan
            emissive: new THREE.Color("#00E5FF"),
            emissiveIntensity: 2.5,
            roughness: 0,
            metalness: 0
        });
        eyeMaterialRef.current = eyeMaterial;

        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                const nameLower = child.name.toLowerCase();

                // Paint Visor / Eyes glowing Neon Cyan
                if (nameLower.includes('eye') || nameLower.includes('light') || nameLower.includes('face') || nameLower.includes('glow')) {
                    child.material = eyeMaterial;
                    if (nameLower.includes('l')) {
                        eyeLRef.current = child;
                    } else {
                        eyeRRef.current = child;
                    }
                } else {
                    // Futuristic Metallic White Body Material with reflections
                    if (child.material) {
                        child.material.metalness = 0.92;
                        child.material.roughness = 0.08;
                        child.material.color.set('#ffffff');
                    }
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
            action.reset().fadeIn(0.2).play();
            return () => {
                action.fadeOut(0.2);
            };
        }
    }, [robotState, actions]);

    // Animation frame loops
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // 1. Float / Hover breathing effect
        if (groupRef.current) {
            groupRef.current.position.y = -0.9 + Math.sin(time * 1.5) * 0.08;
        }

        // 2. Cursor head tracking
        if (headBoneRef.current) {
            headBoneRef.current.rotation.y = THREE.MathUtils.lerp(headBoneRef.current.rotation.y, mousePos.x * 0.5, 0.08);
            headBoneRef.current.rotation.x = THREE.MathUtils.lerp(headBoneRef.current.rotation.x, -mousePos.y * 0.35, 0.08);
        }

        // 3. Blink animation every 4 seconds
        const isBlinking = Math.floor(time) % 4 === 0 && (time % 1) < 0.12;
        if (eyeLRef.current) {
            eyeLRef.current.scale.y = THREE.MathUtils.lerp(eyeLRef.current.scale.y, isBlinking ? 0.01 : 1.0, 0.3);
        }
        if (eyeRRef.current) {
            eyeRRef.current.scale.y = THREE.MathUtils.lerp(eyeRRef.current.scale.y, isBlinking ? 0.01 : 1.0, 0.3);
        }

        // 4. Increase eye glow + nodding when speaking
        if (eyeMaterialRef.current) {
            let targetIntensity = 2.5;
            if (robotState === 'talking') {
                targetIntensity = 3.5 + Math.sin(time * 22) * 1.5;
                if (headBoneRef.current) {
                    headBoneRef.current.rotation.x += Math.sin(time * 15) * 0.05;
                }
            } else if (robotState === 'thinking') {
                targetIntensity = 2.0 + Math.sin(time * 8) * 0.8;
                if (headBoneRef.current) {
                    headBoneRef.current.rotation.y += Math.sin(time * 10) * 0.03;
                }
            }
            eyeMaterialRef.current.emissiveIntensity = targetIntensity;
        }
    });

    return (
        <group ref={groupRef} scale={[0.34, 0.34, 0.34]} position={[0, -0.9, 0]}>
            <primitive object={scene} />
        </group>
    );
}

// 3D Laser Rotating Rings
function RotatingLaserRings({ robotState }) {
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const factor = robotState === 'thinking' ? 2.5 : 1.0;

        if (ring1Ref.current) {
            ring1Ref.current.rotation.y = time * 0.8 * factor;
            ring1Ref.current.rotation.z = time * 0.4;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = time * -0.6 * factor;
            ring2Ref.current.rotation.y = time * 0.5;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = time * -1.2 * factor;
        }
    });

    return (
        <group position={[0, 0.1, 0]}>
            {/* Chest ring (Cyan) */}
            <mesh ref={ring1Ref} position={[0, -0.15, 0]} rotation={[Math.PI / 6, 0, 0]}>
                <torusGeometry args={[0.55, 0.008, 16, 64]} />
                <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
            </mesh>

            {/* Torso rings (Purple & Electric Blue) */}
            <mesh ref={ring2Ref} position={[0, 0.2, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[0.42, 0.006, 8, 48]} />
                <meshBasicMaterial color="#8A2BE2" transparent opacity={0.8} />
            </mesh>
            <mesh ref={ring3Ref} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.68, 0.005, 12, 64]} />
                <meshBasicMaterial color="#2979FF" transparent opacity={0.7} />
            </mesh>
        </group>
    );
}

// Floating data stars & spark points
function FloatingCyberSparks() {
    const pointsRef = useRef();
    const count = 45;

    const positions = React.useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 2.2;
            arr[i * 3 + 1] = Math.random() * 2.5 - 1.25;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
        }
        return arr;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            const arr = pointsRef.current.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                arr[i * 3 + 1] += 0.006; // float up
                if (arr[i * 3 + 1] > 1.4) arr[i * 3 + 1] = -1.2;
                arr[i * 3] += Math.sin(time * 0.8 + i) * 0.003;
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
                color="#00E5FF"
                size={0.038}
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// 2D Fallback SVG AI Assistant
function RobotFallback2D({ robotState }) {
    const mouthHeight = robotState === 'talking' ? [2, 11, 2] : [2, 2];
    const hoverY = [0, -7, 0];
    const rightArmRotation = robotState === 'wave' ? [-45, -15, -45] : [0, 0];
    const borderGlow = robotState === 'thinking' ? ["#a855f7", "#38bdf8", "#a855f7"] : ["#38bdf8", "#38bdf8"];

    return (
        <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            className="select-none pointer-events-none"
            animate={{ y: hoverY }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            <defs>
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyMesh" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
            </defs>

            {/* Base platform */}
            <ellipse cx="60" cy="108" rx="32" ry="7" fill="url(#ringGlow)" />
            <motion.ellipse
                cx="60"
                cy="108"
                rx="27"
                ry="4"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
                animate={{ rx: [25, 29, 25], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
            />

            {/* Core Body */}
            <rect x="42" y="55" width="36" height="38" rx="10" fill="url(#bodyMesh)" stroke="#64748b" strokeWidth="1" />
            <rect x="45" y="58" width="30" height="32" rx="8" fill="#090d16" />

            {/* PR Initials LED display */}
            <motion.circle
                cx="60"
                cy="74"
                r="10"
                fill="none"
                stroke={borderGlow[0]}
                strokeWidth="1.5"
                animate={{
                    stroke: borderGlow,
                    scale: robotState === 'thinking' ? [1, 1.15, 1] : [1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <text x="60" y="77" fill="#00E5FF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                PR
            </text>

            <rect x="54" y="47" width="12" height="10" rx="2" fill="#334155" />

            {/* AI Sleek Face */}
            <rect x="38" y="16" width="44" height="34" rx="14" fill="url(#bodyMesh)" stroke="#64748b" strokeWidth="1" />
            <rect x="42" y="20" width="36" height="24" rx="8" fill="#030712" />

            {/* Glowing neon eyes */}
            <motion.circle
                cx="51"
                cy="30"
                r="3.5"
                fill="#00E5FF"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2.5 }}
            />
            <motion.circle
                cx="69"
                cy="30"
                r="3.5"
                fill="#00E5FF"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2.5 }}
            />

            {/* Glowing mouth line */}
            <motion.rect
                x="54"
                y="37"
                width="12"
                height="2"
                rx="1"
                fill="#00E5FF"
                animate={{ height: mouthHeight }}
                transition={{ duration: 0.15, repeat: robotState === 'talking' ? Infinity : 0 }}
            />

            <rect x="34" y="58" width="6" height="24" rx="3" fill="url(#bodyMesh)" stroke="#64748b" strokeWidth="0.5" />

            <motion.g
                transform="translate(80, 58)"
                animate={{ rotate: rightArmRotation }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <rect x="0" y="0" width="6" height="24" rx="3" fill="url(#bodyMesh)" stroke="#64748b" strokeWidth="0.5" />
            </motion.g>

            {/* Temples */}
            <circle cx="36" cy="33" r="2" fill="#8A2BE2" />
            <circle cx="84" cy="33" r="2" fill="#8A2BE2" />
        </motion.svg>
    );
}

export default function PortfolioAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: "⚙ SYSTEM BOOT // CONNECTED\n\n👋 Welcome, User. I am Priyam's AI Assistant chatbot.\n\nAsk me about credentials, projects, languages, education history, or resume downloads.",
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
        }, 2200);
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
            }, 800);
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
                foundAnswer = "QUERY REFUSED // Missing base node. Please check spelling or contact Priyam Rai to initiate link.";
            }

            const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prev => [...prev, { sender: 'ai', text: foundAnswer, timestamp: aiTime }]);

            setTimeout(() => {
                setRobotState('happy');
                setTimeout(() => {
                    setRobotState('idle');
                }, 1600);
            }, 1200);

        }, 1300);
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
                text: "⚙ SYSTEM BOOT // CONNECTED\n\n👋 Welcome, User. I am Priyam's AI Assistant chatbot.\n\nAsk me about credentials, projects, languages, education history, or resume downloads.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
        setRobotState('happy');
        setTimeout(() => setRobotState('idle'), 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end pointer-events-none gap-5">

            {/* 1. Chat Window Panel (Appears beside the standing robot) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: 40 }}
                        className="pointer-events-auto w-[85vw] sm:w-[350px] h-[480px] flex flex-col rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,229,255,0.15)] border border-cyan-500/20 bg-[#050816]/95 backdrop-blur-xl mb-4 relative"
                    >
                        {/* CRT Scanline Glitch Style HUD Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,229,255,0.04)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-70" />

                        {/* Matrix Code/Digital Grid Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(41,121,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-80" />

                        {/* Top HUD Frame Details */}
                        <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/10 bg-slate-950/60 z-20">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute inset-0" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative" />
                                </div>
                                <div className="font-mono">
                                    <h4 className="text-[11px] font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                                        <Terminal size={12} className="text-cyan-400" />
                                        JARVIS_LINK
                                    </h4>
                                    <span className="text-[8px] text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Activity size={8} className="animate-pulse" />
                                        Cognitive Core v1.4 // OK
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 z-30">
                                <button
                                    onClick={clearChat}
                                    title="System Purge"
                                    className="p-1.5 text-cyan-400 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer border border-cyan-500/10 bg-[#050816]"
                                >
                                    <RefreshCw size={12} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    title="Terminate link"
                                    className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all cursor-pointer border border-purple-500/10 bg-[#050816]"
                                >
                                    <Minus size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Messages panel */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/10 scrollbar-track-transparent z-20">
                            {messages.map((msg, index) => {
                                const isAi = msg.sender === 'ai';
                                return (
                                    <div key={index} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-[11px] border ${isAi
                                                ? 'bg-slate-900/60 border-cyan-500/10 text-gray-300 rounded-tl-none font-mono shadow-[0_0_12px_rgba(0,229,255,0.02)]'
                                                : 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-400/30 text-cyan-100 font-semibold rounded-tr-none shadow-[0_0_15px_rgba(0,229,255,0.08)] font-mono'
                                                }`}>
                                                {msg.text === 'RESUME_PROMPT' ? (
                                                    <div className="space-y-3 font-mono">
                                                        <p className="text-gray-400 text-xs">INITIATING DATA TRANSFER // PriyamRai_Resume.pdf Ready</p>
                                                        <a
                                                            href={DEVELOPER_INFO.resumeUrl}
                                                            download="PriyamRai_CSE(AIML).pdf"
                                                            className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-bold transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                                                        >
                                                            <FileText size={15} />
                                                            PROCEED DOWNLOAD
                                                        </a>
                                                    </div>
                                                ) : msg.text === 'CONTACT_PROMPT' ? (
                                                    <div className="space-y-2.5 font-mono text-[10px]">
                                                        <p className="text-gray-400 text-[11px]">ACTIVE COMMUNICATION CHANNELS STABLE:</p>
                                                        <div className="space-y-2 font-bold select-text">
                                                            <a href="mailto:priyamrai282@gmail.com" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                                                                ✉ priyamrai282@gmail.com
                                                            </a>
                                                            <div className="text-blue-300">
                                                                📞 +91 9369816003
                                                            </div>
                                                            <a href="https://www.linkedin.com/in/priyam-rai-613470308/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                                                                🔗 LinkedIn Reference
                                                            </a>
                                                            <a href="https://github.com/Priyam2773" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors">
                                                                💻 GitHub Hub
                                                            </a>
                                                            <a href="https://leetcode.com/u/Priyamrai/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-yellow-500 hover:text-yellow-300 transition-colors">
                                                                📊 LeetCode Profiler
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    formatMessage(msg.text)
                                                )}
                                            </div>
                                            <span className="text-[8px] text-cyan-500/50 font-mono mt-1 px-1">
                                                TIMESTAMP: {msg.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-900/60 border border-cyan-500/10 text-cyan-400 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-2 font-mono text-xs">
                                        <Sparkles size={11} className="animate-spin text-cyan-400" />
                                        LINK ACTIVE // RESOLVING QUERY...
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Suggestion Chips */}
                        <div className="px-4 py-2.5 flex gap-2 overflow-x-auto border-t border-cyan-500/10 bg-slate-950/40 scrollbar-none whitespace-nowrap z-20">
                            {SUGGESTIONS.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(item)}
                                    className="px-3 py-1 bg-cyan-950/20 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 hover:text-white rounded-md text-[9px] font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-inner"
                                >
                                    [{item}]
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div className="p-3 border-t border-cyan-500/10 bg-[#050816] flex items-center gap-2 z-20">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="ENTER SECURE COMMAND..."
                                className="flex-grow bg-slate-950 border border-cyan-500/20 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs font-mono text-cyan-100 placeholder-cyan-700 outline-none transition-all duration-300 w-full focus:shadow-[0_0_12px_rgba(0,229,255,0.1)]"
                            />
                            <button
                                onClick={() => handleSendMessage(inputValue)}
                                className="p-2 ml-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all border border-cyan-400/20"
                            >
                                <Send size={13} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Standing 3D Robot Assistant (Always visible, standing in a sci-fi Hologram Chamber) */}
            <div className="pointer-events-auto flex flex-col items-center relative z-20">

                {/* Speech balloon / Tooltip */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-slate-950/95 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-[9px] font-bold font-mono tracking-widest text-cyan-400 mb-3 shadow-[0_0_15px_rgba(0,229,255,0.15)] backdrop-blur-md max-w-[190px] text-center select-none uppercase"
                        >
                            <Sparkles size={10} className="inline-block text-purple-400 mr-1.5 animate-spin" />
                            [ AI Emitter Active ]
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cyberpunk Hologram Chamber Frame */}
                {/* Desktop: 280–350px tall | Tablet: 220px tall | Mobile: 160–180px tall */}
                <div className="w-[130px] h-[178px] sm:w-[170px] sm:h-[220px] lg:w-[240px] lg:h-[340px] relative group select-none rounded-3xl overflow-hidden border border-cyan-500/10 shadow-[0_0_20px_rgba(0,E5,FF,0.05)] bg-[#050816]">

                    {/* Sci-fi HUD crosshair details on corners */}
                    <div className="absolute top-2 left-2 text-cyan-500/40 font-mono text-[7px] pointer-events-none">LNK.01</div>
                    <div className="absolute top-2 right-2 text-purple-500/40 font-mono text-[7px] pointer-events-none">SYS.ACVT</div>
                    <div className="absolute bottom-2 left-2 text-cyan-500/20 font-mono text-[5px] pointer-events-none">+</div>
                    <div className="absolute bottom-2 right-2 text-cyan-500/20 font-mono text-[5px] pointer-events-none">+</div>

                    {/* Scanning CRT lines over the chamber */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,229,255,0.03)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-70" />

                    {/* Transparent Click Overlay covering the Robot, toggles chat window */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute inset-0 z-30 cursor-pointer pointer-events-auto rounded-3xl"
                        title="Click to calibrate AI"
                    />

                    {/* Glowing holographic energy pad base emitter graphic */}
                    <div className="absolute inset-x-5 bottom-1 h-3.5 bg-cyan-400/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <CanvasErrorBoundary fallback={<RobotFallback2D robotState={robotState} />}>
                        <Suspense fallback={<RobotFallback2D robotState={robotState} />}>
                            <Canvas
                                camera={{ position: [0, 0.1, 1.8], fov: 60 }}
                                gl={{ antialias: true, alpha: true }}
                                className="w-full h-full"
                                style={{ pointerEvents: 'none' }}
                                shadows
                            >
                                {/* Futuristic Cyberpunk Environment Lights */}
                                <ambientLight intensity={0.9} />
                                <directionalLight
                                    position={[2, 3, 2]}
                                    intensity={1.8}
                                    castShadow
                                    shadow-mapSize={[512, 512]}
                                />

                                {/* Volumetric Spotlight from top */}
                                <spotLight
                                    position={[0, 3, 0]}
                                    angle={0.4}
                                    penumbra={1}
                                    intensity={2.8}
                                    color="#00E5FF"
                                />

                                {/* Side Key Lights (Cyan & Purple Highlights) */}
                                <pointLight position={[-2.5, -0.5, 1]} intensity={1.8} color="#8A2BE2" />
                                <pointLight position={[2.5, 0.5, 1]} intensity={2.2} color="#00E5FF" />

                                {/* Volumetric Glowing Hologram Base Platform */}
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
                                    <ringGeometry args={[0.62, 0.72, 32]} />
                                    <meshBasicMaterial color="#8A2BE2" side={THREE.DoubleSide} transparent opacity={0.8} />
                                </mesh>
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.04, 0]}>
                                    <circleGeometry args={[0.62, 24]} />
                                    <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.16} wireframe />
                                </mesh>

                                {/* Translucent volumetric beam cone */}
                                <mesh position={[0, -0.05, 0]}>
                                    <cylinderGeometry args={[0.2, 0.65, 2.0, 32, 1, true]} />
                                    <meshBasicMaterial
                                        color="#00E5FF"
                                        transparent
                                        opacity={0.06}
                                        side={THREE.DoubleSide}
                                    />
                                </mesh>

                                {/* 3D Model Skeletal Renders */}
                                <RobotModel robotState={robotState} mousePos={mousePos} />

                                {/* Floating sparks & Rotating energy rings */}
                                <RotatingLaserRings robotState={robotState} />
                                <FloatingCyberSparks />
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
