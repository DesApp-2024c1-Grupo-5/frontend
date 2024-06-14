import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Select, MenuItem, TextField, Checkbox, Autocomplete } from '@mui/material';

const TarjetaCondicion = ({
  condicion,
  devolucionCarreras,
  listadoSubjectData,
  onCheckboxChange,
  checkboxValue,
  deshabilitarCampoNumerico
}) => {
  console.log("Renderizando TarjetaCondicion con la condición:", condicion);
  console.log("Devolución Carreras:", devolucionCarreras);
  console.log("Listado Subject Data:", listadoSubjectData);

  const renderOptions = () => {
    if (condicion === "EN_CARRERA") {
      console.log("Renderizando opciones para EN_CARRERA");
      return (
        <Autocomplete
          options={devolucionCarreras.map((carrera) => carrera.careerId)}
          renderInput={(params) => <TextField {...params} label="Carreras" variant="outlined" fullWidth />}
          sx={{ width: '100%' }} // Ajustamos el ancho del Autocomplete
        />
      );
    } else if (condicion === "MATERIAS_PENDIENTES") {
      console.log("Renderizando opciones para MATERIAS_PENDIENTES");
      return listadoSubjectData.map((subject) => (
        <MenuItem key={subject.id_materia} value={subject.id_materia}>
          Materia {subject.id_materia}
        </MenuItem>
      ));
    } else if (condicion === "MATERIAS_NO_PENDIENTES") {
      console.log("Renderizando opciones para MATERIAS_NO_PENDIENTES");
      return (
        <Autocomplete
          options={listadoSubjectData.map((subject) => `Materia ${subject.id_materia}`)}
          renderInput={(params) => <TextField {...params} label="Materias" variant="outlined" fullWidth />}
          sx={{ width: '100%' }} // Ajustamos el ancho del Autocomplete
        />
      );
    } else {
      return (
        <>
          <MenuItem value="SIEMPRE">Siempre</MenuItem>
          <MenuItem value="NUNCA">Nunca</MenuItem>
          <MenuItem value="EN_CARRERA">En Carrera</MenuItem>
          <MenuItem value="MATERIAS_PENDIENTES">Materias Pendientes</MenuItem>
          <MenuItem value="MATERIAS_NO_PENDIENTES">Materias No Pendientes</MenuItem>
          <MenuItem value="MATERIAS_COMUNES">Materias Comunes</MenuItem>
          <MenuItem value="CANT_APROBADAS">Cantidad de Materias Aprobadas</MenuItem>
          <MenuItem value="FINALES_PENDIENTES">Finales Pendientes</MenuItem>
          <MenuItem value="LIMITE_FINALES_PENDIENTES">Límite de Finales Pendientes</MenuItem>
          <MenuItem value="ORIENTACION">Orientación</MenuItem>
        </>
      );
    }
  };

  const handleChange = (value) => {
    // Aquí manejas el cambio de valor
    console.log("Valor seleccionado:", value);
    // Puedes realizar acciones adicionales según sea necesario
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
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap:2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {condicion !== "MATERIAS_NO_PENDIENTES" && condicion !== "EN_CARRERA" ? (
                <Select value={condicion} onChange={(e) => handleChange(e.target.value)} sx={{ width: '100%' }}>
                  {renderOptions()}
                </Select>
              ) : (
                renderOptions()
              )}
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Checkbox checked={checkboxValue} onChange={onCheckboxChange} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

TarjetaCondicion.propTypes = {
  condicion: PropTypes.string.isRequired,
  devolucionCarreras: PropTypes.array.isRequired,
  listadoSubjectData: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  deshabilitarCampoNumerico: PropTypes.bool.isRequired
};

export default TarjetaCondicion;