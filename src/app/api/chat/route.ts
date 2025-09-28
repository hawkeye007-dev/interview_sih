import { NextRequest, NextResponse } from 'next/server';
import { detectRoadmapRequest, getAvailableTechnologies } from '@/utils/roadmap-utils';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();
        const lastMessage = messages[messages.length - 1];

        // Check if the user is asking for a roadmap
        const roadmapDetection = detectRoadmapRequest(lastMessage.content);

        if (roadmapDetection.isRoadmapRequest && roadmapDetection.technology) {
            // Generate roadmap page
            try {
                const roadmapResponse = await fetch(`${request.nextUrl.origin}/api/generate-roadmap`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        technology: roadmapDetection.technology
                    }),
                });

                const roadmapData = await roadmapResponse.json();

                if (roadmapResponse.ok && roadmapData.success) {
                    return NextResponse.json({
                        message: roadmapData.message,
                        success: true,
                        roadmapGenerated: true,
                        roadmapUrl: roadmapData.url,
                        technology: roadmapData.technology,
                        previewSections: roadmapData.mainSections
                    });
                } else {
                    // If roadmap generation failed, fall back to regular chat
                    console.log('Roadmap generation failed, falling back to chat:', roadmapData.error);
                }
            } catch (roadmapError) {
                console.log('Roadmap generation error, falling back to chat:', roadmapError);
            }
        }

        // If not a roadmap request or roadmap generation failed, proceed with normal chat
        const availableTechs = getAvailableTechnologies();
        const techList = availableTechs.slice(0, 20).join(', '); // Show first 20 technologies

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'AI Tutor Pro'
            },
            body: JSON.stringify({
                model: 'x-ai/grok-4-fast:free',
                messages: [
                    {
                        role: 'system',
                        content: `You are an AI Tutor Pro, an advanced technical interview coach and programming mentor. You specialize in:

1. Technical Interview Preparation (Data Structures, Algorithms, System Design)
2. Programming Languages (JavaScript, Python, Java, C++, Go, etc.)
3. Software Engineering Best Practices
4. Career Guidance for Software Engineers
5. Code Review and Optimization
6. System Architecture and Design Patterns

SPECIAL CAPABILITY: You can generate personalized learning roadmaps for various technologies. When users ask for roadmaps, learning paths, study plans, or "how to learn" something, you can create interactive roadmap pages.

Available technologies for roadmaps include: ${techList}, and many more.

When users ask for roadmaps, you should:
- Ask them to be more specific about the technology if it's unclear
- Suggest similar technologies if the exact one isn't available
- Encourage them to ask for roadmaps using phrases like "roadmap for [technology]" or "how to learn [technology]"

Your responses should be:
- Professional and encouraging
- Technically accurate and detailed
- Include practical examples when relevant
- Provide step-by-step explanations for complex topics
- Offer follow-up questions to deepen understanding
- Suggest practice problems or resources when appropriate

Always maintain a supportive but challenging tone to help users grow as developers.`
                    },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1000,
                stream: false
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', response.status, errorText);
            throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Invalid response format:', data);
            throw new Error('Invalid response format from API');
        }

        return NextResponse.json({ 
            message: data.choices[0].message.content,
            success: true,
            roadmapGenerated: false
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { 
                error: `Failed to get response from AI tutor: ${error instanceof Error ? error.message : 'Unknown error'}`,
                success: false 
            },
            { status: 500 }
        );
    }
} 