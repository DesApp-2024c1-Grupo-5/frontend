import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';

const listadoSubjectDat = [
  { id_materia: 149, id_carrera: 5, anio: 1 },
  { id_materia: 152, id_carrera: 5, anio: 1 },
  { id_materia: 151, id_carrera: 5, anio: 1 },
  { id_materia: 443, id_carrera: 5, anio: 1 },
  { id_materia: 153, id_carrera: 5, anio: 1 },
  { id_materia: 160, id_carrera: 5, anio: 1 },
  { id_materia: 444, id_carrera: 5, anio: 1 }
];

const devolucionCarrera = [
  { 
    careerId: 5, 
    unahurSubjects: [{year: 1}], 
    englishLevels: [{year: 2}, {year: 3}], 
    suggestionThresholdRegularizedSubjects: 3 
  }
];

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [autoCompleteOptionsDisabled, setAutoCompleteOptionsDisabled] = useState(true);
  const [desabilitarResto, setDesabilitarResto] = useState(false);
  const [desabilitarNunca, setDesabilitarNunca] = useState(false);
  const [desabilitarSiempre, setDesabilitarSiempre] = useState(false);

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

    if (!isEnCarreraSelected) {
      values = values.filter(cond => !['MATERIAS_PENDIENTES', 'MATERIAS_NO_PENDIENTES'].includes(cond));
      setAutoCompleteOptionsDisabled(true);
    } else {
      setAutoCompleteOptionsDisabled(false);

      // Generar tarjetas de condición automáticamente para "EN_CARRERA"
      const nuevasCondiciones = [];

      devolucionCarrera.forEach(carrera => {
        if (values.includes(`CARRERA_${carrera.careerId}`)) {
          // Añadir las materias de UNAHUR
          carrera.unahurSubjects.forEach(subject => {
            nuevasCondiciones.push({
              condicion: `MATERIA_${subject.year}`,
              campoNumerico: false // Esto puedes ajustarlo según tu lógica
            });
          });

          // Añadir niveles de inglés
          carrera.englishLevels.forEach(level => {
            nuevasCondiciones.push({
              condicion: `NIVEL_INGLES_${level.year}`,
              campoNumerico: false // Esto puedes ajustarlo según tu lógica
            });
          });

          // Añadir la sugerencia de umbral de materias regularizadas
          nuevasCondiciones.push({
            condicion: `UMBRAL_REGULARIZADAS_${carrera.suggestionThresholdRegularizedSubjects}`,
            campoNumerico: true // Esto puedes ajustarlo según tu lógica
          });
        }
      });

      // Ahora debes manejar estas nuevas condiciones como desees
      console.log("Nuevas condiciones generadas automáticamente:", nuevasCondiciones);
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
    setAutoCompleteOptionsDisabled(!newCheckboxValues[index]);
  };

  const getOptionDisabled = (option) => {
    if (autoCompleteOptionsDisabled && ['MATERIAS_PENDIENTES', 'MATERIAS_NO_PENDIENTES'].includes(option)) {
      return true;
    }
    if (desabilitarResto && !['SIEMPRE', 'NUNCA', 'FINALES_PENDIENTES', 'LIMITE_FINALES_PENDIENTIENTES', 'ORIENTACION'].includes(option)) {
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
                devolucionCarreras={devolucionCarrera}
                listadoSubjectData={listadoSubjectDat.filter(materia => materia.id_carrera === devolucionCarrera[0].careerId)} // Filtrar materias por carrera seleccionada
                onCheckboxChange={() => handleCheckboxChange(index)}
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