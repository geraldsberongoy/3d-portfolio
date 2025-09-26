import React from 'react';
import { Bot, User, Clock } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-white-50 text-black' 
            : 'bg-black-50 text-white-50 border border-white/10'
        }`}>
          {isUser ? <User size={14} /> : <Bot size={14} />}
        </div>

        {/* Message Bubble */}
        <div className={`relative ${isUser ? 'mr-2' : 'ml-2'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-white-50 text-black rounded-br-sm' 
              : message.isError
                ? 'bg-black-50 border border-white/20 text-white-50/80 rounded-bl-sm'
                : 'bg-black-50 text-white-50 rounded-bl-sm border border-white/10'
          }`}>
            {/* Message Text */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.text}
            </div>

            {/* Message Metadata */}
            <div className={`flex items-center justify-between mt-2 text-xs ${
              isUser ? 'text-black/60' : 'text-white-50/50'
            }`}>
              <div className="flex items-center space-x-1">
                <Clock size={10} />
                <span>{formatTime(message.timestamp)}</span>
              </div>

              {/* Bot Message Metadata */}
              {isBot && !message.isError && message.source && (
                <div className="text-xs opacity-60">
                  {message.source === 'gemini' ? '✨ AI' : '📚 KB'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;