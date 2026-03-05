-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/jhvixutxsfslcuqsmmha/sql

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    surname TEXT NOT NULL,
    middle_name TEXT,
    date_of_birth DATE NOT NULL,
    id_number TEXT NOT NULL,
    education_level TEXT NOT NULL,
    specialization TEXT NOT NULL,
    program TEXT NOT NULL,
    duration TEXT NOT NULL,
    reason_to_apply TEXT NOT NULL,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_program ON public.applications(program);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for application submissions)
CREATE POLICY "Allow anonymous insert" ON public.applications
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users to read all
CREATE POLICY "Allow authenticated read" ON public.applications
    FOR SELECT TO authenticated
    USING (true);
