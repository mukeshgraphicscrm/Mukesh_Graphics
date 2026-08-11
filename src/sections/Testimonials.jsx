import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "Their rigid boxes turned our launch into a viral unboxing. Print quality, fit and finish — flawless every single run.",
      author: "Rahul S.",
      company: "Cosmetic Brand Co."
    },
    {
      text: "We moved 4 lakh food cartons in a quarter without a single defect complaint. Mukesh Graphics is now our default partner.",
      author: "Priya M.",
      company: "Food Enterprises"
    },
    {
      text: "From custom die-lines to EPE inserts, they engineered packaging that protects fragile electronics beautifully.",
      author: "Vikram K.",
      company: "Tech Solutions"
    }
  ];

  return (
    <section className="py-24 bg-[#FCECE0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            <h2 className="text-[0.8rem] font-bold text-brand-orange uppercase tracking-[0.15em]">Client Voices</h2>
          </div>
          <h3 className="text-5xl md:text-[4.5rem] font-serif font-bold leading-[1.1] text-[#4a3b32]">
            Loved by brands that <span className="text-brand-orange">refuse <br className="hidden md:block" />to compromise.</span>
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex gap-1 text-brand-orange mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed mb-8">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold font-serif">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-brand-dark">{t.author}</div>
                  <div className="text-sm text-gray-500">{t.company}</div>
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
