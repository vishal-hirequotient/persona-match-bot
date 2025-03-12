
import React from 'react';
import { ProjectProvider } from '@/contexts/ProjectContext';
import ChatPanel from '@/components/ChatPanel';
import CandidateDrawer from '@/components/CandidateDrawer';
import { Button } from '@/components/ui/button';
import { useProject } from '@/contexts/ProjectContext';
import { MessageSquare } from 'lucide-react';

// Drawer trigger component that uses the context
const DrawerTrigger = () => {
  const { status, setStatus } = useProject();
  
  const handleOpenDrawer = () => {
    setStatus('asking-location');
  };
  
  return (
    <Button 
      onClick={handleOpenDrawer}
      className="fixed bottom-4 right-4 rounded-full w-16 h-16 bg-bot hover:bg-bot/90 shadow-lg"
      size="icon"
      aria-label="Open chat"
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  );
};

const Index = () => {
  return (
    <ProjectProvider>
      <div className="h-screen bg-gray-100 flex justify-end">
        <CandidateDrawer />
        <DrawerTrigger />
      </div>
    </ProjectProvider>
  );
};

export default Index;
