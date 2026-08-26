import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Package } from 'lucide-react';
import { smoothScroll } from '../utils/smoothScroll';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          smoothScroll(e, href);
        }, 100);
      } else {
        smoothScroll(e, href);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#process' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 z-50 w-[95%] max-w-[1350px] transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}
    >
      <div className={`px-4 md:px-6 flex items-center justify-between rounded-[2rem] transition-all duration-300 ${isScrolled ? 'bg-[#FFFDF9]/70 backdrop-blur-xl py-2 shadow-sm border border-white/40' : 'bg-transparent py-2 border border-[#1F1916]/10'}`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={(e) => handleNavClick(e, '#root')}>
          <img src="/Title_Logo.png" alt="Mukesh Graphics Logo" className="w-8 h-8 object-contain" />
          <span className="font-serif font-bold text-xl md:text-[22px] tracking-tight text-brand-dark">
            Mukesh <span className="text-brand-orange font-medium">Graphics</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13.5px] font-medium text-gray-700 hover:text-[#FF7B3B] hover:bg-[#FF7B3B]/15 px-4 py-1.5 rounded-full transition-all duration-300 tracking-wide cursor-pointer"
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
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="bg-[#1F1916] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold hover:bg-[#FF7B3B] transition-colors shadow-[0_4px_14px_rgba(31,25,22,0.2)] cursor-pointer">
            Get a Quote &rarr;
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-[#1F1916] text-white relative w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl py-6 px-6 flex flex-col gap-5 mt-4 rounded-[2rem] origin-top border border-[#1F1916]/10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (i * 0.05), ease: "easeOut" }}
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[1.1rem] font-serif font-medium text-gray-800 cursor-pointer border-b border-gray-100 pb-3"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-[#1F1916] text-white px-6 py-4 rounded-full text-center font-bold mt-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
            >
              Get a Quote &rarr;
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
