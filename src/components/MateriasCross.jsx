import { Margin } from "@mui/icons-material";
import { Box , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import '../styles/MateriasCross.css';

export default function MateriasCross (){

    return(
        <Box
            className='materias-cross-tarjeta'>
                <TableContainer >
                    <h5 className="materias-cross-tarjeta-title">MATERIA UNAHUR</h5>
                    <Table className="materias-cross-tarjeta-tabla">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold', p:0, textAlign: 'center'}}>Año</TableCell>
                                <TableCell sx={{fontWeight: 'bold', p:0, textAlign: 'center'}}>Campo</TableCell>
                            </TableRow>
                        </TableHead >
                        <TableBody >
                            <TableRow >
                                <TableCell >
                                    <TextField 
                                        variant='standard' className="materias-cross-tarjeta-input"/>
                                </TableCell>
                                <TableCell >
                                      <TextField 
                                      variant='standard' className="materias-cross-tarjeta-input"/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField 
                                    variant='standard' className="materias-cross-tarjeta-input"/>
                                </TableCell>
                                <TableCell>
                                    <TextField 
                                    variant='standard' className="materias-cross-tarjeta-input"/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    )
}