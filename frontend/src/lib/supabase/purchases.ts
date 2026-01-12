import { createClient } from "./client";
import { Purchase } from "@/types/database";

/**
 * Fetch user's purchases
 */
export async function fetchPurchases(userId: string): Promise<Purchase[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('purchases')
        .select(`
            *,
            note:notes (
                id,
                title,
                course_code,
                price,
                file_url,
                thumbnail_url,
                quality_score
            )
        `)
        .eq('buyer_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch purchases error:', error);
        return [];
    }

    return data || [];
}

/**
 * Check if user has purchased a note
 */
export async function hasPurchased(userId: string, noteId: string): Promise<boolean> {
    const supabase = createClient();

    const { data } = await supabase
        .from('purchases')
        .select('id')
        .eq('buyer_id', userId)
        .eq('note_id', noteId)
        .single();

    return !!data;
}
