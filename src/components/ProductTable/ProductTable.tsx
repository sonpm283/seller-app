import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button } from '@mui/material'

interface ProductData {
  name: string
  available: number
  sold: number
  category: string
  price: number
}

interface DataTableProps<T> {
  rows: Array<T>
}

export default function ProductTable({ rows }: DataTableProps<ProductData>) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Avaliable</TableCell>
              <TableCell align="left">Sold</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.available}</TableCell>
                <TableCell align="left">{row.sold}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined">Edit</Button>
                    <Button variant="outlined" color="error">
                      Remove
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
