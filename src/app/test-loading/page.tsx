'use client';

import { useState } from 'react';
import AILoadingAnimation from '@/components/ui/AILoadingAnimation';

export default function TestLoadingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const simulateAPICall = async () => {
    setIsLoading(true);
    setResult('');
    
    // Simulate OpenAI API call delay
    setTimeout(() => {
      setIsLoading(false);
      setResult('Insert tutors');
    }, 8000); // 8 seconds to see all the loading messages
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-['Raleway']">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black font-['Raleway']">
          AI Loading Animation Test
        </h1>
        
        {!isLoading && !result && (
          <div className="text-center">
            <button 
              onClick={simulateAPICall}
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg font-['Raleway']"
            >
              Start Compatibility Matching
            </button>
          </div>
        )}

        {isLoading && <AILoadingAnimation />}
        
        {result && (
          <div className="text-center">
            <div className="bg-white border border-gray-300 text-black px-4 py-3 rounded mb-4 font-['Raleway']">
              {result}
            </div>
            <button 
              onClick={() => setResult('')}
              className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded font-['Raleway']"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}