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

            <motion.h3 variants={fadeInUp} className="text-4xl md:text-[4rem] font-serif font-bold leading-[1.1] text-[#111111]">
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
          className="flex flex-col md:flex-row gap-6 w-full"
        >
          {/* Column 1 */}
          <div className="flex-1 flex flex-col">
            <motion.div variants={scaleUp} className="rounded-[2rem] overflow-hidden shadow-xl h-full w-full aspect-[3/4] md:aspect-auto relative group cursor-pointer">
              <img src="/images/gallery_left.png" alt="Box Stack" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="px-5 py-2.5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
                  Cosmetic Cartons
                </span>
              </div>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-6">
            <motion.div variants={scaleUp} className="rounded-[2rem] overflow-hidden shadow-lg aspect-square w-full relative group cursor-pointer">
              <img src="/images/gallery_top_mid.png" alt="Gift Boxes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="px-5 py-2.5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
                  Gift Boxes
                </span>
              </div>
            </motion.div>
            <motion.div variants={scaleUp} className="rounded-[2rem] overflow-hidden shadow-lg aspect-[4/3] w-full relative group cursor-pointer">
              <img src="/images/gallery_bot_mid.png" alt="Custom Logo Box" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="px-5 py-2.5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
                  Branded Packaging
                </span>
              </div>
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 flex flex-col gap-6">
            <motion.div variants={scaleUp} className="rounded-[2rem] overflow-hidden shadow-lg aspect-[4/3] w-full relative group cursor-pointer">
              <img src="/images/gallery_top_right.png" alt="Factory Floor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="px-5 py-2.5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
                  Factory View
                </span>
              </div>
            </motion.div>
            <motion.div variants={scaleUp} className="rounded-[2rem] overflow-hidden shadow-lg aspect-square w-full relative group cursor-pointer">
              <img src="/images/gallery_bot_right.png" alt="Floating Box" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="px-5 py-2.5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
                  Custom Projects
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
