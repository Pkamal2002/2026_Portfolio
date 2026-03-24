import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/axios';

export default function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-8 rounded-3xl w-full max-w-md border-primary/20">
        <h2 className="text-3xl font-bold mb-2 text-center">Admin <span className="text-gradient">Setup</span></h2>
        <p className="text-center text-sm text-yellow-500 mb-6">⚠️ Note: Once you create your account, it's highly recommended to disable or remove this page in production!</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-3 mb-6 text-sm">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500/50 text-green-400 rounded-xl p-3 mb-6 text-sm">{success}</div>}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Admin Email</label>
            <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Admin Password</label>
            <input type="password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={!!success} className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all mt-4 disabled:opacity-50">Create Admin Account</button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link to="/admin/login" className="text-primary hover:underline">Login here</Link>
        </div>
      </motion.div>
    </div>
  );
}
