import React, { useState, useEffect } from 'react';
import SelectComponent from '../components/SelectR';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import '../styles/ConfiguracionCarreras.css';
import { useDispatch } from 'react-redux';
import { addCarrera } from '../redux/carreraSlice';
import { getAllCareer } from '../services/CareerService';

import { useNavigate } from 'react-router-dom';

function SeleccionCarrera() {
    const dispatch = useDispatch();
    //const IdCarrera = useSelector((state) => state.carrera.IdCarrera)

    const navigate = useNavigate();
    const [carreras, setCarrerasList] = useState([]);
    const [configButton, setConfigButton] = useState("");
    const [message, setMessage] = useState({ codigo: 0, msg: "" });

    useEffect(() => {
        setMessage({});
        const obtenerCarreras = async () => {
            const carreras = await getAllCareer();
            if (carreras.status === 200) {
                const career = carreras.data;
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las carreras.`
                })
                const lista = career.allCareers.map(c => ({
                    label: `Carrera ${c.careerId}`,
                    value: { v: c.careerId, l: `Carrera ${c.careerId}` }
                }));
                setCarrerasList(lista);
            } else {
                setMessage({
                    code: carreras.status,
                    msg: carreras.statusText
                })
            }
        }
        obtenerCarreras();
        
      }, [])


    const handleSelect = (value) => {

        dispatch(addCarrera({ IdCarrera: value.v, nombreCarrera: value.l }));
        setConfigButton(value.v)

    };

    const handleOnClickConfiguracionCarrera = () => {
        navigate('/configuracion/carrera')
    };

    const handleOnClickConfiguracionParrafos = () => {
        navigate('/configuracion/parrafos')
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.default',
                marginTop: 8,
                marginBottom: 3
            }}>
                <Box
                    sx={{
                        width: '500px',
                        minWidth: '250px'
                    }}
                >
                    <h3 className="label">Seleccione una Carrera</h3>
                    <SelectComponent options={carreras} onSelect={handleSelect} className={'selectcarreras'} placeholder='Carreras' />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop:'20px',
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >
                        <Button
                            onClick={handleOnClickConfiguracionCarrera}
                            variant="contained"
                            name={'Configurar'}
                            disabled={configButton ? false : true}
                            startIcon={<BuildIcon />}>Configurar
                            
                        </Button>
                        <Button
                            onClick={handleOnClickConfiguracionParrafos}
                            variant="contained"
                            name={'Plantillas-e-mail'}
                            startIcon={<ListIcon />}>Lista Párrafos
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SeleccionCarrera;