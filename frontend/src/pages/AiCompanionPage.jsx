import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axiosConfig';
import { useToast } from '../context/ToastContext';

const STARTER_PROMPTS = [
  { text: 'I am feeling overwhelmed today', icon: 'mood_bad' },
  { text: 'Guide me through a breathing exercise', icon: 'air' },
  { text: 'Help me reframe a negative thought', icon: 'psychology' },
  { text: 'Suggest 3 journaling prompt ideas', icon: 'edit_note' }
];

const AiCompanionPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am your Sanctuary Wellness Companion. I'm here to offer a safe, warm, and supportive space for you. You can talk to me about how you're feeling, ask for mindfulness exercises, or request help with reframing stressful thoughts. How are you doing today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    // Clear input if we are sending from the text field
    if (!textToSend) {
      setInput('');
    }

    const userMessage = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send conversation history along with the message to maintain context
      const { data } = await api.post('/ai/chat', {
        message: messageText,
        history: messages
      });

      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      toast(err.response?.data?.message || 'Failed to get a response from your companion. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <header className="mb-8 text-center flex-shrink-0">
        <h1 className="text-4xl font-extrabold text-on-surface mb-3 tracking-tight flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
          AI Wellness Companion
        </h1>
        <p className="text-on-surface-variant font-medium max-w-xl mx-auto text-sm md:text-base">
          A dedicated, empathetic AI space built to support your mental wellbeing. Vent your feelings, practice mindfulness, or gain supportive perspectives.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
        
        {/* Sidebar: Suggestions & Tips */}
        <section className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                Suggested Prompts
              </h2>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Click any of these starter questions to instantly begin a conversation or try an activity.
              </p>
              
              <div className="space-y-3">
                {STARTER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt.text)}
                    disabled={loading}
                    className="w-full text-left p-4 bg-surface-container-low hover:bg-primary/5 active:scale-98 border border-outline-variant/25 hover:border-primary/40 text-on-surface rounded-2xl text-sm font-medium transition-all flex items-start gap-3 shadow-sm group"
                  >
                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform mt-0.5">
                      {prompt.icon}
                    </span>
                    <span className="leading-snug">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#30332f]/40 mb-3 pl-1">
                Mindful Support Guide
              </h3>
              <div className="bg-[#f0fcf9] dark:bg-[#203430] p-4 rounded-2xl border border-primary/10">
                <p className="text-xs text-[#204a43] dark:text-[#a0eedf] leading-relaxed">
                  Your companion is designed to listen actively, guide breathing patterns, and help you inspect thought cognitive traps. Conversation data is private and encrypted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Window */}
        <section className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 shadow-lg overflow-hidden h-[60vh] lg:h-[70vh]">
          {/* Chat Logs */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar bg-stone-50/30">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white font-bold text-xs'
                      : 'bg-primary-container text-primary-dim'
                  }`}
                >
                  {msg.role === 'user' ? (
                    'U'
                  ) : (
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none font-medium'
                      : 'bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-tl-none font-medium'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading / Typing State */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-primary-container text-primary-dim flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="bg-surface-container-low border border-outline-variant/20 text-on-surface px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 md:p-6 border-t border-outline-variant/10 bg-surface-container-lowest flex-shrink-0">
            <div className="relative flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Talk to your companion..."
                rows="1"
                disabled={loading}
                className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner resize-none max-h-24 font-medium text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="absolute right-3 p-2.5 bg-primary hover:bg-primary-dim text-white rounded-xl transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 flex items-center justify-center shadow-md cursor-pointer"
                title="Send Message"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default AiCompanionPage;
