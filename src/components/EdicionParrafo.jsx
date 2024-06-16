import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [autoCompleteOptionsDisabled, setAutoCompleteOptionsDisabled] = useState(true);
  const [desabilitarResto, setDesabilitarResto] = useState(false);
  const [desabilitarNunca, setDesabilitarNunca] = useState(false);
  const [desabilitarSiempre, setDesabilitarSiempre] = useState(false);
  const [enCarreraSeleccionado, setEnCarreraSeleccionado] = useState(false);
  const [checkboxMarcado, setCheckboxMarcado] = useState(false);

  const handleClaveChange = (e) => setClave(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);

  const handleCondicionesChange = (event, values) => {
    setCondicionesSeleccionadas(values);
    setCheckboxValues(Array(values.length).fill(false));

    const isEnCarreraSelected = values.includes('EN_CARRERA');
    const isSiempreSelected = values.includes('SIEMPRE');
    const isNuncaSelected = values.includes('NUNCA');

    setDesabilitarResto(isSiempreSelected || isNuncaSelected);
    setDesabilitarNunca(isSiempreSelected);
    setDesabilitarSiempre(isNuncaSelected);

    setEnCarreraSeleccionado(isEnCarreraSelected);
    setAutoCompleteOptionsDisabled(!(isEnCarreraSelected && checkboxMarcado));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCheckboxChange = (index, checked) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = checked;
    setCheckboxValues(newCheckboxValues);

    if (enCarreraSeleccionado && checked) {
      setCheckboxMarcado(true);
      setAutoCompleteOptionsDisabled(false);
    } else {
      setCheckboxMarcado(false);
      setAutoCompleteOptionsDisabled(true);
    }
  };

  const getOptionDisabled = (option) => {
    if (autoCompleteOptionsDisabled && ['MATERIAS_PENDIENTES', 'MATERIAS_NO_PENDIENTES'].includes(option)) {
      return true;
    }
    if (desabilitarSiempre && option !== 'SIEMPRE') {
      return true;
    }
    if (desabilitarNunca && option !== 'NUNCA') {
      return true;
    }
    return false;
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
      <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
      <Stack sx={{}}>
        <Autocomplete
          multiple
          id="condiciones-select"
          options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTIENTES", "ORIENTACION"]}
          value={condicionesSeleccionadas}
          onChange={handleCondicionesChange}
          renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
          sx={{ mt: 2 }}
          getOptionDisabled={getOptionDisabled}
        />
        <Box sx={{ mt: 2, width: '100%' }}>
          {!desabilitarNunca && !desabilitarSiempre && condicionesSeleccionadas?.filter(cond => cond !== "SIEMPRE" && cond !== "NUNCA")?.map((condicion, index) => (
            !['MATERIAS_COMUNES', 'FINALES_PENDIENTES', 'LIMITE_FINALES_PENDIENTIENTES', 'ORIENTACION']?.includes(condicion) && (
              <TarjetaCondicion
                key={index}
                condicion={condicion}
                onCheckboxChange={(checked) => handleCheckboxChange(index, checked)}
                checkboxValue={checkboxValues[index]}
                deshabilitarCampoNumerico={!checkboxValues[index]}
              />
            )
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