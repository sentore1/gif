-- Run this in Supabase SQL Editor to make digitalnetworkscompany@gmail.com an admin

-- First, check if user exists and update/insert role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'digitalnetworkscompany@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- If no rows affected, the user hasn't signed up yet
-- Sign up first, then run this again
