-- Create applications table for student applications
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

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- Create index on program for faster filtering
CREATE INDEX IF NOT EXISTS idx_applications_program ON public.applications(program);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

-- Enable realtime for applications
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;
