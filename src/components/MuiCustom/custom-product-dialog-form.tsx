import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Grid } from '@mui/material'
import { PostAdd } from '@mui/icons-material'
import { useAppSelector } from '~/hooks/useTypeSelector'
import CustomSelectBox from './custom-select-box'
// import { createProduct } from '~/store/reducers/productSlice'
// import { Product } from '~/types/product.type'
// import { Product } from '~/types/product.type'

interface CustomProductDialogFormProps {
  isOpen: boolean
  children?: React.ReactNode
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CustomProductDialogForm(props: CustomProductDialogFormProps) {
  const { listCategory } = useAppSelector((state) => state.categories)
  // const dispatch = useAppDispatch()

  const { isOpen, setOpen } = props

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          // const formData = new FormData(event.currentTarget)
          // const formJson = Object.fromEntries(formData.entries())

          // console.log(newProduct)

          // dispatch(createProduct(newProduct as Omit<Product, 'id'>))

          handleClose()
        },
      }}
    >
      <DialogTitle>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>Creating a Product</Grid>
          <Grid item>
            <Box sx={{ pt: 1 }}>
              <PostAdd color="primary" />
            </Box>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="avaiable"
          name="avaiable"
          label="Avaiable"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="sold"
          name="sold"
          label="Sold"
          type="text"
          fullWidth
          variant="standard"
        />

        <CustomSelectBox title="Category" options={listCategory} />

        <TextField
          autoFocus
          required
          margin="dense"
          id="color"
          name="color"
          label="Color"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="price"
          name="price"
          label="Price"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  )
}
