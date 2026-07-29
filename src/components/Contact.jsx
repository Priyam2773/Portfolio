import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, AlertCircle, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { Github, Linkedin, Leetcode } from './Icons';
import { DEVELOPER_INFO } from '../constants';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null); // 'loading', 'success', 'error'
    const [touched, setTouched] = useState({});

    // Real-time validation function
    const validateField = (name, value) => {
        let error = '';
        if (name === 'name') {
            if (!value.trim()) error = 'Name is required.';
            else if (value.trim().length < 3) error = 'Name must be at least 3 characters.';
        }
        if (name === 'email') {
            if (!value.trim()) error = 'Email is required.';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format.';
        }
        if (name === 'message') {
            if (!value.trim()) error = 'Message is required.';
            else if (value.trim().length < 10) error = 'Message must be at least 10 characters.';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Trigger validation for all fields
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched({ name: true, email: true, message: true });

        if (Object.keys(newErrors).length > 0) {
            setSubmitStatus('error');
            return;
        }

        setSubmitStatus('loading');

        // Simulate API request send
        setTimeout(() => {
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTouched({});
            setErrors({});
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    Get In <span className="text-gradient">Touch</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Left Column: Glassmorphic Details card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5 flex"
                >
                    <div className="glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between w-full">
                        {/* Top Soft Corner Glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-lg font-bold font-display text-white">Contact Information</h3>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                I'm always open to discussing AI, Machine Learning, Full-Stack Development, internships, freelance opportunities, and innovative software projects. Whether you have a project idea, collaboration opportunity, or just want to connect, feel free to reach out. I'd love to hear from you.
                            </p>

                            <hr className="border-white/5" />

                            <div className="flex flex-col gap-4 text-sm">
                                {/* Email Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-blue-500/20 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
                                >
                                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Email Address</span>
                                        <a href={`mailto:priyamrai282@gmail.com`} className="text-gray-300 font-medium hover:text-white transition-colors">
                                            priyamrai282@gmail.com
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Phone Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-indigo-500/20 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
                                >
                                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Phone Number</span>
                                        <a href="tel:+918299307452" className="text-gray-300 font-medium hover:text-white transition-colors">
                                            +91 8299307452
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Location Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-purple-500/20 shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300"
                                >
                                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Location</span>
                                        <span className="text-gray-300 font-medium">
                                            Jaunpur, Uttar Pradesh, India
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Social Icons row */}
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-4">Social channels</span>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Github Tooltip */}
                                <div className="group relative">
                                    <a
                                        href={DEVELOPER_INFO.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl glass-panel glass-panel-hover text-gray-400 hover:text-white hover:border-white/20 transition-all font-semibold flex items-center justify-center"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-[10px] text-gray-200 border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                                        GitHub
                                    </span>
                                </div>

                                {/* Linkedin Tooltip */}
                                <div className="group relative">
                                    <a
                                        href={DEVELOPER_INFO.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl glass-panel glass-panel-hover text-gray-400 hover:text-blue-400 hover:border-blue-500/20 transition-all font-semibold flex items-center justify-center"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-[10px] text-gray-200 border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                                        LinkedIn
                                    </span>
                                </div>

                                {/* LeetCode Tooltip */}
                                <div className="group relative">
                                    <a
                                        href="https://leetcode.com/u/Priyamrai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl glass-panel glass-panel-hover text-gray-400 hover:text-orange-400 hover:border-orange-500/20 transition-all font-semibold flex items-center justify-center"
                                    >
                                        <Leetcode size={18} />
                                    </a>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-[10px] text-gray-200 border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                                        LeetCode
                                    </span>
                                </div>

                                {/* Mail Tooltip */}
                                <div className="group relative">
                                    <a
                                        href={`mailto:${DEVELOPER_INFO.email}`}
                                        className="p-3 rounded-2xl glass-panel glass-panel-hover text-gray-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all font-semibold flex items-center justify-center"
                                    >
                                        <Mail size={18} />
                                    </a>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-[10px] text-gray-200 border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                                        Send Email
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Glassmorphic Contact form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7"
                >
                    <div className="glass-panel rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
                        {/* Top Soft Corner Glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your name"
                                    className={`w-full px-4 py-3.5 rounded-2xl bg-black/60 border text-gray-305 text-sm focus:outline-none transition-all ${errors.name && touched.name
                                        ? 'border-red-500/50 focus:border-red-500/80 bg-red-950/5'
                                        : 'border-white/10 focus:border-blue-500/70'
                                        }`}
                                />
                                {errors.name && touched.name && (
                                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                                        <AlertCircle size={10} /> {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your email"
                                    className={`w-full px-4 py-3.5 rounded-2xl bg-black/60 border text-gray-305 text-sm focus:outline-none transition-all ${errors.email && touched.email
                                        ? 'border-red-500/50 focus:border-red-500/80 bg-red-950/5'
                                        : 'border-white/10 focus:border-blue-500/70'
                                        }`}
                                />
                                {errors.email && touched.email && (
                                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                                        <AlertCircle size={10} /> {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Type your message here..."
                                    className={`w-full px-4 py-3.5 rounded-2xl bg-black/60 border text-gray-305 text-sm focus:outline-none transition-all resize-none ${errors.message && touched.message
                                        ? 'border-red-500/50 focus:border-red-500/80 bg-red-950/5'
                                        : 'border-white/10 focus:border-blue-500/70'
                                        }`}
                                />
                                {errors.message && touched.message && (
                                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                                        <AlertCircle size={10} /> {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Form alerts */}
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={16} /> Message sent successfully! I will get back to you shortly.
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2"
                                    >
                                        <AlertCircle size={16} /> Please fix the validation errors in the form before submitting.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={submitStatus === 'loading'}
                                className="w-full sm:w-auto self-start flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-sm shadow-md hover:shadow-blue-500/20 transition-all border-glow-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitStatus === 'loading' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
