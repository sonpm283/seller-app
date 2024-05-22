import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/material'

export interface DataTableProps<T> {
  rows?: Array<T>
  children: React.ReactElement
  tableName: string;
}

export default function STable<T>({ children, tableName }: DataTableProps<T>) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={tableName}>
          {children}
        </Table>
      </TableContainer>
    </Box>
  )
}
