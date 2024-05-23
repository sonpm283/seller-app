import Button from '@mui/material/Button'
import CustomProductDialogForm from './custom-product-dialog-form'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useState } from 'react'

interface CustomCreatePostButtonProps {
  title: string
  children?: React.ReactNode
}

export default function CustomCreatePostButton(props: CustomCreatePostButtonProps) {
  const { title } = props
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        variant="outlined"
        color="success"
        startIcon={<LibraryAddIcon />}
        sx={{ ml: 1 }}
      >
        {title}
      </Button>

      <CustomProductDialogForm isOpen={openDialog} setOpen={setOpenDialog} />
    </>
  )
}
