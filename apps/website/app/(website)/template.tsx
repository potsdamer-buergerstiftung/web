"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
            <motion.div
                initial={{ y: "1rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                exit={{ y: "1rem", opacity: 0 }}
            >
                {children}
            </motion.div>
    );
}