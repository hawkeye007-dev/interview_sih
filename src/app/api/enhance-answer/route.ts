import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
    try {
        const { answer, question } = await request.json();

        if (!answer || !question) {
            return NextResponse.json(
                { error: 'Answer and question are required' },
                { status: 400 }
            );
        }

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Interview Answer Enhancement'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert interview coach. Your job is to enhance interview answers to make them more professional, structured, and compelling. 

IMPORTANT RULES:
1. NEVER mention that you are an AI, assistant, or that this was enhanced by AI
2. Keep the person's original voice and experiences intact
3. Improve structure, clarity, and professionalism
4. Add relevant details that strengthen the answer
5. Make it sound natural and authentic
6. Keep the enhanced answer to a reasonable length (2-3 paragraphs max)
7. Return ONLY the enhanced answer, no explanations or meta-commentary

The goal is to make the answer sound like the person naturally improved their response through reflection and practice.`
                    },
                    {
                        role: 'user',
                        content: `Interview Question: "${question}"

Original Answer: "${answer}"

Please enhance this answer to be more professional, structured, and compelling while keeping the person's authentic voice and experiences. Return only the enhanced answer.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 500,
                stream: false
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', response.status, errorText);
            throw new Error(`Enhancement service temporarily unavailable`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Invalid response format:', data);
            throw new Error('Enhancement service returned invalid response');
        }

        const enhancedAnswer = data.choices[0].message.content.trim();

        return NextResponse.json({ 
            enhancedAnswer,
            success: true 
        });

    } catch (error) {
        console.error('Answer enhancement error:', error);
        return NextResponse.json(
            { 
                error: `Failed to enhance answer: ${error instanceof Error ? error.message : 'Unknown error'}`,
                success: false 
            },
            { status: 500 }
        );
    }
} 