import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Answer {
    questionId: number;
    companyId: string;
    content: string;
    lastModified: string;
    isEnhanced?: boolean;
}

interface SavedAnswers {
    [key: string]: Answer;
}

const ANSWERS_FILE_PATH = path.join(process.cwd(), 'src/constants/saved-answers.json');

// Helper function to read existing answers
function readAnswersFile(): SavedAnswers {
    try {
        if (fs.existsSync(ANSWERS_FILE_PATH)) {
            const fileContent = fs.readFileSync(ANSWERS_FILE_PATH, 'utf-8');
            return JSON.parse(fileContent);
        }
        return {};
    } catch (error) {
        console.error('Error reading answers file:', error);
        return {};
    }
}

// Helper function to write answers to file
function writeAnswersFile(answers: SavedAnswers): void {
    try {
        const dir = path.dirname(ANSWERS_FILE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(ANSWERS_FILE_PATH, JSON.stringify(answers, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing answers file:', error);
        throw new Error('Failed to save answer to file');
    }
}

// Helper function to generate storage key
function getStorageKey(questionId: number, companyId: string): string {
    return `nonvocab_answer_${questionId}_${companyId}`;
}

export async function POST(request: NextRequest) {
    try {
        const { questionId, companyId, content, isEnhanced = false } = await request.json();

        if (!questionId || !companyId || !content) {
            return NextResponse.json(
                { error: 'Question ID, company ID, and content are required' },
                { status: 400 }
            );
        }

        // Read existing answers
        const answers = readAnswersFile();

        // Create new answer
        const answer: Answer = {
            questionId,
            companyId,
            content,
            lastModified: new Date().toISOString(),
            isEnhanced
        };

        // Save to answers object
        const storageKey = getStorageKey(questionId, companyId);
        answers[storageKey] = answer;

        // Write to file
        writeAnswersFile(answers);

        return NextResponse.json({
            success: true,
            message: 'Answer saved successfully',
            answer
        });

    } catch (error) {
        console.error('Save answer error:', error);
        return NextResponse.json(
            { 
                error: `Failed to save answer: ${error instanceof Error ? error.message : 'Unknown error'}`,
                success: false 
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const questionId = url.searchParams.get('questionId');
        const companyId = url.searchParams.get('companyId');

        if (!questionId || !companyId) {
            return NextResponse.json(
                { error: 'Question ID and company ID are required' },
                { status: 400 }
            );
        }

        // Read answers from file
        const answers = readAnswersFile();
        const storageKey = getStorageKey(parseInt(questionId), companyId);
        const answer = answers[storageKey] || null;

        return NextResponse.json({
            success: true,
            answer
        });

    } catch (error) {
        console.error('Get answer error:', error);
        return NextResponse.json(
            { 
                error: `Failed to get answer: ${error instanceof Error ? error.message : 'Unknown error'}`,
                success: false 
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { questionId, companyId } = await request.json();

        if (!questionId || !companyId) {
            return NextResponse.json(
                { error: 'Question ID and company ID are required' },
                { status: 400 }
            );
        }

        // Read existing answers
        const answers = readAnswersFile();
        const storageKey = getStorageKey(questionId, companyId);

        // Delete the answer
        delete answers[storageKey];

        // Write updated answers to file
        writeAnswersFile(answers);

        return NextResponse.json({
            success: true,
            message: 'Answer deleted successfully'
        });

    } catch (error) {
        console.error('Delete answer error:', error);
        return NextResponse.json(
            { 
                error: `Failed to delete answer: ${error instanceof Error ? error.message : 'Unknown error'}`,
                success: false 
            },
            { status: 500 }
        );
    }
} 