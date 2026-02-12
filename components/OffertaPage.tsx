
import React from 'react';
import { Check, ArrowRight, Zap, Target, Star, ShieldCheck } from 'lucide-react';

interface OffertaPageProps {
  onBook: () => void;
}

const pacchetti = [
  {
    name: "Standard",
    tagline: "Per colmare lacune specifiche",
    features: [
      "Lezione individuale di 60 minuti",
      "Materiale didattico PDF incluso",
      "Registrazione della lezione (opz.)",
      "Pianificazione obiettivi base",
      "Supporto via mail"
    ],
    highlight: false,
    icon: <Zap className="w-6 h-6 text-slate-400" />
  },
  {
    name: "Intensivo Filtro",
    tagline: "Il più scelto per Medicina",
    features: [
      "Pacchetto di ore individuali",
      "Simulazioni d'esame personalizzate",
      "Supporto WhatsApp diretto h24",
      "Metodo di studio cognitivo",
      "Priorità in calendario",
      "Focus sbarramento UniSR/UniCam"
    ],
    highlight: true,
    icon: <Target className="w-6 h-6 text-blue-600" />
  },
  {
    name: "Full Support",
    tagline: "Accompagnamento semestrale",
    features: [
      "Supporto costante tutto il semestre",
      "Ore di lezione flessibili",
      "Tutoraggio h24 via WhatsApp",
      "Correzione esercizi illimitata",
      "Preparazione orali inclusa",
      "Revisione prove in itinere"
    ],
    highlight: false,
    icon: <Star className="w-6 h-6 text-emerald-500" />
  }
];

const OffertaPage: React.FC<OffertaPageProps> = ({ onBook }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Scegli il tuo percorso <br />
            <span className="gradient-text">di successo STEM</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Non vendiamo semplici lezioni, ma risultati concreti basati su un metodo scientifico. Trova la soluzione più adatta al tuo obiettivo accademico.
          </p>
        </div>

        {/* Pricing Grid (Now Features Grid) */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pacchetti.map((p, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                p.highlight 
                ? 'bg-blue-50/30 border-blue-100 shadow-2xl shadow-blue-200/50 scale-105 z-10' 
                : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                  Consigliato
                </div>
              )}
              
              <div className="mb-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${p.highlight ? 'bg-white border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{p.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{p.tagline}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${p.highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 text-[15px] leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onBook}
                className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${
                  p.highlight 
                  ? 'bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:shadow-blue-200' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Inizia ora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-slate-800 text-blue-400 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
              <ShieldCheck className="w-4 h-4" /> Garanzia Qualità
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ancora indeciso sul percorso?</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 font-light">
              Offro un colloquio conoscitivo di 15 minuti via Zoom totalmente gratuito per analizzare il tuo caso e consigliarti il percorso più efficiente.
            </p>
            <button 
              onClick={onBook}
              className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-2xl"
            >
              Prenota colloquio gratuito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OffertaPage;
