import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Menu } from 'lucide-react';

export default function Navbar() {
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

  return (
    <div className="p-4 md:p-6 relative z-50">
      <header className="flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-sm border border-gray-200/50">
        <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-purple-600 transition-colors">
          <Brain className="w-7 h-7 text-purple-600" />
          <span className="logo text-xl md:text-2xl tracking-wide font-medium">Project Recall Rescue</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
          <button onClick={() => handleScroll('concept')} className="hover:text-purple-600 transition-colors">Concept</button>
          <button onClick={() => handleScroll('science')} className="hover:text-purple-600 transition-colors">The Science</button>
          <button onClick={() => handleScroll('methodology')} className="hover:text-purple-600 transition-colors">Methodology</button>
          <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-purple-600 font-semibold' : 'hover:text-purple-600'}`}>About Us</Link>
        </nav>

        <div className="flex items-center gap-4 hidden md:block">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScTG6FWtbY2MbhrTp1YMy4JMD5PxQMGI_edBDicRWk3Ptg1dw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-all btn-hover-effect shadow-md shadow-purple-500/20">
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
  );
}
