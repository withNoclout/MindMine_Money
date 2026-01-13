-- Reset all users to student role (run in Supabase SQL Editor)
-- This will set everyone to student, then they can use the login page to get their role

-- Option 1: Reset all users to student
UPDATE profiles SET role = 'student' WHERE role IS NOT NULL;

-- Option 2: Delete all profiles to start completely fresh (users will be recreated on next login)
-- WARNING: This deletes all profile data including earnings, display names, etc.
-- DELETE FROM profiles;

-- Option 3: Check current role distribution
-- SELECT role, COUNT(*) FROM profiles GROUP BY role;
