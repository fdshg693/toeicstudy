// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    const openai = new OpenAI();
    const req = await request.json();

    try {
        const response = await openai.responses.create({
            model: "gpt-4o",
            input: req.input
        });
        return NextResponse.json({ result: response.output[0] });
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
    }
}
