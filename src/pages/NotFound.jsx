import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFound() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Página não encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        O endereço que você acessou não existe!
      </Typography>
    </Box>
  );
}

export default NotFound;
