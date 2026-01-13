import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'
    const role = searchParams.get('role') // Get the role from URL params

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Update the user's profile with the selected role
            if (role && (role === 'student' || role === 'educator')) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({ role: role })
                    .eq('id', data.user.id)

                if (profileError) {
                    console.error('Error updating profile role:', profileError)
                }
            }

            // Redirect based on role
            const redirectPath = role === 'educator' ? '/studio' : next
            return NextResponse.redirect(`${origin}${redirectPath}`)
        }
    }

    // Return the user to login page with an error if code exchange fails
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}

