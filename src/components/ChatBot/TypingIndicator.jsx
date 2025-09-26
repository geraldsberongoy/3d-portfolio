import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black-50 text-white-50 border border-white/10 flex items-center justify-center">
          <Bot size={14} />
        </div>

        {/* Typing Bubble */}
        <div className="ml-2 relative">
          <div className="px-4 py-3 bg-black-50 text-white-50 rounded-2xl rounded-bl-sm shadow-sm border border-white/10">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white-50/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white-50/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white-50/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-white-50/50 ml-2">typing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;