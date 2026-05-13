import React, { useState, useEffect, useRef, useCallback } from 'react';

// 4-7-8 breathing pattern phases
const PHASES = [
  { label: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose.' },
  { label: 'Hold', duration: 7, instruction: 'Hold your breath gently.' },
  { label: 'Exhale', duration: 8, instruction: 'Release slowly through your mouth.' },
  { label: 'Rest', duration: 2, instruction: 'Allow yourself to settle.' },
];

const TOTAL_CYCLE = PHASES.reduce((acc, p) => acc + p.duration, 0);

const BreathingExercise = ({ onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(PHASES[0].duration);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);

  const currentPhase = PHASES[phaseIndex];
  const progress = 1 - (phaseTimer / currentPhase.duration);

  const tick = useCallback(() => {
    setPhaseTimer(prev => {
      if (prev <= 1) {
        setPhaseIndex(pi => {
          const next = (pi + 1) % PHASES.length;
          if (next === 0) setCycles(c => c + 1);
          setPhaseTimer(PHASES[next].duration);
          return next;
        });
        return prev; // Will be overridden by setPhaseTimer above
      }
      return prev - 1;
    });
    setSessionSeconds(s => s + 1);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, tick]);

  const handleStart = () => {
    setIsRunning(true);
    setPhaseIndex(0);
    setPhaseTimer(PHASES[0].duration);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setPhaseTimer(PHASES[0].duration);
    setSessionSeconds(0);
    setCycles(0);
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  // Circle scale: Inhale = expand (1 → 1.5), Hold = stay big, Exhale = contract (1.5 → 1), Rest = stay small
  const circleScale = phaseIndex === 0 ? 1 + 0.5 * progress
    : phaseIndex === 1 ? 1.5
    : phaseIndex === 2 ? 1.5 - 0.5 * progress
    : 1;

  const circleColor = phaseIndex === 0 ? '#3d8b6e' : phaseIndex === 1 ? '#2c6e50' : phaseIndex === 2 ? '#5aaa8a' : '#7fc4a8';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative bg-[#f4f4ef] dark:bg-[#1a1f1b] rounded-[3rem] p-8 md:p-12 w-full max-w-lg mx-4 flex flex-col items-center gap-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Luminous Circle</h2>
            <p className="text-sm text-on-surface-variant">4-7-8 Breathing</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Animated Circle */}
        <div className="relative flex items-center justify-center w-56 h-56">
          {/* Outer glow ring */}
          <div
            className="absolute rounded-full transition-all"
            style={{
              width: `${14 * circleScale}rem`,
              height: `${14 * circleScale}rem`,
              backgroundColor: `${circleColor}18`,
              transitionDuration: `${currentPhase.duration * 0.9}s`,
              transitionTimingFunction: 'ease-in-out',
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full transition-all"
            style={{
              width: `${10 * circleScale}rem`,
              height: `${10 * circleScale}rem`,
              backgroundColor: `${circleColor}30`,
              transitionDuration: `${currentPhase.duration * 0.9}s`,
              transitionTimingFunction: 'ease-in-out',
            }}
          />
          {/* Core circle */}
          <div
            className="absolute rounded-full flex flex-col items-center justify-center transition-all"
            style={{
              width: `${7 * circleScale}rem`,
              height: `${7 * circleScale}rem`,
              backgroundColor: circleColor,
              transitionDuration: `${currentPhase.duration * 0.9}s`,
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            <span className="text-white text-3xl font-bold">{phaseTimer}</span>
            <span className="text-white/80 text-sm font-semibold tracking-wide">{isRunning ? currentPhase.label : '—'}</span>
          </div>
        </div>

        {/* Instruction */}
        <p className="text-center text-on-surface-variant text-base min-h-[1.5rem] transition-all duration-500">
          {isRunning ? currentPhase.instruction : 'Press Start to begin your breathing practice.'}
        </p>

        {/* Stats row */}
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-2xl font-bold">{formatTime(sessionSeconds)}</p>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Duration</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{cycles}</p>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Cycles</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-primary-dim transition-colors"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              {sessionSeconds > 0 ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="bg-surface-container text-on-surface px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-sm">pause</span>
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Phase progress bar */}
        {isRunning && (
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress * 100}%`, transitionDuration: '0.9s', transitionTimingFunction: 'linear' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
