import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Checkbox, Autocomplete } from '@mui/material';

const listadoSubjectData = [
    { id_materia: 152, id_carrera: 5, anio: 1 },
    { id_materia: 151, id_carrera: 5, anio: 1 },
    { id_materia: 443, id_carrera: 5, anio: 1 },
    { id_materia: 153, id_carrera: 5, anio: 1 },
    { id_materia: 160, id_carrera: 5, anio: 1 },
    { id_materia: 444, id_carrera: 5, anio: 1 },
    { id_materia: 149, id_carrera: 31, anio: 1 },
    { id_materia: 152, id_carrera: 31, anio: 1 },
    { id_materia: 151, id_carrera: 31, anio: 1 },
    { id_materia: 150, id_carrera: 31, anio: 1 },
    { id_materia: 153, id_carrera: 31, anio: 1 },
    { id_materia: 160, id_carrera: 31, anio: 1 },
    { id_materia: 444, id_carrera: 31, anio: 1 },
    { id_materia: 41, id_carrera: 31, anio: 1 }
];

const devolucionCarreras = [
  {
    careerId: 31, 
    unahurSubjects: [{year:1}], englishLevels: [{year:2}, {year:3}], 
    suggestionThresholdRegularizedSubjects: 3 
  },
  {
    careerId: 5,
    unahurSubjects: [{ year: 1 }],
    englishLevels: [{ year: 2 }, { year: 3 }],
    suggestionThresholdRegularizedSubjects: 3
  }
];

const TarjetaCondicion = ({
  condicion,
  onCheckboxChange,
  checkboxValue,
  deshabilitarCampoNumerico
}) => {
  const renderOptions = () => {
    switch (condicion) {
      case "EN_CARRERA":
        return (
          <Autocomplete
            options={devolucionCarreras.map((carrera) => carrera.careerId)}
            renderInput={(params) => <TextField {...params} label="Carreras" variant="outlined" fullWidth />}
            sx={{ width: '100%' }}
            getOptionLabel={(option) => `Carrera ${option}`}
            
          />
        );
       case "MATERIAS_PENDIENTES":
       case "MATERIAS_NO_PENDIENTES":
         return (
           <Autocomplete
            options={listadoSubjectData.map((materia) => materia.id_materia)}
             getOptionLabel={(option) => `Materia ${option}`}
             renderOption={(props, option) => <li {...props}>{`Materia ${option}`}</li>}
             renderInput={(params) => <TextField {...params} label="Materias" variant="outlined" fullWidth />}
             sx={{ width: '100%' }}
           />
         );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
      {condicion === "CANT_APROBADAS" ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Condición</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ overflow: 'hidden', textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}>{condicion}</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TextField type="number" variant="outlined" />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Condición</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Materia/Carrera</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Cantidad</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Va en carrera</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {["MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "EN_CARRERA"].includes(condicion) ? (
                renderOptions()
              ) : (
                <TextField disabled value="N/A" variant="outlined" fullWidth />
              )}
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Checkbox checked={checkboxValue} onChange={(e) => onCheckboxChange(e.target.checked)} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

TarjetaCondicion.propTypes = {
  condicion: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  deshabilitarCampoNumerico: PropTypes.bool.isRequired
};

export default TarjetaCondicion;