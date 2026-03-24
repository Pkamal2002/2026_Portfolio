import { useState, useEffect } from 'react';
import api from '../../utils/axios';

export default function AdminProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '', githubLink: '', liveLink: '', techStack: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = { ...formData, techStack: formData.techStack.split(',').map(s => s.trim()) };
    
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.post('/projects', payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ title: '', description: '', image: '', githubLink: '', liveLink: '', techStack: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project. Ensure you are logged in.');
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj._id);
    setFormData({ ...proj, techStack: proj.techStack.join(', ') });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6 text-white">Manage Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Project Title" required className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="text" placeholder="Image URL (Unsplash or external Link)" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <input type="text" placeholder="GitHub Repository Link" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
          <input type="text" placeholder="Live Demo URL" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
          <input type="text" placeholder="Tech Stack (comma separated, e.g. React, Node.js)" required className="col-span-full w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
          <textarea placeholder="Project Description" required rows="3" className="col-span-full w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <div className="flex gap-4 pt-4">
            <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/30 transition-shadow">
              {editingId ? 'Update Project' : 'Add New Project'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', image: '', githubLink: '', liveLink: '', techStack: '' }); }} className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors">
                Cancel Edit
              </button>
            )}
        </div>
      </form>

      <div className="space-y-4">
        {projects.length === 0 ? <p className="text-gray-500">No projects found. Add one above.</p> : projects.map(p => (
          <div key={p._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10">
            <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-lg text-white">{p.title}</h3>
                <p className="text-sm text-primary font-medium">{p.techStack?.join(', ')}</p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-1">{p.description}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(p)} className="text-sm font-medium text-secondary hover:text-white transition-colors px-3 py-1.5 glass rounded-lg border-secondary/30">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-sm font-medium text-red-400 hover:text-white transition-colors px-3 py-1.5 glass rounded-lg border-red-500/30 hover:bg-red-500/50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
