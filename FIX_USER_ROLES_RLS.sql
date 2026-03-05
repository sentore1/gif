-- Fix RLS policies for user_roles table

-- Drop existing policies
DROP POLICY IF EXISTS "Allow read own role" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admin read all roles" ON public.user_roles;

-- Allow all authenticated users to read their own role
CREATE POLICY "Allow read own role" ON public.user_roles
    FOR SELECT 
    TO authenticated
    USING (user_id = auth.uid());

-- Test the policy
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
