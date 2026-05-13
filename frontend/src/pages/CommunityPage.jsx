import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useToast } from '../context/ToastContext';

const CATEGORIES = ['All', 'Depression', 'Loneliness', 'Seeking Hope', 'Mindfulness', 'General'];
const CATEGORY_ICONS = {
  'All': 'all_inclusive',
  'Depression': 'mood_bad',
  'Loneliness': 'person_off',
  'Seeking Hope': 'auto_awesome',
  'Mindfulness': 'self_improvement',
  'General': 'forum',
};

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Filter & sort state
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortMode, setSortMode] = useState('recent'); // 'recent' | 'trending'

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) { setSubmitError('You must be logged in to post.'); return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      const { data } = await api.post('/posts', { title: newTitle, content: newContent, category: newCategory });
      setPosts([data, ...posts]);
      setNewTitle(''); setNewContent(''); setNewCategory('General');
      setIsFormOpen(false);
      toast('Post shared with the community! 🌿', 'success');
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return;
    try {
      const { data } = await api.put(`/posts/${postId}/like`);
      setPosts(posts.map((p) => p._id === postId ? { ...p, likes: data.likes } : p));
    } catch (err) {
      toast('Failed to like post.', 'error');
      console.error('Like failed', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
      toast('Post deleted.', 'info');
    } catch (err) {
      toast('Failed to delete post.', 'error');
      console.error('Delete failed', err);
    }
  };

  const isLiked = (post) => user && post.likes?.some((id) => id === user._id || id?._id === user._id);
  const isOwner = (post) => user && (post.author?._id === user._id || post.author === user._id);

  // Filter and sort
  const displayedPosts = posts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => sortMode === 'trending'
      ? (b.likes?.length || 0) - (a.likes?.length || 0)
      : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <div className="bg-surface-container-low p-6 rounded-xl space-y-6">
            <h3 className="text-on-surface font-semibold text-lg">Topics</h3>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-left w-full ${
                    activeCategory === cat
                      ? 'bg-surface-container-lowest text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined">{CATEGORY_ICONS[cat]}</span>
                  {cat === 'All' ? 'All Discussions' : cat}
                </button>
              ))}
            </nav>
          </div>
          <div className="bg-tertiary-container p-6 rounded-xl">
            <h4 className="text-on-tertiary-container font-bold mb-2">Safe Space Policy</h4>
            <p className="text-on-tertiary-container/80 text-sm leading-relaxed">
              Every voice here is valued. Please lead with kindness and respect the shared journey of others.
            </p>
          </div>
        </aside>

        {/* Main Feed */}
        <section className="lg:col-span-6 space-y-6">
          {/* Create Post */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm mb-6">
            {!isFormOpen ? (
              <div className="flex items-center gap-4 cursor-text" onClick={() => user && setIsFormOpen(true)}>
                {user ? (
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-outline-variant text-4xl">account_circle</span>
                )}
                <div className="flex-1 text-left px-4 py-3 bg-surface-container-low text-on-surface-variant rounded-lg hover:bg-surface-container transition-colors">
                  {user ? `Share your thoughts, ${user.username}...` : 'Log in to share your thoughts...'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                {submitError && <div className="text-error text-sm">{submitError}</div>}
                <input
                  type="text" placeholder="Title of your post..." required
                  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-surface-container-low border-none text-on-surface rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary font-bold text-lg"
                />
                <textarea
                  placeholder="What's on your mind?" required rows="4"
                  value={newContent} onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-surface-container-low border-none text-on-surface rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary resize-none"
                />
                <div className="flex justify-between items-center pt-2">
                  <select
                    value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-surface-container text-on-surface rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none border-none text-sm font-medium"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container rounded-lg transition-colors">Cancel</button>
                    <button type="submit" disabled={submitting || !user} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50 flex items-center gap-2">
                      {submitting ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : 'Post'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Sort Tabs */}
          <div className="flex items-center gap-4 px-2">
            <button
              onClick={() => setSortMode('recent')}
              className={`text-sm font-semibold pb-1 transition-colors ${sortMode === 'recent' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Recent
            </button>
            <button
              onClick={() => setSortMode('trending')}
              className={`text-sm font-semibold pb-1 transition-colors ${sortMode === 'trending' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Trending
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8 text-on-surface-variant">
                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Loading community posts...
              </div>
            ) : error ? (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl">{error}</div>
            ) : displayedPosts.length === 0 ? (
              <div className="text-on-surface-variant text-center p-8 bg-surface-container-low rounded-xl">
                {activeCategory === 'All' ? 'No posts yet. Be the first to share!' : `No posts in "${activeCategory}" yet.`}
              </div>
            ) : (
              displayedPosts.map((post) => (
                <article key={post._id} className="bg-surface-container-lowest p-6 rounded-xl hover:shadow-md transition-shadow group relative">
                  {/* Delete button — only for post author */}
                  {isOwner(post) && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-error-container/50 p-1.5 rounded-full"
                      title="Delete post"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      post.category === 'Loneliness' ? 'text-secondary bg-secondary-container' : 'text-primary bg-primary-container'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Posted by <span className="font-medium italic">{post.author?.username || 'Unknown'}</span> · {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-on-surface mb-3">{post.title}</h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">{post.content}</p>

                  <div className="flex items-center justify-between border-t border-surface-container-high pt-4">
                    <div className="flex items-center gap-6">
                      {/* Like button */}
                      <button
                        onClick={() => handleLike(post._id)}
                        disabled={!user}
                        className={`flex items-center gap-2 transition-colors ${isLiked(post) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'} disabled:opacity-50`}
                        title={user ? (isLiked(post) ? 'Unlike' : 'Like') : 'Log in to like'}
                      >
                        <span
                          className="material-symbols-outlined text-[20px] transition-transform active:scale-125"
                          style={{ fontVariationSettings: isLiked(post) ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                        <span className="text-sm font-medium">{post.likes?.length || 0}</span>
                      </button>

                      <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                        <span className="text-sm font-medium">Comments</span>
                      </button>
                    </div>
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
            <div className="h-24 w-full bg-primary-container relative">
              <img className="w-full h-full object-cover mix-blend-overlay opacity-30" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6DLJ9p5vqpgi7zkLGCQcAyCNslvkrVi4o8dIcLGfGypsIIIHZIxK1IGrnJYhpuxznovwibAj5DfcKi-s0peugeWDV4AG2VxN5tW2EUX0VkG4n399LXwCunianDzikGjArayk5aM5QvCQkkxHUtFOp77wvxKsPEtCp666qAAyoqUYmSKFveQwSwRgFH7DH0ekcf1Je05YEnAXWUWyEmIop07wlz2SXzE_fCz_5NDC3nO6w2l-vFJC4kB-LtB0NZaUyl25twR68qNbs" />
            </div>
            <div className="p-6 text-center">
              <span className="font-bold text-primary text-xs uppercase tracking-widest block mb-2">Daily Affirmation</span>
              <p className="text-on-surface italic text-sm mb-4">"You do not have to be good. You only have to let the soft animal of your body love what it loves."</p>
              <p className="text-xs text-on-surface-variant">— Mary Oliver</p>
            </div>
          </div>
          {/* Community stats */}
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h4 className="font-bold text-on-surface mb-4">Community</h4>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Total Posts</span>
              <span className="font-bold text-on-surface">{posts.length}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-on-surface-variant">Showing</span>
              <span className="font-bold text-on-surface">{displayedPosts.length}</span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default CommunityPage;
