import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';

const getBrandStyles = (issuer) => {
    const term = issuer.toLowerCase();
    if (term.includes('michigan')) {
        return {
            glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.12)] border-amber-500/20",
            badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            iconColor: "text-amber-400"
        };
    } else if (term.includes('ibm')) {
        return {
            glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] border-blue-500/20",
            badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            iconColor: "text-blue-400"
        };
    } else if (term.includes('nptel')) {
        return {
            glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] border-purple-500/20",
            badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
            iconColor: "text-purple-400"
        };
    } else { // MathWorks / Default
        return {
            glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.12)] border-rose-500/20",
            badge: "bg-rose-500/10 text-rose-455 border-rose-500/20",
            iconColor: "text-rose-450"
        };
    }
};

export default function Certifications() {
    return (
        <section id="certifications" className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
            {/* Title */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                    Credentials & <span className="text-gradient">Certifications</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CERTIFICATIONS.map((cert, index) => {
                    const styles = getBrandStyles(cert.issuer);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 border bg-gradient-to-tr from-white/2 to-white/0 ${styles.glow}`}
                        >
                            {/* Top Soft Corner Glow */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/2 rounded-full blur-2xl pointer-events-none" />

                            <div>
                                {/* Badge Icon Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-2xl border ${styles.badge} group-hover:scale-105 transition-transform duration-300`}>
                                        <Award size={20} className={styles.iconColor} />
                                    </div>
                                    <div>
                                        <span className="text-white font-bold font-display text-base block leading-snug group-hover:text-blue-400 transition-colors">
                                            {cert.name}
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1 block">
                                            {cert.issuer}
                                        </span>
                                    </div>
                                </div>

                                {/* Status details */}
                                <div className="flex flex-col gap-2 text-xs mb-6">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-gray-450">Issued Date</span>
                                        <span className="text-gray-300 font-medium">{cert.issueDate}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-gray-450">ID Reference</span>
                                        <span className="text-gray-300 font-mono font-medium">{cert.credentialId}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Link Row */}
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 font-sans">
                                    <ShieldCheck size={14} /> Active Verification
                                </span>
                                <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                    Verify <ExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
