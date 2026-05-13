import React, { useState } from 'react';
import BreathingExercise from '../components/BreathingExercise';
import MoodCheckIn from '../components/MoodCheckIn';

const WellnessPage = () => {
  const [showBreathing, setShowBreathing] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
          <div className="flex-1">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">Interactive Wellness</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1] mb-6">
              Tools for a <br/>
              <span className="text-primary-dim italic font-medium">calmer mind.</span>
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl leading-relaxed">
              Science-backed, interactive exercises designed to reduce stress, improve focus, and help you understand yourself better. No scores, just presence.
            </p>
          </div>
          <div className="w-full md:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container shadow-sm">
            <img className="w-full h-full object-cover opacity-90" alt="Wellness" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJjJB8g8W3c-mHRlBIClv-7wMfVBL4GUiPlftlGkF84RgBrkYfCcpWVLDquWjflkllGEaZLAIF6gzL5lEOwf1kEnd78JsUV1Reruhp6ySx3r4vqvfiwparAzcMBaoNM_3e8o3MRxaiOAV4p9DQJjybA85q3ZsllCsgCztiLuRFaNV7xGGVgCaqyXSgG_ykF3sonad80qPvhx9EBNKb7f4BoSVmhlsGME53MlKPJ83hMD7UUtPvXS1Wyaa4fbSPYs8L8WDqaiVxbYfR" />
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Available Tools</h2>
          <div className="h-px flex-1 mx-8 bg-outline-variant opacity-20"></div>
          <span className="text-on-surface-variant font-medium">2 Tools Live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Tool 1: Breathwork */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8 h-[480px] flex flex-col justify-between cursor-pointer">
            <div className="z-10">
              <span className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-primary mb-4 inline-block">BREATHWORK</span>
              <h3 className="text-4xl font-bold mb-4">Luminous Circle</h3>
              <p className="text-on-surface-variant max-w-xs text-lg">Sync your breath with an expanding ring of light using the 4-7-8 technique. Activates your parasympathetic nervous system in minutes.</p>
            </div>
            <div className="absolute inset-0 z-0">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Circle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt12bbuSL7aPe4DaFpnnndm7ncyuOraF1NPMF_L3n2yRjSYNDKYB4Eny-7p3Jl2OWP5WUYjaHzOqbpnjw1yi_fYEvbEwsvziTL4AqOP4UYkIcV5rFTlB4KG0YJ6kIaYRffoRz5T2JkMqFZJcJclGZS_p48hUGCE76D7QAch1Q1PRFdmh1uK9deRlJXo8RAkmwb-NxWbDC4FAlmuodwbStsA2aDzNwRxK9i9Q5nPbXNJ1Lw8iMRj1gIx9SwAbMbfaGKJXvZscDtV47Q" />
            </div>
            <div className="z-10 flex justify-start">
              <button
                onClick={() => setShowBreathing(true)}
                className="bg-primary text-on-primary rounded-full px-8 py-3 font-semibold flex items-center gap-2 group-hover:shadow-lg transition-all"
              >
                Begin Practice <span className="material-symbols-outlined text-sm">play_arrow</span>
              </button>
            </div>
          </div>

          {/* Tool 2: Mood Check-In */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8 h-[480px] flex flex-col justify-between cursor-pointer">
            <div className="z-10">
              <span className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-tertiary mb-4 inline-block">SELF-ASSESSMENT</span>
              <h3 className="text-4xl font-bold mb-4">Mood Check-In</h3>
              <p className="text-on-surface-variant max-w-xs text-lg">A quick 5-question wellness check to understand how you're feeling right now and get a personalised recommendation.</p>
            </div>
            <div className="absolute inset-0 z-0">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40" alt="Mood" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASBNCxLRJvsTuhRHVCaN06v-GxDqHTKOMBZFs6fSr1WaA8j3pmgGV-ju2VQzfE1MYMSEu1g0PzCwO-oNStoS8vaLnm2ilpuO3UVH_T5Fw11CNVeKHCL_lP8tvrkyuDXicy2pMqNXfai1HQEGERt6DEhOKU2LjxO1N2fZ3RE_QpJQBWAjS3x5OGIbwCvxaNicxxMgRnO7UwZsbgTTo6E6qn7PJizSldCeSiAk62mPFCQ0XterpPjF-aPm2Xj7E4pnoWYbDCvLq32Wiv" />
            </div>
            <div className="z-10 flex justify-start">
              <button
                onClick={() => setShowMoodCheckIn(true)}
                className="bg-tertiary text-on-tertiary rounded-full px-8 py-3 font-semibold flex items-center gap-2 group-hover:shadow-lg transition-all"
              >
                Start Check-In <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Modals */}
      {showBreathing && <BreathingExercise onClose={() => setShowBreathing(false)} />}
      {showMoodCheckIn && <MoodCheckIn onClose={() => setShowMoodCheckIn(false)} />}
    </main>
  );
};

export default WellnessPage;
