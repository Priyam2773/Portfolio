import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particles = [];
        let hexagons = [];
        let circuitLines = [];
        let time = 0;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initElements();
        };

        const handleMouseMove = (e) => {
            // Normalize mouse pos relative to screen center (-1 to 1)
            mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Holographic floating particles definition
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 20;
                this.size = Math.random() * 2.0 + 0.8;
                this.speedY = -(Math.random() * 0.6 + 0.2);
                this.speedX = Math.random() * 0.3 - 0.15;
                this.color = Math.random() > 0.6 ? 'rgba(0, 229, 255, ' : 'rgba(138, 43, 226, '; // Cyan or Purple
                this.opacity = Math.random() * 0.4 + 0.1;
                this.depth = this.size * 5; // parallax depth factor
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(time * 0.02 + this.size) * 0.08;

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }

            draw(mouseX, mouseY) {
                // Apply parallax offset
                const px = this.x - mouseX * this.depth;
                const py = this.y - mouseY * this.depth;

                ctx.fillStyle = `${this.color}${this.opacity})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = this.color.includes('0, 229') ? '#00e5ff' : '#8a2be2';
                ctx.beginPath();
                ctx.arc(px, py, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }
        }

        // Floating ambient tech hexagons
        class Hexagon {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 25 + 10;
                this.speedY = -(Math.random() * 0.25 + 0.05);
                this.rotation = Math.random() * Math.PI;
                this.rotSpeed = (Math.random() - 0.5) * 0.005;
                this.opacity = Math.random() * 0.06 + 0.01;
            }

            update() {
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                if (this.y < -this.size * 2) {
                    this.y = canvas.height + this.size * 2;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw(mouseX, mouseY) {
                const px = this.x - mouseX * 2;
                const py = this.y - mouseY * 2;

                ctx.strokeStyle = `rgba(0, 229, 255, ${this.opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = this.rotation + (i * Math.PI) / 3;
                    const hx = px + Math.cos(angle) * this.size;
                    const hy = py + Math.sin(angle) * this.size;
                    if (i === 0) ctx.moveTo(hx, hy);
                    else ctx.lineTo(hx, hy);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }

        const initElements = () => {
            time = 0;
            particles = [];
            hexagons = [];
            circuitLines = [];

            // 1. Create particles network nodes
            const pCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
            for (let i = 0; i < pCount; i++) {
                particles.push(new Particle());
            }

            // 2. Create slow floating hexagons
            const hCount = Math.min(12, Math.floor(canvas.width / 150));
            for (let i = 0; i < hCount; i++) {
                hexagons.push(new Hexagon());
            }

            // 3. Create static circuit traces in corners
            circuitLines = [
                { x: 100, y: 150, dx: 180, dy: 150, tx: 220, ty: 190 },
                { x: canvas.width - 150, y: 100, dx: canvas.width - 220, dy: 100, tx: canvas.width - 250, ty: 70 },
                { x: 120, y: canvas.height - 180, dx: 180, dy: -180, tx: 220, ty: -220 }, // adjustments done relative to bottom
            ];
        };

        handleResize();

        // Helper for linear interpolation
        const lerp = (start, end, amt) => start + (end - start) * amt;

        // Animation Loop
        const animate = () => {
            time++;
            // Smoothly interpolate mouse coordinates for damping deceleration
            mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, 0.05);
            mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, 0.05);

            const mX = mouseRef.current.x;
            const mY = mouseRef.current.y;

            // Clear frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Render Cinematic Cyberpunk Background Radial Glow
            const xGlow = canvas.width * 0.85 - mX * 25;
            const yGlow = canvas.height * 0.85 - mY * 25;
            const radialGrad = ctx.createRadialGradient(xGlow, yGlow, 50, xGlow, yGlow, Math.max(canvas.width * 0.5, 600));
            radialGrad.addColorStop(0, 'rgba(41, 121, 255, 0.06)'); // Electric blue glow
            radialGrad.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)'); // Purple glow
            radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = radialGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1.5 Draw Cyberpunk Glowing Moon (with parallax)
            const moonRadius = Math.min(canvas.width, canvas.height) > 600 ? 56 : 38;
            const moonX = canvas.width * 0.82 - mX * 8;
            const moonY = canvas.height * 0.22 - mY * 8;

            // A. Outer Cyberpunk Glow
            const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 2.8);
            moonGlow.addColorStop(0, 'rgba(0, 229, 255, 0.25)'); // Cyan core glow
            moonGlow.addColorStop(0.4, 'rgba(138, 43, 226, 0.12)'); // Purple glow
            moonGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = moonGlow;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 2.8, 0, Math.PI * 2);
            ctx.fill();

            // B. Draw Moon Body (Crescent style or layered cyber-ring)
            ctx.save();
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.clip();

            // Fill moon body with vertical cyan-to-purple gradient
            const moonBodyGrad = ctx.createLinearGradient(moonX, moonY - moonRadius, moonX, moonY + moonRadius);
            moonBodyGrad.addColorStop(0, '#ffffff');
            moonBodyGrad.addColorStop(0.3, '#E0F7FA');
            moonBodyGrad.addColorStop(0.8, '#00E5FF');
            moonBodyGrad.addColorStop(1, '#8A2BE2');
            ctx.fillStyle = moonBodyGrad;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.fill();

            // C. Layered crescent shadow (overlapping offset circle) to create a crescent moon effect
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(moonX - moonRadius * 0.35, moonY - moonRadius * 0.1, moonRadius * 0.95, 0, Math.PI * 2);
            ctx.fill();

            // D. Draw horizontal cyber-retro scanlines across the moon body
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.lineWidth = 2.5;
            for (let yOffset = -moonRadius; yOffset < moonRadius; yOffset += 6) {
                ctx.beginPath();
                ctx.moveTo(moonX - moonRadius, moonY + yOffset);
                ctx.lineTo(moonX + moonRadius, moonY + yOffset);
                ctx.stroke();
            }
            ctx.restore();

            // 2. Draw Electronic Circuit Board Lines in corners (static/parallax background details)
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = '#00e5ff';
            circuitLines.forEach((line) => {
                const px = mX * 3;
                const py = mY * 3;

                ctx.beginPath();
                ctx.moveTo(line.x - px, line.y - py);
                ctx.lineTo(line.dx - px, line.y - py);
                ctx.lineTo(line.tx - px, line.ty - py);
                ctx.stroke();

                // Draw tiny terminal nodes
                ctx.fillStyle = 'rgba(0, 229, 255, 0.12)';
                ctx.beginPath();
                ctx.arc(line.tx - px, line.ty - py, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // 3. Draw Perspective Digital Grid Floor (Bottom 35vh of viewport)
            const gridStartVal = canvas.height * 0.65;
            const gridHeight = canvas.height * 0.35;
            const gridVPointX = canvas.width / 2; // Vanishing horizon
            const gridVPointY = gridStartVal - 80;

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
            ctx.shadowBlur = 0;

            // Draw perspective lines shooting outwards
            const gridLinesCount = 20;
            for (let i = 0; i <= gridLinesCount; i++) {
                const ratio = i / gridLinesCount;
                const bottomX = canvas.width * ratio;
                ctx.beginPath();
                ctx.moveTo(gridVPointX, gridVPointY - mY * 2);
                ctx.lineTo(bottomX - mX * 8, canvas.height);
                ctx.stroke();
            }

            // Draw scrolling horizontal depth lines
            const depthLinesCount = 8;
            const speedOffset = (time * 0.6) % 35;
            for (let i = 0; i < depthLinesCount; i++) {
                // Apply exponential curve to simulate depth scale
                const val = (i / depthLinesCount) * 1.1;
                const dy = gridStartVal + Math.pow(val, 2) * gridHeight + (speedOffset * (i / depthLinesCount));
                if (dy <= canvas.height) {
                    ctx.beginPath();
                    ctx.moveTo(0, dy);
                    ctx.lineTo(canvas.width, dy);
                    ctx.stroke();
                }
            }

            // 4. Update and render hexagons
            hexagons.forEach((hex) => {
                hex.update();
                hex.draw(mX, mY);
            });

            // 5. Draw Cyber Network lines between adjacent floating particles
            ctx.lineWidth = 0.5;
            particles.forEach((p1, idx) => {
                p1.update();
                p1.draw(mX, mY);

                // Draw line connection to other particles close-by
                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.12;
                        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x - mX * p1.depth, p1.y - mY * p1.depth);
                        ctx.lineTo(p2.x - mX * p2.depth, p2.y - mY * p2.depth);
                        ctx.stroke();
                    }
                }
            });

            // 6. Animated Glowing Energy Wave across bottom viewport
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.08)'; // Purple overlay wave
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 15) {
                const y = canvas.height - 35 + Math.sin(x * 0.0035 + time * 0.02) * 18 + Math.cos(x * 0.001 - time * 0.01) * 8;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)'; // Neon Cyan sub-wave
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 20) {
                const y = canvas.height - 40 + Math.sin(x * 0.004 + time * -0.015) * 15;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
        />
    );
}
