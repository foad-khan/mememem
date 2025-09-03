
import { useState, useCallback, RefObject } from 'react';
import type { MemeState } from '../types';

// Declaration for the htmlToImage library loaded from CDN
declare const htmlToImage: {
  toPng: (element: HTMLElement) => Promise<string>;
};

export const useMemeGenerator = (memeRef: RefObject<HTMLElement>) => {
  const [memeState, setMemeState] = useState<MemeState>({
    topText: 'Top Text',
    bottomText: 'Bottom Text',
    image: `https://picsum.photos/seed/${Date.now()}/800/600`,
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMemeState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMemeState(prevState => ({
          ...prevState,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (!memeRef.current) {
      alert('Meme element not found.');
      return;
    }

    setIsDownloading(true);
    try {
      const dataUrl = await htmlToImage.toPng(memeRef.current);
      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Oops, something went wrong!', error);
      alert('Failed to generate meme. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [memeRef]);

  return {
    memeState,
    handleTextChange,
    handleImageUpload,
    handleDownload,
    isDownloading,
  };
};
