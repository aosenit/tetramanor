// DEPRECATED: Do not use in user-facing (non-admin) pages. Use skeleton loaders instead for all loading states.
// This Loader is retained for admin or fallback contexts only.
"use client";

import Image from "next/image";
import logo from "../assets/home/logo.webp";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 px-4">
        {/* Admin logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image src={logo} alt="logo" width={100} height={100} />
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Tetramanor
          </h2>
          <p className="text-sm text-gray-600">Loading...</p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-green-500 rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
