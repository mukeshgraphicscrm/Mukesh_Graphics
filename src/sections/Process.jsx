import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

const Process = () => {
  const steps = [
    { num: "01", label: "Consultation", desc: "We understand your product, brand, and goals." },
    { num: "02", label: "Design", desc: "Expert die-line & artwork crafted by our team." },
    { num: "03", label: "Prototype", desc: "Physical samples before full production starts." },
    { num: "04", label: "Printing", desc: "Offset, digital or UV printing at any volume." },
    { num: "05", label: "Die Cutting", desc: "Precision die-cutting for clean, sharp folds." },
    { num: "06", label: "Lamination", desc: "Matte, gloss, soft-touch or anti-scratch finish." },
    { num: "07", label: "Quality Check", desc: "Every batch inspected before it leaves the floor." },
    { num: "08", label: "Delivery", desc: "Pan-India delivery on time, every time." },
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative background image band */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-[0.04]">
          <img
            src="/images/img_food_box.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            <span className="text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Our Methodology</span>
          </motion.div>
          <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Eight steps. <span className="text-brand-orange italic font-normal">Zero shortcuts.</span>
          </motion.h3>
        </motion.div>
        
        {/* Horizontal scroll steps for mobile, grid for desktop */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div 
              variants={scaleUp} 
              key={idx} 
              className="group cursor-pointer p-6 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              <div className="font-serif font-bold text-5xl text-brand-orange/20 group-hover:text-brand-orange/40 transition-colors leading-none mb-4">
                {step.num}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FFF4EC] group-hover:bg-brand-orange flex items-center justify-center text-brand-orange group-hover:text-white transition-all duration-300 text-sm font-bold mb-4">
                {parseInt(step.num)}
              </div>
              <h4 className="text-[1.05rem] font-bold text-[#111111] mb-2">{step.label}</h4>
              <p className="text-[0.83rem] text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner with real packaging image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden relative h-[260px] shadow-xl"
        >
          <img
            src="/images/img_masala_box.jpeg"
            alt="Mukesh Graphics Production Floor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 md:px-16">
            <div className="text-white max-w-2xl">
              <h4 className="font-serif font-bold text-2xl md:text-3xl mb-3">Ready to start your order?</h4>
              <p className="text-white/70 text-sm mb-6">Get a quote in 24 hours. No minimums on sampling runs.</p>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#FF6B2B] transition-colors shadow-lg"
              >
                Get a Free Quote →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
