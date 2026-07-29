import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Github, Linkedin, Leetcode } from './Icons';
import { SOCIAL_PROFILES } from '../constants';

export default function Profiles() {
    const getSocialIcon = (iconName) => {
        switch (iconName.toLowerCase()) {
            case 'github':
                return <Github size={24} />;
            case 'linkedin':
                return <Linkedin size={24} />;
            case 'leetcode':
                return <Leetcode size={24} className="text-[#f89f1b]" />;
            default:
                return <ExternalLink size={24} />;
        }
    };

    return (
        <section id="profiles" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    Coding <span className="text-gradient">Profiles</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SOCIAL_PROFILES.map((profile, index) => (
                    <motion.div
                        key={profile.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 border bg-gradient-to-tr from-white/2 to-white/0 ${profile.accent}`}
                    >
                        {/* Soft Glow */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/2 rounded-full blur-2xl pointer-events-none" />

                        <div>
                            {/* Logo and Name */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex items-center justify-center">
                                    {getSocialIcon(profile.icon)}
                                </div>
                                <h3 className="text-xl font-bold font-display text-white">
                                    {profile.name}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {profile.description}
                            </p>
                        </div>

                        {/* Visit Profile Button */}
                        <div className="pt-4 border-t border-white/5">
                            <a
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 w-full rounded-2xl bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 font-semibold text-xs justify-center hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            >
                                Visit Profile
                                <ExternalLink size={14} className="opacity-70" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
