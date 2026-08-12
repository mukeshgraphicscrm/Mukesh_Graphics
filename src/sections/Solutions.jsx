import React from 'react';
import { motion } from 'framer-motion';
import { Box, Palette, Coffee, Sparkles, Pill, Cpu, Shirt, Gift, Package, Globe2, Gem, PenTool, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Solutions = () => {
  const solutions = [
    { span: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", icon: <Box size={24} />, title: "Corrugated Boxes", desc: "3-ply, 5-ply & 7-ply strength-engineered cartons." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Palette size={24} />, title: "Printed Packaging", desc: "Offset & digital, edge-to-edge color." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Coffee size={24} />, title: "Food Packaging", desc: "Food-safe stocks & barrier coatings." },
    { span: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", icon: <Sparkles size={24} />, title: "Cosmetic Boxes", desc: "Foil, deboss & silk lamination." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Pill size={24} />, title: "Pharmaceutical", desc: "Compliant cartons with batch coding." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Cpu size={24} />, title: "Electronics", desc: "Anti-static, EPE-fit inserts." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Shirt size={24} />, title: "Garment Packaging", desc: "Retail-ready folding cartons." },
    { span: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", icon: <Gift size={24} />, title: "Gift Boxes", desc: "Rigid, magnetic-close & drawer boxes." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Package size={24} />, title: "Shipping Cartons", desc: "Bulk export-grade cartons." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <Globe2 size={24} />, title: "Export Packaging", desc: "ISPM-15 & humidity resistant." },
    { span: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", icon: <Gem size={24} />, title: "Luxury Rigid Boxes", desc: "Museum-grade unboxing experiences." },
    { span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", icon: <PenTool size={24} />, title: "Fully Custom", desc: "Design → die-line → production." },
  ];

  return (
    <section id="solutions" className="py-24 bg-black text-white relative">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-3xl">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <h2 className="text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Our Packaging Solutions</h2>
            </motion.div>
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-[4rem] font-serif font-bold leading-[1.1]">
              A packaging line for<br />
              <span className="text-brand-orange">every product</span> you make.
            </motion.h3>
          </div>
          <motion.p variants={fadeInUp} className="text-[0.95rem] text-gray-400 max-w-[400px] pb-2">
            Twelve production lines, one uncompromising standard. Choose from ready categories or bring us a die-line — we manufacture it exactly to spec.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ gridAutoFlow: 'dense', gridAutoRows: '220px' }}
        >
          {solutions.map((solution, idx) => (
            <motion.div 
              variants={fadeInUp}
              key={idx} 
              className={`p-7 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-brand-orange hover:shadow-[0_8px_30px_rgba(255,127,63,0.1)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden ${solution.span}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,127,63,0.2),transparent_250px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-[50px] h-[50px] rounded-full bg-[#1a0f08] group-hover:bg-brand-orange flex items-center justify-center text-brand-orange group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {solution.icon}
                </div>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-gray-600 transition-colors duration-300 group-hover:text-brand-orange" />
              </div>
              <div className="relative z-10">
                <h4 className="text-[1.35rem] font-serif font-bold mb-2 text-white">{solution.title}</h4>
                <p className="text-[0.9rem] text-gray-400 leading-relaxed">{solution.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
