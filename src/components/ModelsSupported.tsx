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

    // Responsive grid constants
    const gap = 24; // px, equal gap for x and y
    const minCell = 80; // px, minimum cell size
    const maxCell = 128; // px, maximum cell size

    return (
        <section className="w-full max-w-[60vw] mx-auto">
            <h2 className="text-3xl font-bold font-mono mb-16">Supported Models and Providers</h2>
            <div
                ref={gridRef}
                className="grid justify-items-center items-center relative"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${minCell}px, 1fr))`,
                    gap: `${gap}px`,
                    userSelect: "none",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {logos.map((logo) => (
                    <LogoTorchCell
                        key={logo}
                        logo={logo}
                        mouse={mouse}
                        gridRef={gridRef as React.RefObject<HTMLDivElement>}
                        minCell={minCell}
                        maxCell={maxCell}
                    />
                ))}
            </div>
            <Separator className="my-16" />
        </section>
    );
}

function LogoTorchCell({ logo, mouse, gridRef, minCell, maxCell }: {
    logo: string;
    mouse?: { x: number; y: number } | null;
    gridRef: React.RefObject<HTMLDivElement>;
    minCell?: number;
    maxCell?: number;
}) {
    // Responsive cell size
    const [cellSize, setCellSize] = React.useState(maxCell ?? 128);
    const cellRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!cellRef.current) return;
        // Get actual cell size from DOM
        const resize = () => {
            if (cellRef.current) {
                const rect = cellRef.current.getBoundingClientRect();
                setCellSize(rect.width);
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Torch logic
    let torch: { x: number; y: number } | null = null;
    const torchRadius = Math.max(cellSize * 0.8, 80); // Responsive torch radius
    if (mouse && cellRef.current && gridRef?.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const cellRect = cellRef.current.getBoundingClientRect();
        const x0 = cellRect.left - gridRect.left;
        const y0 = cellRect.top - gridRect.top;
        const w = cellRect.width;
        const h = cellRect.height;
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
            ref={cellRef}
            className="relative flex items-center justify-center aspect-square"
            style={{
                width: `clamp(${minCell ?? 80}px, 100%, ${maxCell ?? 128}px)`,
                minWidth: `${minCell ?? 80}px`,
                maxWidth: `${maxCell ?? 128}px`,
                height: `auto`,
                pointerEvents: 'none',
            }}
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
                        WebkitMaskImage: `radial-gradient(circle ${torchRadius}px at ${torch.x}px ${torch.y}px, white 99%, transparent 100%)`,
                        maskImage: `radial-gradient(circle ${torchRadius}px at ${torch.x}px ${torch.y}px, white 99%, transparent 100%)`,
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
