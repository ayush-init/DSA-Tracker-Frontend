/**
 * Dashboard-related types for admin
 */

import { BatchSelection } from '../common/index.types';

export interface AdminStats {
  totalStudents: number;
  totalQuestions: number;
  totalTopics: number;
  totalClasses: number;
  activeStudents: number;
  completionRate: number;
  avgScore: number;
}

export interface DashboardHeaderProps {
  selectedBatch: BatchSelection | null;
}

export interface DashboardStatsProps {
  stats: AdminStats | null;
}

export interface DashboardGraphProps {
  stats: AdminStats | null;
}

export interface QuickActionProps {
  // No props needed
}

export interface DashboardShimmerProps {
  // No props needed
}
