import { Box, Typography,Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Materia from '../components/Materia';
import { getSubjectsByCareer , updateSubject } from '../services/SubjectDataService';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function ConfiguracionMaterias() {

    const navigate = useNavigate()
    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
    const [subjects, setSubjects] = useState([]);
    const [save, setSave] = useState(false);
    
    useEffect( () => {

      const getSubjects = async(id_carrera) => {
        const subj = await getSubjectsByCareer(id_carrera);
        if(subj.status === 200){
          setSubjects(subj.data.subjectsByCareer);
        }
        
      }

      getSubjects(IdCarrera)
    }, [save, subjects])


    const handleSaveEdit = async (editedData) => {
      const upSubject = await updateSubject(editedData);
      setSave(!save);
    };
    const handleClicBack = () => {
      navigate('/configuracion/carrera');
    }
    return(
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '800px',
          margin: 'auto',
          marginTop: 3,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Typography 
            variant="h4"
            marginBottom={3} >
            {nombreCarrera}
        </Typography>  
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#609800',
          padding: '8px',
        }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Código Materia</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Año</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Campo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold',backgroundColor: '#609800', color: '#FFFFFF' }}>Nombre Especial</Typography>
        <Typography sx={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Acciones</Typography>
      </Box>

      {subjects?.map((item) => (
        <Materia key={item.id_materia} data={item} handleSaveEdit={handleSaveEdit}/>
      ))}

        <Button
          onClick={ handleClicBack }
          sx={{margin: 2}}
          variant='contained'
          startIcon={<ArrowCircleLeftIcon />}>
        VOLVER</Button>  
    </Box>
    )
}

export default ConfiguracionMaterias;