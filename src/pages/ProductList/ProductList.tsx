import { Box, Button } from '@mui/material'
import { useEffect, useMemo } from 'react'
import ProductTable from '~/components/ProductTable'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { getCategoryList } from '~/store/reducers/categorySlice'
import { getColorList } from '~/store/reducers/colorsSlice'
import { getProductList } from '~/store/reducers/productSlice'

function ProductList() {
  // Get state from store
  const { listProductIds, listProduct } = useAppSelector((state) => state.products)
  const { listCategory } = useAppSelector((state) => state.categories)
  const { listColor } = useAppSelector((state) => state.colors)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Dispatch action to get product list
    dispatch(getProductList())
    dispatch(getCategoryList())
    dispatch(getColorList())
  }, [dispatch])

  const rows = Object.keys(listProduct).map(id => ({
    name: listProduct[Number(id)].name,
    available: listProduct[Number(id)].available,
    sold: listProduct[Number(id)].sold,
    category: listCategory[listProduct[Number(id)].categoryId]?.name,
    price: listProduct[Number(id)].price,
  }));

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
    <div>
      <h1>Seller</h1>
      <ul style={{ display: 'flex', alignItems: 'center', gap: '1rem', listStyle: 'none' }}>
        <li>Total: {listProductIds?.length}</li>
        <li>Avaiable: {totalAvailable}</li>
        <li>Sold: {sold}</li>
        <li>Revenue: {revenue}</li>
      </ul>
      <ul>
        {listProductIds.map((id, index) => {
          let colorString = ''
          listProduct[id].colorIds?.forEach((color) => {
            colorString += listColor[color]?.name + ' '
          })

          return (
            <li key={id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  {index + 1}. {listProduct[id].name} - {listProduct[id].available} -{' '}
                  {listProduct[id].sold} - {listCategory[listProduct[id].categoryId]?.name} -
                  color::
                  {colorString} {listProduct[id].price}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined" color="error">
                    Remove
                  </Button>
                </Box>
              </Box>
            </li>
          )
        })}
      </ul>

      <ProductTable rows={rows} />
    </div>
  )
}

export default ProductList
