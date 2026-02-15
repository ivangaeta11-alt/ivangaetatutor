
import React from 'react';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contatti" className="py-24 bg-gradient-to-b from-white to-slate-50/50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-xl shadow-slate-200/30 overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2">
            {/* Colonna Info di Contatto */}
            <div className="p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">Iniziamo a conoscerci</h2>
              <p className="text-blue-100 text-lg mb-12">
                Descrivimi il tuo percorso e l'esame che vuoi superare. Ti risponderò entro 24 ore per fissare un colloquio conoscitivo gratuito.
              </p>
              <div className="space-y-8">
                <div className="flex items-start sm:items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center group-hover:bg-blue-400/50 transition-colors mt-1 sm:mt-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Email</p>
                    <a 
                      href="mailto:ivangaetatutor@gmail.com" 
                      className="text-base sm:text-lg font-medium hover:underline underline-offset-4 decoration-blue-300 break-all block"
                    >
                      ivangaetatutor@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center group-hover:bg-blue-400/50 transition-colors mt-1 sm:mt-0">
                    <MessageCircle className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">WhatsApp</p>
                    <a 
                      href="https://wa.me/393495519055" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-base sm:text-lg font-medium hover:underline underline-offset-4 decoration-emerald-400"
                    >
                      +39 349 5519055
                    </a>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center mt-1 sm:mt-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Modalità</p>
                    <p className="text-base sm:text-lg font-medium">Online su Zoom/Meet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonna Form */}
            <div className="p-8 sm:p-12 lg:p-20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all" placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all" placeholder="La tua email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Il tuo obiettivo</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all">
                    <option>Semestre Filtro Medicina</option>
                    <option>Preparazione TOLC</option>
                    <option>Esame Universitario</option>
                    <option>Scuole superiori</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Messaggio</label>
                  <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 outline-none transition-all resize-none" placeholder="Parlami del tuo percorso..."></textarea>
                </div>
                <button type="submit" className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl flex items-center justify-center gap-2">
                  Invia Messaggio <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
