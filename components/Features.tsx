
import React from 'react';
import { Microscope, PencilRuler, GraduationCap, ArrowUpRight } from 'lucide-react';

interface FeaturesProps {
  onNavigate: () => void;
}

const features = [
  {
    title: "Semestre Filtro Medicina",
    description: "Preparazione specifica per il modulo di Fisica. Superiamo gli sbarramenti del primo anno con esercizi mirati e ripasso teorico strutturato.",
    icon: <Microscope className="w-6 h-6" />,
    color: "blue",
    accent: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    title: "Preparazione TOLC",
    description: "Logica, Matematica e Fisica per i test d'ingresso (MED, VET, S, I). Strategie di risoluzione rapida per massimizzare il punteggio.",
    icon: <PencilRuler className="w-6 h-6" />,
    color: "emerald",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    title: "Esami Universitari",
    description: "Analisi I e II, Fisica Generale e Statistica. Supporto per facoltà STEM con un focus rigoroso sul metodo di studio scientifico.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "indigo",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100"
  }
];

const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  return (
    <section id="servizi" className="py-24 bg-slate-50/50 px-6 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Ambiti di intervento</h2>
          <div className="h-1 w-12 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={onNavigate}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-500 group-hover:scale-110 ${f.accent}`}>
                {f.icon}
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {f.title}
              </h4>
              
              <p className="text-slate-500 leading-relaxed font-light text-[17px] mb-8">
                {f.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Chiedi informazioni</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Elemento decorativo discreto nell'angolo */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                 <div className={`w-12 h-12 rounded-full border-4 border-current ${f.color === 'blue' ? 'text-blue-200' : f.color === 'emerald' ? 'text-emerald-200' : 'text-indigo-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
