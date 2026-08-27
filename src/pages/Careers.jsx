import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, Building, IndianRupee, CheckCircle2 } from 'lucide-react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModal = () => {
    setSelectedJob(null);
    setTimeout(() => {
      setIsApplying(false);
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 300);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const fullName = formData.get('fullName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const coverLetter = formData.get('coverLetter');
      const resumeFile = formData.get('resume');

      let resumeUrl = '';
      if (resumeFile && resumeFile.size > 0) {
        const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
        const uploadResult = await uploadBytes(storageRef, resumeFile);
        resumeUrl = await getDownloadURL(uploadResult.ref);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          jobDepartment: selectedJob.department,
          jobLocation: selectedJob.location,
          fullName,
          email,
          phone,
          coverLetter,
          resumeUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 4000); // Close automatically after 4 seconds
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJob]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          throw new Error(data.error || 'Failed to fetch jobs');
        }
      } catch (error) {
        console.error("Error fetching jobs: ", error);
        setJobs([{ id: 'error', type: 'Error', title: 'API Error', description: String(error.message) }]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
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
            {loading ? (
              <div className="col-span-full py-12 text-center text-gray-500">
                Loading open positions...
              </div>
            ) : jobs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500">
                No open positions currently available. Please check back later.
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col cursor-pointer"
                >
                  <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-semibold mb-4 self-start">
                    {job.type}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-6 whitespace-pre-wrap flex-grow line-clamp-3">{job.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                    className="w-full bg-[#1F1916] text-white py-3 rounded-full font-semibold hover:bg-brand-orange transition-colors mt-auto cursor-pointer"
                  >
                    Know More
                  </button>
                </div>
              ))
            )}
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
            <a href="mailto:careers@mukeshgraphics.com" className="inline-flex items-center justify-center bg-brand-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1F1916] transition-colors shadow-lg hover:shadow-xl cursor-pointer">
              Email Your Resume
            </a>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-semibold mb-4">
                {selectedJob.type}
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-dark mb-6">{selectedJob.title}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedJob.department && (
                  <div className="flex items-center text-gray-600 gap-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <span>{selectedJob.department}</span>
                  </div>
                )}
                {selectedJob.location && (
                  <div className="flex items-center text-gray-600 gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{selectedJob.location}</span>
                  </div>
                )}
                {selectedJob.experience && (
                  <div className="flex items-center text-gray-600 gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>{selectedJob.experience}</span>
                  </div>
                )}
                {selectedJob.salary && (
                  <div className="flex items-center text-gray-600 gap-3">
                    <IndianRupee className="w-5 h-5 text-gray-400" />
                    <span>{selectedJob.salary}</span>
                  </div>
                )}
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-3xl font-serif font-bold text-brand-dark mb-4">Application Sent!</h4>
                  <p className="text-gray-600 text-lg">
                    Thank you for applying to Mukesh Graphics. Our HR team will review your profile and get back to you soon.
                  </p>
                </motion.div>
              ) : isApplying ? (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleApplySubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" name="fullName" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange outline-none transition-colors" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV (PDF)</label>
                    <input type="file" name="resume" accept=".pdf" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20 cursor-pointer file:cursor-pointer text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                    <textarea name="coverLetter" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange outline-none transition-colors" placeholder="Why are you a great fit for this role?"></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      disabled={isSubmitting}
                      className="w-full sm:w-1/3 bg-gray-100 text-gray-800 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-2/3 bg-brand-orange text-white py-4 rounded-full font-bold text-lg hover:bg-[#1F1916] transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Job Description</h4>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsApplying(true)}
                    className="block w-full text-center bg-brand-orange text-white py-4 rounded-full font-bold text-lg hover:bg-[#1F1916] transition-colors shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Apply Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Careers;
