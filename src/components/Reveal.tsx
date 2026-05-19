"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
};

const buildVariants = (x: number, y: number): Variants => ({
  hidden: { opacity: 0, y, x },
  visible: { opacity: 1, y: 0, x: 0 },
});

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  x = 0,
  className = "",
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(x, y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
