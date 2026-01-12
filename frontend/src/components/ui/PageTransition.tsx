"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

// Determine swipe direction based on route order
const getRouteIndex = (path: string): number => {
    if (path === "/browse") return 0;
    if (path === "/studio") return 1;
    return -1;
};

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const routeIndex = getRouteIndex(pathname);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{
                    x: routeIndex === 1 ? "100%" : "-100%",
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                exit={{
                    x: routeIndex === 0 ? "100%" : "-100%",
                    opacity: 0
                }}
                transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
