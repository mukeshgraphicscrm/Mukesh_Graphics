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

const Marquee = () => {
  return (
    <div className="bg-[#110D0A] py-6 overflow-hidden relative flex">
      <div className="flex w-max animate-marquee">
        
        {/* First set of items */}
        <div className="flex items-center flex-shrink-0">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[#FFFDF9] font-serif font-bold text-xl md:text-[22px] tracking-wide whitespace-nowrap px-10">
                {item}
              </span>
              {/* Star separator SVG matching the screenshot */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-orange shrink-0">
                <path d="M12 2L14.24 9.76L22 12L14.24 14.24L12 22L9.76 14.24L2 12L9.76 9.76L12 2Z" fill="currentColor"/>
              </svg>
            </React.Fragment>
          ))}
        </div>
        
        {/* Duplicated set for seamless infinite scroll */}
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
  );
};

export default Marquee;
