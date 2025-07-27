"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

// --- Pricing Data ---
const pricingPlans = [
    {
        name: "Light",
        price: "₹765",
        credits: "360",
        description: "Perfect for getting started",
        popular: false,
    },
    {
        name: "Regular",    
        price: "₹2040",
        credits: "960",
        description: "For regular users and creators",
        popular: true,
    },
    {
        name: "Power",
        price: "₹3060",
        credits: "1440",
        description: "Best for power users and creators",
        popular: false,
    },
];

// --- PricingSection Component ---
export default function PricingSection() {
    return (
        <section
            id="pricing"
            className="w-full max-w-[60vw] mx-auto bg-background"
        >
            {/* Header */}
            <div className="text-left mb-16">
                <h2 className="text-3xl font-bold font-mono mb-4">
                    Pricing & Access
                </h2>
                <p className="text-xl text-muted-foreground font-mono max-w-2xl">
                    Use pay-as-you-go credits or switch to subscriptions anytime.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                    <PricingCard key={plan.name} plan={plan} index={index} />
                ))}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-12">
                <p className="text-muted-foreground font-mono">
                    All plans include full access to all features and models.
                </p>
            </div>
        </section>
    );
}

// --- PricingCard Component ---
function PricingCard({ plan, index }: { plan: typeof pricingPlans[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative p-8 border rounded-none ${plan.popular
                ? "border-cyan-500 bg-accent/20"
                : "border-border bg-card"
                }`}
        >
            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-500 text-primary px-4 py-1 text-sm font-mono">
                        Most Popular
                    </span>
                </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-mono mb-2">{plan.name}</h3>
                <p className="text-muted-foreground font-mono">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold font-mono">{plan.price}</span>
                    <span className="text-muted-foreground font-mono ml-1">/month</span>
                </div>
                <p className="text-lg text-muted-foreground font-mono mt-2">
                    {plan.credits} credits included
                </p>
            </div>

            {/* Features List */}
            <div className="mb-8">
                <ul className="space-y-3">
                    <li className="flex items-center font-mono">
                        <span className="text-cyan-500 mr-2">✓</span>
                        All AI models access
                    </li>
                    <li className="flex items-center font-mono">
                        <span className="text-cyan-500 mr-2">✓</span>
                        Image, video & 3D generation
                    </li>
                    <li className="flex items-center font-mono">
                        <span className="text-cyan-500 mr-2">✓</span>
                        Project organization
                    </li>
                    <li className="flex items-center font-mono">
                        <span className="text-cyan-500 mr-2">✓</span>
                        Media enhancements
                    </li>
                    <li className="flex items-center font-mono">
                        <span className="text-cyan-500 mr-2">✓</span>
                        Explore gallery access
                    </li>
                </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center">
                <Button
                    className={`w-full p-4 text-lg font-semibold font-mono rounded-none ${plan.popular
                        ? "bg-cyan-500 hover:bg-cyan-600 text-primary"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        }`}
                >
                    Get Started
                </Button>
            </div>
        </motion.div>
    );
}
