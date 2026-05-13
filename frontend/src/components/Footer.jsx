import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-100 dark:bg-stone-950 w-full py-12 px-8 mt-20 font-['Plus_Jakarta_Sans'] text-sm leading-relaxed">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Sanctuary</div>
          <p className="text-stone-500 dark:text-stone-400">© 2024 Sanctuary Wellness. Your peace is our priority.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-stone-500 dark:text-stone-400 hover:underline decoration-emerald-200 underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#privacy">Privacy Policy</a>
          <a className="text-stone-500 dark:text-stone-400 hover:underline decoration-emerald-200 underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#terms">Terms of Service</a>
          <a className="text-emerald-700 dark:text-emerald-300 font-medium hover:underline decoration-emerald-200 underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#crisis">Crisis Resources</a>
          <a className="text-stone-500 dark:text-stone-400 hover:underline decoration-emerald-200 underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#contact">Contact Us</a>
        </div>

        <div className="flex gap-4">
          <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer transition-colors">public</span>
          <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer transition-colors">volunteer_activism</span>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
