import api from '@/lib/api';

export const studentProfileService = {
  getProfile: async () => {
    const res = await api.get('http://localhost:5000/api/students/profile');
    return res.data;
  },
  
  getProfileByUsername: async (username: string) => {
    try {
      const res = await api.get(`http://localhost:5000/api/students/profile/${username}`);
      return res.data;
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      // If network error or server not available, throw a more descriptive error
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Unable to connect to server. Please check if backend is running.');
      }
      throw error;
    }
  },
  
  updateProfileImage: async (file: File) => {
    try {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit');
      }

      const formData = new FormData();
      formData.append('file', file); // Backend middleware expects field name 'file'
      
      
      const res = await api.post('http://localhost:5000/api/students/profile-image', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return res.data;
    } catch (error: any) {
      console.error('Profile image upload error:', error);
      throw error;
    }
  },

  deleteProfileImage: async () => {
    try {
      
      const res = await api.delete('http://localhost:5000/api/students/profile-image', {
        withCredentials: true
      });
      
      return res.data;
    } catch (error: any) {
      console.error('Profile image delete error:', error);
      throw error;
    }
  },

  updateProfileDetails: async (data: any) => {
    // Assuming a PUT /api/students/profile exists, or we might need to check backend
    const res = await api.put('http://localhost:5000/api/students/profile', data);
    return res.data;
  }
};
