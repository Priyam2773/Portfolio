import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Check, Filter, Calendar, Cloud, Sun, Search, User } from 'lucide-react';
import { Github } from './Icons';
import { PROJECTS } from '../constants';

const filterCategories = ['All', 'Full-Stack', 'MERN & AI', 'Machine Learning', 'API & UI'];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = PROJECTS.filter(project => {
        if (activeFilter === 'All') return true;
        return project.category.toLowerCase() === activeFilter.toLowerCase();
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Render CSS screenshot placeholders
    const renderScreenshotPlaceholder = (type) => {
        if (type === 'quickdine') {
            return (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-emerald-955/80 flex flex-col p-4 font-sans select-none justify-between border-b border-white/5">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                        <span className="text-[10px] text-gray-300 font-semibold font-display tracking-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            QuickDine Reservation Panel
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold">14 Tables</span>
                    </div>
                    {/* Seat Grid Layout */}
                    <div className="grid grid-cols-4 gap-2 my-2 flex-grow overflow-hidden scale-90 justify-center items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => {
                            const isReserved = table % 3 === 0;
                            return (
                                <div
                                    key={table}
                                    className={`aspect-square rounded-xl flex flex-col items-center justify-center border text-[8px] font-bold ${isReserved
                                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        }`}
                                >
                                    <span>T-{table}</span>
                                    <span className="text-[6px] opacity-70">{isReserved ? 'BUSY' : 'FREE'}</span>
                                </div>
                            );
                        })}
                    </div>
                    {/* Footer Controls */}
                    <div className="flex justify-between items-center bg-white/5 rounded-xl px-2 py-1.5 border border-white/5 text-[8px] text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={8} /> Live Inventory</span>
                        <span className="flex items-center gap-1"><User size={8} /> 4 Seats Max</span>
                    </div>
                </div>
            );
        }

        if (type === 'mediaura') {
            return (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-blue-955/80 flex flex-col p-4 font-sans select-none justify-between border-b border-white/5">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] text-gray-300 font-bold font-display uppercase tracking-wider">MediAura AI Agent</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[8px] font-bold font-mono">LangChain</span>
                    </div>
                    {/* Chat Bubble Simulation */}
                    <div className="flex flex-col gap-2 my-2 flex-grow overflow-hidden scale-90 origin-top">
                        <div className="flex gap-2 items-start max-w-[85%]">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[7px] text-blue-400 font-bold">AI</div>
                            <div className="bg-white/5 border border-white/15 px-3 py-1.5 rounded-2xl rounded-tl-none text-[8px] text-gray-300 leading-normal">
                                Medical consultation ready. State your warning symptoms.
                            </div>
                        </div>
                        <div className="flex gap-2 items-start max-w-[80%] self-end flex-row-reverse">
                            <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[7px] text-purple-400 font-bold">ME</div>
                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 px-3 py-1.5 rounded-2xl rounded-tr-none text-[8px] text-gray-200 leading-normal text-right">
                                Show treatment suggestions for acute headaches.
                            </div>
                        </div>
                    </div>
                    {/* Input */}
                    <div className="flex gap-2 bg-white/5 rounded-xl p-1 border border-white/5">
                        <div className="bg-transparent text-[8px] text-gray-500 flex-grow px-2 self-center">Search helper...</div>
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[8px] font-bold">SEND</span>
                    </div>
                </div>
            );
        }

        if (type === 'diabetes') {
            return (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-purple-955/80 flex flex-col p-4 font-sans select-none justify-between border-b border-white/5">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                        <span className="text-[10px] text-gray-300 font-semibold font-display tracking-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Classifier Telemetry
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[8px] font-bold font-mono">Accuracy: 75%</span>
                    </div>
                    {/* Graphic bar chart */}
                    <div className="flex items-end justify-between gap-1.5 h-16 px-3 my-2 self-center w-full max-w-[90%] border-b border-white/10 pb-0.5">
                        <div className="w-full bg-blue-500/20 rounded-t h-[40%]" />
                        <div className="w-full bg-purple-500/20 rounded-t h-[65%]" />
                        <div className="w-full bg-blue-500/30 rounded-t h-[30%]" />
                        <div className="w-full bg-violet-600/30 rounded-t h-[75%]" />
                        <div className="w-full bg-purple-500/40 rounded-t h-[85%] relative">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-1 rounded bg-blue-500 text-white text-[5px] font-bold">75%</span>
                        </div>
                    </div>
                    {/* Footer indicators */}
                    <div className="flex justify-between text-[7px] text-gray-500 px-1 font-mono">
                        <span>GLUCOSE</span>
                        <span>INSULIN</span>
                        <span>BMI</span>
                    </div>
                </div>
            );
        }

        if (type === 'weather') {
            return (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-cyan-955/80 flex flex-col p-4 font-sans select-none justify-between border-b border-white/5">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                        <span className="text-[10px] text-gray-300 font-semibold font-display tracking-wide flex items-center gap-1.5">
                            <Cloud size={10} className="text-cyan-400" />
                            Live Weather Dashboard
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-700/20 text-cyan-400 text-[8px] font-mono font-bold">ACTIVE API</span>
                    </div>
                    {/* Weather card info */}
                    <div className="flex items-center justify-between px-2 my-2 flex-grow scale-95">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-display text-white">28°C</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold">Partly Sunny</span>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                            <Sun size={20} className="text-amber-400 rounded-full animate-spin [animation-duration:15s]" />
                            <span className="text-[6px] text-gray-500 uppercase tracking-wider font-mono">Jaunpur, IN</span>
                        </div>
                    </div>
                    {/* Sub Info Row */}
                    <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-xl p-1 border border-white/5 text-[7px] text-gray-400 text-center font-mono">
                        <div>
                            <span className="block text-white font-bold">64%</span>
                            <span className="text-gray-500 text-[6px]">HUMIDITY</span>
                        </div>
                        <div>
                            <span className="block text-white font-bold">12 km/h</span>
                            <span className="text-gray-500 text-[6px]">WIND SPEED</span>
                        </div>
                        <div>
                            <span className="block text-white font-bold">UV 3</span>
                            <span className="text-gray-500 text-[6px]">INDEX</span>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title & Short Description */}
            <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    Featured <span className="text-gradient">Projects</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6" />
                <p className="text-gray-400 text-sm leading-relaxed">
                    A collection of AI, Machine Learning, and Full-Stack applications showcasing my skills in software engineering, modern web development, and problem-solving.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mr-2">
                    <Filter size={12} /> Filter by:
                </span>
                {filterCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 pointer-events-auto cursor-pointer ${activeFilter === category
                            ? 'bg-gradient-accent text-white border-transparent'
                            : 'glass-panel text-gray-400 hover:text-white border-white/5'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Projects Grid - 2x2 layout on desktop, stacked on mobile, max-w-5xl for premium sizing */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            key={project.id}
                            className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_12px_40px_-15px_rgba(59,130,246,0.3)] cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Project SVG Mockup Placeholder */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                                {renderScreenshotPlaceholder(project.imageType)}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                                <span className="absolute top-4 left-4 inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-505/20 border border-blue-505/30 text-blue-400">
                                    {project.category}
                                </span>
                            </div>

                            {/* Project Details */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tech Chips */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-gray-305 border border-white/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Active Links Button Row on Card Bottom */}
                                <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-white/5">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                        className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Case Study &rarr;
                                    </button>
                                    <div className="ml-auto flex items-center gap-3">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-colors"
                                            title="GitHub Directory"
                                        >
                                            <Github size={14} />
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                                                title="Launch Demo Site"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Project Detail Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto relative z-10 border border-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full glass-panel glass-panel-hover text-gray-400 hover:text-white"
                                aria-label="Close details"
                            >
                                <X size={18} />
                            </button>

                            <div className="flex flex-col gap-6 md:gap-7">
                                {/* Hero Header */}
                                <div>
                                    <span className="inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3">
                                        {selectedProject.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-extrabold font-display text-white">
                                        {selectedProject.title}
                                    </h3>
                                </div>

                                {/* Mockup Preview in Modal */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 shadow-inner relative">
                                    {renderScreenshotPlaceholder(selectedProject.imageType)}
                                </div>

                                {/* Tech Chips */}
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-7 flex flex-col gap-3">
                                        <h4 className="text-xs font-bold font-display text-white uppercase tracking-wider">
                                            Executive Overview
                                        </h4>
                                        <p className="text-gray-400 text-xs leading-relaxed font-sans">
                                            {selectedProject.fullDescription}
                                        </p>
                                    </div>

                                    <div className="md:col-span-5 flex flex-col gap-3">
                                        <h4 className="text-xs font-bold font-display text-white uppercase tracking-wider">
                                            Key Highlights
                                        </h4>
                                        <ul className="flex flex-col gap-2">
                                            {selectedProject.highlights.map((highlight, index) => (
                                                <li key={index} className="flex items-start gap-2 text-xs text-gray-400 leading-normal font-sans">
                                                    <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/10 text-blue-400">
                                                        <Check size={8} />
                                                    </span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <hr className="border-white/5" />

                                {/* Links */}
                                <div className="flex flex-wrap items-center gap-4">
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold text-xs border-glow-hover hover:scale-105 transition-transform"
                                        >
                                            Launch Live Site
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel glass-panel-hover text-gray-300 hover:text-white font-semibold text-xs hover:scale-105 transition-transform"
                                    >
                                        View Source Code
                                        <Github size={14} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
