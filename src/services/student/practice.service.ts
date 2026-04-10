import api from '@/lib/api';
import { isStudentToken, clearAuthTokens } from '@/lib/auth-utils';
import { handleToastError, showSuccess } from '@/utils/toast-system';
import { PracticeFilters } from '@/types/student/index.types';

export const studentPracticeService = {
  getQuestions: async (filters: PracticeFilters = {}) => {
    // Check if we have a student token before making the request
    if (!isStudentToken()) {
      clearAuthTokens(); // Clear invalid tokens
      const error = new Error('Access denied. Students only.');
      (error as any).response = { status: 403, data: { error: 'Access denied. Students only.' } };
      throw error;
    }

    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.topic) params.append('topic', filters.topic);
    if (filters.level) params.append('level', filters.level);
    if (filters.platform) params.append('platform', filters.platform);
    if (filters.type) params.append('type', filters.type);
    if (filters.solved) params.append('solved', filters.solved);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const res = await api.get(`/api/students/addedQuestions?${params.toString()}`);
    return res.data; // expects { questions: [...], totalPages: N }
  }
};

