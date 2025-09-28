"use client";

import React, { useState, useMemo } from 'react';
import Container from "@/components/global/container";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  SearchIcon, 
  FilterIcon, 
  MicIcon, 
  CalendarIcon, 
  TrendingUpIcon,
  BriefcaseIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon
} from "lucide-react";
import { MOCK_INTERVIEW_SLOTS, InterviewSlot } from '@/constants/mock-interviews';
import InterviewCard from '@/components/dashboard/interview-card';
import ApplicationModal from '@/components/dashboard/application-modal';
import { toast } from '@/hooks/use-toast';

interface ApplicationData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
  };
  experience: {
    currentRole: string;
    yearsExperience: string;
    expectedSalary: string;
    availableDate: string;
  };
  motivation: {
    coverLetter: string;
    whyInterested: string;
    questions: string;
  };
  files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    status: string;
    url?: string;
  }>;
}

const MockInterviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [appliedInterviews, setAppliedInterviews] = useState<Set<string>>(new Set());
  const [selectedInterview, setSelectedInterview] = useState<InterviewSlot | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Get unique values for filters
  const companies = [...new Set(MOCK_INTERVIEW_SLOTS.map(slot => slot.company.name))];
  const locations = [...new Set(MOCK_INTERVIEW_SLOTS.map(slot => slot.position.location))];
  const statuses = [...new Set(MOCK_INTERVIEW_SLOTS.map(slot => slot.status))];

  // Filter interviews based on search and filters
  const filteredInterviews = useMemo(() => {
    return MOCK_INTERVIEW_SLOTS.filter(interview => {
      const matchesSearch = !searchQuery || 
        interview.position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.requirements.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCompany = selectedCompany === 'all' || interview.company.name === selectedCompany;
      const matchesLocation = selectedLocation === 'all' || interview.position.location === selectedLocation;
      const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus;
      
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'applied' && appliedInterviews.has(interview.id)) ||
        (activeTab === 'urgent' && (interview.status === 'urgent' || interview.status === 'closing-soon')) ||
        (activeTab === 'remote' && interview.position.remote);

      return matchesSearch && matchesCompany && matchesLocation && matchesStatus && matchesTab;
    });
  }, [searchQuery, selectedCompany, selectedLocation, selectedStatus, activeTab, appliedInterviews]);

  const handleApply = (interviewId: string) => {
    const interview = MOCK_INTERVIEW_SLOTS.find(i => i.id === interviewId);
    if (interview) {
      setSelectedInterview(interview);
      setIsApplicationModalOpen(true);
    }
  };

  const handleApplicationSubmit = (applicationData: ApplicationData) => {
    if (selectedInterview) {
      setAppliedInterviews(prev => new Set([...prev, selectedInterview.id]));
      toast({
        title: "Application Submitted!",
        description: `Your application for ${selectedInterview.position.title} at ${selectedInterview.company.name} has been submitted successfully.`,
      });
    }
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'all':
        return MOCK_INTERVIEW_SLOTS.length;
      case 'applied':
        return appliedInterviews.size;
      case 'urgent':
        return MOCK_INTERVIEW_SLOTS.filter(i => i.status === 'urgent' || i.status === 'closing-soon').length;
      case 'remote':
        return MOCK_INTERVIEW_SLOTS.filter(i => i.position.remote).length;
      default:
        return 0;
    }
  };

  const stats = {
    totalInterviews: MOCK_INTERVIEW_SLOTS.length,
    appliedCount: appliedInterviews.size,
    urgentCount: MOCK_INTERVIEW_SLOTS.filter(i => i.status === 'urgent').length,
    remoteCount: MOCK_INTERVIEW_SLOTS.filter(i => i.position.remote).length,
    averageSalary: Math.round(
      MOCK_INTERVIEW_SLOTS.reduce((sum, interview) => {
        const salary = interview.compensation.salary.match(/₹(\d+),?(\d+)?/);
        const amount = salary ? parseInt(salary[1] + (salary[2] || '0000')) : 0;
        return sum + amount;
      }, 0) / MOCK_INTERVIEW_SLOTS.length / 100000
    )
  };

  return (
    <div className="py-8 px-4 md:px-8 bg-black min-h-screen">
      <Container>
        {/* Header - Removed heading as requested */}
        <div className="mb-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Card className="bg-gray-900 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Available</p>
                    <p className="text-xl font-bold text-white">{stats.totalInterviews}</p>
                  </div>
                  <BriefcaseIcon className="w-6 h-6 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Applied</p>
                    <p className="text-xl font-bold text-white">{stats.appliedCount}</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Urgent</p>
                    <p className="text-xl font-bold text-white">{stats.urgentCount}</p>
                  </div>
                  <ClockIcon className="w-6 h-6 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Avg. Salary</p>
                    <p className="text-xl font-bold text-white">₹{stats.averageSalary}L</p>
                  </div>
                  <TrendingUpIcon className="w-6 h-6 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="p-3 mb-4 bg-gray-900 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search positions, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="w-28 border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Companies</SelectItem>
                    {companies.map(company => (
                      <SelectItem key={company} value={company} className="text-white hover:bg-gray-700">{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-28 border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location} className="text-white hover:bg-gray-700">{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-20 border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="all" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">
              <span>All</span>
              <Badge variant="secondary" className="ml-1 bg-gray-700 text-gray-300">{getTabCount('all')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">
              <span>Applied</span>
              <Badge variant="secondary" className="ml-1 bg-gray-700 text-gray-300">{getTabCount('applied')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="urgent" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">
              <span>Urgent</span>
              <Badge variant="secondary" className="ml-1 bg-red-900/20 text-red-400">{getTabCount('urgent')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="remote" className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">
              <span>Remote</span>
              <Badge variant="secondary" className="ml-1 bg-gray-700 text-gray-300">{getTabCount('remote')}</Badge>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-white">
                  {filteredInterviews.length} interview{filteredInterviews.length !== 1 ? 's' : ''}
                </h3>
                {(searchQuery || selectedCompany !== 'all' || selectedLocation !== 'all' || selectedStatus !== 'all') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCompany('all');
                      setSelectedLocation('all');
                      setSelectedStatus('all');
                    }}
                    className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-32 border-gray-700 bg-gray-800 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="newest" className="text-white hover:bg-gray-700">Newest First</SelectItem>
                  <SelectItem value="deadline" className="text-white hover:bg-gray-700">Deadline</SelectItem>
                  <SelectItem value="salary-high" className="text-white hover:bg-gray-700">Salary ↓</SelectItem>
                  <SelectItem value="company" className="text-white hover:bg-gray-700">Company A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    onApply={handleApply}
                    isApplied={appliedInterviews.has(interview.id)}
                  />
                ))
              ) : (
                <Card className="p-8 text-center col-span-3 bg-gray-900 border-gray-700">
                  <div className="max-w-sm mx-auto">
                    <UsersIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No interviews found
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Try adjusting your search criteria or filters.
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCompany('all');
                        setSelectedLocation('all');
                        setSelectedStatus('all');
                        setActiveTab('all');
                      }}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Show All
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Tabs>

        {/* Application Modal */}
        <ApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setSelectedInterview(null);
          }}
          interview={selectedInterview}
          onSubmit={handleApplicationSubmit}
        />
      </Container>
    </div>
  );
};

export default MockInterviews; 