import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
// import { ReactComponent as Vite } from '~/assets/loading.svg'
// import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: '1200px',
        height: (theme) => theme.sellerApp.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#16a085'),
      }}
    >
      <Box
        sx={{
          width: '284px',
          borderRight: (theme) => `2px solid ${theme.palette.grey[400]}`,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* <SvgIcon component={Vite} fontSize="small" inheritViewBox sx={{ color: 'white' }} /> */}
          <Typography
            variant="body1"
            sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
          >
            Sellerapp
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} ml={2}>
        <TextField
          id="outlined-search"
          label="Find Anything..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  fontSize="small"
                  sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: '300px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />

        <Box sx={{ marginLeft: 'auto' }}>
          <ModeSelect />
        </Box>

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default AppBar
