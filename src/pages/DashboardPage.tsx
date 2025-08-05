import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  LogoutOutlined,
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  AccessTime,
  Edit,
} from '@mui/icons-material';
import { logoutUser, fetchUserProfile } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, profile, isAuthenticated, profileLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fetch user profile when component mounts
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {profile?.fullName || user?.name || 'User'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's your profile information and account details
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Profile Card */}
        <Paper sx={{ p: 3, textAlign: 'center', height: 'fit-content' }}>
          {profileLoading ? (
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto', mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 1 }} />
              <Skeleton variant="text" width="40%" sx={{ mx: 'auto' }} />
            </Box>
          ) : (
            <>
              <Avatar
                src={profile?.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  border: 3,
                  borderColor: 'primary.main',
                }}
              >
                {profile?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {profile?.fullName || user?.name || 'User'}
              </Typography>
              <Chip
                label={profile?.role || 'User'}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                {profile?.bio || 'No bio available'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                size="small"
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Paper>

        {/* Profile Details */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            
            {profileLoading ? (
              <Box>
                {[...Array(6)].map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {profile?.fullName || 'Not provided'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1">
                      {profile?.email || 'Not provided'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1">
                      {profile?.phone || 'Not provided'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {profile?.location || 'Not provided'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Member Since
                    </Typography>
                    <Typography variant="body1">
                      {profile?.joinDate ? formatDate(profile.joinDate) : 'Not available'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Last Login
                    </Typography>
                    <Typography variant="body1">
                      {profile?.lastLogin ? formatDateTime(profile.lastLogin) : 'Not available'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Account Summary */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Account Summary
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your User Profile Management dashboard! This system demonstrates the use of 
          React with TypeScript, Material UI, Redux Toolkit, and modern web development practices.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your profile data is securely managed and can be updated at any time. The system includes 
          features like dark mode toggle, responsive design, and real-time data synchronization.
        </Typography>
      </Paper>
    </Container>
  );
};

export default DashboardPage; 