// Centralized API configuration and utilities

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Mock API responses for development
export const MOCK_MODE = true;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/v1/auth/login',
  REGISTER: '/api/v1/auth/register',
  REFRESH: '/api/v1/auth/refresh',
  
  // Courses
  COURSES: '/api/v1/courses',
  COURSE_DETAIL: (id: number) => `/api/v1/courses/${id}`,
  
  // Enrollments
  ENROLLMENTS: '/api/v1/enrollments',
  ENROLL: '/api/v1/enrollments',
  UNENROLL: '/api/v1/enrollments',
  
  // Exercises
  EXERCISES: '/api/v1/exercises',
  EXERCISE_DETAIL: (id: number) => `/api/v1/exercises/${id}`,
  START_ATTEMPT: (id: number) => `/api/v1/exercises/${id}/attempts/start`,
  GET_ATTEMPT: (exerciseId: number, attemptId: number) => `/api/v1/exercises/${exerciseId}/attempts/${attemptId}`,
  SUBMIT_ATTEMPT: (exerciseId: number, attemptId: number) => `/api/v1/exercises/${exerciseId}/attempts/${attemptId}/submit`,
  
  // Community
  COMMUNITY_POSTS: '/api/v1/community/posts',
  COMMUNITY_POST_DETAIL: (id: number) => `/api/v1/community/posts/${id}`,
  COMMUNITY_COMMENTS: (postId: number) => `/api/v1/community/posts/${postId}/comments`,
  COMMUNITY_LIKE: (postId: number) => `/api/v1/community/posts/${postId}/like`,
  
  // Chat
  CHAT_SESSIONS: '/api/v1/chat/sessions',
  CHAT_MESSAGES: (sessionId: string) => `/api/v1/chat/sessions/${sessionId}/messages`,
  
  // Upload
  UPLOAD: '/api/v1/upload',
  
  // Analytics
  ANALYTICS: '/api/v1/analytics',
};

export function getFullUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

export function handleApiError(error: any): string {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.message) {
    return error.message;
  }
  return 'Đã xảy ra lỗi. Vui lòng thử lại.';
}

