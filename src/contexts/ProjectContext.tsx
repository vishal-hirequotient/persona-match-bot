
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, Candidate, ProjectDetails, Status } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { mockCandidates } from '@/data/mockCandidates';

interface ProjectContextProps {
  projectDetails: ProjectDetails;
  updateProjectDetails: (details: Partial<ProjectDetails>) => void;
  messages: Message[];
  addMessage: (content: string, sender: 'bot' | 'user') => void;
  startTypingMessage: () => string;
  finishTypingMessage: (id: string, content: string) => void;
  candidates: Candidate[];
  approvedCandidates: Candidate[];
  rejectedCandidates: Candidate[];
  approveCandidate: (id: string) => void;
  rejectCandidate: (id: string) => void;
  canProceed: boolean;
  status: Status;
  setStatus: (status: Status) => void;
  resetContext: () => void;
}

const defaultProjectDetails: ProjectDetails = {
  name: 'New Project',
  role: '',
  locations: [],
  requiredSkills: [],
  minExperience: 0,
  preferredCompanies: [],
  additionalRequirements: []
};

export const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(defaultProjectDetails);
  const [messages, setMessages] = useState<Message[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [approvedCandidates, setApprovedCandidates] = useState<Candidate[]>([]);
  const [rejectedCandidates, setRejectedCandidates] = useState<Candidate[]>([]);
  const [status, setStatus] = useState<Status>('initial');

  const updateProjectDetails = (details: Partial<ProjectDetails>) => {
    setProjectDetails(prev => ({ ...prev, ...details }));
  };

  const addMessage = (content: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startTypingMessage = () => {
    const id = uuidv4();
    const typingMessage: Message = {
      id,
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);
    return id;
  };

  const finishTypingMessage = (id: string, content: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id 
          ? { ...message, content, isTyping: false } 
          : message
      )
    );
  };

  const approveCandidate = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setApprovedCandidates(prev => [...prev, candidate]);
      setCandidates(prev => prev.filter(c => c.id !== id));
    }
  };

  const rejectCandidate = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setRejectedCandidates(prev => [...prev, candidate]);
      setCandidates(prev => prev.filter(c => c.id !== id));
    }
  };

  const canProceed = approvedCandidates.length >= 3;

  const resetContext = () => {
    setProjectDetails(defaultProjectDetails);
    setMessages([]);
    setCandidates(mockCandidates);
    setApprovedCandidates([]);
    setRejectedCandidates([]);
    setStatus('initial');
  };

  return (
    <ProjectContext.Provider value={{
      projectDetails,
      updateProjectDetails,
      messages,
      addMessage,
      startTypingMessage,
      finishTypingMessage,
      candidates,
      approvedCandidates,
      rejectedCandidates,
      approveCandidate,
      rejectCandidate,
      canProceed,
      status,
      setStatus,
      resetContext
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
