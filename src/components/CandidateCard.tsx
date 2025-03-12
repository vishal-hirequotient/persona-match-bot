
import React from 'react';
import { Candidate } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbsUp, ThumbsDown, User, Mail, Phone, MapPin, Building } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { approveCandidate, rejectCandidate } = useProject();

  const handleApprove = () => {
    approveCandidate(candidate.id);
  };

  const handleReject = () => {
    rejectCandidate(candidate.id);
  };

  return (
    <Card className="w-full mb-6 overflow-hidden border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-sm text-gray-500">
                {candidate.title}, {candidate.company}
              </p>
              <div className="flex items-center mt-1">
                {candidate.visaStatus && (
                  <Badge variant="outline" className="mr-2">
                    {candidate.visaStatus}
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Jobs Immediately
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-700 truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-700">{candidate.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-700">Experience: {candidate.experience} years</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-700">Location: {candidate.location}</span>
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 6).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {skill.name}
              </Badge>
            ))}
            {candidate.skills.length > 6 && (
              <Badge variant="outline" className="bg-gray-100">
                +{candidate.skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Past Companies:</h4>
          <div className="flex items-center text-sm">
            <Building className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-700">
              {candidate.pastCompanies.map(c => c.name).join(', ')}
            </span>
          </div>
        </div>
      </CardContent>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="px-4 pt-2 pb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">About</h4>
          <p className="text-sm text-gray-600 mb-3">{candidate.about}</p>
          
          <h4 className="text-sm font-medium text-gray-700 mb-1">Experience</h4>
          {candidate.experienceDetails.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                  <span className="text-lg font-semibold text-gray-500">
                    {exp.company.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h5 className="text-sm font-medium">{exp.company}</h5>
                  <p className="text-xs text-gray-500">{exp.duration} · {exp.startDate} - {exp.endDate}</p>
                </div>
              </div>
              <div className="ml-13 pl-13 mt-2 border-l-2 border-gray-200">
                <div className="ml-5 mb-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                    <p className="text-xs font-medium">{exp.title}</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-4">{exp.startDate} - {exp.endDate}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="resume">
          <div className="p-4 text-center text-gray-500">
            Resume view coming soon
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <div className="p-4 text-center text-gray-500">
            Activity log coming soon
          </div>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between p-4 border-t bg-gray-50">
        <Button variant="outline" className="w-[48%] border-reject text-reject hover:bg-reject-light" onClick={handleReject}>
          <ThumbsDown className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button className="w-[48%] bg-approve hover:bg-approve/90" onClick={handleApprove}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          I like it
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
