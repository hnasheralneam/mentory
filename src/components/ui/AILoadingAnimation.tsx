'use client';

import React, { useState, useEffect } from 'react';

interface AILoadingAnimationProps {
  messages?: string[];
}

export default function AILoadingAnimation({ 
  messages = [
    "Initializing neural networks...",
    "Analyzing compatibility patterns...",
    "Processing learning preferences...",
    "Computing personality vectors...",
    "Optimizing tutor-student matrix...",
    "Finalizing AI recommendations..."
  ]
}: AILoadingAnimationProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg font-['Raleway']">
      {/* Animated Loading Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 w-12 h-12 border-4 border-gray-600 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        <div className="absolute inset-4 w-8 h-8 bg-black rounded-full animate-pulse"></div>
      </div>
      
      {/* AI Message */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-black mb-2 font-['Raleway']">
          AI Compatibility Engine
        </h3>
        <p className="text-gray-700 min-h-[24px] font-['Raleway']">
          {messages[currentMessage]}{dots}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 bg-gray-300 rounded-full h-2 mt-4 overflow-hidden">
        <div className="h-full bg-black rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}