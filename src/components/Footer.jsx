import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin, Leetcode } from './Icons';
import { SOCIAL_PROFILES } from '../constants';

export default function Footer() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getSocialIcon = (iconName) => {
        switch (iconName.toLowerCase()) {
            case 'github':
                return <Github size={16} />;
            case 'linkedin':
                return <Linkedin size={16} />;
            case 'leetcode':
                return <Leetcode size={16} className="text-[#f89f1b]" />;
            default:
                return null;
        }
    };

    return (
        <footer className="w-full border-t border-white/5 bg-zinc-950/80 backdrop-blur-md py-16 relative overflow-hidden">
            {/* Soft Ambient Footer Glow */}
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {/* Left Column: Branding */}
                    <div className="flex flex-col gap-2.5">
                        <span className="text-2xl font-black font-display text-gradient tracking-wide">
                            Priyam Rai
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                            AI & Full Stack Developer
                        </span>
                        <p className="text-[11px] text-gray-500 max-w-xs mt-1.5 leading-relaxed">
                            Formulating clinical AI detectors, scalable database web applications, and premium responsive user experiences.
                        </p>
                    </div>

                    {/* Middle Column: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold font-display text-white uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <div className="flex flex-col gap-2.5 text-xs text-gray-450">
                            {SOCIAL_PROFILES.map((profile) => (
                                <a
                                    key={profile.name}
                                    href={profile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                                >
                                    {getSocialIcon(profile.icon)}
                                    <span>{profile.name} Profile</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Scroll to Top action */}
                    <div className="flex md:justify-end">
                        <button
                            onClick={handleScrollToTop}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel glass-panel-hover text-xs text-gray-300 hover:text-white transition-all cursor-pointer font-semibold"
                        >
                            <span>Scroll to Top</span>
                            <ArrowUp size={14} className="text-blue-400 animate-bounce" />
                        </button>
                    </div>
                </div>

                <hr className="border-white/5 my-10" />

                {/* Footer copyrights row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-sans">
                    <p>&copy; 2026 Priyam Rai. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Built using <span className="text-gray-300 font-medium font-mono">React</span> and <span className="text-gray-300 font-medium font-mono">Tailwind CSS</span>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
