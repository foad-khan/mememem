
import React from 'react';
import type { MemeState } from '../types';

interface ControlsProps {
  memeState: MemeState;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 font-semibold text-gray-300">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const FileInput: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onChange }) => (
  <div className="flex flex-col">
    <label htmlFor="imageUpload" className="mb-2 font-semibold text-gray-300">
      Upload Image
    </label>
    <label htmlFor="imageUpload" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md cursor-pointer transition duration-200">
      Choose a file...
    </label>
    <input
      type="file"
      id="imageUpload"
      name="imageUpload"
      accept="image/*"
      onChange={onChange}
      className="hidden"
    />
  </div>
);

const DownloadButton: React.FC<{ onClick: () => void; isDownloading: boolean }> = ({ onClick, isDownloading }) => (
  <button
    onClick={onClick}
    disabled={isDownloading}
    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
  >
    {isDownloading ? (
      <>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Downloading...</span>
      </>
    ) : (
      <span>Download Meme</span>
    )}
  </button>
);


export const Controls: React.FC<ControlsProps> = ({ memeState, onTextChange, onImageUpload, onDownload, isDownloading }) => {
  return (
    <div className="space-y-6">
      <InputField label="Top Text" name="topText" value={memeState.topText} onChange={onTextChange} />
      <InputField label="Bottom Text" name="bottomText" value={memeState.bottomText} onChange={onTextChange} />
      <FileInput onChange={onImageUpload} />
      <div className="pt-4 border-t border-gray-700">
        <DownloadButton onClick={onDownload} isDownloading={isDownloading} />
      </div>
    </div>
  );
};
