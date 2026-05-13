import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useToast } from '../context/ToastContext';

const SettingsPage = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', { username, email, password });
      login(data);
      toast('Profile updated successfully! ✨', 'success');
      setPassword('');
    } catch (err) {
      toast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await api.delete('/users/profile');
        logout();
        navigate('/');
      } catch (err) {
        toast(err.response?.data?.message || err.message, 'error');
      }
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Account Settings</h1>
        <p className="text-on-surface-variant mt-2">Manage your profile information and security.</p>
      </div>

      <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm ring-1 ring-outline-variant/10">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">New Password (leave blank to keep current)</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary transition-all pr-12"
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
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-dim transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>

        <div className="mt-16 pt-10 border-t border-outline-variant/20">
          <h2 className="text-xl font-bold text-error mb-2">Danger Zone</h2>
          <p className="text-on-surface-variant text-sm mb-6">Permanently delete your account and all associated data.</p>
          <button 
            onClick={handleDeleteAccount}
            className="px-6 py-3 border-2 border-error text-error rounded-full font-bold hover:bg-error hover:text-on-error transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
