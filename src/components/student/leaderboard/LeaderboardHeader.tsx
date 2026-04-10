"use client";

import React from 'react';
import { Trophy } from 'lucide-react';
import { EvaluationModal } from './EvaluationModal';
import { TimerLeaderboard } from './TimerLeaderboard';

interface LeaderboardHeaderProps {
  lCity: string;
  lYear: number | null;
  lastUpdated?: string;
}

export function LeaderboardHeader({ lCity, lYear, lastUpdated }: LeaderboardHeaderProps) {
  return (
    <div className=" glass backdrop-blur-sm  rounded-2xl px-5 py-4 mb-6">
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex flex-col gap-1">

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />

            <h2 className="text-2xl font-semibold text-foreground tracking-tight">
              Student 
              <span className=" ms-2 text-primary">
                Leaderboard
              </span>
            </h2>

            <EvaluationModal />
          </div>
          <p className="text-xs text-muted-foreground bg-muted/40 px-2.5 py-0.5 
                rounded-full border border-border/40 w-fit">
            Top 10 Students {lCity !== 'all' ? `in ${lCity}` : 'Globally'} {lYear ? `- ${lYear}` : ''}
          </p>

        </div>

        {/* Right */}
        <div className="flex items-center">
          <TimerLeaderboard lastUpdated={lastUpdated} />
        </div>

      </div>
    </div>
  );
}
