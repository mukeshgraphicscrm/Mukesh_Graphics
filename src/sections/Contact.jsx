import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    finish: ''
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
        setFormData({ name: '', email: '', phone: '', product: '', quantity: '', finish: '' });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white grid lg:grid-cols-2 gap-16 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-6">
              Get a custom packaging quote in <span className="text-brand-orange italic font-normal">24 hours.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Tell us about your product, quantity and finish — our team will send back a detailed quote with samples options.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-orange shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-white mb-1">Fast Turnaround</div>
                  <div className="text-sm text-gray-400">We'll respond within one business day.</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-orange shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-white mb-1">Factory-Direct Rates</div>
                  <div className="text-sm text-gray-400">No middlemen, transparent pricing.</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-brand-orange shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-white mb-1">High-Volume Capacity</div>
                  <div className="text-sm text-gray-400">Ready for enterprise-scale orders.</div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white text-brand-dark rounded-3xl p-8 shadow-2xl relative z-10">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email address" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone number" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Details</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} placeholder="What are you packaging?" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g. 5000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Finish/Print</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-gray-600" value={formData.finish} onChange={e => setFormData({...formData, finish: e.target.value})}>
                      <option value="">Select option...</option>
                      <option value="standard">Standard Print</option>
                      <option value="premium">Premium (Foil/UV)</option>
                      <option value="unprinted">Unprinted / Kraft</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-orange/30 flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Request Quote'}
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
