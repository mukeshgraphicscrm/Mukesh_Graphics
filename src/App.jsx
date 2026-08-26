import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const Home = () => (
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
);

function App() {
  return (
    <div className="min-h-screen w-full selection:bg-brand-orange selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
