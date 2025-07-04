"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="w-16 h-16 bg-[#116114] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading...</h2>
          <p className="text-sm text-gray-600">Please wait while we prepare your content</p>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex space-x-1"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#116114] rounded-full"
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
