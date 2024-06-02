import { Box, CircularProgress, Typography } from '@mui/material'

interface PageLoadingSpinnerProps {
  caption: string
}

function PageLoadingSpinner({ caption }: PageLoadingSpinnerProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        gap: 2,
        width: '100vw',
        height: '100vh',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#16a085'),
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
