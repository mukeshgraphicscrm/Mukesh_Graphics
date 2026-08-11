import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <h2 className="text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Gallery</h2>
            </motion.div>
            
            <motion.h3 variants={fadeInUp} className="text-5xl md:text-[4rem] font-serif font-bold leading-[1.1] text-[#111111]">
              Work worth <span className="text-brand-orange">unboxing.</span>
            </motion.h3>
          </div>
          <motion.p variants={fadeInUp} className="text-[0.95rem] text-gray-500 max-w-[400px] md:pb-3">
            A glimpse into recent runs — from print-forward cosmetic cartons to industrial shipping crates.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main Large Image */}
          <motion.div variants={scaleUp} className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-xl aspect-[3/4] md:aspect-auto">
            <img src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2938&auto=format&fit=crop" alt="Box Stack" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
          
          <motion.div variants={scaleUp} className="rounded-3xl overflow-hidden shadow-lg aspect-square">
            <img src="https://images.unsplash.com/photo-1607006411011-8c47101683cb?q=80&w=2940&auto=format&fit=crop" alt="Gift Boxes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
          
          <motion.div variants={scaleUp} className="rounded-3xl overflow-hidden shadow-lg aspect-square relative">
            <img src="https://images.unsplash.com/photo-1586940822998-6ce09d3bdf8a?q=80&w=2940&auto=format&fit=crop" alt="Factory Floor" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white font-medium">Facility view</div>
          </motion.div>
          
          <motion.div variants={scaleUp} className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2910&auto=format&fit=crop" alt="Corrugated" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
          
          <motion.div variants={scaleUp} className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-brand-dark p-8 flex items-center justify-center text-center">
            <div>
              <div className="text-3xl font-serif text-white mb-2">1,000+</div>
              <div className="text-brand-orange font-medium">Custom Projects</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
