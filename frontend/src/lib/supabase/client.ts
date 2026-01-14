import { createBrowserClient } from '@supabase/ssr'

// Singleton instance to prevent multiple Supabase clients
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
    if (supabaseInstance) {
        return supabaseInstance
    }

    supabaseInstance = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    return supabaseInstance
}

// Reset function for testing/logout edge cases
export function resetClient() {
    supabaseInstance = null
}
