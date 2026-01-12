import { createClient } from "./client";
import { Note, NoteUploadData } from "@/types/database";

/**
 * Upload a file to Supabase Storage
 */
export async function uploadNoteFile(file: File, userId: string): Promise<string> {
    const supabase = createClient();

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('notes')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Upload error:', error.message, error.name);
        throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from('notes')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

/**
 * Upload a thumbnail image
 */
export async function uploadThumbnail(file: File, noteId: string): Promise<string> {
    const supabase = createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${noteId}/thumbnail.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        console.error('Thumbnail upload error:', error);
        throw new Error('Failed to upload thumbnail');
    }

    const { data: urlData } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

/**
 * Create a new note listing
 */
export async function createNote(data: NoteUploadData, userId: string): Promise<Note> {
    const supabase = createClient();

    // First upload the file
    const fileUrl = await uploadNoteFile(data.file, userId);

    // Upload video if present
    let videoUrl = null;
    if (data.videoFile) {
        // Reuse uploadNoteFile logic but could distinguish path if needed
        videoUrl = await uploadNoteFile(data.videoFile, userId);
    }

    // Create note record
    const { data: note, error } = await supabase
        .from('notes')
        .insert({
            title: data.title,
            description: data.description || null,
            course_code: data.course_code || null,
            price: data.price,
            file_url: fileUrl,
            video_url: videoUrl,
            seller_id: userId,
            status: 'approved', // Auto-approve for now
            quality_score: Math.floor(Math.random() * 20) + 80 // Mock score: 80-100
        })
        .select()
        .single();

    if (error) {
        console.error('Create note error:', error);
        throw new Error('Failed to create note listing');
    }

    return note;
}

/**
 * Fetch all approved notes for marketplace
 */
export async function fetchNotes(): Promise<Note[]> {
    const supabase = createClient();

    // Simple query without join first
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch notes error:', error.message, error.details, error.hint);
        return [];
    }

    return data || [];
}

/**
 * Fetch a single note by ID
 */
export async function fetchNoteById(id: string): Promise<Note | null> {
    const supabase = createClient();

    // Simple query without join
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        console.error('Fetch note error:', error.message, error.details);
        return null;
    }

    return data;
}

/**
 * Fetch notes by seller
 */
export async function fetchNotesBySeller(sellerId: string): Promise<Note[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch seller notes error:', error.message);
        return [];
    }

    return data || [];
}

/**
 * Delete a note by ID
 */
export async function deleteNote(noteId: string, userId: string): Promise<boolean> {
    const supabase = createClient();

    // First delete the file from storage
    const { data: note } = await supabase
        .from('notes')
        .select('file_url')
        .eq('id', noteId)
        .eq('seller_id', userId)
        .single();

    if (note?.file_url) {
        // Extract path from URL
        const urlParts = note.file_url.split('/storage/v1/object/public/notes/');
        if (urlParts[1]) {
            await supabase.storage.from('notes').remove([urlParts[1]]);
        }
    }

    // Delete the note record
    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('seller_id', userId);

    if (error) {
        console.error('Delete note error:', error.message);
        return false;
    }

    return true;
}
