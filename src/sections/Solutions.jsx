import React from 'react';
import { motion } from 'framer-motion';
import { Box, Palette, Coffee, Sparkles, Pill, Cpu, Shirt, Gift, Package, Globe2, Gem, PenTool, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Solutions = () => {
  const solutions = [
    { 
      span: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", 
      icon: <Box size={24} />, 
      title: "FBB Paper Boxes", 
      desc: "3-ply, 5-ply & 7-ply strength-engineered cartons.",
      img: "/images/img_food_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Palette size={24} />, 
      title: "Printed Packaging", 
      desc: "Offset & digital, edge-to-edge color.",
      img: "/images/img_masala_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Coffee size={24} />, 
      title: "Food Packaging", 
      desc: "Food-safe stocks & barrier coatings.",
      img: "/images/img_instant_mix_box.jpeg"
    },
    { 
      span: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", 
      icon: <Sparkles size={24} />, 
      title: "Cosmetic Boxes", 
      desc: "Foil, deboss & silk lamination.",
      img: "/images/img_haircare_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Pill size={24} />, 
      title: "Pharmaceutical", 
      desc: "Compliant cartons with batch coding.",
      img: "/images/img_pharma_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Cpu size={24} />, 
      title: "Electronics", 
      desc: "Anti-static, EPE-fit inserts.",
      img: "/images/img_electronic_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Shirt size={24} />, 
      title: "Garment Packaging", 
      desc: "Retail-ready folding cartons.",
      img: "/images/img_dangler_toran.jpeg"
    },
    { 
      span: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", 
      icon: <Gift size={24} />, 
      title: "Gift & Luxury Boxes", 
      desc: "Mono Carton, magnetic-close & drawer boxes.",
      img: "/images/img_perfume_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Package size={24} />, 
      title: "Shipping Cartons", 
      desc: "Bulk export-grade cartons.",
      img: "/images/img_punjabi_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <Globe2 size={24} />, 
      title: "Export Packaging", 
      desc: "ISPM-15 & humidity resistant.",
      img: "/images/img_agriculture_box.jpeg"
    },
    { 
      span: "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", 
      icon: <Gem size={24} />, 
      title: "Luxury Mono Carton Boxes", 
      desc: "Museum-grade unboxing experiences.",
      img: "/images/img_candy_box.jpeg"
    },
    { 
      span: "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", 
      icon: <PenTool size={24} />, 
      title: "Fully Custom", 
      desc: "Design → die-line → production.",
      img: "/images/img_pizza_box.jpeg"
    },
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
              className={`p-7 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-brand-orange/50 hover:shadow-[0_8px_30px_rgba(255,127,63,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden ${solution.span}`}
            >
              {/* Background product image — brightens on hover */}
              {solution.img && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src={solution.img}
                    alt={solution.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-90 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  {/* Dark overlay — fades out on hover to reveal image */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-all duration-500" />
                </div>
              )}

              {/* Icon + arrow — fade slightly on hover */}
              <div className="flex justify-between items-start mb-8 relative z-10 group-hover:opacity-40 group-hover:blur-[1px] transition-all duration-400">
                <div className="w-[50px] h-[50px] rounded-full bg-[#1a0f08] flex items-center justify-center text-brand-orange">
                  {solution.icon}
                </div>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-gray-600" />
              </div>

              {/* Text — blurs and fades on hover */}
              <div className="relative z-10 group-hover:opacity-30 group-hover:blur-[2px] transition-all duration-400">
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
