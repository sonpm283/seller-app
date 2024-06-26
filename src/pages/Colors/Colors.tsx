import { Box, Button, TextField, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks/useTypeSelector'
import { createColor, deleteColor, getColorList } from '~/store/reducers/colorsSlice'
import { CreateColor } from '~/types/color.type'

export default function Colors() {
  const { listColorsIds, listColor } = useAppSelector((state) => state.colors)
  const [formSate, setFormState] = useState<CreateColor>({ name: '' })

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getColorList())
  }, [dispatch])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(formSate.name === '') return
    
    dispatch(createColor(formSate))
    setFormState({ name: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ name: e.target.value })
  }

  const handleDeleteColor = (id: string) => {
    dispatch(deleteColor(id))
  }

  return (
    <>
      <Typography sx={{ flex: 1 }} variant="h4">
        Color List
      </Typography>
      <Box mt={4} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
        <Stack direction="row" spacing={1}>
          {listColorsIds.map((id) => (
            <Chip
              key={listColor[id].id}
              label={listColor[id].name}
              onDelete={() => handleDeleteColor(listColor[id].id.toString())}
            />
          ))}
        </Stack>
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box ml={2}>
            <TextField
              id="outlined-search"
              label="New Color"
              type="text"
              size="small"
              value={formSate.name}
              onChange={handleChange}
              sx={{
                minWidth: '200px',
              }}
            />
          </Box>
          <Box ml={2}>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
