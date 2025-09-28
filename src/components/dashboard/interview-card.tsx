"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { MagicCard } from '@/components/ui/magic-card';
import { 
  MapPinIcon, 
  ClockIcon, 
  CalendarIcon, 
  DollarSignIcon, 
  BriefcaseIcon, 
  GraduationCapIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  SparklesIcon,
  TrendingUpIcon
} from 'lucide-react';
import { InterviewSlot, INTERVIEW_STATUSES } from '@/constants/mock-interviews';
import { cn } from '@/lib/cn';
import Image from 'next/image';

interface InterviewCardProps {
  interview: InterviewSlot;
  onApply: (interviewId: string) => void;
  isApplied?: boolean;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ 
  interview, 
  onApply, 
  isApplied = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = INTERVIEW_STATUSES[interview.status];
  
  // Calculate urgency progress
  const urgencyProgress = interview.status === 'urgent' ? 85 : 
                         interview.status === 'closing-soon' ? 65 : 
                         interview.status === 'new' ? 25 : 45;

  return (
    <MagicCard
      gradientFrom="#38bdf8"
      gradientTo="#3b82f6"
      className="group transition-all duration-300 border border-gray-700 bg-gray-900 relative overflow-hidden p-5 rounded-2xl"
      gradientColor="rgba(59,130,246,0.1)"
    >
      
      <div className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Company Logo */}
            <div className="relative w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 p-2 flex items-center justify-center">
              <Image
                src={interview.company.logo}
                alt={`${interview.company.name} logo`}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
                  {interview.position.title}
                </h3>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs font-medium",
                    interview.status === 'urgent' ? "border-red-600 text-red-400 bg-red-900/20" : 
                    interview.status === 'closing-soon' ? "border-orange-600 text-orange-400 bg-orange-900/20" : 
                    interview.status === 'new' ? "border-green-600 text-green-400 bg-green-900/20" : 
                    "border-gray-600 text-gray-400 bg-gray-800"
                  )}
                >
                  {statusConfig.label}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span className="font-medium text-white">{interview.company.name}</span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center space-x-1">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{interview.position.location}</span>
                </span>
                {interview.position.remote && (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs border-gray-700">Remote</Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Application status */}
          <div className="text-right">
            {interview.status === 'urgent' && (
              <div className="flex items-center space-x-1">
                <AlertCircleIcon className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400 font-medium">Urgent</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative space-y-3 pt-0">
        {/* Interview Schedule */}
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md border border-gray-700">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <div>
              <p className="font-medium text-white text-sm">{interview.schedule.date}</p>
              <p className="text-xs text-gray-400">{interview.schedule.time} • {interview.schedule.duration}</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {interview.schedule.timeZone}
          </div>
        </div>

        {/* Compensation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSignIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-white text-sm">{interview.compensation.salary}</span>
            {interview.compensation.equity && (
              <Badge variant="outline" className="bg-gray-800 text-gray-300 text-xs border-gray-700">
                + Equity
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-400">
            {interview.requirements.experience}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-1">
            {interview.requirements.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
                {skill}
              </Badge>
            ))}
            {interview.requirements.skills.length > 4 && (
              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                +{interview.requirements.skills.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-gray-700">
            <div>
              <h4 className="font-semibold mb-2 text-white text-sm">Job Description</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{interview.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-white text-sm">Key Responsibilities</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                {interview.responsibilities.slice(0, 3).map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white text-sm">Interview Process</h4>
              <div className="flex flex-wrap gap-2">
                {interview.interviewProcess.types.map((type, index) => (
                  <div key={type} className="flex items-center space-x-1 text-xs">
                    <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-xs font-medium text-gray-300">
                      {index + 1}
                    </div>
                    <span className="text-gray-400">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            {/* Recruiter Info */}
            <Avatar className="w-6 h-6">
              <AvatarImage src={interview.recruiter.avatar} />
              <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                {interview.recruiter.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium text-white">{interview.recruiter.name}</p>
              <p className="text-gray-400">{interview.recruiter.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              {isExpanded ? 'Less' : 'Details'}
            </Button>
            
            <Button
              size="sm"
              onClick={() => onApply(interview.id)}
              disabled={isApplied}
              className={cn(
                "text-xs transition-all duration-200",
                isApplied 
                  ? "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-800" 
                  : "bg-white text-black hover:bg-gray-200"
              )}
            >
              {isApplied ? (
                <>
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  Applied
                </>
              ) : (
                'Apply'
              )}
            </Button>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default InterviewCard;