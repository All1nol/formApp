import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api' 
  : process.env.REACT_APP_API_URL; 

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to check if it's being retrieved correctly
    
    // Always attach token if it exists, except for login and register
    if (token && !config.url.includes('/login') && !config.url.includes('/register')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const deleteTemplate = async (templateId) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  return axios.delete(`${baseURL}/templates/${templateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-User-Role': userRole // Add role to headers
    }
  });
};

// Assign the object to a variable
export default {
  // Auth endpoints
  login: (data) => api.post('/users/login', data),
  register: (data) => api.post('/users/register', data),
  getCurrentUser: () => api.get('/users/me'),
  
  // Templates endpoints
  getTemplates: () => api.get('/templates'),
  getTemplateById: (id) => api.get(`/templates/${id}`),
  getPopularTemplates: () => api.get('/templates/popular'),
  createTemplate: (data) => api.post('/templates', data),
  updateTemplate: (id, data) => api.put(`/templates/${id}`, data),
  deleteTemplate: (id) => api.delete(`/templates/${id}`),
  
  // Form submissions endpoints
  submitTemplateForm: async (templateId, data) => {
    console.log('API call:', {
      url: `/templates/${templateId}/submit`,
      data
    });
    return api.post(`/templates/${templateId}/submit`, data);
  },
  getTemplateSubmissions: (templateId) => api.get(`/templates/${templateId}/submissions`),
  getTemplateAggregation: (templateId) => api.get(`/templates/${templateId}/aggregation`),
  
  // Comments endpoints
  addCommentToTemplate: (id, comment) => api.post(`/templates/${id}/comments`, { text: comment }),
  
  //view form
  getFormById: (id) => api.get(`/forms/${id}`),

  // User and Admin endpoints
  getUserTemplates: () => api.get('/users/templates'),
  getUserForms: () => api.get('/users/forms'),
  getUsers: () => api.get('/users/all'),
  blockUser: (userId) => api.patch(`/users/${userId}/block`),
  unblockUser: (userId) => api.patch(`/users/${userId}/unblock`),

  // Ticket endpoints
  createTicket: (data) => api.post('/tickets/create', data),
  getTickets: (page = 1, limit = 10) => 
    api.get(`/tickets?page=${page}&limit=${limit}`),
};
