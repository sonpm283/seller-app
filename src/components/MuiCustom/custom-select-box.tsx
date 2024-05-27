import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { Category } from '~/types/category.type'

interface CustomSelectBox {
  title: string
  options: { [key: string]: Category }
  onSelect: (value: number) => void
  initValue: string
}

export default function CustomSelectBox(props: CustomSelectBox) {
  const { title, options, onSelect, initValue } = props
  const [selectValue, setSelectValue] = useState(initValue)

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value)
    onSelect(Number(event.target.value))
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue || ''}
          label={title}
          onChange={handleChange}
        >
          {Object.keys(options).map((key) => {
            return (
              <MenuItem key={key} value={options[key].id}>
                {options[key].name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
