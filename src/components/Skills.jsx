import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Server, Database, Brain, Cloud, Settings, CheckCircle } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';

export default function Skills() {
    const getIcon = (categoryName) => {
        const cat = categoryName.toLowerCase();
        if (cat.includes('programming')) {
            return <Code size={24} className="text-blue-400" />;
        }
        if (cat.includes('web technologies') || cat.includes('frontend') || cat.includes('backend')) {
            return <Cpu size={24} className="text-cyan-400" />;
        }
        if (cat.includes('machine learning')) {
            return <Brain size={24} className="text-emerald-400" />;
        }
        if (cat.includes('database')) {
            return <Database size={24} className="text-amber-400" />;
        }
        if (cat.includes('developer tools') || cat.includes('cloud') || cat.includes('tools')) {
            return <Settings size={24} className="text-purple-400" />;
        }
        return <Cpu size={24} className="text-blue-400" />;
    };

    return (
        <section id="skills" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    My <span className="text-gradient">Skills</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            {/* Grid container with 1 to 3 column flexibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SKILL_CATEGORIES.map((category, catIndex) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                        className="glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col h-full"
                    >
                        {/* Soft Ambient Corner Glow */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl" />

                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                {getIcon(category.name)}
                            </div>
                            <h3 className="text-lg font-bold font-display text-white">
                                {category.name}
                            </h3>
                        </div>

                        {/* Skills List */}
                        <div className="flex flex-col gap-5 flex-grow">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skill.name} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-gray-300 flex items-center gap-2">
                                            <CheckCircle size={14} className="text-blue-500/70" />
                                            {skill.name}
                                        </span>
                                        <span className="text-blue-400 font-mono font-bold">
                                            {skill.level}%
                                        </span>
                                    </div>

                                    {/* Level Slider Bar */}
                                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: 'easeOut', delay: skillIndex * 0.05 }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
