import api from '@/lib/api';
import { isStudentToken, clearAuthTokens } from '@/lib/auth-utils';
import { handleToastError, showSuccess } from '@/utils/toast-system';

export const studentLeaderboardService = {
  getLeaderboard: async (filters: { city?: string; year?: number; type?: string } = {}, search?: string) => {
    // Check if we have a student token before making the request
    if (!isStudentToken()) {
      clearAuthTokens(); // Clear invalid tokens
      const error = new Error('Access denied. Students only.');
      (error as any).response = { status: 403, data: { error: 'Access denied. Students only.' } };
      throw error;
    }

    // Pass search in the filters body, not as URL query parameter
    const requestBody = {
      ...filters,
      username: search // Backend expects 'username' in request body
    };
    
    const res = await api.post('/api/students/leaderboard', requestBody);
    return res.data;
  }
};
