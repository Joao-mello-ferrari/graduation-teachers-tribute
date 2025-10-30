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
import { getTributeMessage } from '../constants';

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

// Interactive buttons component with confetti and runaway No button
function InteractiveButtons() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasClickedYes, setHasClickedYes] = useState(false);

  const handleYesClick = () => {
    setHasClickedYes(true);
    setShowConfetti(true);
    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleNoHover = () => {
    if (hasClickedYes) return; // Don't move if already clicked Yes
    
    // Generate random position within reasonable bounds
    const maxX = window.innerWidth > 800 ? 250 : 150;
    const maxY = window.innerWidth > 800 ? 150 : 75;
    
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    alert("Resposta errada!!");
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '80px' }}>
      {/* Confetti Effect */}
      {showConfetti && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            '&::before': {
              content: '"🎉"',
              position: 'absolute',
              top: '20%',
              left: '10%',
              fontSize: '2rem',
              animation: 'confetti-fall 3s ease-out forwards',
            },
            '&::after': {
              content: '"🎊"',
              position: 'absolute',
              top: '20%',
              right: '10%',
              fontSize: '2rem',
              animation: 'confetti-fall 3s ease-out forwards 0.5s',
            },
            '@keyframes confetti-fall': {
              '0%': {
                transform: 'translateY(-100px) rotate(0deg)',
                opacity: 1,
              },
              '100%': {
                transform: 'translateY(200px) rotate(360deg)',
                opacity: 0,
              },
            },
          }}
        >
          {/* Additional confetti elements */}
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '10%',
                left: `${10 + i * 10}%`,
                fontSize: '1.5rem',
                animation: `confetti-fall 3s ease-out forwards ${i * 0.2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '🌟'][i % 4]}
            </Box>
          ))}
        </Box>
      )}
      
      {/* Success Message */}
      {hasClickedYes && (
        <Typography
          variant="h6"
          sx={{
            color: 'success.main',
            fontWeight: 600,
            mb: 2,
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          🎉 Obrigado por aceitar nossa homenagem! 🎉
        </Typography>
      )}
      
      {/* Interactive Buttons */}
      {!hasClickedYes && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleYesClick}
            sx={{
              backgroundColor: 'success.main',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'success.dark',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Sim! 😊
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onMouseEnter={handleNoHover}
            onFocus={handleNoHover}
            onClick={handleNoClick}
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              position: 'relative',
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.3s ease-out',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: 'error.main',
                color: 'white',
              },
            }}
          >
            Não 😢
          </Button>
        </Box>
      )}
    </Box>
  );
}

function TeacherTribute() {
  const { teacherName } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const normalizedTeacherName = teacherName
          .normalize("NFD") // decompose accented characters into base + diacritic
          .replace(/[\u0300-\u036f]/g, ""); // remove all diacritics

        const videoUrls = await fetchVideosFromS3(normalizedTeacherName);
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
           { import.meta.env.VITE_LIVE_MODE === 'false' && (
            <IconButton
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Homenagem C3
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      { import.meta.env.VITE_LIVE_MODE === 'false' && (
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
      )}
      
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
          <Box>
            {/* Tribute Message Section */}
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.05) 0%, rgba(107, 114, 128, 0.05) 100%)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                {getTributeMessage(teacherName).title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.primary',
                  whiteSpace: 'pre-line',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4
                }}
              >
                {getTributeMessage(teacherName).message}
              </Typography>

              <InteractiveButtons />

              {/* Animated Down Arrow */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: -4 }}>
                <Box
                  sx={{
                    animation: 'bounce 1.5s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(12px)' }
                    }
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L6 10H18L12 16Z" fill="#6b7280"/>
                  </svg>
                </Box>
              </Box>
              {/* Contact Information */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '1.2rem'
                }}
              >
                <strong style={{ borderRadius: '4px', padding: '8px 12px', backgroundColor: '#34a482ff' }}>ATENÇÃO !!!</strong> Nos avise que recebeu o convite e tire dúvidas clicando neste {' '}
                <Link 
                  href="https://wa.me/5553997074859?text=Claro%20que%20eu%20aceito !!!"
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  WhatsApp !!!
                </Link>
              </Typography>
            </Paper>

            {/* Animated Down Arrow */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: -4 }}>
                <Box
                  sx={{
                    animation: 'bounce 1.5s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(12px)' }
                    }
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L6 10H18L12 16Z" fill="#6b7280"/>
                  </svg>
                </Box>
              </Box>
            
            {/* Video Carousel */}
            <VideoCarousel videos={videos} teacherName={capitalizedName} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default TeacherTribute;
