import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import { uploadVideoToS3 } from '../services/s3Service';
import ThemeToggle from '../components/ThemeToggle';

const TEACHERS = [
  { name: 'cleo', displayName: 'Prof. Cleo' },
  { name: 'pedro', displayName: 'Prof. Pedro' },
  { name: 'dalmazo', displayName: 'Prof. Dalmazo' },
  { name: 'bicho', displayName: 'Prof. Bicho' },
  { name: 'vitor', displayName: 'Prof. Vitor' },
  { name: 'berri', displayName: 'Prof. Berri' },
  { name: 'andre', displayName: 'Prof. André' },
  { name: 'schvittz', displayName: 'Prof. Schvittz' }
];

const UploadArea = styled(Paper)(({ theme, isDragOver, hasFile }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: isDragOver ? theme.palette.action.hover : 'transparent',
  transition: 'all 0.3s ease',
  cursor: hasFile ? 'default' : 'pointer',
  '&:hover': {
    borderColor: hasFile ? theme.palette.divider : theme.palette.primary.main,
    backgroundColor: hasFile ? 'transparent' : theme.palette.action.hover,
  },
}));

const FileCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const HiddenInput = styled('input')({
  display: 'none',
});

function UploadPage() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizePerc, setSizePerc] = useState(1);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) {
      setError('Nenhum arquivo selecionado');
      return;
    }
    
    if (!file.type.startsWith('video/')) {
      setError('Por favor, selecione um arquivo de vídeo válido');
      return;
    }
    
    // Check file size (30MB limit)
    const maxSize = 300 * 1024 * 1024; // 30MB in bytes
    if (file.size > maxSize) {
      setError('O arquivo é muito grande. O tamanho máximo permitido é 300MB (aproximadamente 3 minutos)');
      setSizePerc(1);
      return;
    }
    
    setSelectedFile(file);
    setError(null);
    setSizePerc(file.size / maxSize)
  };

    const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedTeacher) {
      setError('Por favor, selecione um professor e um arquivo de vídeo');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    setUploadResult(null);

    const delay = 400 * sizePerc;
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 100) return prev + 1;
          return prev;
        });
      }, delay);

      const result = await uploadVideoToS3(selectedFile, selectedTeacher);
      
      await new Promise((res)=>{
        const progressInterval2 = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 100) return prev + 1;
          if (prev >= 100) {
            clearInterval(progressInterval2);
            res();
          }
          return prev;
        });
      }, 10);
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setUploadResult(result);
      
      // Don't auto-reset - let user manually clear

    } catch (err) {
      setError(err.message);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSelectedTeacher('');
    setError(null);
    setUploadResult(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

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
            Enviar Vídeo de Homenagem
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 4 }}>
          <VideoLibraryIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Enviar Vídeo de Homenagem
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Compartilhe uma mensagem especial para um dos nossos professores incríveis
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4 }}>
          {/* Teacher Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="teacher-select-label">Selecionar Professor</InputLabel>
            <Select
              labelId="teacher-select-label"
              value={selectedTeacher}
              label="Selecionar Professor"
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              {TEACHERS.map(teacher => (
                <MenuItem key={teacher.name} value={teacher.name}>
                  {teacher.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* File Upload Area */}
          <UploadArea
            isDragOver={dragOver}
            hasFile={!!selectedFile}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !selectedFile && document.getElementById('file-input')?.click()}
          >
            {selectedFile ? (
              <FileCard elevation={1}>
                <VideoLibraryIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                  <Typography variant="h6">{selectedFile.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(selectedFile.size)}
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </FileCard>
            ) : (
              <Box>
                <CloudUploadIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Arraste e solte seu vídeo aqui
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  ou
                </Typography>
                <Button variant="outlined" onClick={handleFileButtonClick} size="large">
                  Escolher Arquivo
                </Button>
                <HiddenInput
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Formatos suportados: MP4, MOV, AVI, etc.
                </Typography>
              </Box>
            )}
          </UploadArea>

          {/* Upload Progress */}
          {uploading && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" gutterBottom>
                Enviando... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
          )}

          {/* Upload Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleUpload}
            disabled={!selectedFile || !selectedTeacher || uploading}
            sx={{ mt: 3, py: 1.5 }}
            startIcon={uploading ? undefined : <CloudUploadIcon />}
          >
            {uploading ? 'Enviando...' : 'Enviar Vídeo'}
          </Button>

          {/* Success Message */}
          {uploadResult && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{ mt: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Upload Realizado com Sucesso!
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Seu vídeo de homenagem para <strong>{TEACHERS.find(t => t.name === uploadResult.teacher)?.displayName}</strong> foi enviado com sucesso.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip label={`Arquivo: ${uploadResult.fileName}`} size="small" />
                <Chip 
                  label="Baixar Vídeo" 
                  size="small" 
                  clickable 
                  component="a" 
                  href={uploadResult.url} 
                  target="_blank" 
                />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={resetForm}
                >
                  Enviar Outro Vídeo
                </Button>
              </Stack>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              action={
                <Button color="inherit" size="small" onClick={resetForm}>
                  Tentar Novamente
                </Button>
              }
              sx={{ mt: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Upload Falhou
              </Typography>
              <Typography variant="body1">{error}</Typography>
            </Alert>
          )}
        </Paper>

        {/* Footer Tips */}
        <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            💡 Dicas de Upload
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            <Typography variant="body2">
              • Mantenha seu vídeo abaixo de 300MB (aproximadamente 2 minutos) para uploads mais rápidos
            </Typography>
            <Typography variant="body2">
              • Sua homenagem será adicionada à página do professor automaticamente
            </Typography>
            <Typography variant="body2">
              • Formatos suportados: MP4, MOV, AVI e a maioria dos formatos de vídeo
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default UploadPage;
