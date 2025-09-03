
import React, { forwardRef } from 'react';

interface MemePreviewProps {
  image: string | null;
  topText: string;
  bottomText: string;
}

export const MemePreview = forwardRef<HTMLDivElement, MemePreviewProps>(({ image, topText, bottomText }, ref) => {
  const memeTextStyle = "absolute w-full text-center p-2 text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase break-words [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_0_0_#000,-2px_0_0_#000,0_2px_0_#000,0_-2px_0_#000]";

  return (
    <div ref={ref} className="relative w-full max-w-lg aspect-auto bg-black flex items-center justify-center overflow-hidden rounded-lg">
      {image ? (
        <img src={image} alt="Meme background" className="max-h-[60vh] object-contain" />
      ) : (
        <div className="w-full aspect-video bg-gray-700 flex items-center justify-center">
          <p className="text-gray-400">Upload an image to start</p>
        </div>
      )}
      <div className={`${memeTextStyle} top-0`}>{topText}</div>
      <div className={`${memeTextStyle} bottom-0`}>{bottomText}</div>
    </div>
  );
});
