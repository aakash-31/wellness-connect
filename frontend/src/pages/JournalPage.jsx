import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useToast } from '../context/ToastContext';

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState('Neutral');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [analyzingIds, setAnalyzingIds] = useState({});

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const { data } = await api.get('/journals');
      setJournals(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const { data } = await api.post('/journals', {
        title: newTitle,
        content: newContent,
        mood: newMood
      });
      setJournals([data, ...journals]);
      setNewTitle('');
      setNewContent('');
      setNewMood('Neutral');
      toast('Journal entry saved. 📖', 'success');
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJournal = async (id) => {
    try {
      await api.delete(`/journals/${id}`);
      setJournals(journals.filter((j) => j._id !== id));
      toast('Entry deleted.', 'info');
    } catch (err) {
      console.error(err);
      toast('Failed to delete entry.', 'error');
    }
  };

  const handleAnalyzeJournal = async (id) => {
    setAnalyzingIds((prev) => ({ ...prev, [id]: true }));
    try {
      const { data } = await api.post(`/ai/analyze/${id}`);
      setJournals((prev) => prev.map((j) => (j._id === id ? data : j)));
      toast('AI Journal Insights generated! ✨', 'success');
    } catch (err) {
      console.error(err);
      toast(err.response?.data?.message || 'Failed to analyze journal entry.', 'error');
    } finally {
      setAnalyzingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'Happy': return 'bg-emerald-100 text-emerald-800';
      case 'Sad': return 'bg-blue-100 text-blue-800';
      case 'Anxious': return 'bg-orange-100 text-orange-800';
      case 'Calm': return 'bg-teal-100 text-teal-800';
      case 'Reflective': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-on-surface mb-4 tracking-tight">Your Private Journal</h1>
        <p className="text-on-surface-variant font-medium max-w-2xl mx-auto">
          A safe, encrypted space just for you. Reflect on your thoughts, track your moods, and document your journey.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* New Entry Form */}
        <section className="md:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] shadow-lg border border-outline-variant/10 sticky top-32">
            <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_document</span>
              New Entry
            </h2>
            
            <form onSubmit={handleCreateJournal} className="space-y-5">
              {submitError && <div className="p-3 bg-error-container text-on-error-container rounded-xl text-sm font-medium">{submitError}</div>}
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-on-surface pl-1 block">Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                  placeholder="What's this entry about?"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-on-surface pl-1 block">How are you feeling?</label>
                <select 
                  value={newMood}
                  onChange={(e) => setNewMood(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium appearance-none"
                >
                  <option value="Happy">Happy</option>
                  <option value="Sad">Sad</option>
                  <option value="Anxious">Anxious</option>
                  <option value="Calm">Calm</option>
                  <option value="Reflective">Reflective</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-on-surface pl-1 block">Entry</label>
                <textarea 
                  required
                  rows="8"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm resize-none"
                  placeholder="Write your thoughts here..."
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary-dim text-white font-bold py-3.5 rounded-xl transition-colors shadow-md mt-2 flex justify-center items-center gap-2"
              >
                {submitting ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Save Entry'}
              </button>
            </form>
          </div>
        </section>

        {/* Past Entries */}
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2 mb-2">
            <h2 className="text-xl font-bold text-on-surface">Past Entries</h2>
            <span className="text-sm font-bold text-on-surface-variant">{journals.length} Entries</span>
          </div>

          {loading ? (
             <div className="flex justify-center p-12 text-primary">
                <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
             </div>
          ) : error ? (
             <div className="p-6 bg-error-container text-on-error-container rounded-2xl text-center font-medium">{error}</div>
          ) : journals.length === 0 ? (
             <div className="bg-surface-container-low border border-outline-variant/20 rounded-[2rem] p-12 text-center">
               <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 opacity-50">book</span>
               <h3 className="text-xl font-bold text-on-surface mb-2">Your journal is empty</h3>
               <p className="text-on-surface-variant font-medium">Create your first entry on the left to start your journaling journey.</p>
             </div>
          ) : (
             <div className="space-y-4">
               {journals.map((journal) => (
                 <article key={journal._id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow group relative">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-xl font-bold text-on-surface mb-1">{journal.title}</h3>
                       <p className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                         <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                         {new Date(journal.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                       </p>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getMoodColor(journal.mood)}`}>
                       {journal.mood}
                     </span>
                   </div>
                   
                   <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap mb-4">{journal.content}</p>

                   {/* AI Insights Section */}
                   {journal.aiAnalysis ? (
                     <div className="mt-5 pt-5 border-t border-outline-variant/15 space-y-4 bg-surface-container-low/20 p-4 rounded-2xl border border-outline-variant/10">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                           <h4 className="text-sm font-bold text-primary">AI Wellness Insights</h4>
                         </div>
                         <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">
                           Sentiment: {journal.aiAnalysis.sentiment}
                         </span>
                       </div>
                       
                       <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic bg-surface-container-lowest/80 p-3.5 rounded-xl border border-outline-variant/10 shadow-sm">
                         "{journal.aiAnalysis.summary}"
                       </p>
                       
                       <div className="space-y-2">
                         <h5 className="text-[11px] font-extrabold text-on-surface-variant/80 uppercase tracking-widest pl-1">Suggested Coping Strategies</h5>
                         <ul className="grid grid-cols-1 gap-2">
                           {journal.aiAnalysis.copingTips && journal.aiAnalysis.copingTips.map((tip, idx) => (
                             <li key={idx} className="flex items-start gap-2.5 text-xs text-on-surface-variant font-medium bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10 shadow-sm hover:translate-x-0.5 transition-transform">
                               <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                               <span className="leading-snug">{tip}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                       
                       {journal.aiAnalysis.encouragement && (
                         <div className="bg-primary/5 p-3 rounded-xl border border-primary/5 text-xs italic text-on-primary-fixed-variant flex items-start gap-2">
                           <span className="material-symbols-outlined text-primary text-[16px] shrink-0">format_quote</span>
                           <p className="leading-relaxed font-semibold">"{journal.aiAnalysis.encouragement}"</p>
                         </div>
                       )}
                     </div>
                   ) : (
                     <div className="mt-4 pt-4 border-t border-outline-variant/15 flex justify-end">
                       <button
                         onClick={() => handleAnalyzeJournal(journal._id)}
                         disabled={analyzingIds[journal._id]}
                         className="bg-primary hover:bg-primary-dim text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-60"
                       >
                         {analyzingIds[journal._id] ? (
                           <>
                             <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                             Analyzing with AI...
                           </>
                         ) : (
                           <>
                             <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                             Get AI Insights
                           </>
                         )}
                       </button>
                     </div>
                   )}
                   
                   <button 
                     onClick={() => handleDeleteJournal(journal._id)}
                     className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-error-container/50 p-2 rounded-full"
                     title="Delete Entry"
                   >
                     <span className="material-symbols-outlined text-[20px]">delete</span>
                   </button>
                 </article>
               ))}
             </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default JournalPage;
