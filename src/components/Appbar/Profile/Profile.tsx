import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Logout from '@mui/icons-material/Logout'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { logout } from '~/store/reducers/authSlice'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const confirmLogout = useConfirm()

  const handleLogout = () => {
    confirmLogout({
      title: 'Logout?',
      description: 'Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
    })
      .then(() => {
        dispatch(logout())
        toast('Logout successfully!!!', {
          position: 'bottom-left',
        })
      })
      .catch(() => {})
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="S"
            src="https://mcdn.coolmate.me/image/February2023/tho-bay-mau-la-ai-nhung-dieu-thu-vi-ve-tho-bay-mau-cute-gay-sot-hien-nay-1194_887.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles',
        }}
      >
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} />Hi! {user.split('@')[0]}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile
