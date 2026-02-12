
import React from 'react';

const contexts = [
  {
    title: "Semestre Filtro di Medicina",
    description: "Supporto intensivo per il modulo di Fisica del primo semestre. Analisi approfondita dei quesiti e dei problemi fisici che caratterizzano gli sbarramenti universitari."
  },
  {
    title: "Test d'Ingresso TOLC",
    description: "Preparazione per le aree scientifiche dei test TOLC-MED, TOLC-I e TOLC-S. Strategie di ragionamento logico-quantitativo e ripasso dei fondamenti teorici richiesti dal CISIA."
  },
  {
    title: "Primi Anni Universitari",
    description: "Accompagnamento per esami di Analisi 1, Fisica Generale e Statistica per corsi di laurea in Ingegneria, Biologia, Chimica, Informatica e Scienze Ambientali."
  }
];

const AcademicContexts: React.FC = () => {
  return (
    <section id="ambiti" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-slate-900 mb-12">Ambiti di intervento</h2>
        <div className="space-y-12">
          {contexts.map((c, i) => (
            <div key={i} className="group border-l-2 border-slate-200 pl-8 py-2 hover:border-slate-900 transition-colors">
              <h3 className="text-2xl font-medium text-slate-900 mb-4">{c.title}</h3>
              <p className="text-lg text-slate-600 font-light max-reading-width">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicContexts;
