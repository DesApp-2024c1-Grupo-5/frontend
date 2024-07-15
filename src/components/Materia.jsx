import { React, useState } from 'react';
import { Box, Typography, IconButton, Modal, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteSubject } from '../services/SubjectDataService';

function Materia({data, handleSaveEdit}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    
    const handleOpen = (data) => {
        setFormData(data);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData)
      };
    
      const handleSave = () => {
        handleSaveEdit(formData);
        handleClose();
      };

    const handleOnClickDelete = async (data) => {
        console.log("Estoy aca");
        const resSubject = await deleteSubject(data);
        if(resSubject.status === 200){
          console.log("OK")
        } else {
          console.log("No OK")
        } 
      }

    return(
        <Box
            sx={{
              display: 'flex',
              '&:nth-of-type(odd)': {
                  backgroundColor: '#f9f9f9',
              },
              '&:nth-of-type(even)': {
                  backgroundColor: '#ffffff'
              },
            }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{data.id_materia}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{data.anio}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px',fontSize: '12px', alignContent: 'center' }}>{data.campo}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{data.specialSubjectName}</Typography>
        <Box sx={{ flex: 1.5, textAlign: 'center', padding: '8px', display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton
                sx={{ width: '25px' }}
                onClick={() => handleOnClickDelete(data)}> 
                <DeleteIcon sx={{ color: 'red', fontSize: '18px'}} />
            </IconButton>
            <IconButton
             sx={{ width: '25px' }}
                onClick={() => handleOpen(data)}> 
                <EditIcon sx={{color: 'blue', fontSize: '18px'}} />
            </IconButton>
        </Box>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Materia
                </Typography>
                <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 2,
              gap: 2,
            }}
          >
            <TextField
              label="Código Materia"
              value={formData.id_materia}
              disabled
            />
            <TextField
              label="Año"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
            />
            <TextField
              label="Campo"
              name="campo"
              value={formData.campo}
              onChange={handleChange}
            />
            <TextField
              label="Nombre Especial"
              name="specialSubjectName"
              value={formData.specialSubjectName}
              onChange={handleChange}
            />
            <Box
            sx={{display: 'flex'}}>
              <Button variant="contained" color="primary" onClick={handleSave}>
               Guardar
              </Button>
              <Button onClick={handleClose}>Cerrar</Button>
            </Box>

          </Box>
            </Box>
        </Modal>

            
      </Box>
    )
}

export default Materia;