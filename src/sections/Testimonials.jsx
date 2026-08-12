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
    <section className="py-24 bg-gradient-to-b from-[#FFE4CF] via-[#FFF3EB] to-[#FFE4CF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            <h2 className="text-[0.8rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Client Voices</h2>
          </div>
          <h3 className="text-3xl md:text-[4.5rem] font-serif font-bold leading-[1.1] text-[#4a3b32]">
            Loved by brands that <span className="text-brand-orange">refuse <br className="hidden md:block" />to compromise.</span>
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#FDF5F0] p-8 md:p-9 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
              <div className="flex gap-[3px] text-brand-orange mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} size={17} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-[#201c19] font-serif text-[1.05rem] leading-[1.6] mb-10">
                “{t.text}”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[42px] h-[42px] rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-xs tracking-wide">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-[#201c19] text-[0.9rem] leading-tight">{t.author}</div>
                  <div className="text-[0.75rem] text-gray-500 mt-[2px]">{t.company}</div>
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
