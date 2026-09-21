import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Star, X, ChevronLeft, ChevronRight, Quote, Users } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

/* ─── constants ────────────────────────────────────────────── */
const CARDS_PER_PAGE = 3;
const ROTATE_MS = 30000;

/* ─── helpers ─────────────────────────────────────────────── */
const getInitials = (name = '') =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

const StarRow = ({ rating = 5 }) => (
  <div className="tst-stars">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? 'currentColor' : 'none'}
        strokeWidth={i < rating ? 0 : 1.5}
        style={{ color: i < rating ? '#FF7B3B' : '#d1ccc9' }}
      />
    ))}
  </div>
);

/* ─── single card ──────────────────────────────────────────── */
const ReviewCard = ({ review, visible, delay }) => (
  <div
    className="tst-card"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
      transitionDelay: `${delay}ms`,
    }}
  >
    <Quote className="tst-quote-icon" size={32} />
    <StarRow rating={review.rating} />
    <p className="tst-card-text">"{review.review}"</p>
    <div className="tst-card-footer">
      <div className="tst-avatar">{getInitials(review.customerName)}</div>
      <div>
        <div className="tst-author-name">{review.customerName}</div>
        <div className="tst-author-meta">
          {review.designation}{review.company ? ` · ${review.company}` : ''}
        </div>
      </div>
    </div>
  </div>
);

