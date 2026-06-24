import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

export default function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileScroll = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      handleScroll(id);
    }, 200);
  };

  const headerContent = (
    <header className={`flex items-center justify-between relative z-50 w-full ${
      transparent 
        ? 'text-white' 
        : 'bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-sm border border-gray-200/50 text-gray-900'
    }`}>
      <Link to="/" className="flex items-center gap-2 transition-colors">
        <Brain className={`w-7 h-7 ${transparent ? 'text-white' : 'text-purple-600'}`} />
        <span className="logo text-xl md:text-2xl tracking-wide font-medium">Project Recall Rescue</span>
      </Link>
      
      <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${
        transparent 
          ? 'text-white/90 backdrop-blur-md bg-white/10 px-8 py-3 rounded-full border border-white/20' 
          : 'text-gray-600'
      }`}>
        <button onClick={() => handleScroll('concept')} className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-purple-600'}`}>Concept</button>
        <button onClick={() => handleScroll('science')} className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-purple-600'}`}>The Science</button>
        <button onClick={() => handleScroll('methodology')} className={`transition-colors ${transparent ? 'hover:text-white' : 'hover:text-purple-600'}`}>Methodology</button>
        <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? (transparent ? 'text-white font-semibold' : 'text-purple-600 font-semibold') : (transparent ? 'hover:text-white' : 'hover:text-purple-600')}`}>About Us</Link>
      </nav>

      <div className={`items-center gap-4 hidden md:flex ${transparent ? 'opacity-0 pointer-events-none w-0' : ''}`}>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScTG6FWtbY2MbhrTp1YMy4JMD5PxQMGI_edBDicRWk3Ptg1dw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-all btn-hover-effect shadow-md shadow-purple-500/20">
          Become a Mentor
        </a>
      </div>
      
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${transparent ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-purple-600'}`} aria-label="Toggle menu">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
    </header>
  );

  const mobileMenu = (
    <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-lg flex flex-col pt-28 px-8 pb-8 md:hidden transition-all duration-350 ease-in-out ${
      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
    }`}>
      <nav className="flex flex-col gap-6 text-xl font-medium text-gray-900 flex-grow">
        <button onClick={() => handleMobileScroll('concept')} className="text-left py-3 border-b border-gray-100 hover:text-purple-600 transition-colors">Concept</button>
        <button onClick={() => handleMobileScroll('science')} className="text-left py-3 border-b border-gray-100 hover:text-purple-600 transition-colors">The Science</button>
        <button onClick={() => handleMobileScroll('methodology')} className="text-left py-3 border-b border-gray-100 hover:text-purple-600 transition-colors">Methodology</button>
        <Link to="/about" onClick={() => setIsOpen(false)} className={`py-3 border-b border-gray-100 transition-colors ${location.pathname === '/about' ? 'text-purple-600 font-semibold' : 'hover:text-purple-600'}`}>About Us</Link>
      </nav>
      <div className="mt-auto">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScTG6FWtbY2MbhrTp1YMy4JMD5PxQMGI_edBDicRWk3Ptg1dw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block text-center bg-purple-600 text-white py-4 rounded-full font-medium text-base hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/20">
          Become a Mentor
        </a>
      </div>
    </div>
  );

  if (transparent) {
    return (
      <>
        {headerContent}
        {mobileMenu}
      </>
    );
  }

  return (
    <div className="p-4 md:p-6 relative z-50">
      {headerContent}
      {mobileMenu}
    </div>
  );
}
