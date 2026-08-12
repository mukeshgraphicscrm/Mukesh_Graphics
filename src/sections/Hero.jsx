import { ShieldCheck, Factory, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BoxSvg } from '../components/BoxSvg';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-r from-[#FFD1A6] via-[#FFFDF9] to-[#FFCE9E]">

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,123,59,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,123,59,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-[95%]">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-8 lg:gap-4 items-start justify-between">
          
          {/* Content */}
          <motion.div 
            className="lg:pt-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-[#FF7B3B]/30 text-[#FF7B3B] font-bold text-[11px] tracking-[0.15em] uppercase mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B3B]" />
              CUSTOM PACKAGING MANUFACTURER • SINCE 2004
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-[3.2rem] lg:text-[4.8rem] font-serif font-bold leading-[1.02] tracking-tighter mb-8 text-[#1F1916]">
              Boxes that <span className="text-[#FF7B3B] font-normal italic relative">protect,<svg className="absolute w-[105%] h-[12px] -bottom-1 -left-2 text-[#FF7B3B]/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg></span><br />impress<br />
              <span className="font-serif italic text-5xl md:text-6xl lg:text-[5.5rem] pr-2 font-medium tracking-normal">&amp;</span> elevate every<br />brand.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[17px] text-[#554B45] mb-12 max-w-[460px] leading-[1.6] font-normal">
              From small product boxes to heavy-duty industrial packaging, Mukesh Graphics manufactures high-quality custom boxes in every size, design and specification — crafted to strengthen your brand and protect your products.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-16">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="inline-flex items-center gap-2 bg-[#FF7B3B] text-white px-6 md:px-8 py-3.5 rounded-full text-[14px] font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20">
                Get a Free Quote <span className="text-xl leading-none font-normal mt-[-2px]">&rarr;</span>
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#solutions" className="inline-flex items-center gap-2 bg-white text-[#1F1916] px-6 md:px-8 py-3.5 rounded-full text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all">
                Explore Products <span className="text-xl leading-none font-normal mt-[-2px]">&rsaquo;</span>
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 md:gap-8 text-[13px] font-medium text-[#8B7355]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#FF7B3B]" />
                ISO-grade materials
              </div>
              <div className="flex items-center gap-2">
                <Factory size={18} className="text-[#FF7B3B]" />
                In-house manufacturing
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#FF7B3B]" />
                Pan India delivery
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visuals */}
          <div className="relative h-full flex items-start lg:-mt-4">
            <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#4A0B0B] to-[#1A0303] aspect-[4/4.8] shadow-2xl">

              {/* 3D Floating Boxes */}
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 left-8 w-32 h-32 -rotate-12 opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]" 
              >
                <BoxSvg open={true} dark={false} className="w-full h-full" />
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 rotate-6 opacity-100 drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]" 
              >
                <BoxSvg open={false} dark={true} className="w-full h-full" />
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 right-4 w-40 h-40 rotate-[25deg] opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]" 
              >
                <BoxSvg open={true} dark={true} className="w-full h-full" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
