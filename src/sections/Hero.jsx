import { ShieldCheck, Factory, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { smoothScroll } from '../utils/smoothScroll';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-gradient-to-r from-[#FFD1A6] via-[#FFFDF9] to-[#FFCE9E]">

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
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-[#FF7B3B]/30 text-[#FF7B3B] font-bold text-[11px] tracking-[0.15em] uppercase mb-6 lg:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B3B]" />
              CUSTOM PACKAGING MANUFACTURER • SINCE 2004
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-[3.2rem] lg:text-[4.8rem] font-serif font-bold leading-[1.02] tracking-tighter mb-6 lg:mb-8 text-[#1F1916]">
              Boxes that <span className="text-[#FF7B3B] font-normal italic relative">protect,<svg className="absolute w-[105%] h-[12px] -bottom-1 -left-2 text-[#FF7B3B]/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg></span><br />impress<br />
              <span className="font-serif italic text-5xl md:text-6xl lg:text-[5.5rem] pr-2 font-medium tracking-normal">&amp;</span> elevate every<br />brand.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[17px] text-[#554B45] mb-8 lg:mb-10 max-w-[560px] leading-[1.6] font-normal">
              From small product boxes to heavy-duty industrial packaging, Mukesh Graphics manufactures high-quality custom boxes in every size, design and specification — crafted to strengthen your brand and protect your products.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-10 lg:mb-12">
              <motion.a onClick={(e) => smoothScroll(e, '#contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF954B] to-[#FF6B2B] text-white px-6 md:px-8 py-3.5 rounded-full text-[14px] font-bold hover:from-[#FFA25B] hover:to-[#FF7B3B] transition-all shadow-lg shadow-orange-500/30 cursor-pointer">
                Get a Free Quote <span className="text-xl leading-none font-normal mt-[-2px]">&rarr;</span>
              </motion.a>
              <motion.a onClick={(e) => smoothScroll(e, '#solutions')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#solutions" className="inline-flex items-center gap-2 bg-white text-[#1F1916] px-6 md:px-8 py-3.5 rounded-full text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
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
          <div className="relative h-full flex items-center justify-center lg:justify-end lg:-mt-4">
            <div className="relative w-full max-w-[520px] lg:max-w-[92%]">

              {/* Main large hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-900/20 aspect-[4/5] w-full relative"
              >
                <img
                  src="/images/img_masala_box.jpeg"
                  alt="Premium Custom Packaging by Mukesh Graphics"
                  className="w-full h-full object-cover"
                />
                {/* Subtle gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Bottom badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF954B] to-[#FF6B2B] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#1F1916] leading-tight">Premium Printed Packaging</div>
                      <div className="text-[10px] text-gray-500">Offset • Digital • Flexo • UV</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating accent image — top right */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-[46%] rounded-[1.5rem] overflow-hidden shadow-xl shadow-orange-900/20 aspect-[4/3] border-4 border-white"
              >
                <img
                  src="/images/img_perfume_box.jpeg"
                  alt="Luxury Perfume Packaging"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating accent image — bottom left */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-[44%] rounded-[1.5rem] overflow-hidden shadow-xl shadow-orange-900/20 aspect-square border-4 border-white"
              >
                <img
                  src="/images/img_electronic_box.jpeg"
                  alt="Electronics Packaging"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Stats badge — floating right middle */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-orange-900/15 border border-orange-50 hidden lg:flex flex-col items-center"
              >
                <span className="text-2xl font-serif font-bold text-[#FF7B3B] leading-none">20+</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Years</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
