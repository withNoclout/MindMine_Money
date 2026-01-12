# Supabase Setup Guide for MindMine

## Step 1: Create Storage Buckets

Go to **Supabase Dashboard → Storage → New bucket**

### Bucket 1: `notes`
- Name: `notes`
- Public: **OFF** (private - only download with auth)
- Click "Create"

### Bucket 2: `thumbnails`  
- Name: `thumbnails`
- Public: **ON** (public for previews)
- Click "Create"

---

## Step 2: Storage Policies

Go to **Storage → Policies** and add these:

### For `notes` bucket:
Click "New Policy" → "Create a policy from scratch"

**Policy 1: Allow authenticated uploads**
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'notes');
```

**Policy 2: Allow users to read their purchases**
```sql
CREATE POLICY "Allow read own files" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'notes');
```

### For `thumbnails` bucket:
**Policy: Public read access**
```sql
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'thumbnails');
```

**Policy: Authenticated upload**
```sql
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'thumbnails');
```

---

## Step 3: Check Tables

Go to **Table Editor** and verify these tables exist:
- `notes`
- `purchases`
- `profiles`

If the `profiles` trigger didn't create your profile, manually add:
```sql
INSERT INTO profiles (id, display_name)
SELECT id, email FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);
```

---

## Step 4: Test

1. Go to `/studio`
2. Click "Select Files"
3. Upload a PDF
4. Check console for errors

If you still see errors, check the browser console for the specific message.

---

## Quick Fix: Disable RLS for Testing

If you want to test without RLS restrictions:

```sql
ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

⚠️ **Re-enable RLS before going to production!**
