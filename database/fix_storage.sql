-- ============================================
-- FIX: Create Storage Buckets for MindMine
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- Step 1: Create the 'notes' bucket for file storage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'notes', 
    'notes', 
    true,  -- Make public for now (easier for testing)
    52428800,  -- 50MB limit
    ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 52428800;

-- Step 2: Create the 'thumbnails' bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Drop existing storage policies (if any errors)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all reads" ON storage.objects;

-- Step 4: Create permissive policies for testing
-- (You can make these stricter for production)

-- Allow anyone to read files
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
USING (true);

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (true);

-- Step 5: Verify buckets were created
SELECT id, name, public FROM storage.buckets;
