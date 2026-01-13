import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'
    const role = searchParams.get('role') ?? 'student' // Default to student if no role specified

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Determine valid role - only 'student' or 'educator' allowed
            const validRole = role === 'educator' ? 'educator' : 'student'

            // Upsert profile with role (create if not exists, update if exists)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: data.user.id,
                    role: validRole,
                    display_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
                    avatar_url: data.user.user_metadata?.avatar_url || null,
                }, {
                    onConflict: 'id',
                    ignoreDuplicates: false, // Update existing rows
                })

            if (profileError) {
                console.error('Error upserting profile:', profileError)
            }

            // Redirect based on role
            const redirectPath = validRole === 'educator' ? '/studio' : next
            return NextResponse.redirect(`${origin}${redirectPath}`)
        }
    }

    // Return the user to login page with an error if code exchange fails
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
