import React from 'react';

const Stats = () => {
  const stats = [
    { num: "250+", label: "Active Clients" },
    { num: "1,000,000+", label: "Boxes Delivered" },
    { num: "50,000+", label: "Sq.ft. Facility" },
    { num: "12+", label: "Industries Served" },
  ];

  return (
    <section className="py-20 bg-[#2C1810] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className={`pl-8 ${idx === 0 ? 'pl-0' : ''}`}>
              <div className="flex items-start text-brand-orange mb-2">
                <span className="text-4xl md:text-5xl font-serif font-bold">{stat.num.replace('+', '')}</span>
                <span className="text-2xl md:text-3xl font-serif font-medium mt-1">+</span>
              </div>
              <div className="text-xs md:text-sm text-white font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
