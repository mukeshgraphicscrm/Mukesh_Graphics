import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Printer, ShieldCheck, Leaf, Factory, Truck, IndianRupee, Layers, Cpu, BadgeCheck } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Features = () => {
  const features = [
    { icon: <Ruler size={24} />, title: "Custom Box Sizes", desc: "Any dimension, any specification — engineered to your product." },
    { icon: <Printer size={24} />, title: "Premium Printing", desc: "Offset, digital, flexo & UV printing at photographic quality." },
    { icon: <ShieldCheck size={24} />, title: "Strong & Durable", desc: "Multi-ply corrugation and rigid boards built to survive transit." },
    { icon: <Leaf size={24} />, title: "Eco-Friendly", desc: "Recyclable kraft, FSC-certified stocks and water-based inks." },
    { icon: <Factory size={24} />, title: "Bulk Manufacturing", desc: "Modern facility with high-volume capacity for enterprise orders." },
    { icon: <Truck size={24} />, title: "Fast Delivery", desc: "Pan India dispatch with tight lead times you can plan around." },
    { icon: <IndianRupee size={24} />, title: "Affordable Pricing", desc: "Factory-direct rates without compromising on quality." },
    { icon: <Layers size={24} />, title: "Precision Finishing", desc: "Foil, spot UV, embossing and lamination executed flawlessly." },
    { icon: <Cpu size={24} />, title: "Modern Facility", desc: "Automated die-cutters, presses and inline QC systems." },
    { icon: <BadgeCheck size={24} />, title: "Quality Assured", desc: "Every batch inspected — dimensional, print and burst tested." },
  ];

  return (
    <section className="py-24 bg-[#FDF3E7] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F48B43]/30 bg-[#F48B43]/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F48B43]"></span>
                  <span className="text-[0.7rem] font-bold text-[#F48B43] uppercase tracking-[0.15em]">Why Mukesh Graphics</span>
                </motion.div>
                <motion.h3 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-[3.25rem] font-serif font-bold leading-[1.1] mb-8 text-[#1A1A1A] tracking-tight">
                  Craftsmanship <br className="hidden lg:block" />
                  you can <span className="text-[#F48B43] font-normal">feel</span> in <br className="hidden lg:block" />
                  every fold.
                </motion.h3>
                <motion.p variants={fadeInUp} className="text-[#595959] text-[1.05rem] leading-[1.8] font-medium pr-4">
                  Two decades of packaging expertise, distilled into a manufacturing process that obsesses over strength, print, finish and speed — so your product always arrives looking exactly like your brand.
                </motion.p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 grid sm:grid-cols-2 gap-5"
          >
            {features.map((feature, idx) => (
              <motion.div
                variants={fadeInUp}
                key={idx}
                className="p-6 md:p-7 rounded-[1.75rem] bg-white border border-[#F2F2F2] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(244,139,67,0.12)] hover:border-[#F48B43]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#F48B43]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-full bg-[#FDF3EA] group-hover:bg-[#F48B43] flex items-center justify-center text-[#F48B43] group-hover:text-white mb-5 transition-all duration-300">
                    {React.cloneElement(feature.icon, { size: 20, strokeWidth: 1.5 })}
                  </div>
                  <h4 className="text-[1.15rem] font-serif font-bold text-[#1A1A1A] mb-2">{feature.title}</h4>
                  <p className="text-[#666666] text-[0.85rem] leading-[1.6]">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
