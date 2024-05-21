import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { getProductList, increment } from '~/store/reducers/productSlice'

function ProductList() {
  // Get state from store
  const { listProductIds, listProduct, count } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Dispatch action to get product list
    dispatch(getProductList())
  }, [dispatch])

  const handleIncrement = () => {
    dispatch(increment(1))
  }

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
      <h1>Product List</h1>
      <button type="button" style={{ border: '1px solid' }} onClick={handleIncrement}>
        count: {count}
      </button>
      <ul style={{ display: 'flex', alignItems: 'center', gap: '1rem', listStyle: 'none' }}>
        <li>Total: {listProductIds?.length}</li>
        <li>Avaiable: {totalAvailable}</li>
        <li>Sold: {sold}</li>
        <li>Revenue: {revenue}</li>
      </ul>
      <ul>
        {listProductIds.map((id, index) => (
          <li key={id}>
            {index + 1}.{listProduct[id].name} - {listProduct[id].available} -{' '}
            {listProduct[id].sold} - {listProduct[id].categoryId} - {listProduct[id].colorIds}{' '}
            {listProduct[id].price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
