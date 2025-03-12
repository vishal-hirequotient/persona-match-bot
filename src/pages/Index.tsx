
import React from 'react';
import { ProjectProvider } from '@/contexts/ProjectContext';
import ChatPanel from '@/components/ChatPanel';
import CandidateDrawer from '@/components/CandidateDrawer';

const Index = () => {
  return (
    <ProjectProvider>
      <div className="h-screen bg-gray-100">
        <div className="w-full max-w-3xl mx-auto bg-white shadow-md h-full">
          <ChatPanel />
        </div>
        <CandidateDrawer />
      </div>
    </ProjectProvider>
  );
};

export default Index;
