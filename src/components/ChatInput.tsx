
import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProject } from '@/contexts/ProjectContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage, status } = useProject();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      addMessage(message.trim(), 'user');
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 border-t bg-white">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1"
        disabled={status === 'sourcing' || status === 'complete'}
      />
      <Button 
        onClick={handleSend} 
        disabled={!message.trim() || status === 'sourcing' || status === 'complete'}
        className="bg-bot hover:bg-bot/90"
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
