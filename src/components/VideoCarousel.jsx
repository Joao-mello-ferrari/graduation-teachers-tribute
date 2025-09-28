import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Chip,
  Paper,
  MobileStepper,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const VideoContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
}));

const StyledVideo = styled('video')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: theme.palette.background.default,
  zIndex: 1, // Ensure video controls are accessible
}));

const NavigationOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  pointerEvents: 'none', // Allow clicks to pass through to video
  zIndex: 2,
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  pointerEvents: 'auto', // Re-enable clicks for buttons only
  opacity: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.1)',
  },
  // Show buttons on container hover
  '.video-container:hover &': {
    opacity: 1,
  },
}));

function VideoCarousel({ videos, teacherName }) {
  const theme = useTheme();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
    setVideoError(null);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    setVideoError(null);
  };

  const goToVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    setVideoError(null);
  };

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
    setVideoError('Falha ao carregar o vídeo. O arquivo pode estar corrompido ou inacessível.');
  };

  useEffect(() => {
    setCurrentVideoIndex(0);
    setIsPlaying(false);
    setVideoError(null);
  }, [videos]);

  if (!videos || videos.length === 0) {
    return (
      <Card sx={{ p: 4, textAlign: 'center' }}>
        <VideoLibraryIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Nenhum vídeo disponível
        </Typography>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Assista nossos vídeos de agradecimento!
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Chip
              label={`Vídeo ${currentVideoIndex + 1} de ${videos.length}`}
              color="primary"
              variant="outlined"
            />
            {videos.length > 1 && (
              <Chip
                label={`${videos.length} homenagem${videos.length > 1 ? 'ns' : ''}`}
                color="secondary"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>

        {/* Video Container */}
        <VideoContainer elevation={4} className="video-container">
          {videoError ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                bgcolor: 'grey.100',
                color: 'error.main',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2">{videoError}</Typography>
            </Box>
          ) : (
            <StyledVideo
              key={currentVideoIndex} // Force re-render when video changes
              src={videos[currentVideoIndex]}
              title={`Tribute video ${currentVideoIndex + 1} for ${teacherName}`}
              controls
              preload="metadata"
              onLoadStart={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={handleVideoError}
            >
              Your browser does not support the video tag.
              <a href={videos[currentVideoIndex]} target="_blank" rel="noopener noreferrer">
                Download video
              </a>
            </StyledVideo>
          )}

          {/* Navigation Controls - Only show if multiple videos */}
          {videos.length > 1 && (
            <NavigationOverlay>
              <NavButton
                onClick={prevVideo}
                aria-label="Previous video"
                size="large"
              >
                <SkipPreviousIcon fontSize="large" />
              </NavButton>

              <NavButton
                onClick={nextVideo}
                aria-label="Next video"
                size="large"
              >
                <SkipNextIcon fontSize="large" />
              </NavButton>
            </NavigationOverlay>
          )}
        </VideoContainer>

        {/* Video Navigation */}
        {videos.length > 1 && (
          <Box sx={{ mt: 2 }}>
            <MobileStepper
              variant="dots"
              steps={videos.length}
              position="static"
              activeStep={currentVideoIndex}
              sx={{
                maxWidth: 400,
                flexGrow: 1,
                mx: 'auto',
                backgroundColor: 'transparent',
              }}
              nextButton={
                <IconButton
                  size="small"
                  onClick={nextVideo}
                  disabled={false}
                >
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
              }
              backButton={
                <IconButton
                  size="small"
                  onClick={prevVideo}
                  disabled={false}
                >
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </IconButton>
              }
            />
          </Box>
        )}

        {/* Video Grid Navigation for multiple videos */}
        {videos.length > 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom textAlign="center">
              Ir para o vídeo:
            </Typography>
            <Stack 
              direction="row" 
              spacing={1} 
              flexWrap="wrap" 
              justifyContent="center"
              sx={{ maxHeight: 100, overflow: 'auto' }}
            >
              {videos.map((_, index) => (
                <Chip
                  key={index}
                  label={index + 1}
                  variant={index === currentVideoIndex ? "filled" : "outlined"}
                  color={index === currentVideoIndex ? "primary" : "default"}
                  onClick={() => goToVideo(index)}
                  sx={{ 
                    cursor: 'pointer',
                    minWidth: 32,
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default VideoCarousel;