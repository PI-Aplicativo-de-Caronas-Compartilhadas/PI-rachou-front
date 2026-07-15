import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

export function CaronaText() {
  return (
    <div className="overflow-hidden max-w-lg">
      <motion.div
        className="flex items-center gap-2"
        animate={{
          x: ["-10%", "110%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1,
        }}
      >
        <FaCarSide
          className="text-ultrasonic-blue-400 text-2xl flex-shrink-0"
        />

        <span className="text-ultrasonic-blue-100 text-base md:text-lg lg:text-xl whitespace-nowrap">
          Eai, bora rachar essa carona?
        </span>
      </motion.div>
    </div>
  );
}