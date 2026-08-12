import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "Their rigid boxes turned our launch into a viral unboxing. Print quality, fit and finish — flawless every single run.",
      author: "Anjali Mehta",
      company: "Brand Lead, Lumen Beauty"
    },
    {
      text: "We moved 4 lakh food cartons in a quarter without a single defect complaint. Mukesh Graphics is now our default partner.",
      author: "Rohit Sharma",
      company: "Ops Director, Freshbite Foods"
    },
    {
      text: "From custom die-lines to EPE inserts, they engineered packaging that protects fragile electronics beautifully.",
      author: "Kavya Rao",
      company: "Founder, Nova Tech"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFEDD5] to-[#FED7AA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-[95%]">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF7B3B]/30 bg-[#FF7B3B]/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B3B]"></span>
            <h2 className="text-[0.7rem] font-bold text-[#FF7B3B] uppercase tracking-[0.15em]">Client Voices</h2>
          </div>
          <h3 className="text-4xl md:text-[3.5rem] lg:text-[4.2rem] font-serif font-bold leading-[1.05] text-[#1F1916] tracking-tight">
            Loved by brands that <span className="text-[#FF7B3B]">refuse <br className="hidden md:block" />to compromise.</span>
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#FFFDF9] p-7 md:p-8 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(255,123,59,0.12)] hover:-translate-y-2 transition-all duration-300">
              <div className="flex gap-[4px] text-[#FF7B3B] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-[#1F1916] font-serif text-[1.1rem] leading-[1.6] mb-6">
                “{t.text}”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[46px] rounded-full bg-[#FF7B3B] flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-[#1F1916] text-[0.95rem] leading-tight">{t.author}</div>
                  <div className="text-[0.8rem] text-gray-500 mt-[2px]">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
