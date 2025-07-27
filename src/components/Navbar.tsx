'use client'
import * as React from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
    let timer: ReturnType<typeof setTimeout>;
    return ((...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    }) as T;
}

export function Navbar() {
    const [show, setShow] = React.useState(true);
    const lastScrollY = React.useRef(0);
    const scrollUpThreshold = 10;

    React.useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            // Always hide if not in top section
            if (currentY > 100) {
                // Only show if scrolling up by threshold
                if (lastScrollY.current - currentY > scrollUpThreshold) {
                    setShow(true);
                } else if (currentY > lastScrollY.current) {
                    setShow(false);
                }
            } else {
                setShow(true);
            }
            lastScrollY.current = currentY;
        };
        const debounced = debounce(handleScroll, 10);
        window.addEventListener('scroll', debounced, { passive: true });
        return () => window.removeEventListener('scroll', debounced);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 mt-4"
            initial={{ opacity: 0, y: -32, filter: 'blur(8px)' }}
            animate={{
                opacity: show ? 1 : 0,
                y: show ? 0 : -64,
                filter: show ? 'blur(0px)' : 'blur(8px)',
                pointerEvents: show ? 'auto' : 'none',
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <nav className="w-full flex items-center justify-between px-4 bg-background/40 backdrop-blur-4xl border max-w-[60vw] mx-auto">
                {/* Logo on the left */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/Logo/logo.svg" alt="Logo" width={32} height={32} />
                        <span className="font-semibold text-xl font-mono">LumyraFX</span>
                    </Link>
                </div>

                {/* Navigation links in the middle */}
                <div className="flex items-center gap-12 py-4 px-6">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/about", label: "About" },
                        { href: "/features", label: "Features" },
                        { href: "/contact", label: "Contact" },
                    ].map((link) => (
                        <div
                            key={link.href}
                            style={{ display: 'inline-block' }}
                        >
                            <Link
                                href={link.href}
                                className="text-lg px-3 py-2 font-medium font-mono text-muted-foreground hover:text-primary relative group transition-colors duration-300"
                                style={{ display: 'inline-block' }}
                            >
                                <span>{link.label}</span>
                                <motion.span
                                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-cyan-500 origin-left scale-x-0 group-hover:scale-x-100 "
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    style={{ display: 'block' }}
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA button on the right */}
                <div className="flex items-center gap-4">
                    <Button
                        className="p-8 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer text-primary rounded-none font-mono"
                        asChild
                    >
                        <a className="text-white" href="/login">Try it now</a>
                    </Button>
                </div>
            </nav>
        </motion.div>
    );
} 