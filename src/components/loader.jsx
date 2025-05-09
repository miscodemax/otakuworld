import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        className="text-4xl md:text-6xl font-bold tracking-wide"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Otakuworld
        </span>
      </motion.div>

      {/* Sparkle effect */}
      <motion.div
        className="absolute top-1/2 right-1/2 w-4 h-4 rounded-full bg-pink-400 opacity-80 shadow-lg"
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Optional chibi emoji/icon */}
      <motion.div
        className="absolute bottom-16 text-6xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        🐱‍👤
      </motion.div>
    </div>
  );
};

export default Loader;
