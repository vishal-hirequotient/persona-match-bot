
import React from 'react';
import { useProject } from '@/contexts/ProjectContext';
import CandidateCard from './CandidateCard';
import { Button } from './ui/button';
import { CheckCircle, LoaderCircle } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const CandidateDrawer = () => {
  const { 
    candidates, 
    approvedCandidates, 
    canProceed, 
    status, 
    setStatus 
  } = useProject();

  const isOpen = status === 'candidate-review' || status === 'sourcing' || status === 'complete';

  const handleStartSourcing = () => {
    setStatus('sourcing');
    setTimeout(() => {
      setStatus('complete');
    }, 3000);
  };

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            {status === 'candidate-review' && 'Review Candidates'}
            {status === 'sourcing' && 'Sourcing in Progress'}
            {status === 'complete' && 'Sourcing Complete!'}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-auto">
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
                className="px-6 py-2 bg-bot hover:bg-bot/90"
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CandidateDrawer;
