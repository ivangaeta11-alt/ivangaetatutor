
import React from 'react';
import { Brain, Download, Layout, Database, FileText, AlertCircle, ChevronRight, PlayCircle } from 'lucide-react';
import { Risorsa } from '../App';

interface RisorsePageProps {
  risorse: Risorsa[];
  onGoToContact: () => void;
}

const RisorsePage: React.FC<RisorsePageProps> = ({ risorse, onGoToContact }) => {
  const categories = ["Fisica", "Matematica", "Metodo di Studio"] as const;
  
  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case "Fisica": return <Database className="w-5 h-5" />;
      case "Matematica": return <Layout className="w-5 h-5" />;
      case "Metodo di Studio": return <Brain className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getColorClass = (cat: string) => {
    switch (cat) {
      case "Fisica": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Matematica": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Metodo di Studio": return "text-purple-600 bg-purple-50 border-purple-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  const handleAction = async (e: React.MouseEvent, item: Risorsa) => {
    // Se è un video, lasciamo che il comportamento di default (target="_blank") apra il link
    if (item.type === 'Video') return;

    // Se è un PDF, forziamo il download
    e.preventDefault();
    
    try {
      const response = await fetch(item.url);
      if (!response.ok) throw new Error('Download fallito');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Puliamo il titolo per usarlo come nome file
      const fileName = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Errore durante il download forzato:", error);
      // Fallback: apriamo in una nuova scheda se il download blob fallisce
      window.open(item.url, '_blank');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50/50 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Area <span className="gradient-text">Risorse Gratuite</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Dispense, video lezioni e schemi per il tuo successo accademico. <br />
            Database aggiornato in tempo reale per il <span className="font-semibold text-slate-700">semestre filtro</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-24">
          {categories.map((cat) => {
            const items = risorse.filter(r => r.subject === cat);
            const style = getColorClass(cat);
            
            return (
              <div key={cat} className="flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-xl border shadow-sm ${style}`}>
                    {getIconForCategory(cat)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <a 
                      key={item.id} 
                      href={item.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleAction(e, item)}
                      className="group p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 block transform hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${item.type === 'Video' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                          {item.type}
                        </span>
                        <div className="text-blue-600 bg-blue-50 p-1.5 rounded-lg opacity-40 group-hover:opacity-100 transition-all">
                          {item.type === 'Video' ? <PlayCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium italic">
                        {item.type === 'Video' ? 'Apri video esterno' : 'Scarica PDF'}
                      </p>
                    </a>
                  ))}

                  {items.length === 0 && (
                    <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2rem] text-center flex flex-col items-center gap-3">
                      <AlertCircle className="w-8 h-8 text-slate-200" />
                      <p className="text-slate-400 text-sm font-medium leading-tight">
                        Materiale in fase di caricamento.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-10">
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Hai bisogno di una guida?</h2>
            <p className="text-slate-500 text-lg font-light max-w-xl">
              I materiali sono utili, ma un percorso strutturato fa la differenza tra "capire" e "superare l'esame".
            </p>
          </div>
          <button 
            onClick={onGoToContact}
            className="flex-shrink-0 px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2 group"
          >
            Inizia il tuo percorso <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default RisorsePage;
