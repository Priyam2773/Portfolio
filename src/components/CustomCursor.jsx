import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 42, stiffness: 450, mass: 0.35 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                target.closest('.cursor-pointer')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 rounded-full border border-blue-500 pointer-events-none z-50 mix-blend-screen hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
                scale: isHovered ? 1.75 : 1,
                backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.02)',
                borderColor: isHovered ? 'rgb(147, 197, 253)' : 'rgba(59, 130, 246, 0.5)'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}
