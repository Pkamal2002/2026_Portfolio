import { useState, useEffect } from 'react';
import api from '../../utils/axios';

export default function AdminMessagesTab() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await api.get('/contact', { headers: { Authorization: `Bearer ${token}` } });
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/contact/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6 text-white">Contact Messages</h2>

      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-gray-500">No messages found. Tell your visitors to say hi!</p> : messages.map(msg => (
          <div key={msg._id} className="p-5 bg-white/5 rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
              </div>
              <span className="text-xs text-gray-500 px-3 py-1 bg-[#0f1115] rounded-full">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-300 mt-4 text-sm leading-relaxed p-4 bg-[#0f1115] rounded-lg border border-white/5">{msg.message}</p>
            <button onClick={() => deleteMessage(msg._id)} className="px-4 mt-4 py-2 glass hover:bg-red-500/20 hover:text-red-400 rounded-full text-sm font-medium transition-all">
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
