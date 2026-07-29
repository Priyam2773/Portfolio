import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { DEVELOPER_INFO } from '../constants';

const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            const sections = navItems.map(item => item.href.substring(1));
            let currentSection = 'hero';

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 180 && rect.bottom >= 180) {
                        currentSection = section;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4'
                    : 'bg-transparent border-b border-transparent py-6'
                }`}>
                <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 group">
                        <span className="text-xl font-bold font-display text-gradient transition-all duration-300 group-hover:scale-105">
                            {DEVELOPER_INFO.name}
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-400 relative py-1 ${activeSection === item.href.substring(1)
                                        ? 'text-blue-400'
                                        : 'text-gray-400'
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.href.substring(1) && (
                                    <motion.span
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Socials & Hamburger */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <a
                                href={DEVELOPER_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="GitHub Profile"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href={DEVELOPER_INFO.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-400 hover:text-white md:hidden transition-transform duration-200 hover:scale-110 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[76px] z-40 bg-zinc-950/95 border-b border-white/10 md:hidden backdrop-blur-xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium transition-colors ${activeSection === item.href.substring(1) ? 'text-blue-400' : 'text-gray-300'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <hr className="border-white/10" />
                            <div className="flex gap-4">
                                <a
                                    href={DEVELOPER_INFO.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                                >
                                    <Github size={20} /> GitHub
                                </a>
                                <a
                                    href={DEVELOPER_INFO.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                                >
                                    <Linkedin size={20} /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
