
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Database, Layout, Brain, ArrowLeft, RefreshCw, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { resourceService } from '../services/resourceService';
import { Risorsa } from '../App';

interface AdminPageProps {
  onUpdate: () => void;
  onExit: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onUpdate, onExit }) => {
  const [risorse, setRisorse] = useState<Risorsa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState<Partial<Risorsa>>({
    subject: "Fisica",
    type: "PDF",
    title: '',
    description: '',
    url: ''
  });

  const fetchLocal = async () => {
    setLoading(true);
    try {
      const data = await resourceService.getAll();
      setRisorse(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocal();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.url) return;
    
    setIsSaving(true);
    try {
      await resourceService.create(formData as Omit<Risorsa, 'id'>);
      await fetchLocal();
      onUpdate();
      setIsAdding(false);
      setFormData({ subject: "Fisica", type: "PDF", title: '', description: '', url: '' });
      showSuccess('Record salvato nel database!');
    } catch (e) {
      console.error(e);
      alert("Errore salvataggio. Verifica i nomi delle colonne nel database.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Vuoi eliminare definitivamente questa risorsa dal database?")) return;
    
    try {
      await resourceService.delete(id);
      await fetchLocal();
      onUpdate();
      showSuccess('Record eliminato.');
    } catch (e) {
      console.error(e);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {successMsg && (
          <div className="fixed top-24 right-8 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 z-[100]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-2 text-sm font-bold uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Esci dalla Console
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Database Manager</h1>
            <p className="text-slate-500 text-sm mt-1">Tabella Supabase: <code className="bg-slate-200 px-1 rounded">Resources</code></p>
          </div>
          
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Nuovo Inserimento
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {isAdding && (
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-32 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Dati Record</h3>
                  <button onClick={() => setIsAdding(false)}><X className="text-slate-300 hover:text-red-500" /></button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-black uppercase text-slate-400 block mb-2">Titolo</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Esempio: Cinematica 101"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black uppercase text-slate-400 block mb-2">Materia</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value as any})}
                      >
                        <option>Fisica</option>
                        <option>Matematica</option>
                        <option>Metodo di Studio</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase text-slate-400 block mb-2">Tipo</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as any})}
                      >
                        <option>PDF</option>
                        <option>Video</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase text-slate-400 block mb-2">URL Risorsa</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input 
                        type="text" 
                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        value={formData.url}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSave}
                    disabled={isSaving || !formData.title || !formData.url}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? <RefreshCw className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {isSaving ? 'Salvataggio...' : 'Conferma Database'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={isAdding ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Record nel Database ({risorse.length})</span>
                {loading && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {risorse.map(r => (
                      <tr key={r.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.subject === 'Fisica' ? 'bg-blue-50 text-blue-600' : r.subject === 'Matematica' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                              {r.subject === 'Fisica' ? <Database className="w-5 h-5" /> : r.subject === 'Matematica' ? <Layout className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{r.title}</div>
                              <div className="text-xs text-slate-400 flex items-center gap-2">
                                <span className="font-black uppercase text-[10px] tracking-widest">{r.type}</span>
                                <span>•</span>
                                <span className="truncate max-w-[200px]">{r.url}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => handleDelete(r.id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!loading && risorse.length === 0 && (
                      <tr>
                        <td className="p-20 text-center text-slate-400 italic font-light">
                          Nessun record trovato nella tabella Resources.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;
