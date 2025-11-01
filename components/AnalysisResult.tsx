
import React from 'react';

interface AnalysisResultProps {
  result: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  // Simple markdown-to-HTML conversion for bold, lists, etc.
  // This is a basic implementation to avoid external libraries.
  const formatResult = (text: string) => {
    // Split into lines to process each one
    return text.split('\n').map((line, index) => {
      // Bold text: **text**
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Headers: #, ##, ###
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.substring(2)}</h2>;
      }

      // List items: * or -
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc">{line.trim().substring(2)}</li>;
      }

      // Handle empty lines as paragraph breaks
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-200 pb-2 mb-4">Analysis Results</h3>
      <div className="bg-slate-50 p-6 rounded-lg prose max-w-none text-slate-700 leading-relaxed">
        {formatResult(result)}
      </div>
    </div>
  );
};
