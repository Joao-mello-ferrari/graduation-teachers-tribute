import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import VideoCarousel from '../components/VideoCarousel';
import { fetchVideosFromS3 } from '../services/s3Service';
import ThemeToggle from '../components/ThemeToggle';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    pointerEvents: 'none',
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  gap: theme.spacing(2),
}));

function TeacherTribute() {
  const { teacherName } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const videoUrls = await fetchVideosFromS3(teacherName);
        setVideos(videoUrls);
      } catch (err) {
        setError(`Failed to load videos for ${teacherName}`);
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [teacherName]);

  const capitalizedName = teacherName?.charAt(0).toUpperCase() + teacherName?.slice(1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Homenagem C3
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Professores
          </Link>
          <Typography color="text.primary">
            Professor {capitalizedName}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading && (
          <LoadingContainer>
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
              Carregando vídeos de homenagem...
            </Typography>
          </LoadingContainer>
        )}
        
        {error && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {error}
              </Typography>
              <Typography variant="body2">
                Certifique-se de que os vídeos foram enviados para a pasta S3: 
                <br />
                <code>s3://graduation-teachers-tribute/{teacherName}/</code>
              </Typography>
            </Alert>
            <Button
              variant="contained"
              component={RouterLink}
              to="/upload"
              sx={{ mt: 2 }}
            >
              Enviar Vídeos
            </Button>
          </Paper>
        )}
        
        {!loading && !error && videos.length === 0 && (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Nenhum vídeo encontrado para o Professor {capitalizedName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Os vídeos devem ser enviados para: 
              <br />
              <code>s3://graduation-teachers-tribute/{teacherName}/</code>
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/upload"
              size="large"
            >
              Enviar Primeiro Vídeo
            </Button>
          </Paper>
        )}
        
        {!loading && !error && videos.length > 0 && (
          <VideoCarousel videos={videos} teacherName={capitalizedName} />
        )}
      </Container>
    </Box>
  );
}

export default TeacherTribute;