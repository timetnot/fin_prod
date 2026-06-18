import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function apiClient(endpoint: string, options?: RequestInit, retries: number = MAX_RETRIES) {
  let token = null;
  
  // Get token from cookies only in browser environment
  // Skip token for auth endpoints (login, register)
  const isAuthEndpoint = endpoint.startsWith('/auth/login') || endpoint.startsWith('/auth/register');
  
  if (typeof window !== 'undefined' && !isAuthEndpoint) {
    token = Cookies.get('token');
  }
  
  // Add timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: any = {};
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        }
      } catch (e) {
        // If JSON parsing fails, use empty object
      }
      
      // Handle 401 Unauthorized errors specifically
      if (response.status === 401) {
        // Clear token and user from cookies
        if (typeof window !== 'undefined') {
          Cookies.remove('token');
          Cookies.remove('user');
          // Redirect to login page
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        throw new ApiError('Необходимо войти в систему', 401, 'UNAUTHORIZED');
      }
      
      // Handle 403 Forbidden errors
      if (response.status === 403) {
        throw new ApiError('Нет доступа к этому ресурсу', 403, 'FORBIDDEN');
      }
      
      // Handle 404 Not Found errors
      if (response.status === 404) {
        throw new ApiError('Ресурс не найден', 404, 'NOT_FOUND');
      }
      
      // Handle 500 Internal Server Error
      if (response.status === 500) {
        throw new ApiError('Внутренняя ошибка сервера', 500, 'INTERNAL_ERROR');
      }
      
      // Handle 429 Too Many Requests
      if (response.status === 429) {
        throw new ApiError('Слишком много запросов. Попробуйте позже', 429, 'TOO_MANY_REQUESTS');
      }
      
      throw new ApiError(
        errorData.message || `Ошибка API: ${response.status}`,
        response.status,
        errorData.code,
        errorData
      );
    }

    // Handle successful response
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      // If not JSON, return text or empty object
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (e) {
      // If parsing fails, return empty object
      return {};
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Handle network errors
    if (error.name === 'AbortError') {
      throw new ApiError('Превышено время ожидания запроса', 408, 'TIMEOUT');
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      // Retry on network errors
      if (retries > 0) {
        await sleep(RETRY_DELAY);
        return apiClient(endpoint, options, retries - 1);
      }
      throw new ApiError('Ошибка соединения с сервером', 0, 'NETWORK_ERROR');
    }
    
    // Re-throw ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Generic error
    throw new ApiError('Неизвестная ошибка', 0, 'UNKNOWN_ERROR', error);
  }
}

export const api = {
  get: (endpoint: string) => apiClient(endpoint),
  
  post: (endpoint: string, data: any) => 
    apiClient(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any) => 
    apiClient(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  patch: (endpoint: string, data: any) => 
    apiClient(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string) => 
    apiClient(endpoint, {
      method: 'DELETE',
    }),
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
  create: (data: any) => api.post('/categories', data),
  update: (id: string, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export const notificationsApi = {
  getAll: () => api.get('/notifications'),
  checkUpcomingPayments: () => api.post('/notifications/check-payments', {}),
  markAsRead: (id: string) => api.post(`/notifications/${id}/read`, {}),
  markAllAsRead: () => api.post('/notifications/read-all', {}),
  delete: (id: string) => api.delete(`/notifications/${id}`),
};
