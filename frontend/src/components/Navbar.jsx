import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Find Help', to: '/find-support', icon: 'psychology' },
  { label: 'Community', to: '/community', icon: 'groups' },
  { label: 'Wellness Tools', to: '/games', icon: 'self_improvement' },
  { label: 'Journal', to: '/journal', icon: 'edit_note' },
  { label: 'AI Companion', to: '/ai-companion', icon: 'smart_toy' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close profile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const getLinkClasses = (path) => {
    const base = 'transition-all duration-300';
    return currentPath === path
      ? `${base} text-emerald-900 dark:text-emerald-50 font-semibold border-b-2 border-emerald-900 dark:border-emerald-100 pb-1`
      : `${base} text-stone-600 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-200`;
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    if (user) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* ── Desktop & Mobile Header ── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-8 py-3 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl rounded-full mt-4 mx-4 md:mx-auto md:max-w-7xl shadow-[0_10px_40px_rgba(48,51,47,0.06)] font-['Plus_Jakarta_Sans'] tracking-tight">
        <Link to="/" className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
          Sanctuary
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} className={getLinkClasses(to)} to={to}>{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Get Support — hidden on very small screens */}
          <Link
            to="/find-support"
            className="hidden sm:block bg-primary text-on-primary px-5 py-2 rounded-full font-medium transition-transform scale-95 active:scale-90 hover:opacity-90 text-sm"
          >
            Get Support
          </Link>

          {/* Avatar / login button */}
          <button onClick={handleUserClick} className="flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
            {user ? (
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                {user.username.charAt(0).toUpperCase()}
              </div>
            ) : (
              <span className="material-symbols-outlined text-stone-600 dark:text-stone-400">
                account_circle
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-surface-container-high transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-stone-600">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-down panel */}
        <nav
          className={`absolute top-0 left-4 right-4 mt-20 bg-stone-50 dark:bg-stone-900 rounded-[2rem] shadow-2xl p-6 transform transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
        >
          <ul className="space-y-1">
            {NAV_LINKS.map(({ label, to, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-colors ${
                    currentPath === to
                      ? 'bg-primary-container text-primary'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-outline-variant/20">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">{user.username}</p>
                    <p className="text-xs text-on-surface-variant truncate max-w-[160px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-xl text-error hover:bg-error-container/20 transition-colors"
                  title="Log out"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-dim transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* ── Profile Sidebar Overlay ── */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* ── Profile Sliding Sidebar Drawer ── */}
      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-screen flex flex-col p-6 z-50 bg-[#f4f4ef] dark:bg-[#252824] text-[#3d6660] dark:text-[#e2fff9] font-['Plus_Jakarta_Sans'] w-[300px] rounded-l-[2rem] shadow-[-20px_0_40px_rgba(48,51,47,0.08)] transform transition-transform duration-500 ease-in-out ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-start mb-8 pt-6">
          <h2 className="text-xl font-bold text-[#3d6660] tracking-tight">Sanctuary Account</h2>
          <button onClick={() => setIsProfileOpen(false)} className="text-[#30332f]/50 hover:text-[#3d6660] transition-colors p-2 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="mb-10 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-xl shadow-lg ring-4 ring-primary-container">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3d6660] truncate max-w-[150px]">{user?.username}</h2>
              <p className="text-xs font-semibold text-[#30332f]/60 truncate max-w-[150px]">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#30332f]/40 pl-2 mb-1">Preferences</p>
          <Link onClick={() => setIsProfileOpen(false)} className="flex items-center gap-4 p-3 bg-white dark:bg-[#30332f] text-[#3d6660] rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-1" to="/settings">
            <span className="material-symbols-outlined text-[20px]">person_outline</span>
            <span>Account Details</span>
          </Link>
          <Link onClick={() => setIsProfileOpen(false)} className="flex items-center gap-4 p-3 text-[#30332f]/70 dark:text-[#faf9f5]/70 hover:bg-[#eeeee9] dark:hover:bg-[#30332f]/50 rounded-xl font-medium transition-colors" to="/settings">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </Link>

          <div className="mt-8 mb-4 border-t border-outline-variant/10" />

          <button onClick={handleLogout} className="flex items-center gap-4 p-3 text-error dark:text-error-container hover:bg-error-container/20 rounded-xl font-bold transition-colors w-full text-left">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out Workspace</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
