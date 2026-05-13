import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only used in register
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!username) throw new Error('Username is required');
        await register(username, email, password);
      }
      navigate('/'); // Redirect to home on success
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest pt-20 px-4 pb-12 flex flex-col items-center justify-center">
      
      {/* Main Card Container */}
      <div className="w-full max-w-[1100px] h-auto md:h-[700px] bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant/10">
        
        {/* Left Side: Hero Image Area */}
        <div className="md:w-1/2 p-4 h-64 md:h-full relative">
           <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-inner">
             {/* Abstract forest path image matching the design */}
             <img 
               className="w-full h-full object-cover" 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3R0HjZpC_lD0-9z531_vWeLq8r2OQ2s21sZngPq8N3m1G2Q1h1wJqR_H_gI8c2wF3SZb9d4z2z_rY3I0R3mPqZlNgq_x1l6BvD_W8_Q12Msz1C7H5f1r35Z4wS6a8yGqS9v3S_S5_E1zI6zF1-Ew9KjX1v_1zM_6aQ-p0wUv-yT2aWp3WqI8" 
               alt="Peaceful forest path" 
             />
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#152e25]/90 via-[#152e25]/40 to-transparent"></div>
             
             <div className="absolute bottom-8 left-8 right-8 text-white z-10">
               <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Find your breath.</h2>
               <p className="text-white/80 font-medium leading-relaxed max-w-sm">
                 Join our community of mindful individuals on a journey toward mental clarity and emotional balance.
               </p>
             </div>
           </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Create your Sanctuary'}
            </h1>
            <p className="text-on-surface-variant font-medium mb-8">
              Choose your preferred way to enter your Sanctuary.
            </p>

            {/* Form Toggle Slider */}
            <div className="flex bg-surface-container-low rounded-full p-1 mb-8 shadow-inner">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${isLogin ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${!isLogin ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-6 bg-error-container text-on-error-container text-sm rounded-xl font-medium text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-on-surface pl-1 block">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                    placeholder="MindfulExplorer"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-on-surface pl-1 block">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                  placeholder="hello@sanctuary.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1 pr-1">
                  <label className="text-sm font-bold text-on-surface">Password</label>
                  {isLogin && <a href="#" className="flex-1text-xs font-bold text-primary hover:underline">Forgot Password?</a>}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dim text-white font-bold py-4 rounded-xl transition-colors shadow-md mt-4 disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Enter Sanctuary'}
              </button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-outline-variant/20"></div>
              <span className="relative bg-white px-4 text-[10px] font-bold text-outline uppercase tracking-widest">Or Continue With</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold py-3.5 rounded-xl transition-colors border border-outline-variant/10 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold py-3.5 rounded-xl transition-colors border border-outline-variant/10 shadow-sm">
                <svg className="w-5 h-5 text-on-surface" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05 1.8-3.08 1.81h-.08c-.73-.01-1.43-.24-2.14-.48-.68-.23-1.31-.44-1.9-.45-.6 0-1.25.21-1.93.44-.72.25-1.43.48-2.17.48h-.06c-1.03 0-2.11-.84-3.1-1.8-3.21-3.1-4.7-7.61-4.33-11.41.17-1.74.88-3.32 2.04-4.56 1.12-1.19 2.58-1.88 4.14-1.89h.09c1.08.01 2.09.41 3 1 .7.46 1.25.83 1.67.84.42 0 .97-.37 1.67-.84.9-.59 1.93-1 3.01-1.02h.1c1.55.01 2.99.69 4.1 1.86.36.38.67.8.93 1.25-2.31 1.14-3.7 3.49-3.41 6.07.24 2.06 1.5 3.86 3.36 4.75-.43 1.09-.99 2.11-1.63 3.03l-.06.09z" />
                  <path d="M12.03 5.48c-.01 0-.02 0 0 0-1.57-.15-3.05-1.21-3.76-2.59-.06-.11-.11-.23-.15-.35-.35-.87-.4-1.83-.14-2.73.04-.15.09-.29.13-.43 1.48.24 2.87 1.28 3.55 2.62.06.11.11.23.16.35.39.98.41 2.05.11 3.01-.03.11-.07.22-.11.33-.2.01-.4.01-.58.01z" />
                </svg>
                <span className="text-sm">Apple</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
