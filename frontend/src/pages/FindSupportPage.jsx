import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import MapComponent from '../components/MapComponent';

const FindSupportPage = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/therapists', {
          params: { search: searchQuery, specialty: selectedSpecialty }
        });
        setTherapists(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchTherapists();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedSpecialty]);

  return (
    <main className="pt-24 flex h-[calc(100vh-6rem)] overflow-hidden">
      {/* Left Panel: Search & List */}
      <section className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 flex flex-col bg-surface border-r border-[rgba(0,0,0,0.05)] md:bg-surface-container-low/30 h-full">
        {/* Search Header */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Find your sanctuary.</h1>
            <p className="text-on-surface-variant body-lg">Discover licensed therapists specialized in your needs.</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm" 
              placeholder="Search by name, specialty, or location..." 
              type="text" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Anxiety', 'CBT', 'Depression', 'Trauma', 'Mindfulness'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSelectedSpecialty(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSpecialty === tag ? 'bg-primary-container text-on-primary-container shadow-sm' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Profiles List */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-4">
          
          {loading ? (
             <div className="flex justify-center p-8 text-on-surface-variant"><span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Loading experts...</div>
          ) : error ? (
             <div className="p-4 bg-error-container text-on-error-container rounded-xl">{error}</div>
          ) : therapists.length === 0 ? (
             <div className="text-on-surface-variant text-center p-4">No therapists found in your area.</div>
          ) : (
             therapists.map((therapist) => (
                <div key={therapist._id} className="group p-5 bg-surface-container-lowest rounded-xl hover:shadow-lg transition-all duration-300 ring-1 ring-outline-variant/10">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-secondary-container">
                      <img className="w-full h-full object-cover" alt={therapist.name} src={therapist.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-on-surface">{therapist.name}</h3>
                          <p className="text-primary text-sm font-semibold">{therapist.title}</p>
                        </div>
                        <span className="flex items-center text-sm font-medium bg-tertiary-container px-2 py-1 rounded-lg text-on-tertiary-container">
                          <span className="material-symbols-outlined text-sm mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {therapist.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-on-surface-variant line-clamp-2 leading-relaxed">{therapist.description}</p>
                      
                      {/* Dynamic Specialties */}
                      <div className="flex flex-wrap gap-1 mt-2">
                         {therapist.specialty.map((spec, idx) => (
                             <span key={idx} className="text-[10px] bg-secondary-container/50 text-on-secondary-container px-2 py-0.5 rounded uppercase tracking-wider">{spec}</span>
                         ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-outline flex items-center">
                          <span className="material-symbols-outlined text-xs mr-1">location_on</span> {therapist.distanceInfo || 'Remote Only'}
                        </span>
                        <button className="text-primary font-bold text-sm hover:underline underline-offset-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Profile <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
             ))
          )}
          
        </div>
      </section>

      {/* Right Panel: Interactive Map */}
      <section className="hidden md:block flex-1 relative bg-surface-container-high overflow-hidden h-full">
        <MapComponent therapists={therapists} />

        {/* Floating Controls Overlay (Optional - Leaflet has its own, but we can keep ours for style) */}
        <div className="absolute bottom-10 right-8 flex flex-col gap-2 z-[1000]">
          <button className="w-12 h-12 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center text-on-surface hover:bg-surface transition-colors">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="w-12 h-12 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center text-on-surface hover:bg-surface transition-colors">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button className="w-12 h-12 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dim transition-colors mt-4">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default FindSupportPage;
