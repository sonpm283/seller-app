import { Box, SvgIcon, Typography, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { ReactComponent as TimeLineIcon } from '~/assets/timeline.svg'
import { ReactComponent as CategoryIcon } from '~/assets/category.svg'
import { ReactComponent as ColorsIcon } from '~/assets/colors.svg'

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  '&.active, &:hover': {
    transition: 'all .2s ease',
    backgroundColor: theme.palette.action.selected,
  },
  display: 'flex',
  width: '100%',
  borderRadius: '5px',
  gap: 5,
}))

const MenuItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  '& + &': {
    marginTop: theme.spacing(1),
  },
}))

export default function Sidebar() {
  return (
    <Box>
      <MenuItem>
        <StyledLink to="/seller/products">
          <SvgIcon component={TimeLineIcon} fontSize="medium" inheritViewBox />
          <Typography variant="body1" pt={0.25} >
            Product
          </Typography>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/seller/categories">
          <SvgIcon component={CategoryIcon} fontSize="medium" inheritViewBox />
          <Typography variant="body1" pt={0.25}>
            Categories
          </Typography>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/seller/color">
          <SvgIcon component={ColorsIcon} fontSize="medium" inheritViewBox />
          <Typography variant="body1" pt={0.25}>
            Colors
          </Typography>
        </StyledLink>
      </MenuItem>
    </Box>
  )
}
