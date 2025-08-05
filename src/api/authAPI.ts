// Mock API base URL - in a real app, this would be your backend URL
const API_BASE_URL = 'https://api.example.com';

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
  },
];

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Return mock response
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    };
  },
  
  logout: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Logged out successfully' };
  },
  
  getCurrentUser: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    // Mock user data based on token
    const userId = token.includes('1') ? 1 : 2;
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },
}; 