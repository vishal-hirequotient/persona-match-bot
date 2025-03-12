
import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { BotIcon, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 mr-3">
          <Avatar className="h-8 w-8 bg-bot text-white">
            <AvatarFallback>
              <BotIcon size={16} />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div
        className={cn(
          "px-4 py-3 rounded-lg max-w-[80%]",
          isBot 
            ? "bg-bot-light text-gray-800 rounded-tl-none" 
            : "bg-user-DEFAULT text-gray-800 border border-user-dark rounded-tr-none"
        )}
      >
        {message.isTyping ? (
          <div className="flex space-x-2 items-center h-6">
            <div className="w-2 h-2 rounded-full bg-bot/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-bot/70 animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-bot/70 animate-pulse delay-300"></div>
          </div>
        ) : (
          <span>{message.content}</span>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 ml-3">
          <Avatar className="h-8 w-8 bg-gray-200 text-gray-700">
            <AvatarFallback>
              <User size={16} />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
