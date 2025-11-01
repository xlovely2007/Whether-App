
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isDisabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, isDisabled }) => {
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-slate-700 mb-2">2. Ask Your Question</label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isDisabled}
        placeholder={isDisabled ? "Upload a file to enable..." : "e.g., What was the average temperature in July? Which month had the highest rainfall?"}
        rows={4}
        className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
      />
    </div>
  );
};
