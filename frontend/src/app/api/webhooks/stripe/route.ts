import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Note: To enable Stripe webhooks:
// 1. Add STRIPE_WEBHOOK_SECRET to env
// 2. Set up webhook in Stripe dashboard pointing to this endpoint
// 3. Uncomment the Stripe code below

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();

        // For Stripe webhook verification (uncomment when Stripe is set up)
        /*
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const sig = request.headers.get('stripe-signature');
        
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                body, 
                sig, 
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const { noteId, buyerId } = session.metadata;
            
            // Create purchase record
            const supabase = createClient(supabaseUrl, supabaseServiceKey);
            
            await supabase.from('purchases').insert({
                buyer_id: buyerId,
                note_id: noteId,
                amount: session.amount_total / 100,
                stripe_payment_id: session.id
            });

            // Increment download count
            await supabase.rpc('increment_downloads', { note_id: noteId });
        }
        */

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
