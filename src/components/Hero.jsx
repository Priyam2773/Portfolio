import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Mail, Code, Terminal, Brain, Cpu, Database } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';

const roles = [
    "AI & Full Stack Developer",
    "Machine Learning Specialist",
    "Problem Solver",
    "CS Engineering Student"
];

const targetTech = [
    { Icon: Brain, color: "text-blue-400 border-blue-500/30", label: "AI", top: "15%", left: "15%", delay: 0 },
    { Icon: Code, color: "text-purple-400 border-purple-500/30", label: "React", top: "25%", right: "12%", delay: 1.5 },
    { Icon: Cpu, color: "text-emerald-400 border-emerald-500/30", label: "ML", top: "65%", left: "10%", delay: 3 },
    { Icon: Database, color: "text-amber-400 border-amber-500/30", label: "Data", bottom: "18%", right: "20%", delay: 2 },
    { Icon: Terminal, color: "text-rose-400 border-rose-500/30", label: "Backend", top: "50%", right: "8%", delay: 0.5 },
];

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        let timer;
        const currentFullText = roles[roleIndex];

        const handleType = () => {
            if (!isDeleting) {
                setTypedText(prev => currentFullText.substring(0, prev.length + 1));
                if (typedText === currentFullText) {
                    timer = setTimeout(() => setIsDeleting(true), 1800);
                } else {
                    timer = setTimeout(handleType, 75);
                }
            } else {
                setTypedText(prev => currentFullText.substring(0, prev.length - 1));
                if (typedText === '') {
                    setIsDeleting(false);
                    setRoleIndex(prev => (prev + 1) % roles.length);
                    timer = setTimeout(handleType, 200);
                } else {
                    timer = setTimeout(handleType, 35);
                }
            }
        };

        if (typedText !== currentFullText || isDeleting) {
            timer = setTimeout(handleType, isDeleting ? 35 : 75);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, roleIndex]);

    return (
        <section
            id="hero"
            className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden px-4 md:px-8 max-w-6xl mx-auto"
        >

            {/* Floating Ambient Radial Glows */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[90px] top-1/4 left-1/4"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, -60, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[110px] bottom-1/4 right-1/4"
                />
            </div>

            {/* Floating Tech Icons */}
            {targetTech.map((item, index) => {
                const Icon = item.Icon;
                return (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            bottom: item.bottom,
                        }}
                        animate={{
                            y: [0, -18, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay
                        }}
                        className={`hidden lg:flex flex-col items-center justify-center p-3 rounded-2xl glass-panel border ${item.color} shadow-lg z-10 backdrop-blur-md cursor-default group hover:scale-115 transition-transform duration-300`}
                    >
                        <Icon size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{item.label}</span>
                    </motion.div>
                );
            })}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left side content info */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">

                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs text-blue-400 font-medium mb-6 backdrop-blur-md animate-pulse"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Seeking AI & Web Opportunities
                    </motion.div>

                    {/* Name Header */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display leading-[1.1] mb-4 tracking-tight"
                    >
                        Hi, I'm <span className="text-gradient drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">{DEVELOPER_INFO.name}</span>
                    </motion.h1>

                    {/* Typing Title */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-10 sm:h-12 flex items-center mb-6"
                    >
                        <p className="text-xl sm:text-3xl text-gray-300 font-display font-medium">
                            <span className="text-blue-400 font-bold">&gt;&nbsp;</span>
                            {typedText}
                            <span className="inline-block w-2.5 h-6 bg-purple-500 ml-1.5 animate-pulse" />
                        </p>
                    </motion.div>

                    {/* Bio Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed mb-10 font-sans"
                    >
                        {DEVELOPER_INFO.bio}
                    </motion.p>

                    {/* Action CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#projects"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-accent text-white font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 border-glow-hover hover:scale-105"
                        >
                            View Projects
                            <ArrowRight size={18} />
                        </a>
                        <a
                            href="#contact"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-panel glass-panel-hover text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Contact Me
                            <Mail size={18} />
                        </a>
                        <a
                            href={DEVELOPER_INFO.resumeUrl}
                            download="PriyamRai_CSE(AIML).pdf"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                            <FileText size={18} />
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                {/* Right side animated profile image placeholder */}
                <div className="lg:col-span-5 flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative w-72 h-72 sm:w-80 sm:h-80"
                    >
                        {/* Spinning code segments circle backdrop */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-dashed border-blue-500/20"
                        />

                        {/* Counter spinning node ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 rounded-full border border-dotted border-purple-500/10"
                        />

                        {/* Inner pulsing/glowing circle */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600/10 to-purple-600/10 border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl">

                            {/* Glowing vector path representing AI Brain & Code Network */}
                            <svg
                                width="140"
                                height="140"
                                viewBox="0 0 100 100"
                                className="text-blue-400/70"
                            >
                                {/* Connection lines */}
                                <line x1="20" y1="50" x2="40" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                                <line x1="20" y1="50" x2="40" y2="70" stroke="currentColor" strokeWidth="1" />
                                <line x1="40" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="40" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                                <line x1="60" y1="30" x2="80" y2="50" stroke="currentColor" strokeWidth="1" />
                                <line x1="60" y1="70" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" />

                                {/* Central CPU box */}
                                <line x1="40" y1="30" x2="40" y2="70" stroke="currentColor" strokeWidth="1" />
                                <line x1="60" y1="30" x2="60" y2="70" stroke="currentColor" strokeWidth="1" />
                                <rect x="42" y="42" width="16" height="16" rx="3" fill="none" stroke="url(#cpuGrad)" strokeWidth="2" />

                                {/* Outer glowing nodes */}
                                <circle cx="20" cy="50" r="4" fill="#60a5fa" className="animate-pulse" />
                                <circle cx="40" cy="30" r="3" fill="#a78bfa" />
                                <circle cx="40" cy="70" r="3.5" fill="#34d399" />
                                <circle cx="60" cy="30" r="3.5" fill="#fbbf24" />
                                <circle cx="60" cy="70" r="3" fill="#f43f5e" />
                                <circle cx="80" cy="50" r="4.5" fill="#60a5fa" className="animate-pulse" />

                                {/* Core animated pulsar */}
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="2"
                                    fill="url(#pulsGrad)"
                                    animate={{ r: [2, 7, 2], opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                <defs>
                                    <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                    <linearGradient id="pulsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#f43f5e" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Glowing decorative rings */}
                            <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
                            <div className="absolute inset-2 border border-blue-500/10 rounded-full pointer-events-none" />
                        </div>

                        {/* Glowing neon shadow rings */}
                        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-600/20 blur-md -z-10" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
