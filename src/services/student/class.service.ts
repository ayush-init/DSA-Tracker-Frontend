import api from '@/lib/api';
import { isStudentToken, clearAuthTokens } from '@/lib/auth-utils';

export const studentClassService = {
  getClassDetails: async (topicSlug: string, classSlug: string) => {
    // Check if we have a student token before making the request
    if (!isStudentToken()) {
      clearAuthTokens(); // Clear invalid tokens
      const error = new Error('Access denied. Students only.');
      (error as any).response = { status: 403, data: { error: 'Access denied. Students only.' } };
      throw error;
    }

    const res = await api.get(`/api/students/topics/${topicSlug}/classes/${classSlug}`);
    return res.data;
  },

  getClassDetailsWithPagination: async (topicSlug: string, classSlug: string, queryParams: string) => {
    // Check if we have a student token before making the request
    if (!isStudentToken()) {
      clearAuthTokens(); // Clear invalid tokens
      const error = new Error('Access denied. Students only.');
      (error as any).response = { status: 403, data: { error: 'Access denied. Students only.' } };
      throw error;
    }

    const res = await api.get(`/api/students/topics/${topicSlug}/classes/${classSlug}?${queryParams}`);
    return res.data;
  }
};
