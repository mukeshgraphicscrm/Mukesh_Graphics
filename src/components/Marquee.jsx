import React from 'react';

const items = [
  "Mono Carton Luxury Boxes",
  "Cosmetic Packaging",
  "Food & Beverage",
  "Pharma Cartons",
  "Export Cartons",
  "Custom Die-Cut",
  "Offset & Digital Print",
  "Eco-Friendly Packaging"
];

// Image cards for image marquee strip
const imageItems = [
  { src: '/images/img_masala_box.jpeg', label: 'Masala Box' },
  { src: '/images/img_candy_box.jpeg', label: 'Candy Box' },
  { src: '/images/img_perfume_box.jpeg', label: 'Perfume Box' },
  { src: '/images/img_electronic_box.jpeg', label: 'Electronics Box' },
  { src: '/images/img_pharma_box.jpeg', label: 'Pharma Box' },
  { src: '/images/img_pizza_box.jpeg', label: 'Pizza Box' },
  { src: '/images/img_cake_box.jpeg', label: 'Cake Box' },
  { src: '/images/img_haircare_box.jpeg', label: 'Hair Care Box' },
  { src: '/images/img_instant_mix_box.jpeg', label: 'Instant Mix Box' },
  { src: '/images/img_matka_box.jpeg', label: 'Matka Box' },
];

const Marquee = () => {
  return (
    <div className="overflow-hidden">
      {/* Text ticker strip */}
      <div className="bg-[#110D0A] py-5 overflow-hidden relative flex">
        <div className="flex w-max animate-marquee">
          <div className="flex items-center flex-shrink-0">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#FFFDF9] font-serif font-bold text-xl md:text-[22px] tracking-wide whitespace-nowrap px-10">
                  {item}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-orange shrink-0">
                  <path d="M12 2L14.24 9.76L22 12L14.24 14.24L12 22L9.76 14.24L2 12L9.76 9.76L12 2Z" fill="currentColor"/>
                </svg>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center flex-shrink-0">
            {items.map((item, idx) => (
              <React.Fragment key={'dup-' + idx}>
                <span className="text-[#FFFDF9] font-serif font-bold text-xl md:text-[22px] tracking-wide whitespace-nowrap px-10">
                  {item}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-orange shrink-0">
                  <path d="M12 2L14.24 9.76L22 12L14.24 14.24L12 22L9.76 14.24L2 12L9.76 9.76L12 2Z" fill="currentColor"/>
                </svg>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Product image ticker strip — scrolls in reverse direction */}
      <div className="bg-[#FFF8F0] py-4 overflow-hidden relative flex border-y border-orange-100">
        <div className="flex w-max animate-marquee-reverse">
          {/* First set */}
          <div className="flex items-center gap-4 flex-shrink-0 px-4">
            {imageItems.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </div>
                <span className="text-[0.75rem] font-bold text-gray-700 whitespace-nowrap pr-1">{img.label}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-4 flex-shrink-0 px-4">
            {imageItems.map((img, idx) => (
              <div key={'d-' + idx} className="flex-shrink-0 flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </div>
                <span className="text-[0.75rem] font-bold text-gray-700 whitespace-nowrap pr-1">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
