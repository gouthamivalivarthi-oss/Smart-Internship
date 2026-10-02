import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't auto-redirect if trying to login/register
      const isAuthUrl = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthUrl) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  uploadResume: (formData) => api.post('/auth/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export const internshipApi = {
  getAll: (params) => api.get('/internships', { params }),
  getFeatured: () => api.get('/internships/featured'),
  getById: (id) => api.get(`/internships/${id}`),
  create: (data) => api.post('/internships', data),
  update: (id, data) => api.put(`/internships/${id}`, data),
  delete: (id) => api.delete(`/internships/${id}`)
};

export const applicationApi = {
  getAll: (params) => api.get('/applications', { params }),
  getById: (id) => api.get(`/applications/${id}`),
  create: (data) => api.post('/applications', data),
  updateStatus: (id, status, note) => api.patch(`/applications/${id}/status`, { status, note }),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`)
};

export const aiApi = {
  analyzeResume: (resumeText) => api.post('/ai/analyze-resume', { resumeText }),
  matchInternship: (internshipId, customInternship) => api.post('/ai/match-internship', { internshipId, customInternship }),
  getSkillGap: (targetRole) => api.post('/ai/skill-gap', { targetRole }),
  generateInterviewQuestions: (data) => api.post('/ai/interview-questions', data),
  generateCoverLetter: (data) => api.post('/ai/generate-cover-letter', data),
  getRecommendations: () => api.get('/ai/recommendations')
};

export const interviewApi = {
  getAll: () => api.get('/interviews'),
  create: (data) => api.post('/interviews', data),
  update: (id, data) => api.put(`/interviews/${id}`, data),
  delete: (id) => api.delete(`/interviews/${id}`),
  generateQuestions: (id) => api.post(`/interviews/${id}/generate-questions`)
};

export const analyticsApi = {
  getStudent: () => api.get('/analytics/student'),
  getAdmin: () => api.get('/analytics/admin')
};

export const notificationApi = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`)
};

export default api;
