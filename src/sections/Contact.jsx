import React, { useState } from 'react';
import { CheckCircle2, Loader2, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', requirements: '' });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl">
          
          {/* Left Column (Dark) */}
          <div className="bg-[#1a110b] p-6 sm:p-10 md:p-16 text-white relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <span className="text-[0.7rem] font-bold text-brand-orange uppercase tracking-widest">Let's build together</span>
            </div>
            
            <h2 className="text-3xl md:text-[3.25rem] font-serif font-bold leading-[1.1] mb-6">
              Get a custom<br/>packaging quote in <span className="text-brand-orange">24 hours.</span>
            </h2>
            
            <p className="text-[#a89f98] text-[1.05rem] mb-12 max-w-md">
              Tell us about your product, quantity and finish — our team will send back a detailed quote with samples options.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Factory & Head Office</div>
                  <div className="font-bold text-white text-[1rem]">Industrial Area, Phase-2, New Delhi, India</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Phone className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Call Us</div>
                  <div className="font-bold text-white text-[1rem]">+91 98100 00000</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Mail className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Email</div>
                  <div className="font-bold text-white text-[0.9rem] sm:text-[1rem] break-all sm:break-normal">sales@mukeshgraphics.com</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Clock className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Working Hours</div>
                  <div className="font-bold text-white text-[0.9rem] sm:text-[1rem]">Mon - Sat · 9:30 AM - 7:00 PM</div>
                </div>
              </div>
            </div>

            <div className="h-[220px] border border-white/5 rounded-3xl flex items-center justify-center bg-[#21150e] relative overflow-hidden">
               <span className="flex items-center gap-2 text-brand-orange text-[0.8rem] font-medium relative z-10">
                  <MapPin size={16}/> Interactive map
               </span>
            </div>
          </div>
          
          {/* Right Column (Form) */}
          <div className="bg-white p-6 sm:p-10 md:p-16 md:pl-20">
            <h3 className="text-[2rem] font-serif font-bold text-brand-dark mb-2">Send an enquiry</h3>
            <p className="text-gray-500 mb-10 text-[0.95rem]">We'll respond within one business day.</p>

            {success ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-2">Request Received!</h4>
                <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="mt-8 text-brand-orange font-medium">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Full Name</label>
                    <input required type="text" className="w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Company</label>
                    <input type="text" className="w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company / Brand" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Email</label>
                    <input required type="email" className="w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@brand.com" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Phone</label>
                    <input required type="tel" className="w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 ..." />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Product & Requirements</label>
                  <textarea required rows="4" className="w-full px-6 py-4 rounded-[1.5rem] bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm resize-none" value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} placeholder="Box type, dimensions, quantity, finish..." />
                </div>
                
                <button type="submit" disabled={loading} className="w-full py-4 mt-2 bg-brand-orange hover:bg-[#eb6a2d] text-white font-bold rounded-full transition-colors shadow-lg shadow-brand-orange/20 flex justify-center items-center gap-2 text-[0.95rem]">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>Request my quote <ArrowRight size={18} strokeWidth={2.5}/></>
                  )}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
