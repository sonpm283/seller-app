import { useEffect, useState } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { useAppSelector } from '~/hooks/useTypeSelector'
import { capitalizeFirstLetter } from '~/utils/fomatters'
import FieldErrorAlert from '../Form'

interface FormInputProps {
  label: string
  error?: string
  initValue: number[]
  onSelect: (value?: number[]) => void
}

interface Option {
  label: string
  value: number
}

export const FormInputMultiCheckbox = ({ label, error, initValue, onSelect }: FormInputProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>(initValue)
  const { listColor } = useAppSelector((state) => state.colors)

  const options = Object.keys(listColor).map((key) => {
    return { label: listColor[key].name, value: listColor[key].id }
  })

  const handleSelect = (value: number) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: number) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: number[]) => [...prevItems, value])
    }
  }

  useEffect(() => {
    onSelect(selectedItems.length ? selectedItems : undefined)
  }, [selectedItems])

  return (
    <FormControl size={'small'} variant={'outlined'} sx={{ width: '100%' }}>
      <FormLabel component="legend">{label}</FormLabel>
      <Box mt={2} ml={1.4}>
        {options.map((option: Option) => {
          return (
            <FormControlLabel
              sx={{
                '& .MuiButtonBase-root': { display: 'none' },
                '& .MuiTypography-root': { padding: '0.5em 1em', borderRadius: '0.5em', border: '1px solid #ccc' },
                '& .Mui-checked + .MuiTypography-root': { backgroundColor: option.label },
              }}
              control={
                <Checkbox
                  checked={selectedItems.includes(Number(option.value))}
                  onChange={() => {
                    handleSelect(Number(option.value))
                  }}
                />
              }
              label={capitalizeFirstLetter(option.label)}
              key={option.value}
            />
          )
        })}
      </Box>
      <FieldErrorAlert errorMessage={error} />
    </FormControl>
  )
}
