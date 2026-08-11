import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen w-full selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
