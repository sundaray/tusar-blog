"use client";

import { HTMLMotionProps, motion } from "framer-motion";

type MotionDivProps = HTMLMotionProps<"div">;

export function MotionDiv({ children, ref, ...props }: MotionDivProps) {
  return (
    <motion.div ref={ref} {...(props as HTMLMotionProps<"div">)}>
      {children}
    </motion.div>
  );
}
