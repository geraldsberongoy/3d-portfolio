import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Minimize2, Maximize2, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { chatbotService } from '../../services/chatbotService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Gerald's AI assistant. Ask me anything about his projects, skills, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await chatbotService.sendMessage(inputMessage);
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: response.reply,
          sender: 'bot',
          timestamp: new Date(),
          source: response.source,
          provider: response.provider
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "What projects has Gerald built?",
    "What are his technical skills?",
    "Tell me about his experience",
    "How can I contact him?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-3 right-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-black-100 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 rounded-t-2xl bg-black-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white-50/10 flex items-center justify-center">
                <Bot size={20} className="text-white-50" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-white-50">Gerald's AI Assistant</h3>
                <p className="text-xs text-white-50/60">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="w-8 h-8 rounded-full bg-white-50/10 hover:bg-white-50/20 flex items-center justify-center transition-colors"
              >
                {isMinimized ? <Maximize2 size={16} className="text-white-50" /> : <Minimize2 size={16} className="text-white-50" />}
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px] bg-black">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isTyping && <TypingIndicator />}
                
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-sm text-white-50/60 text-center mb-3">
                      Try asking me about:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left p-3 text-xs bg-black-50 hover:bg-black-200 text-white-50 rounded-lg transition-colors border border-white/5"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black-100">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about Gerald's portfolio..."
                      className="w-full px-4 py-2 pr-12 border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-white-50/30 bg-black-50 text-white-50 placeholder:text-white-50/40 text-sm"
                      rows="1"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-10 h-10 bg-white-50 text-black hover:bg-white-50/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="text-xs text-white-50/40 mt-2 text-center">
                  Powered by AI • Press Enter to send
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button - Only show when chat is closed */}
      {!isOpen && (
        <>
          <button
            onClick={toggleChat}
            className="w-14 h-14 bg-white-50 hover:bg-white-50/90 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            <MessageCircle size={24} />
          </button>

          {/* Subtle Notification Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white-50 text-black text-xs rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;