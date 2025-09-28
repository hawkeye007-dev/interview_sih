"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  BriefcaseIcon, 
  UserIcon, 
  FileTextIcon, 
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DollarSignIcon,
  TrendingUpIcon
} from 'lucide-react';
import { InterviewSlot } from '@/constants/mock-interviews';
import { FileUpload } from './file-upload';
import Image from 'next/image';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: InterviewSlot | null;
  onSubmit: (applicationData: ApplicationData) => void;
}

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

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  interview,
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      portfolio: ''
    },
    experience: {
      currentRole: '',
      yearsExperience: '',
      expectedSalary: '',
      availableDate: ''
    },
    motivation: {
      coverLetter: '',
      whyInterested: '',
      questions: ''
    },
    files: []
  });

  if (!interview) return null;

  const handleInputChange = (section: keyof ApplicationData, field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFilesChange = (files: any[]) => {
    setApplicationData(prev => ({
      ...prev,
      files
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(applicationData);
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid = () => {
    const { personalInfo, experience } = applicationData;
    return (
      personalInfo.fullName &&
      personalInfo.email &&
      personalInfo.phone &&
      experience.currentRole &&
      experience.yearsExperience
    );
  };

  const tabProgress = {
    personal: Object.values(applicationData.personalInfo).filter(Boolean).length / 6 * 100,
    experience: Object.values(applicationData.experience).filter(Boolean).length / 4 * 100,
    motivation: Object.values(applicationData.motivation).filter(Boolean).length / 3 * 100,
    documents: applicationData.files.filter(f => f.status === 'completed').length > 0 ? 100 : 0
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-white border shadow-sm p-2 flex items-center justify-center">
              <Image
                src={interview.company.logo}
                alt={`${interview.company.name} logo`}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Apply for {interview.position.title}
              </h2>
              <p className="text-sm text-gray-600 font-normal">
                {interview.company.name} • {interview.position.location}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Interview Summary Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{interview.schedule.date}</p>
                  <p className="text-gray-600">{interview.schedule.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{interview.schedule.duration}</p>
                  <p className="text-gray-600">Interview Time</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSignIcon className="w-4 h-4 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{interview.compensation.salary}</p>
                  <p className="text-gray-600">Compensation</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUpIcon className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">{interview.position.level}</p>
                  <p className="text-gray-600">Level</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="relative">
              <UserIcon className="w-4 h-4 mr-2" />
              Personal
              {tabProgress.personal > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  {tabProgress.personal === 100 && <CheckCircleIcon className="w-2 h-2 text-white" />}
                </div>
              )}
            </TabsTrigger>
            <TabsTrigger value="experience" className="relative">
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              Experience
              {tabProgress.experience > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  {tabProgress.experience === 100 && <CheckCircleIcon className="w-2 h-2 text-white" />}
                </div>
              )}
            </TabsTrigger>
            <TabsTrigger value="motivation" className="relative">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Motivation
              {tabProgress.motivation > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  {tabProgress.motivation === 100 && <CheckCircleIcon className="w-2 h-2 text-white" />}
                </div>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="relative">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Documents
              {tabProgress.documents > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-2 h-2 text-white" />
                </div>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={applicationData.personalInfo.fullName}
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={applicationData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Current Location</Label>
                    <Input
                      id="location"
                      value={applicationData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                    <Input
                      id="linkedIn"
                      value={applicationData.personalInfo.linkedIn}
                      onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <Input
                      id="portfolio"
                      value={applicationData.personalInfo.portfolio}
                      onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                      placeholder="https://johndoe.dev"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      value={applicationData.experience.currentRole}
                      onChange={(e) => handleInputChange('experience', 'currentRole', e.target.value)}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Input
                      id="yearsExperience"
                      value={applicationData.experience.yearsExperience}
                      onChange={(e) => handleInputChange('experience', 'yearsExperience', e.target.value)}
                      placeholder="5+ years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary</Label>
                    <Input
                      id="expectedSalary"
                      value={applicationData.experience.expectedSalary}
                      onChange={(e) => handleInputChange('experience', 'expectedSalary', e.target.value)}
                      placeholder="$150,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availableDate">Available Start Date</Label>
                    <Input
                      id="availableDate"
                      type="date"
                      value={applicationData.experience.availableDate}
                      onChange={(e) => handleInputChange('experience', 'availableDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Required Skills for this Role</Label>
                  <div className="flex flex-wrap gap-2">
                    {interview.requirements.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="motivation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tell Us About Yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="whyInterested">Why are you interested in this role?</Label>
                  <Textarea
                    id="whyInterested"
                    rows={4}
                    value={applicationData.motivation.whyInterested}
                    onChange={(e) => handleInputChange('motivation', 'whyInterested', e.target.value)}
                    placeholder="I'm excited about this opportunity because..."
                  />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    rows={6}
                    value={applicationData.motivation.coverLetter}
                    onChange={(e) => handleInputChange('motivation', 'coverLetter', e.target.value)}
                    placeholder="Tell us why you're the perfect fit for this role..."
                  />
                </div>
                <div>
                  <Label htmlFor="questions">Questions for the Interviewer</Label>
                  <Textarea
                    id="questions"
                    rows={3}
                    value={applicationData.motivation.questions}
                    onChange={(e) => handleInputChange('motivation', 'questions', e.target.value)}
                    placeholder="What questions do you have about the role or company?"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <FileUpload
              onFilesChange={handleFilesChange}
              title="Upload Your Documents"
              description="Please upload your resume, cover letter, and any relevant portfolio items"
              maxFiles={5}
              maxSize={10}
              acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png']}
            />
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>Application will be reviewed within 48 hours</span>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Save Draft
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isFormValid() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;