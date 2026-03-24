import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">About <span className="text-gradient">Me</span></h2>
            <div className="h-[1px] flex-grow bg-white/10 mt-2"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Hello! My name is Prafull Kamal and I enjoy creating things that live on the internet. My interest in web development started back when I was exploring AI and realized I wanted to build the interfaces that people use to interact with complex systems.
              </p>
              <p>
                Fast-forward to today, and I've built and deployed 4+ production apps using the MERN stack. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              <p>
                I hold a B.Tech in CSE (AI) and have a strong passion for continuous learning and automation. Recently, I've been diving deep into integrating GenAI with web apps to boost efficiency.
              </p>
            </div>
            
            <div className="relative group mx-auto md:ml-auto md:mx-0 w-3/4 md:w-full max-w-sm">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl md:rounded-3xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              <div className="relative glass p-2 rounded-2xl md:rounded-3xl overflow-hidden aspect-square flex items-center justify-center border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                <span className="text-[120px] md:text-[150px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 select-none">PK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
