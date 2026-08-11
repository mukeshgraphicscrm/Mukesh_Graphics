import React from 'react';
import { Package } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <img src="/Title_Logo.png" alt="Mukesh Graphics Logo" className="w-8 h-8 object-contain" />
              <span className="font-serif font-bold text-xl tracking-tight">Mukesh Graphics</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premium custom packaging manufacturer, engineering boxes for brands that care about how their products arrive.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 5 9 5 9c1.4.8 2.8.8 4 0C7 3 13 3 13 8c2.4-1.3 4.2-3 4.2-3 .5 1.5.5 3 0 4 .5 0 1.5-.5 2-1z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Capabilities</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Corrugated</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Rigid Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Food Packaging</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Cosmetic Boxes</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Custom Die-Cut</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Industries</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-orange transition-colors">FMCG</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Pharma</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">E-Commerce</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Exports</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-orange transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Manufacturing</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Mukesh Graphics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
