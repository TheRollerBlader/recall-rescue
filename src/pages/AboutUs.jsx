import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, Mail, User, Phone } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutUs() {
  useEffect(() => {
    // Reveal animation intersection observer
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
      // Force active if already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* --- HEADER SECTION --- */}
      <div className="p-4 md:p-6">
        <header className="flex items-center justify-between relative z-10 bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-sm border border-gray-200/50">
          <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-purple-600 transition-colors">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="logo text-xl md:text-2xl tracking-wide font-medium">Project Recall Rescue</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
            <Link to="/#concept" className="hover:text-purple-600 transition-colors">Concept</Link>
            <Link to="/#science" className="hover:text-purple-600 transition-colors">The Science</Link>
            <Link to="/#methodology" className="hover:text-purple-600 transition-colors">Methodology</Link>
            <Link to="/about" className="text-purple-600 transition-colors">About Us</Link>
          </nav>

          <div className="flex items-center gap-4 hidden md:block">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScTG6FWtbY2MbhrTp1YMy4JMD5PxQMGI_edBDicRWk3Ptg1dw/viewform?usp=publish-editor"
               target="_blank" rel="noopener noreferrer"
               className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-all btn-hover-effect shadow-md shadow-purple-500/20">
              Become a Mentor
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-900">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </header>
      </div>

      {/* --- ABOUT US HERO --- */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto reveal text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">The Minds Behind The Machine</h3>
        <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6 leading-tight max-w-3xl mx-auto">
          Meet the team pioneering cognitive restoration.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We are a trio of high school juniors dedicated to translating cutting-edge BCI research into real-world applications.
        </p>
      </section>

      {/* --- TEAM GRID --- */}
      <section className="pb-24 px-6 md:px-16 max-w-7xl mx-auto reveal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Team Member 1 */}
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-purple-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="h-80 w-full overflow-hidden bg-gray-100 relative">
              <img src="https://res.cloudinary.com/dfw9z5ajv/image/upload/f_auto,q_auto/v1781042876/IMG_2664_mfxn2p.jpg"
                   alt="Ramcharit Podamala" 
                   className="w-full h-full object-cover ramcharit-img" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">Ramcharit Podamala</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                As an aspiring physician, this project immediately hooked me because it connects my love for medicine with the fascinating, data-heavy side of neuro-technology. Figuring out how to track brainwaves in real time sparked a huge passion in me for neuroscience and understanding how we actually think. With tens of millions of people currently facing dementia, I just refuse to accept a world where the people we love lose the memories that give them a joyful life.
              </p>
              <div className="flex gap-4">
                <a href="mailto:ramcharitpodamala9@gmail.com" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:945-289-7248" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Phone">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-purple-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="h-80 w-full overflow-hidden bg-gray-100 relative">
              <img src="https://res.cloudinary.com/dfw9z5ajv/image/upload/f_auto,q_auto/v1780974322/20260607_194341_diyyrw.jpg"
                   alt="Krish Bharadiya"
                   className="w-full h-full object-cover object-[90%_center] group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">Krish Bharadiya</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                I have a passion for AI technology and creating AI solutions to help people. This project caught my interest immediately because of its data heavy nature and the technical possibilities but it also helped me find my passion in neuroscience and how people think. I want to be able to take my passions and help people remember the more beautiful things in life.
              </p>
              <div className="flex gap-4">
                <a href="mailto:bharadiyakrish@gmail.com" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:469-742-3271" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Phone">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-purple-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="h-80 w-full overflow-hidden bg-gray-100 relative">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
                <User className="w-16 h-16 text-purple-300" />
                <span className="text-xs font-medium uppercase tracking-wider text-purple-400">Photo Coming Soon</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">Moosa Mir</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                I have a passion for understanding the human mind and exploring how our brains work. This neuroscience research project caught my interest immediately because of its curiosity-driven nature and the complex questions it tries to answer, but it also helped me find my passion for collaboration and scientific discovery. I want to be able to take my love for learning—and even the focus I get from playing soccer—and use it to help people keep their minds sharp and healthy.
              </p>
              <div className="flex gap-4">
                <a href="mailto:mirmoosa1014@gmail.com" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:945-310-7550" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Phone">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
