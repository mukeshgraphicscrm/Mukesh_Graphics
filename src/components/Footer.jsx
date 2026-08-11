import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#130c08] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <img src="/Title_Logo.png" alt="Mukesh Graphics Logo" className="w-8 h-8 object-contain" />
              <span className="font-serif font-bold text-2xl tracking-tight text-white">Mukesh <span className="text-brand-orange">Graphics</span></span>
            </div>
            <p className="text-[#9e968f] text-[0.95rem] leading-relaxed mb-8">
              A premium custom packaging manufacturer, engineering boxes for brands that care about how their products arrive.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[0.65rem] font-bold text-[#9e968f] tracking-widest">IN</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[0.65rem] font-bold text-[#9e968f] tracking-widest">IG</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[0.65rem] font-bold text-[#9e968f] tracking-widest">FB</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors text-[0.65rem] font-bold text-[#9e968f] tracking-widest">YT</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[0.8rem] tracking-widest uppercase text-brand-orange mb-6">Solutions</h4>
            <ul className="space-y-4 text-[0.95rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Corrugated</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Rigid Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Food Packaging</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Cosmetic Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Custom Die-Cut</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[0.8rem] tracking-widest uppercase text-brand-orange mb-6">Industries</h4>
            <ul className="space-y-4 text-[0.95rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">FMCG</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Pharma</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">E-Commerce</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Exports</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[0.8rem] tracking-widest uppercase text-brand-orange mb-6">Company</h4>
            <ul className="space-y-4 text-[0.95rem] text-[#9e968f]">
              <li><a href="#" className="hover:text-brand-orange transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Manufacturing</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.85rem] text-[#7a746f]">
          <p>© 2026 Mukesh Graphics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic font-serif text-[1rem] text-[#9e968f]">Designed with precision, delivered with quality.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
