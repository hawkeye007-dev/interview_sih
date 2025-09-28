// Utility functions for roadmap operations
import fs from 'fs';
import path from 'path';

interface RoadmapItem {
  title: string;
  description: string;
  links: Array<{
    title: string;
    url: string;
    type: string;
  }>;
}

interface RoadmapData {
  [key: string]: RoadmapItem;
}

// Get list of all available technologies from the roadmap-content directory
export function getAvailableTechnologies(): string[] {
  try {
    const roadmapDir = path.join(process.cwd(), 'src/constants/roadmap-content');
    const files = fs.readdirSync(roadmapDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
      .sort();
  } catch (error) {
    console.error('Error reading roadmap directory:', error);
    return [];
  }
}

// Check if a technology exists in our roadmap constants
export function technologyExists(techName: string): boolean {
  const availableTechs = getAvailableTechnologies();
  const normalizedTechName = techName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  return availableTechs.some(tech => 
    tech.toLowerCase() === normalizedTechName ||
    tech.toLowerCase().includes(normalizedTechName) ||
    normalizedTechName.includes(tech.toLowerCase())
  );
}

// Get exact technology name from partial match
export function getExactTechnologyName(techName: string): string | null {
  const availableTechs = getAvailableTechnologies();
  const normalizedTechName = techName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // First try exact match
  const exactMatch = availableTechs.find(tech => tech.toLowerCase() === normalizedTechName);
  if (exactMatch) return exactMatch;
  
  // Then try partial matches
  const partialMatch = availableTechs.find(tech => 
    tech.toLowerCase().includes(normalizedTechName) ||
    normalizedTechName.includes(tech.toLowerCase())
  );
  
  return partialMatch || null;
}

// Load roadmap data for a specific technology
export function getRoadmapData(techName: string): RoadmapData | null {
  try {
    const roadmapPath = path.join(process.cwd(), 'src/constants/roadmap-content', `${techName}.json`);
    if (!fs.existsSync(roadmapPath)) {
      return null;
    }
    
    const rawData = fs.readFileSync(roadmapPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error loading roadmap for ${techName}:`, error);
    return null;
  }
}

// Extract key roadmap sections for overview
export function getMainRoadmapSections(roadmapData: RoadmapData): RoadmapItem[] {
  const sections = Object.values(roadmapData);
  
  // Sort by title length (shorter titles often represent main sections)
  // and filter out very specific or detailed items
  return sections
    .filter(item => item.title.length < 30 && item.description.length > 50)
    .sort((a, b) => a.title.length - b.title.length)
    .slice(0, 8); // Get top 8 main sections
}

// Generate a unique page ID for the roadmap
export function generateRoadmapPageId(techName: string): string {
  return `roadmap-${techName}-${Date.now()}`;
}

// Detect if a message is asking for a roadmap
export function detectRoadmapRequest(message: string): { isRoadmapRequest: boolean; technology: string | null } {
  const roadmapKeywords = ['roadmap', 'learning path', 'how to learn', 'study plan', 'curriculum'];
  const messageLC = message.toLowerCase();
  
  const isRoadmapRequest = roadmapKeywords.some(keyword => messageLC.includes(keyword));
  
  if (!isRoadmapRequest) {
    return { isRoadmapRequest: false, technology: null };
  }
  
  // Extract technology name from the message
  const availableTechs = getAvailableTechnologies();
  const foundTech = availableTechs.find(tech => {
    const techWords = tech.split('-');
    return techWords.some(word => messageLC.includes(word.toLowerCase()));
  });
  
  return {
    isRoadmapRequest: true,
    technology: foundTech || null
  };
} 