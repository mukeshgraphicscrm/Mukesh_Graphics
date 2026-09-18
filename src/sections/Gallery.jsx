import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

const galleryItems = [
  { src: '/images/img_masala_box.jpeg', label: 'Masala Box', cat: 'Food Packaging' },
  { src: '/images/img_candy_box.jpeg', label: 'Candy Box', cat: 'Ice Cream Packaging' },
  { src: '/images/img_pharma_box.jpeg', label: 'Pharmaceutical Box', cat: 'Pharma Packaging' },
  { src: '/images/img_perfume_box.jpeg', label: 'Perfume Box', cat: 'Luxury Packaging' },
  { src: '/images/img_electronic_box.jpeg', label: 'Electronic Box', cat: 'Electronics Packaging' },
  { src: '/images/img_pizza_box.jpeg', label: 'Pizza Box', cat: 'Food Packaging' },
  { src: '/images/img_cone_sleeve.jpeg', label: 'Cone Sleeve', cat: 'Ice Cream Packaging' },
  { src: '/images/img_1ltr_box.jpeg', label: '1 Ltr Box', cat: 'Ice Cream Packaging' },
  { src: '/images/img_haircare_box.jpeg', label: 'Hair Care Box', cat: 'Cosmetic Packaging' },
  { src: '/images/img_food_box.jpeg', label: 'Food Box', cat: 'Food Packaging' },
  { src: '/images/img_cake_box.jpeg', label: 'Cake Box', cat: 'Ice Cream Packaging' },
  { src: '/images/img_instant_mix_box.jpeg', label: 'Instant Mix Box', cat: 'Food Packaging' },
  { src: '/images/img_agriculture_box.jpeg', label: 'Agriculture Box', cat: 'Agriculture Packaging' },
  { src: '/images/img_chowpati_box.jpeg', label: 'Chowpati Box', cat: 'Ice Cream Packaging' },
  { src: '/images/img_punjabi_cup.jpeg', label: 'Punjabi Cup', cat: 'Ice Cream Packaging' },
];

const GalleryCard = ({ item, className = '' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={scaleUp}
      className={`rounded-[1.75rem] overflow-hidden shadow-md relative group cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="inline-block px-4 py-2 bg-[#FF7B3B]/90 backdrop-blur-sm text-white text-[0.7rem] font-bold uppercase tracking-[0.12em] rounded-full mb-1.5">
          {item.cat}
        </span>
        <div className="text-white font-serif font-bold text-[1.1rem] leading-tight drop-shadow">
          {item.label}
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-[95%]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <h2 className="text-[0.75rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Our Work</h2>
            </motion.div>
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-[4rem] font-serif font-bold leading-[1.1] text-[#111111]">
              Work worth <span className="text-brand-orange">unboxing.</span>
            </motion.h3>
          </div>
          <motion.p variants={fadeInUp} className="text-[0.95rem] text-gray-500 max-w-[400px] md:pb-3">
            A glimpse into our recent production runs — from vibrant food packaging to elegant luxury cartons, each box crafted to perfection.
          </motion.p>
        </motion.div>

        {/* 3-column masonry-style grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Column 1 — tall + short */}
          <div className="flex flex-col gap-5">
            <GalleryCard item={galleryItems[0]} className="aspect-[3/4] w-full" />
            <GalleryCard item={galleryItems[1]} className="aspect-square w-full" />
            <GalleryCard item={galleryItems[2]} className="aspect-[4/3] w-full" />
          </div>

          {/* Column 2 — short + tall + short */}
          <div className="flex flex-col gap-5">
            <GalleryCard item={galleryItems[3]} className="aspect-[4/3] w-full" />
            <GalleryCard item={galleryItems[4]} className="aspect-[3/4] w-full" />
            <GalleryCard item={galleryItems[5]} className="aspect-square w-full" />
          </div>

          {/* Column 3 — square + tall + wide */}
          <div className="flex flex-col gap-5">
            <GalleryCard item={galleryItems[6]} className="aspect-square w-full" />
            <GalleryCard item={galleryItems[7]} className="aspect-[3/4] w-full" />
            <GalleryCard item={galleryItems[8]} className="aspect-[4/3] w-full" />
          </div>
        </motion.div>

        {/* Bottom row — 4 equal cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5"
        >
          {galleryItems.slice(9, 13).map((item, i) => (
            <GalleryCard key={i} item={item} className="aspect-[3/4] w-full" />
          ))}
        </motion.div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">Showing 13 of 25+ product categories</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF954B] to-[#FF6B2B] text-white px-8 py-3.5 rounded-full text-[14px] font-bold hover:from-[#FFA25B] hover:to-[#FF7B3B] transition-all shadow-lg shadow-orange-500/30"
          >
            Request Custom Samples <span className="text-xl leading-none font-normal">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
