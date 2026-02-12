
import { Risorsa } from '../App';

const SUPABASE_URL = 'https://qemgziytooogtnlzdpjq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWd6aXl0b29vZ3RubHpkcGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzY0NzcsImV4cCI6MjA4NDc1MjQ3N30.1gWYHc-Z5PZueQ6pjjlBHJQonM-XHbajcDQP_U1BnqI'; 

export const resourceService = {
  /**
   * Ottiene tutte le risorse pubbliche dalla tabella "Resources".
   * Mappa i campi del DB ai nomi utilizzati nel frontend.
   */
  async getAll(): Promise<Risorsa[]> {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/Resources?select=*&order=title.asc`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Errore nel recupero delle risorse');
      }

      const rows = await response.json();

      return rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        subject: row.subject || "Metodo di Studio",
        type: row.type === 'Video' || row.type === 'video' ? 'Video' : 'PDF',
        description: row.description || "",
        // Supportiamo sia un campo 'url' diretto, sia la logica basata su file_path/external_url
        url: row.url || (row.type === 'pdf' || row.type === 'PDF' 
          ? `${SUPABASE_URL}/storage/v1/object/public/resources/${row.file_path}` 
          : row.external_url)
      }));
    } catch (error: any) {
      console.error("Errore recupero risorse:", error);
      throw error;
    }
  },

  /**
   * Crea un nuovo record nella tabella Resources.
   */
  async create(data: Omit<Risorsa, 'id'>): Promise<void> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/Resources`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Errore durante l'inserimento nel database.");
      }
    } catch (error: any) {
      console.error("Errore creazione risorsa:", error);
      throw error;
    }
  },

  /**
   * Elimina un record per ID.
   */
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/Resources?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Errore durante l'eliminazione del record.");
      }
    } catch (error: any) {
      console.error("Errore eliminazione risorsa:", error);
      throw error;
    }
  }
};
