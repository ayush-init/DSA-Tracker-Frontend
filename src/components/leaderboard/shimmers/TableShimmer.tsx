import React from 'react';
import { Flame } from 'lucide-react';

export default function TableShimmer() {
  return (
    <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-border/80">
            <tr>
              <th className="font-bold px-4">Student</th>
              <th className="text-center font-bold">Rank</th>
              <th className="font-bold">Location</th>
              <th className="font-bold text-center">Score</th>
              <th className="font-bold text-center">Max Streak</th>
              <th className="font-bold text-center">Solved</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr 
                key={i} 
                className="group hover:bg-muted/40 transition-all duration-200 hover:scale-[1.002] cursor-default bg-primary/2 hover:bg-primary/12 rounded-xl animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Shimmer */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border/60 shadow-sm bg-muted/50 animate-pulse"></div>
                    
                    {/* Name and Username Shimmer */}
                    <div className="flex flex-col">
                      <div className="h-4 w-32 bg-muted/50 rounded mb-1 animate-pulse"></div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-20 bg-muted/40 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Rank Shimmer */}
                <td className="text-center p-4">
                  <div className="h-5 w-8 bg-muted/50 rounded mx-auto animate-pulse"></div>
                </td>

                {/* Location Shimmer */}
                <td className="p-4">
                  <div className="flex flex-col gap-0.5 items-start">
                    <div className="h-5 w-24 bg-muted/40 rounded-full animate-pulse"></div>
                  </div>
                </td>

                {/* Score Shimmer */}
                <td className="text-center p-4">
                  <div className="h-6 w-16 bg-muted/50 rounded mx-auto animate-pulse"></div>
                </td>

                {/* Max Streak Shimmer */}
                <td className="text-center p-4">
                  <div className="flex justify-center">
                    <div className="px-2.5 py-1 rounded-full bg-muted/40 w-12 h-6 flex items-center justify-center animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-muted-foreground/50" />
                    </div>
                  </div>
                </td>

                {/* Solved Shimmer */}
                <td className="text-center p-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-4 w-8 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
