import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

const Counter = ({ from, to }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 4,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
};

const Stats = () => {
  const stats = [
    { num: 400, label: "Active Clients" },
    { num: "2CR", label: "Boxes Delivered" },
    { num: 50000, label: "Sq.ft. Facility" },
    { num: 12, label: "Industries Served" },
  ];

  return (
    <section className="py-20 bg-[#2C1810] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex-1 flex flex-col justify-center py-8 md:py-0 ${idx === 0 ? 'md:pr-8 lg:pr-12' : idx === stats.length - 1 ? 'md:pl-8 lg:pl-12' : 'md:px-8 lg:px-12'}`}>
              <div className="flex items-center font-serif font-bold text-brand-orange mb-2 whitespace-nowrap">
                <span className="text-4xl md:text-5xl font-mono tracking-tight">
                  {typeof stat.num === 'string' ? stat.num : <Counter from={0} to={stat.num} />}
                </span>
                <span className="text-2xl md:text-3xl ml-1 font-sans font-medium mt-1.5">+</span>
              </div>
              <div className="text-[0.75rem] text-gray-300 font-medium uppercase tracking-[0.15em] whitespace-nowrap">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
