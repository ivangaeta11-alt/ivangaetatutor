-- ============================================
-- Tabella messages per form di contatto
-- ============================================
-- Esegui in Supabase Dashboard > SQL Editor

-- 1. Tabella messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    obiettivo TEXT NOT NULL,
    messaggio TEXT NOT NULL,
    letto BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Indice per ordinamento
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- 3. RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Inserimento pubblico (il form può inviare senza auth)
CREATE POLICY "Allow public insert messages"
    ON public.messages
    FOR INSERT
    WITH CHECK (true);

-- La lettura/update/delete vanno gestite dall'admin con policy dedicate (auth).
