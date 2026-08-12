import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Cpu, Shirt, Ship, Plane, Gift, Utensils, Sparkles } from 'lucide-react';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

const Industries = () => {
  const [activeTab, setActiveTab] = useState('fmcg');
  
  const tags = [
    'FMCG', 'Food & Beverage', 'Pharmaceuticals', 'Cosmetics',
    'Electronics', 'Garments', 'Retail', 'E-Commerce', 'Automotive',
    'Agriculture', 'Industrial', 'Exports'
  ];

  return (
    <section id="industries" className="py-24 bg-[#FDF3E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <h2 className="text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Industries We Serve</h2>
            </motion.div>
            
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-[4rem] font-serif font-bold leading-[1.1] mb-8 text-[#111111]">
              Trusted by brands<br />
              across <span className="text-brand-orange">twelve</span><br />
              <span className="text-brand-orange">industries.</span>
            </motion.h3>
            
            <motion.p variants={fadeInUp} className="text-[1.05rem] text-gray-600 leading-relaxed mb-10 max-w-xl">
              Whether it's a fragile electronic component, a temperature-sensitive pharma dose, or a luxury cosmetic launch — our packaging is engineered to the industry it lives in.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2.5 rounded-full bg-white text-[0.95rem] font-medium text-gray-900 border border-gray-200 shadow-sm cursor-pointer transition-colors duration-300 hover:bg-brand-orange/10 hover:border-brand-orange hover:text-brand-orange"
                >
                  {tag}
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-square flex items-center justify-center max-w-[500px] mx-auto w-full scale-90 sm:scale-100"
          >
            {/* Soft radial glow behind the center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,127,63,0.15),transparent_60%)] pointer-events-none" />
            
            {/* Outer Orbit (100% width) - Spins clockwise */}
            <div 
              className="absolute w-full h-full rounded-full border border-brand-orange/20"
              style={{ animation: 'spin 60s linear infinite' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 60s linear infinite reverse' }}>
                <Cpu size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 60s linear infinite reverse' }}>
                <Ship size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 60s linear infinite reverse' }}>
                <Gift size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 60s linear infinite reverse' }}>
                <Pill size={22} strokeWidth={1.5} />
              </div>
            </div>

            {/* Inner Orbit (70% width) - Spins counter-clockwise */}
            <div 
              className="absolute w-[70%] h-[70%] rounded-full border border-brand-orange/20"
              style={{ animation: 'spin 45s linear infinite reverse' }}
            >
              <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 45s linear infinite' }}>
                <Sparkles size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 45s linear infinite' }}>
                <Shirt size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 45s linear infinite' }}>
                <Plane size={22} strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-sm border border-brand-orange/15 text-brand-orange z-10" style={{ animation: 'spin 45s linear infinite' }}>
                <Utensils size={22} strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Central Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[136px] h-[136px] rounded-full bg-brand-orange flex flex-col items-center justify-center shadow-xl shadow-brand-orange/30 z-20">
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/90 mb-1">Serving</span>
              <span className="font-serif font-bold text-5xl text-white leading-none mb-1">12+</span>
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/90">Sectors</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Industries;
