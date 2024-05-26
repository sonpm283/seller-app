import { Box, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import ProductTable from '~/components/ProductTable'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { getCategoryList } from '~/store/reducers/categorySlice'
import { getColorList } from '~/store/reducers/colorsSlice'
import { getProductList } from '~/store/reducers/productSlice'
import { capitalizeFirstLetter, formatCurrency } from '~/utils/fomatters'
import SellerStats from './components/SellerStats/SellerStats'

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
    let colorString = ''

    listProduct[id]?.colorIds?.forEach((color) => {
      colorString += colorString
        ? ` - ${capitalizeFirstLetter(listColor[color]?.name)}`
        : capitalizeFirstLetter(listColor[color]?.name)
    })

    return {
      id: id,
      name: listProduct[id].name,
      available: listProduct[id].available,
      sold: listProduct[id].sold,
      category: listCategory[listProduct[id].categoryId]?.name,
      price: formatCurrency(listProduct[id].price),
      colors: colorString,
    }
  })

  // Calculate total available, sold, revenue
  const statis = useMemo(() => {
    return listProductIds.reduce(
      (acc, id) => {
        acc.totalAvailable += Number(listProduct[id].available)
        acc.sold += Number(listProduct[id].sold)
        acc.revenue += Number(listProduct[id].sold * listProduct[id].price)
        return acc
      },
      { totalAvailable: 0, sold: 0, revenue: 0 },
    )
  }, [listProductIds, listProduct])

  return (
    <Box>
      <Typography variant="h3">Seller</Typography>
      <SellerStats statis={statis} />
      <ProductTable rows={tableDataList} />
    </Box>
  )
}

export default ProductList
