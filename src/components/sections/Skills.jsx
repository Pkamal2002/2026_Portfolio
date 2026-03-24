import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/axios';

const fallbackSkillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "React Native", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC"]
  },
  {
    title: "Database & DevOps",
    skills: ["MongoDB", "AWS EC2", "AWS S3", "Nginx", "Caddy", "CI/CD"]
  },
  {
    title: "Tools & Automation",
    skills: ["n8n", "GenAI", "OAuth2", "Webhooks", "Git"]
  }
];

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        if (res.data && res.data.length > 0) {
          setSkillCategories(res.data);
        } else {
          setSkillCategories(fallbackSkillCategories);
        }
      } catch (err) {
        console.error("Error fetching skills", err);
        setSkillCategories(fallbackSkillCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20 relative bg-[#0f1115]/80">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] flex-grow bg-white/10 mt-2"></div>
            <h2 className="text-3xl md:text-5xl font-bold">My <span className="text-gradient">Skills</span></h2>
            <div className="h-[1px] flex-grow bg-white/10 mt-2"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20 text-gray-400">Loading skills...</div>
            ) : (
              skillCategories.map((category, idx) => (
                <motion.div 
                  key={category._id || category.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass p-8 rounded-2xl border-t border-white/5 hover:border-primary/50 transition-colors duration-300 group"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white group-hover:text-primary transition-colors">{category.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-4 py-2 bg-white/5 hover:bg-primary/20 hover:text-primary transition-all rounded-lg text-sm font-medium border border-white/10 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
