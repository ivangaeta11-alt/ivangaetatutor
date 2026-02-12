
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RisorsePage from './components/RisorsePage';
import AdminPage from './components/AdminPage';
import LoginModal from './components/LoginModal';
import { resourceService } from './services/resourceService';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface Risorsa {
  id: string;
  title: string;
  subject: "Fisica" | "Matematica" | "Metodo di Studio";
  type: "PDF" | "Video";
  description: string;
  url: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'risorse' | 'admin'>('home');
  const [risorse, setRisorse] = useState<Risorsa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const fetchRisorse = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourceService.getAll();
      setRisorse(data);
    } catch (err: any) {
      setError(err.message || "Errore durante il recupero dei dati dal database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRisorse();
  }, []);

  const renderPage = () => {
    if (view === 'risorse') {
      if (loading) {
        return (
          <div className="pt-48 pb-24 text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Accesso al database...</p>
          </div>
        );
      }
      
      if (error) {
        return (
          <div className="pt-48 pb-24 px-4 text-center max-w-lg mx-auto">
            <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] shadow-xl">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Errore Database</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{error}</p>
              <button 
                onClick={fetchRisorse}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                Riprova
              </button>
            </div>
          </div>
        );
      }
      
      return <RisorsePage risorse={risorse} onGoToContact={() => setView('home')} />;
    }

    switch (view) {
      case 'home':
        return <HomePage onNavigateRisorse={() => setView('risorse')} onNavigateContact={() => {}} />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminPage onUpdate={fetchRisorse} onExit={() => setView('home')} />
        ) : (
          <HomePage onNavigateRisorse={() => setView('risorse')} onNavigateContact={() => {}} />
        );
      default:
        return <HomePage onNavigateRisorse={() => setView('risorse')} onNavigateContact={() => {}} />;
    }
  };

  return (
    <Layout 
      currentView={view === 'admin' ? 'home' : view as 'home' | 'risorse'} 
      setView={(v) => setView(v as any)} 
      onContact={() => {}}
    >
      {renderPage()}
      
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)} 
          onSuccess={() => {
            setIsAdminAuthenticated(true);
            setIsLoginModalOpen(false);
            setView('admin');
          }} 
        />
      )}
    </Layout>
  );
};

export default App;
