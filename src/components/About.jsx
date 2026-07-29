import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Brain, Eye, Sparkles, Trophy } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';
import profileImage from '../assets/profile.png';

const interestCards = [
    {
        title: "Full Stack Development",
        description: "Designing end-to-end architectures utilizing the MERN stack, robust REST/GraphQL APIs, and responsive design systems.",
        Icon: Code,
        color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400"
    },
    {
        title: "Machine Learning",
        description: "Developing scalable statistical models, predictive pipelines, and automated data transformers in Python.",
        Icon: Brain,
        color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400"
    },
    {
        title: "Computer Vision",
        description: "Implementing real-time pixel analytics, object detection streams, and matrix segmentation utilizing OpenCV.",
        Icon: Eye,
        color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
    },
    {
        title: "Generative AI",
        description: "Building custom prompt agents, LLM integrations, and retrieval-augmented pipelines for dynamic solutions.",
        Icon: Sparkles,
        color: "from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-400"
    }
];

export default function About() {
    return (
        <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    About <span className="text-gradient">Me</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Side: Profile Glassmorphism Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5 flex flex-col gap-8"
                >
                    {/* Profile Photo Display Card */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative flex items-center justify-center p-8 rounded-3xl glass-panel relative overflow-hidden group backdrop-blur-xl"
                    >
                        {/* Background Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-600/5 to-pink-500/5 opacity-60 blur-xl pointer-events-none" />

                        {/* Image Glowing Ring Container */}
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_28px_rgba(139,92,246,0.6)] transition-all duration-500 flex items-center justify-center"
                        >
                            <img
                                src={profileImage}
                                alt={DEVELOPER_INFO.name}
                                className="w-full h-full object-cover rounded-full select-none"
                            />
                        </motion.div>
                    </motion.div>

                    <div className="glass-panel rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl">
                        {/* Ambient Radial Layer */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                                <User size={24} />
                            </div>
                            <h3 className="text-lg font-bold font-display text-white">Academic Profile</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs font-sans">
                                <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block mb-1">
                                    B.Tech in Computer Science Engineering
                                </span>
                                <span className="text-white font-semibold block">Vellore Institute of Technology, Bhopal</span>
                                <div className="flex justify-between text-gray-400 text-[9px] mt-2 font-mono">
                                    <span>2023 – 2027</span>
                                    <span className="text-purple-400 font-bold">CGPA: 8.63/10</span>
                                </div>
                            </div>

                            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs font-sans">
                                <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block mb-1">
                                    Senior Secondary (12th)
                                </span>
                                <span className="text-white font-semibold block">Prasad International School, Jaunpur</span>
                                <div className="flex justify-between text-gray-400 text-[9px] mt-2 font-mono">
                                    <span>Passed: 2022</span>
                                    <span className="text-purple-400 font-bold">Percentage: 69%</span>
                                </div>
                            </div>

                            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs font-sans">
                                <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block mb-1">
                                    Secondary School (10th)
                                </span>
                                <span className="text-white font-semibold block">Prasad International School, Jaunpur</span>
                                <div className="flex justify-between text-gray-400 text-[9px] mt-2 font-mono">
                                    <span>Passed: 2020</span>
                                    <span className="text-purple-400 font-bold">Percentage: 72.6%</span>
                                </div>
                            </div>
                        </div>

                        <hr className="border-white/5" />

                        <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-400">
                            <span className="flex items-center gap-2">
                                <Trophy size={14} className="text-yellow-500" />
                                Active solver
                            </span>
                            <span className="text-white font-semibold">200+ DSA Problems</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: 4 Core Interests Cards */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
                        <Sparkles size={20} className="text-purple-400" />
                        My Interests & Focus
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {interestCards.map((item, index) => {
                            const CardIcon = item.Icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative rounded-3xl p-6 glass-panel border bg-gradient-to-br ${item.color} backdrop-blur-md transition-all duration-300 hover:scale-103 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-white/5 rounded-2xl text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                            <CardIcon size={20} className={item.color.split(' ').pop()} />
                                        </div>
                                        <h4 className="text-white font-bold font-display text-base">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed font-sans">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
