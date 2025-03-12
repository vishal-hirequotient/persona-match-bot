
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useProject } from '@/contexts/ProjectContext';
import { BotIcon } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const { messages, startTypingMessage, finishTypingMessage, addMessage, status, projectDetails, setStatus } = useProject();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial bot message
  useEffect(() => {
    if (status === 'initial' && messages.length === 0) {
      const initialMessages = [
        "Hi! I'm Orion, your AI Sourcing Assistant.",
        "Let's find the best candidates for your role. First, could you tell me which locations you're hiring in?"
      ];
      
      const sendBotMessages = async () => {
        // First message
        addMessage(initialMessages[0], 'bot');
        
        // Wait before sending the second message
        setTimeout(() => {
          addMessage(initialMessages[1], 'bot');
          setStatus('asking-location');
        }, 1000);
      };
      
      sendBotMessages();
    }
  }, [status, messages.length, addMessage, setStatus]);

  // Process user messages based on conversation state
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && lastMessage.sender === 'user') {
      const typingId = startTypingMessage();
      
      setTimeout(() => {
        let responseText = '';
        
        switch (status) {
          case 'asking-location':
            responseText = `Great! I'll look for candidates in ${lastMessage.content}. Now, what role are you hiring for?`;
            finishTypingMessage(typingId, responseText);
            setStatus('asking-role');
            break;
            
          case 'asking-role':
            responseText = `Thanks! I'll search for ${lastMessage.content} candidates. How many years of minimum experience should they have?`;
            finishTypingMessage(typingId, responseText);
            setStatus('asking-experience');
            break;
            
          case 'asking-experience':
            responseText = `Perfect. Could you list some key skills or technologies that candidates should know?`;
            finishTypingMessage(typingId, responseText);
            setStatus('asking-skills');
            break;
            
          case 'asking-skills':
            responseText = `Great! I've found some potential candidates based on your requirements. Please review them and approve at least 3 candidates that match your criteria well.`;
            finishTypingMessage(typingId, responseText);
            setStatus('candidate-review');
            break;
            
          default:
            responseText = "I understand. Let me process that information.";
            finishTypingMessage(typingId, responseText);
            break;
        }
      }, 1500);
    }
  }, [messages, status, startTypingMessage, finishTypingMessage, setStatus]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {status === 'initial' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BotIcon className="mx-auto h-12 w-12 mb-4 text-bot" />
              <h3 className="text-xl font-semibold">Start the conversation</h3>
              <p>Tell Orion about your hiring needs</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <ChatInput />
    </div>
  );
};

export default ChatPanel;
