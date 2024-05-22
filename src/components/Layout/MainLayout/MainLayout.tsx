import { Props } from '~/types/props.type'
import Sidebar from '../components/Sidebar'
import AppBar from '~/components/Appbar/Appbar'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function MainLayout(props: Props) {
  const { children } = props

  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }))

  return (
    <div>
      <AppBar />
      <Grid container sx={{ height: (theme) => theme.sellerApp.boardContentHeight, minWidth: '1200px' }}>
        <Grid item sx={{ borderRight: '2px solid #dcdfe4', width: '200px'}}>
          <Item sx={{ height: '100%' }}>
            <Sidebar />
          </Item>
        </Grid>
        <Grid item xs>
          <Item sx={{ height: '100%' }}>{children}</Item>
        </Grid>
      </Grid>
    </div>
  )
}
