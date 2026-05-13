import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center font-['Plus_Jakarta_Sans']">
      {/* Blurred background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-tertiary-container/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-container/40 rounded-full blur-3xl -z-10" />

      <div className="mb-8 relative">
        <span
          className="text-[10rem] font-extrabold text-on-surface/5 leading-none select-none"
          aria-hidden="true"
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: '5rem', fontVariationSettings: "'FILL' 1" }}
          >
            sentiment_dissatisfied
          </span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
        Page not found.
      </h1>
      <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-10">
        The sanctuary you were looking for doesn't exist. It may have been moved, or perhaps you need a moment to reorient.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-semibold shadow-lg hover:bg-primary-dim transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Return Home
        </Link>
        <Link
          to="/community"
          className="text-primary font-semibold px-8 py-3.5 flex items-center gap-2 hover:bg-primary-container/30 rounded-full transition-all"
        >
          Visit Community <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
