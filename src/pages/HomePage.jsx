import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Paper,
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import ThemeToggle from '../components/ThemeToggle';
import S3ApiTest from '../components/S3ApiTest';

const teachers = [
  'Cleo',
  'Pedro', 
  'Dalmazo',
  'Bicho',
  'Vitor',
  'Berri',
  'André',
  'Schvittz'
];


const TeacherCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar with Theme Toggle */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Homenagem C3
          </Typography>
          { import.meta.env.VITE_LIVE_MODE === 'false' && (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/upload"
              sx={{ mr: 1 }}
            >
              Enviar Vídeo
            </Button>
          )}
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Teachers Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
          Nossos Queridos Professores
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: 'center', margin: '0 auto' }}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={teacher}>
              <TeacherCard>
                <CardActionArea component={RouterLink} to={`/teacher/${teacher.toLowerCase()}`}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {teacher}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Clique para ver vídeos de homenagem
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </TeacherCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* S3 Test Section - Only show in development */}
      {import.meta.env.VITE_ENV === 'development' && (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Teste de Upload
            </Typography>
            <S3ApiTest />
          </Paper>
        </Container>
      )}
    </Box>
  );
}

export default HomePage;