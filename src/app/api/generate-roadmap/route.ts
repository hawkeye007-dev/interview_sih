import { NextRequest, NextResponse } from 'next/server';
import { 
  getExactTechnologyName, 
  getRoadmapData, 
  getMainRoadmapSections, 
  generateRoadmapPageId 
} from '@/utils/roadmap-utils';

// Store for generated roadmap pages (in production, use a database)
const generatedPages = new Map<string, {
  id: string;
  technology: string;
  data: any;
  createdAt: Date;
  expiresAt: Date;
}>();

export async function POST(request: NextRequest) {
  try {
    const { technology } = await request.json();

    if (!technology) {
      return NextResponse.json(
        { error: 'Technology name is required' },
        { status: 400 }
      );
    }

    // Check if technology exists and get exact name
    const exactTechName = getExactTechnologyName(technology);
    if (!exactTechName) {
      return NextResponse.json(
        { error: `Roadmap for "${technology}" not found. Please check the technology name.` },
        { status: 404 }
      );
    }

    // Get roadmap data
    const roadmapData = getRoadmapData(exactTechName);
    if (!roadmapData) {
      return NextResponse.json(
        { error: `Failed to load roadmap data for ${exactTechName}` },
        { status: 500 }
      );
    }

    // Generate unique page ID
    const pageId = generateRoadmapPageId(exactTechName);
    
    // Get main sections for the roadmap
    const mainSections = getMainRoadmapSections(roadmapData);
    
    // Store the generated page with expiration (24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    generatedPages.set(pageId, {
      id: pageId,
      technology: exactTechName,
      data: {
        fullRoadmap: roadmapData,
        mainSections,
        totalItems: Object.keys(roadmapData).length
      },
      createdAt: new Date(),
      expiresAt
    });

    // Clean up expired pages
    cleanupExpiredPages();

    const roadmapUrl = `${request.nextUrl.origin}/roadmap/${pageId}`;

    return NextResponse.json({
      success: true,
      technology: exactTechName,
      pageId,
      url: roadmapUrl,
      mainSections: mainSections.slice(0, 3), // Return first 3 for preview
      totalSections: mainSections.length,
      message: `I've created a personalized ${exactTechName.toUpperCase()} roadmap for you! Click the button below to view your learning path.`
    });

  } catch (error) {
    console.error('Generate roadmap error:', error);
    return NextResponse.json(
      { 
        error: `Failed to generate roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pageId = url.searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const page = generatedPages.get(pageId);
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found or expired' },
        { status: 404 }
      );
    }

    // Check if page has expired
    if (new Date() > page.expiresAt) {
      generatedPages.delete(pageId);
      return NextResponse.json(
        { error: 'Page has expired' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      ...page
    });

  } catch (error) {
    console.error('Get roadmap page error:', error);
    return NextResponse.json(
      { 
        error: `Failed to get roadmap page: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false 
      },
      { status: 500 }
    );
  }
}

// Cleanup function to remove expired pages
function cleanupExpiredPages() {
  const now = new Date();
  for (const [pageId, page] of generatedPages.entries()) {
    if (now > page.expiresAt) {
      generatedPages.delete(pageId);
    }
  }
} 