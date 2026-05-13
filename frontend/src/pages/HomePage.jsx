import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [therapistCount, setTherapistCount] = useState(120); // Fallback
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [therapistsRes, postsRes] = await Promise.all([
          api.get('/therapists'),
          api.get('/posts')
        ]);
        setTherapistCount(therapistsRes.data.length);
        setRecentPosts(postsRes.data.slice(0, 2)); // Top 2 latest posts
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative px-8 py-20 lg:py-32 max-w-7xl mx-auto overflow-hidden">
        <div className="asymmetric-grid gap-12 items-center">
          <div className="z-10">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
              You are not alone. <br/>
              <span className="text-primary">Find your peace here.</span>
            </h1>
            <p className="text-lg lg:text-xl text-on-surface-variant max-w-md leading-relaxed mb-10">
              A curated sanctuary for mental wellness, connecting you with compassionate care and a supportive community.
            </p>
            <div className="flex flex-wrap gap-4">
              {user ? (
                <Link to="/community" className="bg-primary text-on-primary px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-primary-dim transition-colors">Go to Community</Link>
              ) : (
                <Link to="/login" className="bg-primary text-on-primary px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-primary-dim transition-colors">Start Your Journey</Link>
              )}
              <Link to="/find-support" className="text-primary font-semibold px-8 py-4 flex items-center gap-2 hover:bg-primary-container/30 rounded-full transition-all">
                Explore Resources <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img alt="Woman meditating" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeRVGZzN0T1dzl3y1AP_farvnX4dXGCcDd6ThtHM89KgoxC1Imxb6FTYfX1l_Puqv5WeuDBAnBsyfuWXLip3rgTm6rBULEgp1WSu1K5TtfcdALHkke0j6PgRPxAMFv1tJVyJNv0u9MyMPZvSKP-fGX37ohV4FF8Ku_Y8NRzIWj63bGaS4ykmCsRaDk1MPo9PJupiy1YTMfSnXkd7bTxipYcKfkgmR5xPQcPaJiBFpOMr1Ku6FGB2StiZ4bgpEfw6REeDhdNb6HlKqn" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        </div>
        {/* Floating Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-tertiary-container/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-container/40 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* How We Help - Bento Grid */}
      <section className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">Pathways to Peace</span>
            <h2 className="text-4xl font-bold mt-2">How we help</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between shadow-sm border border-outline-variant/10">
              <div>
                <span className="material-symbols-outlined text-4xl text-primary mb-6">auto_awesome</span>
                <h3 className="text-3xl font-bold mb-4">Mindful Journaling</h3>
                <p className="text-on-surface-variant max-w-sm text-lg leading-relaxed">Externalize your thoughts with our guided editorial journal, designed to help you process emotions safely.</p>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl h-48">
                <img alt="Journal" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3FDBWPIxEmyaV-qRiAo17frAgkfzLDdDWz3_Vd_oSeXM5UOVMoSwc1rJ9OwGQD2U6ccBUwSWhbd--CYCfJF6eXyuVuSZZHbgh99116tMrDvn28kW9VDYxUVD1PGC4qOYwa_elq81lXsbgpGPVaUyWDNStGMJxr_Zj5YHxe3odov-iml4lA0nXEsh1sH9Ta04vhELR1zrijdTCcXxgNkxvU1ljGW5TW488sEHbJxOyTxmIMrRkSYSM6tvSYlZ1jeaCGMAHqeyd7g1E" />
              </div>
            </div>
            <div className="bg-primary text-on-primary p-10 rounded-[2rem] shadow-xl flex flex-col justify-center">
              <span className="material-symbols-outlined text-5xl mb-6">groups</span>
              <h3 className="text-3xl font-bold mb-4">Daily Check-ins</h3>
              <p className="opacity-80 text-lg">A gentle morning nudge to ground yourself before the world gets loud.</p>
              <Link to="/journal" className="inline-block mt-8 bg-white/20 hover:bg-white/30 text-white rounded-full py-3 px-6 w-fit transition-colors">Learn More</Link>
            </div>
            <div className="bg-tertiary-container p-10 rounded-[2rem] flex flex-col justify-between">
              <h3 className="text-2xl font-bold">Holistic Resources</h3>
              <p className="text-on-tertiary-container">Breathwork, meditation, and sleep guides curated by experts.</p>
              <span className="material-symbols-outlined self-end text-3xl">spa</span>
            </div>
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-outline-variant/10 flex flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Safe Spaces</h3>
                <p className="text-on-surface-variant">Encrypted, private, and judgment-free zones for your data.</p>
              </div>
              <span className="material-symbols-outlined text-6xl text-outline-variant/30" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Find a Therapist */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
            <div className="bg-surface-container-high w-full aspect-square rounded-[4rem] overflow-hidden rotate-3">
              <img alt="Therapist" className="w-full h-full object-cover -rotate-3 scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAEzVZlydhWJvG8nBrPSL8uo7BcmetGeRx55bsBnqx3KhoPdPpQjki9twnfzR6Q9K1DakRZnTLRisblDvoZmz-MJbQRYMLqLYJyuZg8-OpLi5v9TZzOXaLxzfifGxhxGfuuYsLZEg3MtWdHJ97phV_rU_My6iUjdt-BhodGuZK_rUWbL64NJT6OiYfgpqXf9YZIhdYSn4qryEyls97q9uUi4C0GIZXUmqHILtJrqzJeNdJ9F8o0iAPWwaWZB_J5XfGNfN17qwvJ6pa" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-surface-container-lowest p-8 rounded-3xl shadow-xl max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{therapistCount} Therapists Online Now</span>
              </div>
              <p className="text-sm italic text-on-surface-variant">"Finding Sanctuary changed how I view self-care. It's my daily anchor."</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">Expert Care</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">Find a Therapist</h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              Match with licensed professionals who specialize in your specific needs. From anxiety and stress to trauma-informed care, our network is built on empathy.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary p-2 bg-primary-container rounded-xl">verified</span>
                <div>
                  <h4 className="font-bold">Fully Vetted Specialists</h4>
                  <p className="text-on-surface-variant text-sm">Every therapist is rigorously screened and certified.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary p-2 bg-primary-container rounded-xl">schedule</span>
                <div>
                  <h4 className="font-bold">Flexible Sessions</h4>
                  <p className="text-on-surface-variant text-sm">Video, audio, or text—choose what feels safest for you.</p>
                </div>
              </div>
            </div>
            <Link to="/find-support" className="inline-block bg-primary text-on-primary px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-primary-dim transition-all">Match Me with a Professional</Link>
          </div>
        </div>
      </section>

      {/* Our Community */}
      <section className="py-24 bg-surface text-center px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">Our Community</span>
          <h2 className="text-4xl font-bold mt-4 mb-16">Healing happens in connection.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
              <div key={post._id} className="bg-surface-container p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xl mb-2 line-clamp-1">{post.title}</h4>
                  <p className="text-lg mb-6 leading-relaxed line-clamp-3 text-on-surface-variant italic">"{post.content}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-lg">
                    {post.author?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold">{post.author?.username || 'Anonymous'}</h5>
                    <p className="text-xs text-on-surface-variant text-primary font-semibold">{post.category}</p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="col-span-2 text-center text-on-surface-variant">Community posts will appear here.</p>
            )}
          </div>
          <div className="mt-20 p-12 bg-emerald-900 text-on-primary rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Join 50,000+ others finding their peace.</h3>
              <p className="mb-8 opacity-80">Free to join. Unlimited support.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-8 py-3 w-full max-w-xs focus:ring-2 focus:ring-primary-fixed" placeholder="Enter your email" type="email" />
                <button className="bg-white text-emerald-900 font-bold px-10 py-3 rounded-full hover:bg-on-primary transition-colors">Get Access</button>
              </div>
            </div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-fixed-dim/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
