// Mock API implementation for demonstration

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    fullName: 'John Admin',
    bio: 'Experienced system administrator with 5+ years of experience in managing enterprise systems and user profiles. Passionate about creating efficient and secure user management solutions.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    lastLogin: '2024-08-05T10:30:00Z',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    fullName: 'Sarah Johnson',
    bio: 'Creative professional with expertise in design and user experience. Always looking for ways to improve digital products and make them more user-friendly.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    joinDate: '2023-03-22',
    lastLogin: '2024-08-05T09:15:00Z',
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

  getUserProfile: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
      fullName: user.fullName,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      phone: user.phone,
      location: user.location,
      joinDate: user.joinDate,
      lastLogin: user.lastLogin,
    };
  },
}; 