/* ─── skeleton card ────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="tst-card tst-skeleton">
    <div className="sk-line sk-short" />
    <div className="sk-line sk-full" />
    <div className="sk-line sk-full" />
    <div className="sk-line sk-medium" />
    <div className="tst-card-footer">
      <div className="tst-avatar sk-avatar" />
      <div style={{ flex: 1 }}>
        <div className="sk-line sk-medium" />
        <div className="sk-line sk-short" />
      </div>
    </div>
  </div>
);

/* ─── modal ────────────────────────────────────────────────── */
const AllReviewsModal = ({ reviews, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="tst-modal-overlay" onClick={onClose}>
      <div className="tst-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tst-modal-header">
          <div>
            <h2 className="tst-modal-title">All Client Reviews</h2>
            <p className="tst-modal-sub">{reviews.length} reviews</p>
          </div>
          <button className="tst-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="tst-modal-grid">
          {reviews.map((r) => (
            <div key={r.id} className="tst-modal-card">
              <div className="tst-modal-card-top">
                <div className="tst-avatar tst-avatar-sm">{getInitials(r.customerName)}</div>
                <div>
                  <div className="tst-author-name">{r.customerName}</div>
                  <div className="tst-author-meta">
                    {r.designation}{r.company ? ` · ${r.company}` : ''}
                  </div>
                </div>
              </div>
              <StarRow rating={r.rating} />
              <p className="tst-modal-text">"{r.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── main component ───────────────────────────────────────── */
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);
  const pageRef = useRef(0);

  const totalPages = Math.max(1, Math.ceil(reviews.length / CARDS_PER_PAGE));

  /* live Firestore listener — no orderBy to avoid index requirement; sort client-side */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'reviews'),
      (snap) => {
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            // sort by createdAt descending (works for both Timestamp and ISO string)
            const aTime = a.createdAt?.toMillis?.() ?? new Date(a.createdAt).getTime() ?? 0;
            const bTime = b.createdAt?.toMillis?.() ?? new Date(b.createdAt).getTime() ?? 0;
            return bTime - aTime;
          });
        setReviews(data);
        setLoading(false);
      },
      (err) => {
        console.error('🔴 Firestore reviews fetch error:', err.code, err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  /* animated page change */
  const goToPage = useCallback((next) => {
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      pageRef.current = next;
      setVisible(true);
    }, 350);
  }, []);

  /* auto-rotate */
  const startTimer = useCallback((tp) => {
    clearInterval(timerRef.current);
    if (tp <= 1) return;
    timerRef.current = setInterval(() => {
      const next = (pageRef.current + 1) % tp;
      setVisible(false);
      setTimeout(() => {
        setPage(next);
        pageRef.current = next;
        setVisible(true);
      }, 350);
    }, ROTATE_MS);
  }, []);

  useEffect(() => {
    startTimer(totalPages);
    return () => clearInterval(timerRef.current);
  }, [totalPages, startTimer]);

  const handlePrev = () => {
    const next = (page - 1 + totalPages) % totalPages;
    clearInterval(timerRef.current);
    goToPage(next);
    startTimer(totalPages);
  };

  const handleNext = () => {
    const next = (page + 1) % totalPages;
    clearInterval(timerRef.current);
    goToPage(next);
    startTimer(totalPages);
  };

  const handleDot = (i) => {
    clearInterval(timerRef.current);
    goToPage(i);
    startTimer(totalPages);
  };

  const currentSlice = reviews.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <>
      <style>{tstCss}</style>

      <section className="tst-section">
        <div className="tst-container">

          {/* heading */}
          <div className="tst-heading-block">
            <div className="tst-badge">
              <span className="tst-badge-dot" />
              <span>Client Voices</span>
            </div>
            <h3 className="tst-heading">
              Loved by brands that{' '}
              <span className="tst-heading-accent">refuse&nbsp;to&nbsp;compromise.</span>
            </h3>
            {!loading && reviews.length > 0 && (
              <p className="tst-sub">{reviews.length}+ happy clients trust Mukesh Graphics</p>
            )}
          </div>

          {/* cards */}
          <div className="tst-cards-wrapper">
            {loading ? (
              <div className="tst-grid">
                {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : reviews.length === 0 ? (
              <div className="tst-empty">No reviews yet.</div>
            ) : (
              <div className="tst-grid">
                {currentSlice.map((r, i) => (
                  <ReviewCard key={r.id} review={r} visible={visible} delay={i * 80} />
                ))}
              </div>
            )}
          </div>

          {/* nav controls */}
          {!loading && totalPages > 1 && (
            <div className="tst-controls">
              <button className="tst-nav-btn" onClick={handlePrev} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <div className="tst-dots">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`tst-dot${i === page ? ' tst-dot-active' : ''}`}
                    onClick={() => handleDot(i)}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
              <button className="tst-nav-btn" onClick={handleNext} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* progress bar — restarts on page change */}
          {!loading && reviews.length > CARDS_PER_PAGE && (
            <div className="tst-progress-bar">
              <div className="tst-progress-fill" key={`prog-${page}`} />
            </div>
          )}

          {/* see all */}
          {!loading && reviews.length > CARDS_PER_PAGE && (
            <div className="tst-see-all-wrap">
              <button className="tst-see-all-btn" onClick={() => setShowModal(true)}>
                <Users size={17} />
                See All {reviews.length} Reviews
              </button>
            </div>
          )}

        </div>
      </section>

      {showModal && (
        <AllReviewsModal reviews={reviews} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

/* ─── scoped CSS ───────────────────────────────────────────── */
const tstCss = `
.tst-section {
  padding: 6rem 0 5rem;
  background: linear-gradient(135deg, #FFEDD5 0%, #FED7AA 60%, #FFE4CC 100%);
  position: relative;
  overflow: hidden;
}
.tst-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 70% 120%, rgba(255,123,59,0.12) 0%, transparent 60%);
  pointer-events: none;
}
.tst-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.tst-heading-block { margin-bottom: 3rem; }
.tst-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255,123,59,0.3);
  background: rgba(255,123,59,0.1);
  font-size: 0.7rem;
  font-weight: 700;
  color: #FF7B3B;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.25rem;
}
.tst-badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #FF7B3B;
}
.tst-heading {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-family: Georgia, serif;
  font-weight: 700;
  line-height: 1.08;
  color: #1F1916;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}
.tst-heading-accent { color: #FF7B3B; }
.tst-sub { font-size: 0.95rem; color: rgba(31,25,22,0.55); margin: 0; }
.tst-cards-wrapper { min-height: 280px; }
.tst-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 900px) {
  .tst-grid { grid-template-columns: 1fr; }
}
.tst-card {
  background: #FFFDF9;
  border-radius: 1.75rem;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
  position: relative;
  transition: opacity 350ms ease, transform 350ms ease, box-shadow 300ms ease;
}
.tst-card:hover {
  box-shadow: 0 12px 40px rgba(255,123,59,0.14);
  transform: translateY(-6px) scale(1.01) !important;
}
.tst-quote-icon { color: rgba(255,123,59,0.18); margin-bottom: 0.75rem; }
.tst-stars { display: flex; gap: 3px; margin-bottom: 1rem; }
.tst-card-text {
  font-family: Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.65;
  color: #1F1916;
  margin: 0 0 1.5rem;
}
.tst-card-footer { display: flex; align-items: center; gap: 0.85rem; }
.tst-avatar {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF7B3B, #e55c1a);
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(255,123,59,0.35);
}
.tst-avatar-sm { width: 38px; height: 38px; font-size: 0.78rem; }
.tst-author-name { font-weight: 700; font-size: 0.92rem; color: #1F1916; }
.tst-author-meta { font-size: 0.78rem; color: #888; margin-top: 2px; }
/* skeleton */
.tst-skeleton { animation: sk-pulse 1.6s ease-in-out infinite; }
@keyframes sk-pulse { 0%,100%{opacity:1} 50%{opacity:.55} }
.sk-line {
  height: 12px; border-radius: 6px;
  background: linear-gradient(90deg,#f0ebe4 25%,#e8e2da 50%,#f0ebe4 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.5s ease-in-out infinite;
  margin-bottom: 10px;
}
@keyframes sk-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.sk-short { width: 40%; }
.sk-medium { width: 60%; }
.sk-full { width: 100%; }
.sk-avatar { background: linear-gradient(90deg,#f0ebe4 25%,#e8e2da 50%,#f0ebe4 75%); background-size:200% 100%; animation:sk-shimmer 1.5s ease-in-out infinite; }
/* controls */
.tst-controls {
  display: flex; align-items: center; justify-content: center;
  gap: 1rem; margin-top: 2.5rem;
}
.tst-nav-btn {
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,123,59,0.35);
  background: rgba(255,255,255,0.7);
  color: #FF7B3B;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 220ms ease;
}
.tst-nav-btn:hover { background:#FF7B3B; color:#fff; border-color:#FF7B3B; transform:scale(1.1); }
.tst-dots { display: flex; gap: 6px; }
.tst-dot {
  width: 8px; height: 8px; border-radius: 50%;
  border: none; background: rgba(255,123,59,0.25);
  cursor: pointer; transition: all 250ms ease; padding: 0;
}
.tst-dot-active { background: #FF7B3B; width: 22px; border-radius: 4px; }
/* progress bar */
.tst-progress-bar {
  height: 3px; background: rgba(255,123,59,0.15);
  border-radius: 2px; margin: 1.5rem auto 0;
  max-width: 280px; overflow: hidden;
}
.tst-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF7B3B, #e55c1a);
  border-radius: 2px;
  animation: tst-progress ${ROTATE_MS}ms linear forwards;
}
@keyframes tst-progress { from{width:0%} to{width:100%} }
/* see all */
.tst-see-all-wrap { display: flex; justify-content: center; margin-top: 2rem; }
.tst-see-all-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 2rem; border-radius: 999px;
  border: 2px solid #FF7B3B; background: transparent;
  color: #FF7B3B; font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: all 250ms ease; letter-spacing: 0.02em;
}
.tst-see-all-btn:hover { background:#FF7B3B; color:#fff; transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,123,59,0.3); }
.tst-empty { text-align:center; padding:4rem; color:rgba(31,25,22,0.45); font-size:1rem; }
/* modal */
.tst-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(15,10,5,0.65);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  animation: tst-fade-in 250ms ease;
}
@keyframes tst-fade-in { from{opacity:0} to{opacity:1} }
.tst-modal {
  background: #FFFDF9; border-radius: 2rem;
  width: 100%; max-width: 900px; max-height: 88vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.25);
  animation: tst-slide-up 300ms cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes tst-slide-up { from{opacity:0;transform:translateY(40px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
.tst-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem 2rem; border-bottom: 1px solid rgba(0,0,0,0.06); flex-shrink: 0;
}
.tst-modal-title { font-size:1.4rem; font-family:Georgia,serif; font-weight:700; color:#1F1916; margin:0; }
.tst-modal-sub { font-size:0.82rem; color:#888; margin:4px 0 0; }
.tst-modal-close {
  width:38px; height:38px; border-radius:50%;
  border:1px solid rgba(0,0,0,0.1); background:transparent;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:#666; transition:all 200ms ease;
}
.tst-modal-close:hover { background:#FF7B3B; color:#fff; border-color:#FF7B3B; }
.tst-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem; padding: 1.5rem 2rem 2rem; overflow-y: auto;
}
.tst-modal-card {
  background:#fff; border:1px solid rgba(0,0,0,0.06);
  border-radius:1.25rem; padding:1.25rem; transition:box-shadow 200ms ease;
}
.tst-modal-card:hover { box-shadow:0 6px 20px rgba(255,123,59,0.1); }
.tst-modal-card-top { display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem; }
.tst-modal-text { font-family:Georgia,serif; font-size:0.92rem; line-height:1.6; color:#3a3330; margin:0.75rem 0 0; }
@media (max-width:768px) {
  .tst-section { padding:4rem 0 3.5rem; }
  .tst-modal-grid { grid-template-columns:1fr; }
  .tst-modal-header,.tst-modal-grid { padding:1.25rem; }
}
`;

export default Testimonials;
