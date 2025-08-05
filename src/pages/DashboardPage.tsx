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
} from '@mui/material';
import { LogoutOutlined, Person, Email, Security } from '@mui/icons-material';
import { logoutUser } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2rem',
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Typography variant="h6" gutterBottom>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role || 'User'} Role
          </Typography>
        </Paper>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {user?.name || 'Not provided'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {user?.email || 'Not provided'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {user?.role || 'User'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to Your Profile Management System
        </Typography>
        <Typography variant="body1" paragraph>
          This is a demo dashboard for the User Profile Management system. 
          You have successfully logged in and can now manage your profile information.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This application demonstrates the use of React with TypeScript, Material UI, 
          Redux Toolkit, Formik with Yup validation, and Axios for API calls.
        </Typography>
      </Paper>
    </Container>
  );
};

export default DashboardPage; 