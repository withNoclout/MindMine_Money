// Database types for MindMine

export interface Profile {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    total_earnings: number;
    stripe_account_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface Note {
    id: string;
    title: string;
    description: string | null;
    course_code: string | null;
    price: number;
    file_url: string;
    thumbnail_url: string | null;
    quality_score: number;
    seller_id: string;
    status: 'pending' | 'approved' | 'rejected';
    downloads: number;
    created_at: string;
    updated_at: string;
    // Joined data
    seller?: Profile;
}

export interface Purchase {
    id: string;
    buyer_id: string;
    note_id: string;
    amount: number;
    stripe_payment_id: string | null;
    created_at: string;
    // Joined data
    note?: Note;
}

export interface NoteUploadData {
    title: string;
    description?: string;
    course_code?: string;
    price: number;
    file: File;
}
