/**
 * Leaderboard-related types for admin
 */

export interface LeaderboardEntry {
  rank: number;
  student_id: number;
  student_name: string;
  username: string;
  enrollment_id: string;
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  streak: number;
  last_solved_at?: string;
  city?: string;
  batch_name?: string;
}

export interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  total_students: number;
  last_calculated: string;
  available_cities: Array<{
    city_name: string;
    available_years: number[];
  }>;
}

export interface FilterBarProps {
  lSearch: string;
  setLSearch: (value: string) => void;
  lCity: string;
  setLCity: (value: string) => void;
  cityOptionsObj: Array<{ label: string; value: string }>;
  lYear: number | null;
  setLYear: (value: number | null) => void;
  yearOptionsObj: Array<{ label: string; value: string }>;
  allYears: number[];
  mode: 'admin' | 'student';
}

export interface PodiumSectionProps {
  top3: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  selectedCity: string;
}

export interface LeaderboardTableProps {
  data: LeaderboardData | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  selectedCity: string;
}

export interface EvaluationModalProps {
  // No props needed - standalone modal
}

export interface TimerLeaderboardProps {
  lastUpdated: string | undefined;
  refreshInterval: number;
  onRefresh: () => void;
}

export interface LeaderboardQueryFilters {
  batch_id?: number;
  city_id?: number;
  year?: number;
  type?: string;
}
