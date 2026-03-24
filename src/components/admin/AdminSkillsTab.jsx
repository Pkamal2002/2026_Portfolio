import { useState, useEffect } from 'react';
import api from '../../utils/axios';

export default function AdminSkillsTab() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ title: '', skills: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = { ...formData, skills: formData.skills.split(',').map(s => s.trim()) };
    
    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.post('/skills', payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ title: '', skills: '' });
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert('Failed to save skill category.');
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({ title: cat.title, skills: cat.skills.join(', ') });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill category?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6 text-white">Manage Skills Overview</h2>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Category Title (e.g. Frontend)" required className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="text" placeholder="Skills (comma separated, e.g. React, Vue)" required className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 text-white transition-colors" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
        </div>
        <div className="flex gap-4 pt-4">
            <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/30 transition-shadow">
              {editingId ? 'Update Category' : 'Add New Category'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', skills: '' }); }} className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors">
                Cancel Edit
              </button>
            )}
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {categories.length === 0 ? <p className="text-gray-500 col-span-full">No skill categories found. Add one above.</p> : categories.map(cat => (
          <div key={cat._id} className="p-5 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-white">{cat.title}</h3>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(cat)} className="text-xs font-medium text-secondary hover:text-white transition-colors">Edit</button>
                  <button onClick={() => handleDelete(cat._id)} className="text-xs font-medium text-red-400 hover:text-white transition-colors">Delete</button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills?.map(skill => (
                <span key={skill} className="px-3 py-1 bg-[#0f1115] rounded-md text-xs border border-white/5 text-gray-300">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
