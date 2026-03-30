"use client";

import React from 'react';

export function PracticeQuestionsShimmer() {
  return (
    <div className="flex flex-col gap-3 min-h-[400px]">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div 
          key={idx} 
          className="animate-in fade-in slide-in-from-bottom-2" 
          style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
        >
          <div className="group flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-card transition-all duration-300">
            
            {/* LEFT SIDE */}
            <div className="flex items-start gap-4">

              {/* STATUS ICON SHIMMER */}
              <div className="w-5 h-5 bg-muted/50 rounded-full mt-1 animate-pulse"></div>

              {/* TEXT BLOCK SHIMMER */}
              <div className="flex-1">

                {/* TITLE AND TYPE SHIMMER */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-4 w-64 bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-5 w-8 bg-muted/40 rounded animate-pulse"></div>
                </div>

                {/* TOPIC SHIMMER */}
                <div className="h-3 w-32 bg-muted/30 rounded mb-1 animate-pulse"></div>

                {/* META BADGES SHIMMER */}
                <div className="flex items-center gap-2">
                  <div className="h-5 w-12 bg-muted/40 rounded border border-muted/30 animate-pulse"></div>
                  <div className="w-1 h-1 bg-muted/30 rounded-full animate-pulse"></div>
                  <div className="h-4 w-8 bg-muted/30 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* RIGHT CTA BUTTON SHIMMER */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 h-8 w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
