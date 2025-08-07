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
    email: 'jane@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    fullName: 'Jane Doe',
    bio: 'Frontend dev from Manila',
    avatar: 'https://i.pravatar.cc/150?img=3',
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
      token: `mock-jwt-token-user-${user.id}-${Date.now()}`,
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
    const userIdMatch = token.match(/mock-jwt-token-user-(\d+)/);
    const userId = userIdMatch ? parseInt(userIdMatch[1]) : 1;
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
    const userIdMatch = token.match(/mock-jwt-token-user-(\d+)/);
    const userId = userIdMatch ? parseInt(userIdMatch[1]) : 1;
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

  updateUserProfile: async (profileData: {
    fullName: string;
    email: string;
    bio: string;
    avatar: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userIdMatch = token.match(/mock-jwt-token-user-(\d+)/);
    const userId = userIdMatch ? parseInt(userIdMatch[1]) : 1;
    const userIndex = mockUsers.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...profileData,
    };

    mockUsers[userIndex] = updatedUser;

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone,
        location: updatedUser.location,
        joinDate: updatedUser.joinDate,
        lastLogin: updatedUser.lastLogin,
      },
    };
  },
}; 