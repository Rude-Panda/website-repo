"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";

const logos = [
    "DeepMind24.svg",
    "PixartSigma.svg",
    "Sana.svg",
    "StableDiffusion.svg",
    "Lumina.svg",
    "Minimax.svg",
    "Luma24.svg",
    "Pixverse24.svg",
    "Pika24.svg",
    "wan.svg",
    "kling.svg",
    "HiDream.svg",
    "Recraft.svg",
    "Ideogram.svg",
    "Flux.svg",
    "Magi-1.svg",
    "OpenAI.svg",
    "Tripo.svg",
    "Cassettee.svg",
    "Mmaudio.svg",
    "Topaz.svg",
    "Fal.svg"
];

export default function ModelsSupported() {
    const gridRef = React.useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = React.useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = gridRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };
    const handleMouseLeave = () => setMouse(null);

    // Grid layout constants (should match CSS grid)
    const cols = 10; // lg:grid-cols-10
    const cellWidth = 128; // lg:w-32 (32*4=128px)
    const cellHeight = 128; // lg:h-32
    const gapX = 36; // md:gap-x-9 (9*4=36px)
    const gapY = 36; // md:gap-y-9

    return (
        <section className="w-full max-w-[60vw] mx-auto">
            <h2 className="text-3xl font-bold font-mono mb-16">Supported Models and Providers</h2>
            <div
                ref={gridRef}
                className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-10 gap-x-3 gap-y-3 md:gap-x-9 md:gap-y-9 justify-items-center items-center relative"
                style={{ userSelect: "none", width: '100%' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {logos.map((logo, i) => (
                    <LogoTorchCell
                        key={logo}
                        logo={logo}
                        mouse={mouse}
                        index={i}
                        cols={cols}
                        cellWidth={cellWidth}
                        cellHeight={cellHeight}
                        gapX={gapX}
                        gapY={gapY}
                    />
                ))}
            </div>
            <Separator className="my-16" />
        </section>
    );
}

function LogoTorchCell({ logo, mouse, index, cols, cellWidth, cellHeight, gapX, gapY }: {
    logo: string;
    mouse?: { x: number; y: number } | null;
    index?: number;
    cols?: number;
    cellWidth?: number;
    cellHeight?: number;
    gapX?: number;
    gapY?: number;
}) {
    // Compute cell position in grid
    const col = index !== undefined && cols ? index % cols : 0;
    const row = index !== undefined && cols ? Math.floor(index / cols) : 0;
    const x0 = col * ((cellWidth ?? 128) + (gapX ?? 36));
    const y0 = row * ((cellHeight ?? 128) + (gapY ?? 36));
    const w = cellWidth ?? 128;
    const h = cellHeight ?? 128;

    // Torch logic
    let torch: { x: number; y: number } | null = null;
    const torchRadius = 100;
    if (mouse) {
        // Find the closest point on the cell's bounding box to the mouse
        const closestX = Math.max(x0, Math.min(mouse.x, x0 + w));
        const closestY = Math.max(y0, Math.min(mouse.y, y0 + h));
        const dx = mouse.x - closestX;
        const dy = mouse.y - closestY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < torchRadius) {
            // Position relative to cell
            torch = {
                x: mouse.x - x0,
                y: mouse.y - y0,
            };
        }
    }

    return (
        <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
        >
            {/* Black & white logo */}
            <Image
                src={`/model-logos/${logo}`}
                alt={logo.replace(/\.svg$/, "")}
                fill
                className="object-contain grayscale contrast-200 select-none pointer-events-none border p-6"
                draggable={false}
                style={{ zIndex: 1 }}
            />
            {/* Colored torch effect */}
            {torch && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        zIndex: 2,
                        WebkitMaskImage: `radial-gradient(circle 100px at ${torch.x}px ${torch.y}px, white 99%, transparent 100%)`,
                        maskImage: `radial-gradient(circle 100px at ${torch.x}px ${torch.y}px, white 99%, transparent 100%)`,
                    }}
                    initial={false}
                    animate={{}}
                    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                >
                    <Image
                        src={`/model-logos/${logo}`}
                        alt={logo.replace(/\.svg$/, "")}
                        fill
                        className="object-contain select-none pointer-events-none border p-6"
                        draggable={false}
                        style={{ zIndex: 2 }}
                    />
                </motion.div>
            )}
        </div>
    );
}
