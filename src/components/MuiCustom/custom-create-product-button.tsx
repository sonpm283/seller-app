import Button from '@mui/material/Button'
import CustomProductDialogForm from './custom-product-dialog-form'
import React, { useState } from 'react'
interface CustomCreatePostButtonProps {
  title: string
  color?: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning'
  icon: React.ReactNode
  children?: React.ReactNode
  onUpdatePost?: () => void
}

export default function CustomCreatePostButton(props: CustomCreatePostButtonProps) {
  const { title, color, icon, onUpdatePost } = props
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpenDialog(true)
          if (onUpdatePost) onUpdatePost()
        }}
        variant="outlined"
        color={color}
        startIcon={icon}
        sx={{ ml: 1 }}
      >
        {title}
      </Button>

      <CustomProductDialogForm isOpen={openDialog} setOpen={setOpenDialog} />
    </>
  )
}
