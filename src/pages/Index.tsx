
import React from 'react';
import { ProjectProvider } from '@/contexts/ProjectContext';
import ChatPanel from '@/components/ChatPanel';
import CandidateDrawer from '@/components/CandidateDrawer';

const Index = () => {
  return (
    <ProjectProvider>
      <div className="h-screen bg-gray-100 flex justify-end">
        <CandidateDrawer />
      </div>
    </ProjectProvider>
  );
};

export default Index;
