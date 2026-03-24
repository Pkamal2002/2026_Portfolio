import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminProjectsTab from '../components/admin/AdminProjectsTab';
import AdminSkillsTab from '../components/admin/AdminSkillsTab';
import AdminMessagesTab from '../components/admin/AdminMessagesTab';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Admin <span className="text-gradient">Dashboard</span></h1>
          <button onClick={handleLogout} className="px-5 py-2 glass hover:bg-red-500/20 hover:text-red-400 rounded-full text-sm font-medium transition-all">
            Logout
          </button>
        </div>
        
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          {['projects', 'skills', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass p-8 rounded-3xl min-h-[500px]"
        >
          {activeTab === 'projects' && <AdminProjectsTab />}
          {activeTab === 'skills' && <AdminSkillsTab />}
          {activeTab === 'messages' && <AdminMessagesTab />}
        </motion.div>
      </div>
    </div>
  );
}
