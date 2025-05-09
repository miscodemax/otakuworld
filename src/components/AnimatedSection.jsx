import { motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // L'élément commence légèrement plus bas
      animate={{ opacity: 1, y: 0 }} // Se déplace à sa position initiale
      transition={{ duration: 1, delay, ease: 'easeOut' }} // Plus long et plus fluide
      whileInView={{ opacity: 1, y: 0 }} // L'élément devient visible et se déplace en fonction du scroll
      viewport={{ once: true }} // Déclenche l'animation une seule fois
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

