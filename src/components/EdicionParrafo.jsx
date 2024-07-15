import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
const devolucionCarrera = []; 
  const listadoSubjectDat = []; 
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [devolucionCarreras, setDevolucionCarreras] = useState(devolucionCarrera);
  const [listadoSubjectData, setListadoSubjectData] = useState(listadoSubjectDat);
  const [autoCompleteOptionsDisabled, setAutoCompleteOptionsDisabled] = useState(true); // Nuevo estado para controlar si las opciones están deshabilitadas
    const [desabilitarResto, setDesabilitarResto] = useState(false);
    const [desabilitarNunca, setDesabilitarNunca] = useState(false);
    const [desabilitarSiempre, setDesabilitarSiempre] = useState(false);

  const handleClaveChange = (e) => setClave(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);
  
    const handleCondicionesChange = (event, values) => {
        setCondicionesSeleccionadas(values);
        setCheckboxValues(Array(values.length).fill(false));
  // Verificar si "EN_CARRERA" está seleccionado
        const isEnCarreraSelected = values.includes('EN_CARRERA');
        // Habilitar o deshabilitar las opciones dependiendo de si "EN_CARRERA" está seleccionado
        //setAutoCompleteOptionsDisabled(!isEnCarreraSelected);

        const isSiempreSelected = values.includes('SIEMPRE');
        const isNuncaSelected = values.includes('NUNCA');
          if (isSiempreSelected || isNuncaSelected) {
              setDesabilitarResto(true);
          }
        if (isSiempreSelected) { setDesabilitarNunca(true) }
        if (isNuncaSelected) { setDesabilitarSiempre(true) }
        if (!isSiempreSelected && !isNuncaSelected) {
            setDesabilitarNunca(false);
            setDesabilitarSiempre(false);
            setDesabilitarResto(false);
            //setAutoCompleteOptionsDisabled(true);
        }
        console.log(isEnCarreraSelected)
        if (!isEnCarreraSelected) {
            values = values.filter(cond => cond !== 'MATERIAS_PENDIENTES' && cond !== 'MATERIAS_NO_PENDIENTES');
            setAutoCompleteOptionsDisabled(true);
        }
        setCondicionesSeleccionadas(values);
    };


  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
    // Habilitar las opciones de "MATERIAS_PENDIENTES" y "MATERIAS_NO_PENDIENTES" al marcar el checkbox
    setAutoCompleteOptionsDisabled(!newCheckboxValues[index]);
  };

  // Función para obtener las opciones deshabilitadas
    const getOptionDisabled = (option, index) => {

        if (autoCompleteOptionsDisabled && (option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES')) {
            return true;
      }
        if (desabilitarResto && (option === 'MATERIAS_COMUNES' || option === 'EN_CARRERA' || option === 'CANT_APROBADAS' || option === 'FINALES_PENDIENTES'
            || option === 'LIMITE_FINALES_PENDIENTES' || option === 'ORIENTACION')) {
          return true;
        }
        if (desabilitarSiempre && option === 'SIEMPRE') {
            return true;
        }
        if (desabilitarNunca && option === 'NUNCA') {
            return true;
        }
        return false;
  };
 //console.log(condiciones);
  return (
      <Box
          component="form"
          onSubmit={handleSave}
          sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '1000px',
              width: '100%',
              margin: '0 auto',
          }}
      >
          <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
          <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
          <Stack id='smar' sx={{}}>
              <Autocomplete
                  multiple
                  id="condiciones-select"
                  options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
                  value={condicionesSeleccionadas}
                  onChange={handleCondicionesChange}
                  renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
                  sx={{ mt: 2 }}
                  getOptionDisabled={getOptionDisabled}
              />
              <Box sx={{ mt: 2, width: '100%' }}>
                  {(!desabilitarNunca && !desabilitarSiempre) && condicionesSeleccionadas.map((condicion, index) => (
                      (condicion !== "MATERIAS_COMUNES" && condicion !== "FINALES_PENDIENTES" && condicion !== "LIMITE_FINALES_PENDIENTES" && condicion !== "ORIENTACION") &&
                      <TarjetaCondicion
                          key={index}
                          condicion={condicion}
                          devolucionCarreras={devolucionCarrera}
                          listadoSubjectData={listadoSubjectData}
                          onCheckboxChange={() => handleCheckboxChange(index)}
                          checkboxValue={checkboxValues[index]}
                          deshabilitarCampoNumerico={!checkboxValues[index]} // Deshabilitar campo numérico si el checkbox está marcado
                      />
                  ))}
              </Box>
          </Stack>
          <Box display="flex" justifyContent="space-around">
              <Button type="submit" variant="contained" color="primary">Guardar</Button>
              <Button variant="contained" color="secondary" onClick={onCancel}>Cancelar</Button>
          </Box>
      </Box>
  );
};

export default EdicionParrafo;