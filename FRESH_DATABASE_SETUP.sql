-- ============================================
-- FRESH SUPABASE DATABASE SETUP
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create applications table
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

-- 2. Create user_roles table for admin/student roles
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_program ON public.applications(program);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- 4. Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Policies for applications table
-- Allow anyone to insert (public application form)
CREATE POLICY "Allow public insert" ON public.applications
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

-- Allow admins to read all applications
CREATE POLICY "Allow admin read all" ON public.applications
    FOR SELECT 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Allow admins to update applications
CREATE POLICY "Allow admin update" ON public.applications
    FOR UPDATE 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    )
    WITH CHECK (true);

-- 6. Policies for user_roles table
-- Allow users to read their own role
CREATE POLICY "Allow read own role" ON public.user_roles
    FOR SELECT 
    TO authenticated
    USING (user_id = auth.uid());

-- Allow admins to read all roles
CREATE POLICY "Allow admin read all roles" ON public.user_roles
    FOR SELECT 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
            AND ur.role = 'admin'
        )
    );

-- 7. Function to automatically assign role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Trigger to call function on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 9. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.applications TO anon, authenticated;
GRANT ALL ON public.user_roles TO authenticated;

-- 10. Insert first admin user (REPLACE WITH YOUR EMAIL)
-- After running this, sign up with this email to become admin
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'your-admin@email.com';

-- Done! Your database is ready with admin/student roles.
