import { NextRequest, NextResponse } from 'next/server';

// Note: To enable Stripe, install stripe package and add STRIPE_SECRET_KEY to env
// npm install stripe
// Then uncomment the Stripe code below

export async function POST(request: NextRequest) {
    try {
        const { noteId, noteTitle, notePrice, buyerId } = await request.json();

        if (!noteId || !notePrice || !buyerId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // For now, return a mock success (Stripe not configured)
        // When Stripe is set up, uncomment the code below

        /*
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: noteTitle,
                            description: `Lecture notes - ${noteTitle}`,
                        },
                        unit_amount: Math.round(notePrice * 100), // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse/${noteId}?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse/${noteId}?canceled=true`,
            metadata: {
                noteId,
                buyerId,
            },
        });

        return NextResponse.json({ 
            checkoutUrl: session.url,
            sessionId: session.id 
        });
        */

        // Mock response for development
        return NextResponse.json({
            message: 'Stripe not configured. Using direct purchase for now.',
            mockSuccess: true
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
