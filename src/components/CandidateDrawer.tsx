
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import CandidateCard from './CandidateCard';
import { Button } from './ui/button';
import { CheckCircle, LoaderCircle, ArrowLeft } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ChatPanel from './ChatPanel';

const CandidateDrawer = () => {
  const { 
    candidates, 
    approvedCandidates, 
    rejectedCandidates,
    canProceed, 
    status, 
    setStatus 
  } = useProject();
  
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  const isOpen = status !== 'initial';
  const isExpanded = status === 'candidate-review' || status === 'sourcing' || status === 'complete';

  const handleStartSourcing = () => {
    setStatus('sourcing');
    setTimeout(() => {
      setStatus('complete');
    }, 3000);
  };

  const handleApproveOrReject = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(prev => prev + 1);
    }
  };

  const getCurrentCandidate = () => {
    if (candidates.length === 0 || currentCandidateIndex >= candidates.length) {
      return null;
    }
    return candidates[currentCandidateIndex];
  };

  // Listen for candidate approvals/rejections to advance to next candidate
  React.useEffect(() => {
    const totalReviewed = approvedCandidates.length + rejectedCandidates.length;
    const originalTotal = totalReviewed + candidates.length;
    setCurrentCandidateIndex(Math.min(totalReviewed, candidates.length - 1));
  }, [approvedCandidates.length, rejectedCandidates.length, candidates.length]);

  return (
    <Drawer open={isOpen}>
      <DrawerContent className={`${isExpanded ? 'h-[85vh]' : 'h-screen'} transition-all duration-300`}>
        <DrawerHeader className="flex items-center justify-between border-b pb-2">
          {status !== 'initial' && status !== 'asking-location' && status !== 'asking-role' && status !== 'asking-experience' && status !== 'asking-skills' && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => {
                if (status === 'candidate-review') {
                  setStatus('asking-skills');
                }
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <DrawerTitle className="text-xl font-semibold flex-1">
            {status === 'asking-location' || status === 'asking-role' || status === 'asking-experience' || status === 'asking-skills' && 'Chat with Orion'}
            {status === 'candidate-review' && 'Review Candidates'}
            {status === 'sourcing' && 'Sourcing in Progress'}
            {status === 'complete' && 'Sourcing Complete!'}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} h-full`}>
          {/* Chat Panel - Always visible */}
          <div className={`${isExpanded ? 'border-r' : ''} overflow-auto`}>
            <ChatPanel />
          </div>
          
          {/* Candidate Review - Only visible when expanded */}
          {isExpanded && (
            <div className="p-4 overflow-auto">
              {status === 'candidate-review' && candidates.length > 0 && (
                <>
                  {getCurrentCandidate() ? (
                    <CandidateCard 
                      key={getCurrentCandidate()?.id} 
                      candidate={getCurrentCandidate()!} 
                      onAction={handleApproveOrReject}
                    />
                  ) : (
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
                </>
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
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CandidateDrawer;
