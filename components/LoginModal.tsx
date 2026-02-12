
import React, { useState } from 'react';
import { Lock, X, ShieldAlert } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In produzione questa password dovrebbe essere gestita via backend o variabili d'ambiente
    if (password === 'ivan2025') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Area Riservata</h2>
          <p className="text-slate-500 mt-2">Inserisci il codice di accesso per gestire le risorse.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              autoFocus
              type="password" 
              placeholder="Codice Accesso"
              className={`w-full px-5 py-4 bg-slate-50 border ${error ? 'border-red-500 animate-bounce' : 'border-slate-200'} rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-center text-lg font-bold tracking-[0.5em]`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-xs font-bold text-center mt-3 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Codice errato. Riprova.
              </p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Accedi alla Dashboard
          </button>
        </form>
        
        <p className="text-center text-[10px] text-slate-300 mt-8 uppercase tracking-widest font-bold">
          Accesso riservato a Ivan Gaeta
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
