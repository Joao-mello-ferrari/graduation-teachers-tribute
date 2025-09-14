import { createTheme } from '@mui/material/styles';

// Create a theme with both light and dark color schemes
const theme = createTheme({
  // Enable color schemes for automatic light/dark mode support
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#374151', // Dark gray instead of blue
          light: '#6b7280',
          dark: '#1f2937',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#6b7280', // Medium gray
          light: '#9ca3af',
          dark: '#4b5563',
          contrastText: '#ffffff',
        },
        success: {
          main: '#059669',
          light: '#10b981',
          dark: '#047857',
        },
        background: {
          default: '#f9fafb', // Very light neutral gray
          paper: '#ffffff',
        },
        text: {
          primary: '#111827', // Very dark gray
          secondary: '#4b5563',
        },
        grey: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9ca3af', // Light gray for dark mode
          light: '#d1d5db',
          dark: '#6b7280',
          contrastText: '#111827',
        },
        secondary: {
          main: '#6b7280', // Medium gray for dark mode
          light: '#9ca3af',
          dark: '#4b5563',
          contrastText: '#f9fafb',
        },
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        background: {
          default: '#111827', // Very dark gray (almost black)
          paper: '#1f2937', // Dark gray
        },
        text: {
          primary: '#f9fafb', // Almost white
          secondary: '#d1d5db', // Light gray
        },
        grey: {
          50: '#111827',
          100: '#1f2937',
          200: '#374151',
          300: '#4b5563',
          400: '#6b7280',
          500: '#9ca3af',
          600: '#d1d5db',
          700: '#e5e7eb',
          800: '#f3f4f6',
          900: '#f9fafb',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // 8px base spacing unit
  components: {
    // Customize Material UI components
    MuiCard: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          boxShadow: theme.palette.mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
            : '0 2px 8px rgba(17, 24, 39, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 16px rgba(0, 0, 0, 0.4)'
              : '0 4px 16px rgba(17, 24, 39, 0.15)',
            transform: 'translateY(-2px)',
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default background image
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.primary.main,
          color: theme.palette.mode === 'dark'
            ? theme.palette.text.primary
            : theme.palette.primary.contrastText,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiChip-outlined': {
            borderColor: theme.palette.mode === 'dark'
              ? theme.palette.grey[600]
              : theme.palette.grey[300],
          },
        }),
      },
    },
  },
});

export default theme;