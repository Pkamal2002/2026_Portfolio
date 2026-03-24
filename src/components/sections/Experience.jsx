import { motion } from 'framer-motion';

const experiences = [
  {
    role: "MERN Developer",
    company: "Adecho Technology",
    period: "2024 - Present",
    description: "Built and deployed 4+ production MERN apps. Configured AWS EC2, S3, and Nginx. Automated workflows using n8n + GenAI achieving 40% efficiency boost. Built AI email agent handling 100+ emails/day."
  },
  {
    role: "Web Dev Intern",
    company: "Adecho Technology",
    period: "2024",
    description: "Developed UI components using React and Tailwind CSS. Integrated RESTful APIs and assisted in backend testing."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Work <span className="text-gradient">Experience</span></h2>
            <div className="h-[1px] flex-grow bg-white/10 mt-2"></div>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2"></div>
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-white/10"></div>

            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-[-37px] md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-[#0f1115] -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                  
                  <div className={`glass p-8 rounded-2xl md:w-[45%] hover:-translate-y-1 transition-transform duration-300 border border-white/5`}>
                    <span className="text-secondary font-mono text-sm mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-gray-400 font-medium mb-4">{exp.company}</h4>
                    <p className="text-gray-300 text-base leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
