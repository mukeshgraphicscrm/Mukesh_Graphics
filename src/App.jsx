import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Solutions from './sections/Solutions';
import Industries from './sections/Industries';
import Process from './sections/Process';
import Stats from './sections/Stats';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import Careers from './pages/Careers';

const pageVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(8px)" },
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -15, filter: "blur(8px)" }
};

const pageTransition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.6
};

const Home = () => (
  <motion.main
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Hero />
    <Marquee />
    <Features />
    <Solutions />
    <Industries />
    <Process />
    <Stats />
    <Gallery />
    <Testimonials />
    <Contact />
  </motion.main>
);

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full selection:bg-brand-orange selection:text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
