"use client";

import { motion } from "framer-motion";

interface GoalSectionProps {
  title: string;
  goals: string[];
}

export default function GoalSection({ title, goals }: GoalSectionProps) {
  return (
    <div className="mt-35 px-12 text-center">
      <p className="text-2xl font-semibold mb-10">{title}</p>
      <div className="w-full overflow-x-hidden">
        <div className="flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex"
          >
            {[...goals, ...goals].map((goal, index) => (
              <p
                key={index}
                className="py-4 w-60 border bg-gray-50 rounded-full text-gray-500 mx-10"
              >
                {goal}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
