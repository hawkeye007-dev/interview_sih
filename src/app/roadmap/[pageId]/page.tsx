"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MapIcon, 
  BookOpenIcon, 
  ExternalLinkIcon, 
  ClockIcon, 
  LoaderIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  FileTextIcon
} from "lucide-react";

interface RoadmapItem {
  title: string;
  description: string;
  links: Array<{
    title: string;
    url: string;
    type: string;
  }>;
}

interface RoadmapPageData {
  id: string;
  technology: string;
  data: {
    fullRoadmap: { [key: string]: RoadmapItem };
    mainSections: RoadmapItem[];
    totalItems: number;
  };
  createdAt: string;
  expiresAt: string;
}

const RoadmapPage = () => {
  const params = useParams();
  const router = useRouter();
  const [roadmapData, setRoadmapData] = useState<RoadmapPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        const response = await fetch(`/api/generate-roadmap?pageId=${params.pageId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load roadmap');
        }

        if (data.success) {
          setRoadmapData(data);
        } else {
          throw new Error(data.error || 'Invalid response');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.pageId) {
      fetchRoadmapData();
    }
  }, [params.pageId]);

  const toggleItemCompletion = (itemKey: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemKey)) {
      newCompleted.delete(itemKey);
    } else {
      newCompleted.add(itemKey);
    }
    setCompletedItems(newCompleted);
  };

  const getIconForLinkType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <PlayCircleIcon className="h-4 w-4" />;
      case 'article':
        return <FileTextIcon className="h-4 w-4" />;
      case 'course':
        return <BookOpenIcon className="h-4 w-4" />;
      default:
        return <ExternalLinkIcon className="h-4 w-4" />;
    }
  };

  const calculateProgress = () => {
    if (!roadmapData) return 0;
    const total = Object.keys(roadmapData.data.fullRoadmap).length;
    return Math.round((completedItems.size / total) * 100);
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4 md:px-8">
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoaderIcon className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your roadmap...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 md:px-8">
        <Container>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-destructive mb-4">
                <ClockIcon className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Roadmap Not Found</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
              </div>
              <Button onClick={() => router.push('/dashboard/ai-tutor-pro')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to AI Tutor
              </Button>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  if (!roadmapData) {
    return null;
  }

  const { technology, data } = roadmapData;
  const { fullRoadmap, mainSections, totalItems } = data;
  const progress = calculateProgress();

  return (
    <div className="py-8 px-4 md:px-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard/ai-tutor-pro')}
            className="mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to AI Tutor
          </Button>
          
          <MagicCard
            gradientFrom="#10b981"
            gradientTo="#059669"
            className="p-6 rounded-2xl text-center"
            gradientColor="rgba(16,185,129,0.1)"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapIcon className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-medium mb-2">
              {technology.toUpperCase()} Learning Roadmap
            </h1>
            <p className="text-muted-foreground mb-4">
              A comprehensive guide to mastering {technology}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Badge variant="secondary">
                {totalItems} Learning Topics
              </Badge>
              <Badge variant={progress === 100 ? "default" : "outline"}>
                {progress}% Complete
              </Badge>
            </div>
          </MagicCard>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{completedItems.size}/{totalItems}</span>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Path</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {mainSections.map((section, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {section.description}
                    </p>
                    <div className="space-y-2">
                      {section.links.slice(0, 3).map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {getIconForLinkType(link.type)}
                          <span className="truncate">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Complete Learning Path</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on each item to mark as completed and track your progress
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <Accordion type="multiple" className="space-y-2">
                    {Object.entries(fullRoadmap).map(([key, item], index) => (
                      <AccordionItem key={key} value={key} className="border rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div
                              className={`inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                                completedItems.has(key) 
                                  ? 'bg-primary text-primary-foreground border-primary' 
                                  : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItemCompletion(key);
                              }}
                            >
                              {completedItems.has(key) && (
                                <CheckCircleIcon className="h-3 w-3" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                Step {index + 1} of {totalItems}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          {item.links.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Resources:</h5>
                              {item.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  {getIconForLinkType(link.type)}
                                  <span>{link.title}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {link.type}
                                  </Badge>
                                </a>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default RoadmapPage; 