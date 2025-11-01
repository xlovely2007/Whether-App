
import React, { useRef } from 'react';
import { UploadIcon } from './IconComponents';

interface FileInputProps {
  onFileChange: (file: File) => void;
  file: File | null;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileChange, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
        <label className="block text-lg font-semibold text-slate-700 mb-2">1. Upload CSV File</label>
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center w-full p-6 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadIcon className="w-10 h-10 mb-3 text-slate-400" />
            {!file ? (
              <>
                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-400">CSV files only</p>
              </>
            ) : (
              <>
                <p className="mb-2 text-sm text-slate-700 font-semibold">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                <span className="mt-2 text-xs text-blue-600 hover:underline">Click to choose a different file</span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileSelect}
          />
        </div>
    </div>
  );
};
