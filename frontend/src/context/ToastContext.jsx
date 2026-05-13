import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const ICONS = { success: 'check_circle', error: 'error', info: 'info' };
  const COLORS = {
    success: 'bg-primary-container text-on-primary-container border-primary/20',
    error:   'bg-error-container text-on-error-container border-error/20',
    info:    'bg-tertiary-container text-on-tertiary-container border-tertiary/20',
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {/* Toast stack — bottom-right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl backdrop-blur-md font-['Plus_Jakarta_Sans'] font-semibold text-sm max-w-xs animate-in slide-in-from-right-4 fade-in duration-300 pointer-events-auto ${COLORS[toast.type]}`}
          >
            <span
              className="material-symbols-outlined text-[20px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {ICONS[toast.type]}
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-60 hover:opacity-100 transition-opacity ml-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
