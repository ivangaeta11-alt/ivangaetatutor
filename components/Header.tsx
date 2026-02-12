
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 bg-[#fafafa]/80 backdrop-blur-sm academic-border">
      <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="text-lg font-semibold tracking-tight text-slate-900">
          Percorsi di Fisica <span className="font-light italic">&</span> Matematica
        </div>
        <nav className="hidden md:flex gap-10 text-sm font-medium text-slate-600">
          <a href="#metodo" className="hover:text-slate-900 transition-colors">Il Metodo</a>
          <a href="#ambiti" className="hover:text-slate-900 transition-colors">Ambiti</a>
          <a href="#contatto" className="text-slate-900 border-b border-slate-900 pb-0.5">Informazioni</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
