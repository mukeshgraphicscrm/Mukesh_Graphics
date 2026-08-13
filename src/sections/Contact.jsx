import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, MapPin, Phone, Mail, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Your name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Must be exactly 10 digits';
    }
    if (!formData.requirements.trim()) newErrors.requirements = 'Please tell us your requirements';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

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
    <section id="contact" className="py-24 bg-[#FFFDF9] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-[95%]">
        <div className="rounded-[3rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl">

          {/* Left Column (Dark) */}
          <div className="bg-[#1a110b] p-6 sm:p-10 md:p-16 text-white relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <span className="text-[0.7rem] font-bold text-brand-orange uppercase tracking-widest">Let's build together</span>
            </div>

            <h2 className="text-3xl md:text-[3.25rem] font-serif font-bold leading-[1.1] mb-6">
              Get a custom<br />packaging quote in <span className="text-brand-orange">24 hours.</span>
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
                  <div className="font-bold text-white text-[1rem]">PLOT NO. 58, VISHWAKARMA ESTATE, Chitra Gujarat Industrial Development Corporation, Bhavnagar, Gujarat 364004</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Phone className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Call Us</div>
                  <div className="font-bold text-white text-[1rem]">+91 9825982727 , +91 9512007008</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Mail className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Email</div>
                  <div className="font-bold text-white text-[0.9rem] sm:text-[1rem] break-all sm:break-normal">marketing.mukeshgraphics@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-[#2a1b12] border border-[#3d2719] flex items-center justify-center shrink-0">
                  <Clock className="text-brand-orange" size={16} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-[#8f857d] uppercase tracking-widest mb-1">Working Hours</div>
                  <div className="font-bold text-white text-[0.9rem] sm:text-[1rem]">Mon - Sat · 10:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>

            <div className="h-[220px] border border-white/5 rounded-3xl flex items-center justify-center bg-[#21150e] relative overflow-hidden">
              <span className="flex items-center gap-2 text-brand-orange text-[0.8rem] font-medium relative z-10">
                <MapPin size={16} /> Interactive map
              </span>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="bg-white p-6 sm:p-10 md:p-16 md:pl-20">
            <h3 className="text-[2rem] font-serif font-bold text-brand-dark mb-2">Send an inquiry</h3>
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Full Name</label>
                    <input type="text" className={`w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border ${errors.name ? 'border-[#FF4A4A] focus:ring-[#FF4A4A]' : 'border-[#F2EAE4] focus:border-brand-orange focus:ring-brand-orange'} focus:outline-none focus:ring-1 transition-colors text-sm`} value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: null }) }} placeholder="Your name" />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[0.75rem] flex items-center gap-1.5 font-bold px-4 overflow-hidden">
                          <AlertCircle size={14} /> {errors.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Company</label>
                    <input type="text" className="w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border border-[#F2EAE4] focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Company / Brand" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Email</label>
                    <input type="email" className={`w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border ${errors.email ? 'border-[#FF4A4A] focus:ring-[#FF4A4A]' : 'border-[#F2EAE4] focus:border-brand-orange focus:ring-brand-orange'} focus:outline-none focus:ring-1 transition-colors text-sm`} value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: null }) }} placeholder="you@brand.com" />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[0.75rem] flex items-center gap-1.5 font-bold px-4 overflow-hidden">
                          <AlertCircle size={14} /> {errors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Phone</label>
                    <input type="tel" maxLength="10" className={`w-full px-6 py-3.5 rounded-full bg-[#FCF8F5] border ${errors.phone ? 'border-[#FF4A4A] focus:ring-[#FF4A4A]' : 'border-[#F2EAE4] focus:border-brand-orange focus:ring-brand-orange'} focus:outline-none focus:ring-1 transition-colors text-sm`} value={formData.phone} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: val });
                      setErrors({ ...errors, phone: null });
                    }} placeholder="e.g. 98100 00000" />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[0.75rem] flex items-center gap-1.5 font-bold px-4 overflow-hidden">
                          <AlertCircle size={14} /> {errors.phone}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Product & Requirements</label>
                  <textarea rows="4" className={`w-full px-6 py-4 rounded-[1.5rem] bg-[#FCF8F5] border ${errors.requirements ? 'border-[#FF4A4A] focus:ring-[#FF4A4A]' : 'border-[#F2EAE4] focus:border-brand-orange focus:ring-brand-orange'} focus:outline-none focus:ring-1 transition-colors text-sm resize-y min-h-[120px]`} value={formData.requirements} onChange={e => { setFormData({ ...formData, requirements: e.target.value }); setErrors({ ...errors, requirements: null }) }} placeholder="Box type, dimensions, quantity, finish..." />
                  <AnimatePresence>
                    {errors.requirements && (
                      <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[0.75rem] flex items-center gap-1.5 font-bold px-4 overflow-hidden">
                        <AlertCircle size={14} /> {errors.requirements}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 sm:py-[1.15rem] mt-2 bg-gradient-to-r from-[#FF954B] to-[#FF6B2B] hover:from-[#FFA25B] hover:to-[#FF7B3B] text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-[#FF7B3B]/30 flex justify-center items-center gap-2 text-[1rem]">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>Request my quote <ArrowRight size={18} strokeWidth={2.5} /></>
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
