-- Run this in Supabase SQL Editor to fix access

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin read all" ON public.applications;
DROP POLICY IF EXISTS "Allow admin update" ON public.applications;

-- Allow all authenticated users to read (temporary for testing)
CREATE POLICY "Allow authenticated read all" ON public.applications
    FOR SELECT 
    TO authenticated
    USING (true);

-- Allow all authenticated users to update (temporary for testing)
CREATE POLICY "Allow authenticated update all" ON public.applications
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);
