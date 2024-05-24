import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'

function LoginForm() {
  return (
    <form>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380 }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              color: (theme) => theme.palette.grey[500],
            }}
          >
            Sign up
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField autoFocus fullWidth label="Enter Email..." type="text" variant="outlined" />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField fullWidth label="Enter Password..." type="password" variant="outlined" />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 2em 1em' }}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Login
            </Button>
          </CardActions>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
