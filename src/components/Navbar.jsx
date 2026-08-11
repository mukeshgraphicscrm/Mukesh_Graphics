import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Package } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#process' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 z-50 w-[95%] max-w-[1350px] transition-all duration-300 ${isScrolled ? 'top-4' : 'top-8'}`}
    >
      <div className={`px-8 flex items-center justify-between rounded-[2rem] transition-all duration-300 ${isScrolled ? 'bg-[#FFFDF9]/60 backdrop-blur-xl py-3.5 shadow-sm border border-white/40' : 'bg-transparent py-3 border border-[#1F1916]/10'}`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white">
            {/* Custom 3D Box SVG matching the logo */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <span className="font-serif font-bold text-[24px] tracking-tight text-brand-dark">
            Mukesh <span className="text-brand-orange font-medium">Graphics</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-[14px] font-medium text-gray-700 hover:text-[#FF7B3B] hover:bg-[#FF7B3B]/15 px-5 py-2 rounded-full transition-all duration-300 tracking-wide"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center"
        >
          <a href="#contact" className="bg-[#1F1916] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-[#FF7B3B] transition-colors shadow-[0_4px_14px_rgba(31,25,22,0.2)]">
            Get a Quote &rarr;
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 mt-4 rounded-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-orange text-white px-6 py-3 rounded-full text-center font-medium mt-2">
            Get a Quote
          </a>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
