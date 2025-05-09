
import InfiniteCarousel from "../components/infinitecarousel";
import NewTop from "../components/New-top";
import TopCharacters from "../components/characters";
import AnimatedSection from "../components/AnimatedSection";
import NewsCarousel from "../components/Newcarousel";
import WitCarousel from "../components/Witcarousel";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <NewsCarousel />
      <section className="flex-grow grid grid-cols-1 justify-items-center gap-10">
        <AnimatedSection delay={0.2} type="slideUp">
          <InfiniteCarousel />
        </AnimatedSection>
        <AnimatedSection delay={0.4} type="zoom">
          <NewTop />
        </AnimatedSection>
        <AnimatedSection delay={0.6} type="slideDiagonal">
          <TopCharacters />
        </AnimatedSection>
      </section>
      <WitCarousel />
    </>
  );
}


