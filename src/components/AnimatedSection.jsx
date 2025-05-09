import { motion } from 'framer-motion';

const variants = {
  slideUp: { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 } },
  slideDiagonal: { initial: { opacity: 0, x: -50, y: 50 }, whileInView: { opacity: 1, x: 0, y: 0 } },
  zoom: { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 } },
};

const AnimatedSection = ({ children, delay = 0.2, type = "slideUp" }) => {
  const animation = variants[type] || variants.slideUp;

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.whileInView} // corrigé ici
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
