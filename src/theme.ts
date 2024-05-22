// import { blue, blueGrey, pink, red } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '60px'
const CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT})`

declare module '@mui/material/styles' {
  interface Theme {
    sellerApp: {
      appBarHeight: string
      boardContentHeight: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    sellerApp?: {
      appBarHeight: string
      boardContentHeight: string
    }
  }
}

// Create a theme instance.
const theme = extendTheme({
  sellerApp: {
    appBarHeight: APP_BAR_HEIGHT,
    boardContentHeight: CONTENT_HEIGHT,
  },

  // using default theme
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: pink[700],
        // },
      },
    },
    dark: {
      palette: {
        // primary: {
        //   main: pink[400],
        // },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem' },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' },
        },
      },
    },
  },
})

export default theme
