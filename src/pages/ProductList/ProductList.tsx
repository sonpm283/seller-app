import { Box, Button, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import ProductTable from '~/components/ProductTable'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { getCategoryList } from '~/store/reducers/categorySlice'
import { getColorList } from '~/store/reducers/colorsSlice'
import { getProductList } from '~/store/reducers/productSlice'
import { formatCurrency } from '~/utils/fomatter'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

function ProductList() {
  const { listProductIds, listProduct } = useAppSelector((state) => state.products)
  const { listCategory } = useAppSelector((state) => state.categories)
  const { listColor } = useAppSelector((state) => state.colors)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductList())
    dispatch(getCategoryList())
    dispatch(getColorList())
  }, [dispatch])

  // Object.keys(listProduct) or listProductIds
  const tableDataList = listProductIds.map((id) => {
    const convertId = Number(id)
    let colorString = ''

    listProduct[convertId].colorIds?.forEach((color) => {
      colorString += colorString ? ` - ${listColor[color]?.name}` : listColor[color]?.name
    })

    return {
      name: listProduct[convertId].name,
      available: listProduct[convertId].available,
      sold: listProduct[convertId].sold,
      category: listCategory[listProduct[convertId].categoryId]?.name,
      price: formatCurrency(listProduct[convertId].price),
      colors: colorString,
    }
  })

  // Calculate total available, sold, revenue
  const { totalAvailable, sold, revenue } = useMemo(() => {
    return listProductIds.reduce(
      (acc, id) => {
        acc.totalAvailable += listProduct[id].available
        acc.sold += listProduct[id].sold
        acc.revenue += listProduct[id].sold * listProduct[id].price
        return acc
      },
      { totalAvailable: 0, sold: 0, revenue: 0 },
    )
  }, [listProductIds, listProduct])

  return (
    <Box>
      <Typography variant="h3">Product List</Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}
        mb={3}
      >
        <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem', listStyle: 'none' }}>
          <Box>Total: {listProductIds?.length}</Box>
          <Box>Avaiable: {totalAvailable}</Box>
          <Box>Sold: {sold}</Box>
          <Box>Revenue: {formatCurrency(revenue)}</Box>
        </Box>
        <Button variant="outlined" color="success" startIcon={<LibraryAddIcon />}>
          Add
        </Button>
      </Box>
      <ProductTable rows={tableDataList} />
    </Box>
  )
}

export default ProductList
