import { Box, SvgIcon, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { ReactComponent as TimeLineIcon } from '~/assets/timeline.svg'
import { ReactComponent as CategoryIcon } from '~/assets/category.svg'
import { ReactComponent as ColorsIcon } from '~/assets/colors.svg'

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  '&.active': {
    backgroundColor: theme.palette.action.selected,
  },
  display: 'flex',
  width: '100%',
  borderRadius: '5px',
  gap: 5,
}))

export default function Sidebar() {
  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StyledLink to="/seller/products">
            <SvgIcon component={TimeLineIcon} fontSize="medium" inheritViewBox />
            Product
          </StyledLink>
        </Box>
      </Box>
      <Box>
        <StyledLink to="/seller/categories">
          <SvgIcon component={CategoryIcon} fontSize="medium" inheritViewBox />
          Categories
        </StyledLink>
      </Box>
      <Box>
        <StyledLink to="/seller/colors">
          <SvgIcon component={ColorsIcon} fontSize="medium" inheritViewBox />
          Colors
        </StyledLink>
      </Box>
    </Box>
  )
}
