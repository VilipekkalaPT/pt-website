"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

interface ServiceSectionProps {
  title: string;
  subtitle: string;
  services: string[];
}

export default function ServiceSection({
  title,
  subtitle,
  services,
}: ServiceSectionProps) {
  return (
    <div className="mt-20 flex flex-col items-center">
      <ArrowDownIcon className="size-10 text-icon-secondary flex items-center" />
      <p className="text-2xl font-medium mt-8">{title}</p>
      <p className="text-xl mt-2 text-text-secondary">{subtitle}</p>
      <div className="w-full mt-10 overflow-x-hidden">
        <div className="w-full flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex whitespace-nowrap"
          >
            {[...services, ...services].map((goal, index) => (
              <p
                key={index}
                className="px-16 text-text-secondary text-center inline-block"
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
