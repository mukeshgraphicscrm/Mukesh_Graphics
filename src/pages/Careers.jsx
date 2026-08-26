import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(8px)" },
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -15, filter: "blur(8px)" }
};

const pageTransition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.6
};

const Careers = () => {
  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-32 pb-20 min-h-screen bg-[#FFFDF9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
            Join Our <span className="text-brand-orange">Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            At Mukesh Graphics, we are always looking for passionate, creative, and driven individuals to join our growing team. If you love design and innovation, we'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Job Card 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-semibold mb-4">
              Full Time
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Graphic Designer</h3>
            <p className="text-gray-600 mb-6">Looking for an experienced graphic designer with a strong portfolio in branding and print design.</p>
            <button className="w-full bg-[#1F1916] text-white py-3 rounded-full font-semibold hover:bg-brand-orange transition-colors">
              Apply Now
            </button>
          </div>

          {/* Job Card 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-semibold mb-4">
              Part Time
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Social Media Executive</h3>
            <p className="text-gray-600 mb-6">Seeking a creative mind to handle our social media accounts, create engaging content, and drive growth.</p>
            <button className="w-full bg-[#1F1916] text-white py-3 rounded-full font-semibold hover:bg-brand-orange transition-colors">
              Apply Now
            </button>
          </div>

          {/* Job Card 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-semibold mb-4">
              Internship
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Web UI/UX Intern</h3>
            <p className="text-gray-600 mb-6">A great opportunity for a budding designer to learn and work on real-world website projects with our team.</p>
            <button className="w-full bg-[#1F1916] text-white py-3 rounded-full font-semibold hover:bg-brand-orange transition-colors">
              Apply Now
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Don't see a fit?</h2>
          <p className="text-gray-600 mb-6">
            Send us your resume anyway! We are always looking for great talent.
          </p>
          <a href="mailto:careers@mukeshgraphics.com" className="inline-flex items-center justify-center bg-brand-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1F1916] transition-colors shadow-lg hover:shadow-xl">
            Email Your Resume
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Careers;
