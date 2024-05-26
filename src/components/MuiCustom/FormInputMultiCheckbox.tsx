import { useEffect, useState } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useAppSelector } from '~/hooks/useTypeSelector'
import { capitalizeFirstLetter } from '~/utils/fomatters'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '../Form'

interface FormInputProps {
  name: string
  control: any
  setValue: any
  label: string
  error?: string
}

interface Option {
  label: string
  value: number
}

export const FormInputMultiCheckbox = ({ name, control, setValue, label, error }: FormInputProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { listColor } = useAppSelector((state) => state.colors)

  const options = Object.keys(listColor).map((key) => {
    return { label: listColor[key].name, value: listColor[key].id }
  })

  // handling the selection manually
  const handleSelect = (value: number) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: number) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: number[]) => [...prevItems, value])
    }
  }
  // setting form value manually
  useEffect(() => {
    setValue(name, selectedItems)
  }, [name, selectedItems, setValue])
  return (
    <FormControl size={'small'} variant={'outlined'}>
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
                <Controller
                  name={name}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    )
                  }}
                  control={control}
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
