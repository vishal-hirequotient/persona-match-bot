
import React from 'react';
import { useProject } from '@/contexts/ProjectContext';
import CandidateCard from './CandidateCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CandidatePanel: React.FC = () => {
  const { 
    candidates, 
    approvedCandidates, 
    canProceed, 
    status, 
    setStatus, 
    projectDetails 
  } = useProject();

  const handleStartSourcing = () => {
    setStatus('sourcing');
    
    // Simulate sourcing process completion after 3 seconds
    setTimeout(() => {
      setStatus('complete');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">{projectDetails.name || "Project Name"}</h2>
          <Button variant="ghost" size="icon" className="ml-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {status === 'candidate-review' && candidates.length > 0 && (
          <>
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
            <div className="text-center py-4 text-sm text-gray-500">
              Select minimum {Math.max(3 - approvedCandidates.length, 0)} more profiles to proceed further...
            </div>
          </>
        )}

        {status === 'candidate-review' && candidates.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-approve mb-4" />
            <h3 className="text-xl font-semibold mb-2">Candidate Review Complete</h3>
            <p className="text-gray-500 mb-6">
              You've reviewed all candidates. Click below to start sourcing based on your approved selections.
            </p>
            <Button
              onClick={handleStartSourcing}
              disabled={!canProceed}
              className={cn(
                "px-6 py-2",
                canProceed ? "bg-bot hover:bg-bot/90" : "bg-gray-300"
              )}
            >
              Start Sourcing Process
            </Button>
            {!canProceed && (
              <p className="text-red-500 text-sm mt-2">
                You need to approve at least 3 candidates to proceed.
              </p>
            )}
          </div>
        )}

        {status === 'sourcing' && (
          <div className="text-center py-8">
            <LoaderCircle className="mx-auto h-12 w-12 text-bot mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Sourcing in Progress</h3>
            <p className="text-gray-500">
              Please wait while we source candidates based on your preferences...
            </p>
          </div>
        )}

        {status === 'complete' && (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-approve mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sourcing Complete!</h3>
            <p className="text-gray-500 mb-6">
              We've found 42 qualified candidates based on your criteria. You can now view and manage them in your dashboard.
            </p>
            <Button className="px-6 py-2 bg-bot hover:bg-bot/90">
              View Candidates in Dashboard
            </Button>
          </div>
        )}

        {(status === 'initial' || 
          status === 'asking-location' || 
          status === 'asking-role' || 
          status === 'asking-experience' || 
          status === 'asking-skills') && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-6 p-8 bg-bot-light rounded-full inline-block">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-bot"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tell us about your ideal candidate</h3>
              <p className="text-gray-500 max-w-md">
                Chat with our AI assistant to define your requirements. 
                Once you provide all the details, we'll show you potential candidates here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatePanel;
