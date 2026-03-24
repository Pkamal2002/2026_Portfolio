import { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import api from '../../utils/axios';

const fallbackProjects = [
  {
    title: "Resume Builder",
    description: "A full-stack resume builder with dynamic templates, user authentication, and PDF export functionality.",
    tech: ["MERN", "AWS", "Tailwind CSS", "JWT"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "AI Email Automation",
    description: "Automated workflow handling 100+ emails/day using n8n and GenAI connected with OAuth2 and Webhooks.",
    tech: ["n8n", "GenAI", "OAuth2", "Webhooks"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Express Generator Package",
    description: "An npm package to scaffold Express.js applications rapidly with predefined structure and best practices.",
    tech: ["Node.js", "npm", "CLI"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
  }
];

const ProjectCard = ({ project }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative max-w-sm mx-auto w-full glass rounded-3xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className="h-48 overflow-hidden relative border-b border-white/10">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity z-10 duration-500"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6 relative z-20 bg-[var(--color-bg-dark)]/50">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech?.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/10 text-primary">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <a href={project.github} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <Code size={18} /> Code
          </a>
          <a href={project.live} className="flex items-center gap-2 text-sm text-gray-300 hover:text-secondary transition-colors">
            <ExternalLink size={18} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data && res.data.length > 0) {
          setProjectsData(res.data);
        } else {
          setProjectsData(fallbackProjects);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
        setProjectsData(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-[#0f1115]/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Featured <span className="text-gradient">Projects</span></h2>
            <div className="h-[1px] flex-grow bg-white/10 mt-2"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20 text-gray-400">Loading projects...</div>
            ) : (
              projectsData.map((project, idx) => (
                <ProjectCard key={project._id || idx} project={project} />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
