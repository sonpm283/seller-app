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
import { CreateProduct } from '~/types/product.type'
import { cancelEditingProduct, createProduct, updateProduct } from '~/store/reducers/productSlice'
import { toast } from 'react-toastify'
import FieldErrorAlert from '../Form/FieldErrorAlert'
import { Controller, useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { FormInputMultiCheckbox } from './FormInputMultiCheckbox'
import { useEffect } from 'react'
interface CustomProductDialogFormProps {
  isOpen: boolean
  children?: React.ReactNode
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CustomProductDialogForm(props: CustomProductDialogFormProps) {
  const { listCategory } = useAppSelector((state) => state.categories)
  const { isOpen, setOpen } = props

  const dispatch = useAppDispatch()
  const { stage, productEditing } = useAppSelector((state) => state.products)

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProduct>({
    defaultValues: {
      name: '',
      available: 1,
      // categoryId: 0,
      price: 50000,
      colorIds: [],
    },
  })

  const handleClose = () => {
    setOpen(false)
    dispatch(cancelEditingProduct())
    reset()
  }

  const onSubmit = (data: CreateProduct) => {
    if (productEditing) {
      dispatch(updateProduct({ id: productEditing?.id, productUpdate: data }))
    } else {
      dispatch(createProduct(data))
    }

    toast(`${productEditing ? 'Edit' : 'Create'} product successfully!!`, {
      position: 'bottom-left',
      autoClose: 2000,
    })
    handleClose()
  }

  useEffect(() => {
    if (productEditing) {
      setValue('name', productEditing.name)
      setValue('price', productEditing.price)
      setValue('categoryId', productEditing.categoryId)
      setValue('colorIds', productEditing.colorIds as number[])
    } else {
      reset()
    }
  }, [productEditing, setValue, reset])

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
            <Grid item> {!productEditing ? 'Creating a Product' : 'Edit Product'} </Grid>
            <Grid item>
              <Box sx={{ pt: 1 }}>
                <PostAdd color="primary" />
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  error={!!errors['name']}
                  variant="standard"
                  {...field}
                />
              )}
            />
            <FieldErrorAlert errorMessage={errors.name?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Controller
              name="available"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="available"
                  label="Avaiable"
                  type="number"
                  fullWidth
                  error={!!errors['available']}
                  variant="standard"
                  {...field}
                />
              )}
            />
            <FieldErrorAlert errorMessage={errors.available?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <CustomSelectBox
                  title="Category"
                  options={listCategory}
                  onSelect={(value: number) => field.onChange(value)}
                  initValue={field.value?.toString()}
                />
              )}
            />
            <FieldErrorAlert errorMessage={errors.categoryId?.message} />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Controller
              name="colorIds"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <FormInputMultiCheckbox
                  error={errors.colorIds?.message}
                  label="Colors"
                  initValue={field.value}
                  onSelect={(value?: number[]) => {
                    field.onChange(value)
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Controller
              name="price"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Price"
                  type="number"
                  fullWidth
                  error={!!errors['price']}
                  variant="standard"
                  {...field}
                />
              )}
            />
            <FieldErrorAlert errorMessage={errors.price?.message} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
