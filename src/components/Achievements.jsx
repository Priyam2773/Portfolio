import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Brain, Server, Award, Star } from 'lucide-react';

// Count-up helper component
function CountUp({ target, duration = 1200, suffix = "" }) {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const isInView = useInView(elementRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = parseInt(target, 10);
        if (start === end) {
            setCount(end);
            return;
        }

        const incrementTime = Math.max(10, Math.floor(duration / end));
        const step = Math.max(1, Math.ceil(end / 40));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 25);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <span ref={elementRef} className="font-display font-black text-4xl sm:text-5xl text-gradient block mb-1">
            {count}{suffix}
        </span>
    );
}

const statsData = [
    {
        target: "200",
        suffix: "+",
        title: "LeetCode Problems Solved",
        description: "Active solution building utilizing optimal data structures and efficient complexity runtimes.",
        Icon: Terminal,
        glowColor: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] border-blue-500/20 text-blue-400"
    },
    {
        target: "2",
        suffix: "+",
        title: "Major AI Projects",
        description: "Architected clinical diagnostics models and RAG assistant chatbots using LLM models.",
        Icon: Brain,
        glowColor: "group-hover:shadow-[0_0_35px_rgba(139,92,246,0.2)] border-purple-500/20 text-purple-400"
    },
    {
        target: "10",
        suffix: "+",
        title: "REST APIs Developed",
        description: "Implemented secure backend systems with token authentication and optimized indexing tables.",
        Icon: Server,
        glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.2)] border-emerald-500/20 text-emerald-400"
    },
    {
        target: "5",
        suffix: "+",
        title: "Professional Certifications",
        description: "Earned industry accolades verifying cloud engineering, full-stack design, and technical skills.",
        Icon: Award,
        glowColor: "group-hover:shadow-[0_0_35px_rgba(244,63,94,0.2)] border-rose-500/20 text-rose-450"
    }
];

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    Key <span className="text-gradient">Milestones</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            {/* Glowing countup grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {statsData.map((item, index) => {
                    const StatIcon = item.Icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`glass-panel rounded-3xl p-6.5 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 border bg-gradient-to-tr from-white/2 to-white/0 ${item.glowColor}`}
                        >
                            {/* Inner Radial Soft Circle */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full blur-2xl pointer-events-none" />

                            <div>
                                {/* Icon Badge Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        <StatIcon size={20} className={item.glowColor.split(' ').pop()} />
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                        Active Audit
                                    </span>
                                </div>

                                {/* Countup counter display */}
                                <CountUp target={item.target} suffix={item.suffix} />

                                {/* Subtitles */}
                                <h3 className="text-sm font-bold font-display text-white mb-2 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Verified label at footer */}
                            <hr className="border-white/5 my-4" />
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                <Star size={11} className="text-amber-500/70" /> verified credential
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
