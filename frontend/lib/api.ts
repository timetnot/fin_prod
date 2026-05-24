import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiClient(endpoint: string, options?: RequestInit) {
  let token = null;
  
  // Get token from cookies only in browser environment
  // Skip token for auth endpoints (login, register)
  const isAuthEndpoint = endpoint.startsWith('/auth/login') || endpoint.startsWith('/auth/register');
  
  if (typeof window !== 'undefined' && !isAuthEndpoint) {
    token = Cookies.get('token');
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Handle 401 Unauthorized errors specifically
    if (response.status === 401) {
      // Clear token and user from cookies
      if (typeof window !== 'undefined') {
        Cookies.remove('token');
        Cookies.remove('user');
      }
      throw new Error('Необходимо войти в систему');
    }
    
    throw new Error(errorData.message || `Ошибка API: ${response.status}`);
  }

  return response.json();
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
