import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);

  const handleClaveChange = (e) => setClave(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);
  const handleCondicionesChange = (event, values) => setCondicionesSeleccionadas(values);
  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCondicionChange = (index, newCondicion) => {
    const nuevasCondiciones = [...condicionesSeleccionadas];
    nuevasCondiciones[index] = newCondicion;
    setCondicionesSeleccionadas(nuevasCondiciones);
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto' }}>
      <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
      <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
      <Autocomplete
        multiple
        id="condiciones-select"
        options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
        value={condicionesSeleccionadas}
        onChange={handleCondicionesChange}
        renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
      />
      <Box sx={{ mt: 2 }}>
        {condicionesSeleccionadas.map((condicion, index) => (
          <TarjetaCondicion key={index} condicion={condicion} onChange={(newCondicion) => handleCondicionChange(index, newCondicion)} />
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default EdicionParrafo;