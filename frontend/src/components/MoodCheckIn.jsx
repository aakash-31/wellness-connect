import React, { useState } from 'react';

const QUESTIONS = [
  {
    q: 'How would you describe your energy level right now?',
    options: [
      { label: 'Exhausted', value: 'low' },
      { label: 'A bit sluggish', value: 'low-mid' },
      { label: 'Okay', value: 'mid' },
      { label: 'Energised', value: 'high' },
    ],
  },
  {
    q: 'How anxious or stressed are you feeling?',
    options: [
      { label: 'Very anxious', value: 'anxious' },
      { label: 'Somewhat stressed', value: 'stressed' },
      { label: 'Mostly calm', value: 'calm' },
      { label: 'Completely at ease', value: 'ease' },
    ],
  },
  {
    q: 'How are you feeling emotionally today?',
    options: [
      { label: 'Low or sad', value: 'sad' },
      { label: 'A little down', value: 'down' },
      { label: 'Neutral', value: 'neutral' },
      { label: 'Happy & positive', value: 'happy' },
    ],
  },
  {
    q: 'How well did you sleep last night?',
    options: [
      { label: 'Poorly', value: 'poor' },
      { label: 'Not great', value: 'notgreat' },
      { label: 'Okay', value: 'okay' },
      { label: 'Really well', value: 'good' },
    ],
  },
  {
    q: 'What do you most need right now?',
    options: [
      { label: 'Rest & recovery', value: 'rest' },
      { label: 'Calm my mind', value: 'calm' },
      { label: 'A mood lift', value: 'lift' },
      { label: 'Focus & clarity', value: 'focus' },
    ],
  },
];

const RECOMMENDATIONS = {
  rest:   { icon: 'bedtime', title: 'Rest & Recharge', text: 'Try the Nature Soundscapes section to wind down, or write in your journal to process the day before you rest.' },
  calm:   { icon: 'self_improvement', title: 'Find Your Calm', text: 'We recommend the Luminous Circle breathwork exercise. Even one 4-7-8 cycle can quieten the nervous system immediately.' },
  lift:   { icon: 'mood', title: 'Lift Your Spirits', text: 'Head to the Community page to connect with others, or browse our mindfulness collection to find a small spark of joy.' },
  focus:  { icon: 'psychology', title: 'Sharpen Your Focus', text: 'Try the Ink Wash free-draw exercise to enter a flow state, or explore the breathwork visualizers to clear mental fog.' },
  default:{ icon: 'spa', title: 'Stay Present', text: 'You seem to be in a balanced state! Take a moment to appreciate that. Maybe try our breathwork to maintain the calm.' },
};

const MoodCheckIn = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  // Determine recommendation from last answer (what do you need)
  const lastAnswer = answers[4];
  const rec = RECOMMENDATIONS[lastAnswer] || RECOMMENDATIONS.default;
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative bg-[#f4f4ef] dark:bg-[#1a1f1b] rounded-[3rem] p-8 md:p-12 w-full max-w-lg mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Mood Check-in</h2>
            {!done && <p className="text-sm text-on-surface-variant">Question {step + 1} of {QUESTIONS.length}</p>}
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {!done && (
          <>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-surface-container rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <h3 className="text-xl font-bold mb-6 leading-snug">{QUESTIONS[step].q}</h3>
            <div className="grid grid-cols-2 gap-4">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="p-4 bg-surface-container rounded-2xl text-left font-semibold text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-colors text-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}

        {done && (
          <div className="flex flex-col items-center text-center gap-6 py-4">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{rec.icon}</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold mb-3">{rec.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{rec.text}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-primary text-on-primary px-10 py-3 rounded-full font-semibold hover:bg-primary-dim transition-colors mt-2"
            >
              Got it, thanks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCheckIn;
