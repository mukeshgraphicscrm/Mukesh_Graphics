import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#110B08] text-white pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16 md:mb-20">
          <div className="md:col-span-2 md:pr-12">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <img src="/Title_Logo.png" alt="Mukesh Graphics Logo" className="w-7 h-7 object-contain" />
              <span className="font-serif font-bold text-[1.4rem] tracking-tight text-white">Mukesh <span className="text-brand-orange">Graphics</span></span>
            </div>
            <p className="text-[#9e968f] font-semibold text-[0.85rem] leading-[1.7] mb-8 md:pr-10">
              A premium custom packaging manufacturer, engineering<br className="hidden md:block" /> boxes for brands that care about how their products<br className="hidden md:block" /> arrive.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[#9e968f] text-[0.65rem] font-bold tracking-wider">
                IN
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[#9e968f] text-[0.65rem] font-bold tracking-wider">
                IG
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[#9e968f] text-[0.65rem] font-bold tracking-wider">
                FB
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[#9e968f] text-[0.65rem] font-bold tracking-wider">
                YT
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-[0.7rem] tracking-widest uppercase text-brand-orange mb-5">Solutions</h4>
            <ul className="space-y-[0.85rem] font-semibold text-[0.85rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">FBB Paper</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Mono Carton Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Food Packaging</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Cosmetic Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Custom Die-Cut</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-[0.7rem] tracking-widest uppercase text-brand-orange mb-5">Industries</h4>
            <ul className="space-y-[0.85rem] font-semibold text-[0.85rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">FMCG</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Pharma</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">E-Commerce</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Exports</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-[0.7rem] tracking-widest uppercase text-brand-orange mb-5">Company</h4>
            <ul className="space-y-[0.85rem] font-semibold text-[0.85rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Manufacturing</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[#7a746f]">
          <p className="text-[0.7rem] font-semibold">© 2026 Mukesh Graphics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic font-bold font-serif text-[0.95rem] text-[#9e968f]">Designed with precision, delivered with quality.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
