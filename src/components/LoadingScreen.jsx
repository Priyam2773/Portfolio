import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 14) + 4;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 250);
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -15, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                    className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none"
                >
                    {/* Rotating core logo circle */}
                    <div className="relative mb-8 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                            className="w-16 h-16 border-t-2 border-r-2 border-blue-500 rounded-full blur-[0.5px]"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                            className="absolute w-12 h-12 border-b-2 border-l-2 border-purple-500 rounded-full blur-[0.5px]"
                        />
                        <span className="absolute text-white font-extrabold text-xs font-display tracking-widest">
                            PR
                        </span>
                    </div>

                    {/* Progress metric label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white font-mono text-xs tracking-widest mb-3 font-bold"
                    >
                        STARTING ENGINE {progress}%
                    </motion.div>

                    {/* Progress track */}
                    <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
