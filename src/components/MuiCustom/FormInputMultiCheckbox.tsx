import { useEffect, useState } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { useAppSelector } from '~/hooks/useTypeSelector'
import { capitalizeFirstLetter } from '~/utils/formatters'
import FieldErrorAlert from '../Form'

interface FormInputProps {
  label: string
  error?: string
  initValue: string[]
  onSelect: (value?: string[]) => void
}

export const FormInputMultiCheckbox = ({ label, error, initValue, onSelect }: FormInputProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(initValue)
  const { listColor } = useAppSelector((state) => state.colors)

  const options = Object.keys(listColor).map((key) => {
    return { label: listColor[key].name, value: listColor[key].id }
  })

  const handleSelect = (value: string) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: string) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: string[]) => [...prevItems, value])
    }
  }

  useEffect(() => {
    onSelect(selectedItems.length ? selectedItems : undefined)
  }, [selectedItems])

  return (
    <FormControl size={'small'} variant={'outlined'} sx={{ width: '100%' }}>
      <FormLabel component="legend">{label}</FormLabel>
      <Box mt={2} ml={1.4} sx={{display: 'flex', flexWrap: 'wrap', rowGap: '10px', columnGap: '20px'}}>
        {options.map((option) => {
          return (
            <FormControlLabel
              sx={{
                marginRight: 0,
                '& .MuiButtonBase-root': { display: 'none' },
                '& .MuiTypography-root': { padding: '0.5em 1em', borderRadius: '0.5em', border: '1px solid #ccc' },
                '& .Mui-checked + .MuiTypography-root': { backgroundColor: '#53dfbd' },
              }}
              control={
                <Checkbox
                  checked={selectedItems.includes(option.value.toString())}
                  onChange={() => {
                    handleSelect(option.value.toString())
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
