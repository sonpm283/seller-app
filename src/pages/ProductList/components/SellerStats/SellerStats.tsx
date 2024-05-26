import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import CustomCreatePostButton from '~/components/MuiCustom/custom-create-product-button'
import { useAppSelector } from '~/hooks/useTypeSelector'
import { formatCurrency } from '~/utils/fomatters'

const Statistical = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '5px 20px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(81 81 81)' : '#f3f3f3',
  borderRadius: '5px',
}))

interface Statis {
  totalAvailable: number
  sold: number
  revenue: number
}

interface StatisProps {
  statis: Statis
}

export default function SellerStats({ statis }: StatisProps) {
  const { listProductIds } = useAppSelector((state) => state.products)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }} mb={3}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: 30, listStyle: 'none' }}>
        <Statistical sx={{}}>
          <Typography variant="h6">Total</Typography>
          {listProductIds?.length}
        </Statistical>
        <Statistical>
          <Typography variant="h6">Avaiable</Typography>
          {statis.totalAvailable}
        </Statistical>
        <Statistical>
          <Typography variant="h6">Sold</Typography>
          {statis.sold}
        </Statistical>
        <Statistical>
          <Typography variant="h6">Revenue</Typography>
          {formatCurrency(statis.revenue)}
        </Statistical>
      </Box>

      <CustomCreatePostButton title='Add' />
    </Box>
  )
}
