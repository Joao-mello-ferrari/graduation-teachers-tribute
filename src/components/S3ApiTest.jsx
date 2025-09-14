import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  Collapse,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudIcon from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { testS3Connection, getExpectedS3Structure } from '../services/s3Service';

const FloatingCard = styled(Card)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  minWidth: 320,
  maxWidth: 400,
  zIndex: 1000,
  backdropFilter: 'blur(16px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)',
  border: `1px solid ${theme.palette.divider}`,
}));

const StructureBox = styled(Box)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(0, 0, 0, 0.05)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
}));

function S3ApiTest() {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStructure, setShowStructure] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const result = await testS3Connection();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStructure = () => {
    setShowStructure(!showStructure);
  };

  const s3Structure = getExpectedS3Structure();

  return (
    <FloatingCard elevation={8}>
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={1}>
            <CloudIcon color="primary" />
            <Typography variant="h6" component="div">
              Teste AWS S3
            </Typography>
          </Box>

          {/* Test Button */}
          <Button
            variant="contained"
            onClick={handleTest}
            disabled={isLoading}
            startIcon={<CloudIcon />}
            fullWidth
          >
            {isLoading ? 'Testando S3...' : 'Testar Conexão S3'}
          </Button>

          {/* Structure Toggle */}
          <Button
            variant="outlined"
            onClick={toggleStructure}
            endIcon={showStructure ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            fullWidth
            size="small"
          >
            {showStructure ? 'Hide' : 'Show'} S3 Structure
          </Button>

          {/* Test Result */}
          {testResult && (
            <Alert 
              severity={testResult.success ? 'success' : 'error'}
              variant="filled"
            >
              <Typography variant="body2">
                {testResult.message}
              </Typography>
            </Alert>
          )}

          {/* S3 Structure */}
          <Collapse in={showStructure}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Estrutura S3 Esperada:
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <StructureBox>
                {s3Structure.structure.map((item, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2" component="div">
                      {item.path}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      component="div" 
                      color="text.secondary"
                      sx={{ ml: 2 }}
                    >
                      └── {item.example.split('/').pop()}
                    </Typography>
                  </Box>
                ))}
              </StructureBox>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label="Development"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Testing"
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </Collapse>
        </Stack>
      </CardContent>
    </FloatingCard>
  );
}

export default S3ApiTest;