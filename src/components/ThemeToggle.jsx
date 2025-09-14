import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    // Cycle through: light -> dark -> system -> light...
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('system');
    } else {
      setMode('light');
    }
  };

  const getIcon = () => {
    switch (mode) {
      case 'light':
        return <Brightness7Icon />;
      case 'dark':
        return <Brightness4Icon />;
      case 'system':
        return <SettingsBrightnessIcon />;
      default:
        return <SettingsBrightnessIcon />;
    }
  };

  const getTooltipText = () => {
    switch (mode) {
      case 'light':
        return 'Alternar para modo escuro';
      case 'dark':
        return 'Alternar para modo sistema';
      case 'system':
        return 'Alternar para modo claro';
      default:
        return 'Alternar tema';
    }
  };

  return (
    <Tooltip 
      title={getTooltipText()}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            border: 1,
            borderColor: 'grey.300',
            boxShadow: 2,
          }
        }
      }}
    >
      <IconButton 
        onClick={handleToggle} 
        color="inherit"
        sx={{ ml: 1 }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;