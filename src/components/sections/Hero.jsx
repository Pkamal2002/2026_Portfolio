import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-6">
            Available for new opportunities
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            Hi, I'm <span className="text-white">Prafull Kamal.</span> <br />
            I build <span className="text-gradient hover:scale-105 inline-block transition-transform duration-300 origin-left">digital experiences.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
            A Full Stack Developer specializing in the MERN stack. I build beautiful, highly performant web applications with a focus on cutting-edge UI/UX.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-1"
            >
              View Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3.5 glass hover:bg-white/10 text-white font-semibold rounded-full hover:-translate-y-1 transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
