
import React from 'react';
import { ProjectProvider } from '@/contexts/ProjectContext';
import ChatPanel from '@/components/ChatPanel';
import CandidatePanel from '@/components/CandidatePanel';

const Index = () => {
  return (
    <ProjectProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 max-w-[500px] bg-white shadow-md">
          <ChatPanel />
        </div>
        <div className="flex-1 bg-white shadow-md">
          <CandidatePanel />
        </div>
      </div>
    </ProjectProvider>
  );
};

export default Index;
