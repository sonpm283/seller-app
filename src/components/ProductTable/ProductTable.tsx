import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Paper from '@mui/material/Paper'
import { Box, Button, Pagination } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useAppDispatch } from '~/hooks/useTypeSelector'
import { deleteProduct, setEditingProduct } from '~/store/reducers/productSlice'
import { toast } from 'react-toastify'
import CustomCreatePostButton from '../MuiCustom/custom-create-product-button'

interface ProductData {
  id: string
  name: string
  available: number
  sold: number
  category: string
  price: string
  colors: string
}

interface DataTableProps<T> {
  rows: Array<T>
}

const tableTileList = ['No', 'Name', 'Avaliable', 'Sold', 'Category', 'Colors', 'Price', 'Action']

export default function ProductTable({ rows }: DataTableProps<ProductData>) {
  const confirmDeleteColumn = useConfirm()
  const dispatch = useAppDispatch()
  const handleDeleteProduct = (productId: string) => {
    confirmDeleteColumn({
      title: 'Delete Product?',
      description: 'This action will permanently delete your Product! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
    })
      .then(() => {
        dispatch(deleteProduct(productId))
        toast('Delete product successfully!!!', {
          position: 'bottom-left',
        })
      })
      .catch(() => {})
  }

  const handleUpdatePost = (id: string) => {
    dispatch(setEditingProduct(id))
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableTileList &&
                tableTileList.map((title) => (
                  <TableCell key={title} align={title == 'Action' ? 'center' : 'left'}>
                    {title}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.available}</TableCell>
                <TableCell align="left">{row.sold}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.colors}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <CustomCreatePostButton
                      onUpdatePost={() => handleUpdatePost(row.id)}
                      title="Edit"
                      icon={<EditIcon />}
                    />
                    <Button
                      onClick={() => handleDeleteProduct(row.id)}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} sx={{ float: 'right' }}>
        <Pagination count={10} />
      </Box>
    </>
  )
}
