import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ParrafoPlantilla = ({ text, clave, onEditClick, onDelete }) => {
  const safeText = Array.isArray(text)
  ? text.flatMap(item => (typeof item === 'string' ? item.split(',') : item))
  : [];
    // Verifica si text es un arreglo, si no lo es, inicializa como arreglo vacío
   
  
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
      <Box flexGrow={1}>
        <Typography variant="h6" gutterBottom>{clave}</Typography>
        {safeText.map((line, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {line}
        </Typography>
      ))}
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => onEditClick(clave)} aria-label="Editar" color="primary" sx={{ width: '40px' }}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(clave)} aria-label="Eliminar" sx={{ width: '40px', color: 'red' }}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ParrafoPlantilla;