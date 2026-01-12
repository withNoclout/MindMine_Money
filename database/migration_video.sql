-- Add video_url to notes table for walkthroughs
ALTER TABLE notes ADD COLUMN IF NOT EXISTS video_url TEXT;
