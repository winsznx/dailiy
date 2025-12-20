import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // TODO: Integrate with real AI (OpenAI/Grok)
        // For now, we use a deterministic mock based on text length to simulate analysis

        const sentimentScore = Math.min(Math.max(text.length % 10 / 10, 0), 1);
        const tags = ["Journal", "Thought"];

        if (text.toLowerCase().includes("crypto") || text.toLowerCase().includes("btc") || text.toLowerCase().includes("eth")) {
            tags.push("Crypto");
        }
        if (text.toLowerCase().includes("work") || text.toLowerCase().includes("code")) {
            tags.push("Engineering");
        }
        if (text.toLowerCase().includes("happy") || text.toLowerCase().includes("great")) {
            tags.push("Positive");
        }

        return NextResponse.json({
            sentimentScore,
            tags,
            summary: text.substring(0, 50) + "..."
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
