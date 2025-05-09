import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import InfiniteCarousel from "./components/infinitecarousel";
import NewTop from "./components/New-top";
import TopCharacters from "./components/characters";
import AnimatedSection from "./components/AnimatedSection";
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.main className="pt-20 min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Navbar />
      <section className="flex-grow grid grid-cols-1 justify-items-center gap-10">
        <AnimatedSection delay={0.2}>
          <InfiniteCarousel />
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <NewTop />
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <TopCharacters />
        </AnimatedSection>
      </section>
      <Footer />
    </motion.main>
  );
}

export default App;
