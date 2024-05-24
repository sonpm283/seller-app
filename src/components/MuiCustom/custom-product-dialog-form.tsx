import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Grid, LinearProgress } from '@mui/material'
import { PostAdd } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import CustomSelectBox from './custom-select-box'
// import { useState } from 'react'
import { CreateProduct } from '~/types/product.type'
import { createProduct } from '~/store/reducers/productSlice'
import { toast } from 'react-toastify'
import FieldErrorAlert from '../Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
interface CustomProductDialogFormProps {
  isOpen: boolean
  children?: React.ReactNode
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CustomProductDialogForm(props: CustomProductDialogFormProps) {
  const { listCategory } = useAppSelector((state) => state.categories)
  const { isOpen, setOpen } = props

  const dispatch = useAppDispatch()
  const { stage } = useAppSelector((state) => state.products)

  const handleClose = () => {
    setOpen(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProduct>()

  const onSubmit = (data: CreateProduct) => {
    console.log(data);
    
    dispatch(createProduct(data))
    toast('Create Product Successfully!!', {
      position: 'bottom-left',
      autoClose: 2000,
    })
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      {stage === 'loading' && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              error={!!errors['name']}
              variant="standard"
              {...register('name', {
                required: FIELD_REQUIRED_MESSAGE,
              })}
            />
            <FieldErrorAlert errorMessage={errors.name?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <TextField
              autoFocus
              margin="dense"
              id="avaiable"
              label="Avaiable"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors['available']}
              {...register('available', {
                required: FIELD_REQUIRED_MESSAGE,
              })}
            />
            <FieldErrorAlert errorMessage={errors.available?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <CustomSelectBox title="Category" options={listCategory} onSelect={(value: number) => console.log(value)} />
            <FieldErrorAlert errorMessage={errors.available?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              error={!!errors['price']}
              variant="standard"
              {...register('price', {
                required: FIELD_REQUIRED_MESSAGE,
              })}
            />
            <FieldErrorAlert errorMessage={errors.price?.message} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
