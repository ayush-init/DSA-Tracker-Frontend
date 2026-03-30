"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';

export default function BetterTree() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary">BF</span>
          </div>
          <p className="text-muted-foreground">Loading animation...</p>
        </div>
      </div>
    );
  }

  return (
    <DotLottieReact
      src="/home.lottie"
      loop
      autoplay
      style={{ width: '100%', height: '100%' }}
      onError={(error) => {
        console.error('Lottie animation error:', error);
        setHasError(true);
      }}
      onLoad={() => {
        console.log('Lottie animation loaded successfully');
      }}
    />
  );
}