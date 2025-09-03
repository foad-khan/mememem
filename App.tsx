
import React, { useRef } from 'react';
import { MemePreview } from './components/MemePreview';
import { Controls } from './components/Controls';
import { useMemeGenerator } from './hooks/useMemeGenerator';

const App: React.FC = () => {
  const memeRef = useRef<HTMLDivElement>(null);
  const { memeState, handleTextChange, handleImageUpload, handleDownload, isDownloading } = useMemeGenerator(memeRef);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Meme Generator
        </h1>
        <p className="text-gray-400 mt-2">Create your next viral meme in seconds.</p>
      </header>
      
      <main className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col bg-gray-800 rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Customize Your Meme</h2>
            <Controls
              memeState={memeState}
              onTextChange={handleTextChange}
              onImageUpload={handleImageUpload}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-2xl p-6">
             <h2 className="text-2xl font-bold mb-4 text-center w-full border-b border-gray-700 pb-2">Live Preview</h2>
            <MemePreview
              ref={memeRef}
              image={memeState.image}
              topText={memeState.topText}
              bottomText={memeState.bottomText}
            />
          </div>
        </div>
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
        <p>&copy; {new Date().getFullYear()} Meme Masters Inc.</p>
      </footer>
    </div>
  );
};

export default App;
