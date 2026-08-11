import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

const Process = () => {
  const steps = [
    { num: "1", label: "Consultation" },
    { num: "2", label: "Design" },
    { num: "3", label: "Prototype" },
    { num: "4", label: "Printing" },
    { num: "5", label: "Die Cutting" },
    { num: "6", label: "Lamination" },
    { num: "7", label: "Quality Check" },
    { num: "8", label: "Delivery" },
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-4">Our Methodology</motion.h2>
          <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-medium leading-tight">
            Eight steps. <span className="text-brand-orange italic font-normal">Zero shortcuts.</span>
          </motion.h3>
        </motion.div>
        
        <div className="relative pt-8 pb-12 overflow-x-auto hide-scrollbar">
          {/* Connecting Line */}
          <div className="absolute top-[3.5rem] left-[5%] right-[5%] h-0.5 bg-orange-100 hidden md:block" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex md:justify-between gap-8 md:gap-4 min-w-max md:min-w-0 px-4 md:px-0"
          >
            {steps.map((step, idx) => (
              <motion.div variants={scaleUp} key={idx} className="relative flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-orange flex items-center justify-center text-brand-orange font-bold text-xl mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shadow-lg relative z-10">
                  {step.num}
                </div>
                <span className="text-[0.95rem] font-bold text-[#111111]">{step.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
