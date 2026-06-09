import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, Activity, ChevronDown, Database, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

export default function Home() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const canvasRef = useRef(null);
  const location = useLocation();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  useEffect(() => {
    // Reveal animation and count-up logic
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    function startCounters(container) {
      const counters = container.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 1800;
        let startTime = null;

        function count(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
          const currentVal = Math.floor(easeOutCubic * target);
          counter.textContent = currentVal;

          if (percentage < 1) {
            requestAnimationFrame(count);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(count);
      });
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.querySelector('.counter')) {
            startCounters(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phaseTheta = 0;
    let phaseGamma = 0;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animateWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      // Draw Low-Frequency Modulation Envelope (Theta Wave 4-8 Hz) in background
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.18)'; 
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
          const theta = (x / width) * Math.PI * 3.5 + phaseTheta;
          const y = height / 2 + Math.sin(theta) * (height * 0.22);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Draw Phase-Amplitude Coupled Oscillation (Gamma peaks nested within Theta phases)
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.82)'; 
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
          const theta = (x / width) * Math.PI * 3.5 + phaseTheta;
          const gamma = (x / width) * Math.PI * 30 + phaseGamma;
          
          // PAC Math: Gamma is amplified during high Theta peaks
          const amplitudeModulation = (Math.sin(theta) + 1.25) / 2.25; 
          const y = height / 2 + Math.sin(gamma) * (height * 0.28) * amplitudeModulation;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Real-time micro-stimulation triggers
      const triggerX = (phaseTheta * 55) % width;
      ctx.strokeStyle = '#c2f068'; 
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(triggerX, 0);
      ctx.lineTo(triggerX, height);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash state
      
      phaseTheta += 0.012;
      phaseGamma += 0.075;
      animationId = requestAnimationFrame(animateWave);
    }

    animateWave();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const accordions = [
    {
      title: "Theta & Gamma Waves",
      content: "Theta (4-8 Hz) is associated with memory encoding and cognitive control. Spikes in the frontal midline correlate tightly with working memory tasks. Gamma (30-80 Hz) is associated with high-level cognitive processing, feature binding, and memory recall."
    },
    {
      title: "Phase-Amplitude Coupling (PAC)",
      content: "A mechanism where the phase of a lower-frequency oscillation (Theta) drives the amplitude of a higher-frequency oscillation (Gamma). This is precisely how the brain organizes complex memory retrieval processes."
    },
    {
      title: "Closed-Loop Neuromodulation",
      content: "Unlike open-loop systems, a closed-loop system reads a physiological signal, processes it in real-time, and delivers stimulation based exactly on that signal's current state. It only acts when the \"Lapse Biomarker\" is detected."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* --- HERO SECTION --- */}
      <div className="p-4 md:p-6 overflow-hidden">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[85vh] flex flex-col justify-between p-8 md:p-12 shadow-2xl">
          
          {/* Atmospheric Cinematic Zoom Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center hero-img-zoom pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3)), url('https://res.cloudinary.com/dfw9z5ajv/image/upload/v1781041237/sasint-adult-1807500_ign6pd.jpg')"
            }}
          ></div>

          {/* Header */}
          <header className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-white">
              <Brain className="w-7 h-7" />
              <span className="logo text-2xl tracking-wide font-medium">Project Recall Rescue</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium backdrop-blur-md bg-white/10 px-8 py-3 rounded-full border border-white/20">
              <button onClick={() => handleScroll('concept')} className="hover:text-white transition-colors">Concept</button>
              <button onClick={() => handleScroll('science')} className="hover:text-white transition-colors">The Science</button>
              <button onClick={() => handleScroll('methodology')} className="hover:text-white transition-colors">Methodology</button>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-white">
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col items-center text-center relative z-10 max-w-4xl mx-auto mt-20 mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] mb-6 drop-shadow-lg animate-hero-text">
              Rescue memory <br/>
              <span className="italic font-light">when it matters most</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl drop-shadow-md animate-hero-sub">
              A closed-loop EEG system that detects cognitive fatigue and restores memory in real-time through precise, targeted auditory entrainment.
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScTG6FWtbY2MbhrTp1YMy4JMD5PxQMGI_edBDicRWk3Ptg1dw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/30 transition-all duration-300 btn-hover-effect shadow-lg shadow-purple-500/40 animate-hero-sub">
              Become a Mentor
            </a>
          </div>
        </div>
      </div>

      {/* --- ABOUT / CORE CONCEPT SECTION --- */}
      <section id="concept" className="py-24 px-6 md:px-16 max-w-7xl mx-auto reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">The Core Concept</h3>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight text-gray-900 mb-6">
              Moving beyond traditional pharmacology, we "listen" to the brain to intercept memory lapses before they happen.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Memory loss is a growing global crisis. Instead of continuously playing a frequency (open-loop), this system uses an EEG to monitor frontal lobe activity. The millisecond the neural signature of a "memory lapse" is detected, it triggers a precise auditory frequency to push the brain back into a state optimized for memory retrieval.
            </p>
          </div>
        </div>

        {/* Stats / Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col border-l-2 border-purple-200 pl-6">
            <span className="text-4xl md:text-5xl font-medium text-gray-900 mb-2 font-mono">
              <span className="counter" data-target="4">0</span>-<span class="counter" data-target="8">0</span> Hz
            </span>
            <span className="text-sm text-gray-500 leading-snug">Theta Wave Target (Memory Encoding)</span>
          </div>
          <div className="flex flex-col border-l-2 border-purple-200 pl-6">
            <span className="text-4xl md:text-5xl font-medium text-gray-900 mb-2 font-mono">
              <span className="counter" data-target="30">0</span>-<span class="counter" data-target="80">0</span> Hz
            </span>
            <span className="text-sm text-gray-500 leading-snug">Gamma Wave Target (Memory Recall)</span>
          </div>
          <div className="flex flex-col border-l-2 border-purple-200 pl-6">
            <span className="text-4xl md:text-5xl font-medium text-gray-900 mb-2 font-mono">
              &lt;<span className="counter" data-target="100">0</span>ms
            </span>
            <span className="text-sm text-gray-500 leading-snug">Real-Time System Latency</span>
          </div>
          <div className="flex flex-col border-l-2 border-purple-200 pl-6">
            <span className="text-4xl md:text-5xl font-medium text-gray-900 mb-2 font-mono">
              N ≥ <span className="counter" data-target="30">0</span>
            </span>
            <span className="text-sm text-gray-500 leading-snug">Required Clinical Trial Sample Size</span>
          </div>
        </div>
      </section>

      {/* --- THE SCIENCE & GAP SECTION --- */}
      <section id="science" className="p-4 md:p-6 reveal">
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-[2.5rem] p-8 md:p-16 lg:p-24 shadow-sm border border-purple-100/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <div className="mb-12">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500">Scientific Lexicon</h3>
                <h2 className="text-3xl md:text-5xl font-medium leading-tight max-w-3xl text-gray-900">The foundation of neuromodulation.</h2>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-12">
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Electroencephalography (EEG)</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Neural Oscillations</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Phase-Amplitude Coupling</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Event-Related Desynchronization</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Binaural Beats</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Isochronic Tones</span>
                <span className="bg-white/60 backdrop-blur-sm border border-purple-200/50 text-purple-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform cursor-default">Fast Fourier Transform (FFT)</span>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white">
                <h4 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-3">
                  <Activity className="text-purple-500 w-6 h-6 animate-pulse" />
                  The Research Gap
                </h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Current treatments blast 40Hz at the brain continuously. This is akin to a sprinkler watering a lawn even while it's raining, causing neural fatigue. <strong>Our Innovation:</strong> "Stimulation on demand." Targeted, instantaneous intervention at the exact moment of cognitive failure is more efficient than continuous baseline stimulation.
                </p>

                {/* Dynamic Canvas Live Emulation Wave */}
                <div className="bg-purple-950/5 rounded-2xl p-4 border border-purple-200/40">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-900/60">Live Signal Emulation (PAC)</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c2f068] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c2f068]"></span>
                    </span>
                  </div>
                  <canvas ref={canvasRef} id="waveCanvas" className="w-full h-24 rounded-xl border border-purple-200/25 bg-white/50 shadow-inner"></canvas>
                </div>
              </div>
            </div>

            {/* Smooth Shimmer Accordion Menu */}
            <div className="flex flex-col justify-center gap-2">
              {accordions.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div 
                    key={index} 
                    className={`border rounded-2xl px-4 transition-all duration-300 ${
                      isOpen ? 'bg-white/40 border-purple-200/50 shadow-sm' : 'border-transparent'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenAccordion(isOpen ? -1 : index)} 
                      className="w-full flex items-center justify-between py-6 text-left"
                    >
                      <span className="text-xl md:text-2xl font-medium text-gray-900">{item.title}</span>
                      <div className={`transform transition-transform duration-300 bg-white p-2 rounded-full shadow-sm ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed max-w-2xl text-lg pb-6">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* --- EXPERIMENTAL METHODOLOGY --- */}
      <section id="methodology" className="py-24 px-6 md:px-16 max-w-7xl mx-auto reveal">
        <div className="text-center mb-16">
          <div className="mb-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500">Step-by-Step Process</h3>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight max-w-3xl mx-auto text-gray-900">Rigorous Experimental Protocol.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-6">1</div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">Hardware & Integration</h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Utilize a high-performance BCI like Muse 2 or OpenBCI Cyton. We use dry electrodes on AF7/AF8 (Frontal lobe) to map Theta waves. The software stack includes Python, BrainFlow, MNE-Python, and PsychoPy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-6">2</div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">Biomarker Identification</h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Before closing the loop, evaluate test subjects on structured, obscure word pairs to isolate the "Lapse Biomarker." Analyzing EEG data 1 second before failure highlights drops in the Theta/Alpha ratio.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-6">3</div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">The Clinical Trial</h4>
            <p class="text-gray-600 leading-relaxed text-sm">
              Run N≥30 subjects under three Independent Variables: Active NeuroLoop, Sham (Random Loop), and Control. Measure Retrieval Latency, Recall Accuracy, and Post-Stimulus Theta/Gamma Power.
            </p>
          </div>
        </div>

        {/* Data Box */}
        <div className="mt-8 bg-gray-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-30 pointer-events-none"></div>
          
          <div className="max-w-2xl relative z-10">
            <h4 className="text-2xl font-medium mb-4 flex items-center gap-3">
              <Database className="text-purple-400 w-6 h-6" />
              Statistical Validation
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Evaluating true efficacy requires deep significance testing. We employ a Repeated-Measures ANOVA since subjects undergo all three conditions sequentially. A target result of p &lt; 0.05 validates intervention impact alongside Topographic Brain Maps and Time-Frequency Spectrograms.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-mono text-purple-300">p &lt; 0.05 Target</div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-mono text-purple-300">Repeated-Measures ANOVA</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP TO CLINICAL READINESS --- */}
      <div className="p-4 md:p-6 mb-12 reveal">
        <div 
          className="relative rounded-[2.5rem] overflow-hidden flex flex-col justify-center items-center text-center p-12 md:p-24 shadow-xl"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-6">
              Path to Clinical Readiness
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light mb-10">
              Moving from a laboratory prototype to an accessible, real-time consumer wearable capable of treating cognitive fatigue and mild memory loss in daily settings.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 text-left mx-auto max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
              <ul className="space-y-3 text-white/90 text-sm flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Secure clinical IRB approval</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Scale medical-grade EEG hardware</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Optimize latency via WebBCI engine</li>
              </ul>
              <ul className="space-y-3 text-white/90 text-sm flex-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Refine personalized lapse biomarkers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Expand clinical cohorts to N≥100</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#c2f068]" /> Publish open-source datasets & codebases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
