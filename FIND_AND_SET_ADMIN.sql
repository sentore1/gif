-- Step 1: Find the user ID for digitalnetworkscompany@gmail.com
SELECT id, email FROM auth.users WHERE email = 'digitalnetworkscompany@gmail.com';

-- Step 2: Copy the ID from above and use it here (replace YOUR_USER_ID)
-- Or run this to automatically set admin:
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'digitalnetworkscompany@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Step 3: Verify the role was set
SELECT ur.role, u.email 
FROM public.user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'digitalnetworkscompany@gmail.com';
