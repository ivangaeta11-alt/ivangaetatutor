
import React from 'react';
import { ArrowRight, MessageCircle, GraduationCap, BookOpen } from 'lucide-react';

interface HeroProps {
  onNavigateRisorse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateRisorse }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-44 overflow-hidden bg-white">
      {/* Sfondo con gradiente soft per profondità */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge Tutor STEM */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center">
          <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Tutor STEM</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Percorsi strutturati in <br />
          <span className="gradient-text">Matematica e Fisica</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
          Studio STEM guidato per il <span className="font-semibold text-slate-700">semestre filtro</span> di Medicina, <br className="hidden md:block" />
          i test <span className="font-semibold text-slate-700">TOLC</span> e i primi anni delle facoltà scientifiche.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a 
            href="#contatti" 
            onClick={(e) => scrollToSection(e, 'contatti')}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200/50 group transform hover:-translate-y-1"
          >
            <MessageCircle className="mr-2 w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" />
            Inizia Ora
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button 
            onClick={onNavigateRisorse}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-700 border border-slate-200 bg-white rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all transform hover:-translate-y-1 group"
          >
            <BookOpen className="mr-2 w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
            Risorse gratuite
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
