import React , { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box , Button, ButtonGroup, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'
import MateriasEspeciales from '../components/MateriasEspeciales';
import { updateOneCareer, getCurrentConfigCareer } from '../services/CarrerService';

function ConfiguracionCarrera() {
    //recupero el store
    const { IdCarrera, nombreCarrera } = useSelector((state) => state.carrera);

    const [isEdit, setIsEdit] = useState(false);
    const [carrera, setCarrera] = useState({}); 
    const [message, setMessage] = useState({codigo: 0, msg:""});

    const toggleEdit = async() => {
        setIsEdit((prevState) => !prevState); // Cambia el estado de edición
        //llamada al BE
        setMessage({})
        if(isEdit){
            const carreraActualizada = await updateOneCareer(carrera);
            console.log(carreraActualizada)
            if(carreraActualizada.status === 200){
                setMessage({
                    code: 200,
                    msg: `${carreraActualizada.data.actCarrera.careerId} actualizada correctamente`
                })
                
            } else{
                setMessage({
                    code: 400,
                    msg: carreraActualizada.response.data.error})
            }
        }
      }
    const navigate = useNavigate();
    const handleOnClickCondiciones = () => {
        navigate('/configuracion/condiciones')
    }

    useEffect(() => {
        if (IdCarrera !== undefined && IdCarrera != ""){
            setMessage({})
            const obtenerCarrera = async() => {
                const carr = await getCurrentConfigCareer(IdCarrera);
                console.log(carr)
                
                if(carr.status === 200){
                    const career = carr.data.datosDeCarrera[0];
                    setMessage({
                        code: 200,
                        msg: `Datos de carrera ${career.careerId} obtenidos`
                    })
                setCarrera(career);
                }else{
                    setMessage({
                        code: 400,
                        msg: carr.response.data.error})
                } 
            }
            obtenerCarrera();
        }   
        else {
            navigate('/configuracion')
        }
        
    }, [])

    const handleUpdateCarrerRegularSuggest = (newValue) => {
        const updatedCarrer = {...carrera};
        updatedCarrer.suggestionThresholdRegularizedSubjects = newValue;
        setCarrera(updatedCarrer);
    }
    const handleUpdateCarrerMinimunSubject = (newValue) => {
        const updatedCarrer = {...carrera};
        updatedCarrer.minimumSubjectsRecommended = newValue
        setCarrera(updatedCarrer);
    }
    const handleUpdateCarrerName = (newValue) => {
        const updatedCarrer = {...carrera};
        updatedCarrer.specialCareerName = newValue;
        setCarrera(updatedCarrer);
    }

    const handleUpdateYear = (index,newValue) => {
        let updateCarrer = {...carrera};
        if(index === 0){
            updateCarrer.unahurSubjects = newValue
        }else if(index === 1){
            updateCarrer.englishLevels = newValue
        }
        console.log("Carrera Actualizada:", updateCarrer)
        setCarrera(updateCarrer)
    }

    const handleUpdateCampo = (index, newValue) => {
        let updateCarrer = {...carrera};
        if(index === 0){
            updateCarrer.unahurSubjects = newValue
        }else if(index === 1){
            updateCarrer.englishLevels = newValue
        }
        console.log("Carrera Actualizada:", updateCarrer)
        setCarrera(updateCarrer)
    }

    const volver = () => {
        navigate('/configuracion');
    }

    return (
        <>
            <Box sx={{

                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.default',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3,
                marginBottom:3
            }}>
                <Typography 
                    variant="h4"
                    marginBottom={1} >
                    {nombreCarrera}
                </Typography>  
                <Box sx={{}}>
                <Box
                    sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box
                        sx={{display: 'flex'}}>
                        <MateriasEspeciales 
                            isEdit={isEdit}
                            title={"MATERIAS UNAHUR"} 
                            array={carrera.unahurSubjects ? carrera.unahurSubjects : []}
                            handleUpdateYear={(newValue) => handleUpdateYear(0,newValue)}
                            handleUpdateCampo={(newValue) => handleUpdateCampo(0,newValue)}
                            />
                            
                        <MateriasEspeciales 
                            isEdit={isEdit} 
                            title={"NIVELES INGLES"} 
                            array={carrera.englishLevels ? carrera.englishLevels : []}
                            handleUpdateYear={(newValue) => handleUpdateYear(1,newValue)}
                            handleUpdateCampo={(newValue) => handleUpdateCampo(1,newValue)}/> 
                    </Box>
                    <PanelConfiguradorGral 
                        isEdit={isEdit}
                        suggestionThresholdRegularizedSubjects={carrera.suggestionThresholdRegularizedSubjects ? carrera.suggestionThresholdRegularizedSubjects : ""}
                        minimumSubjectsRecommended={carrera.minimumSubjectsRecommended ? carrera.minimumSubjectsRecommended : ""}
                        specialCarrerName={carrera.specialCareerName ? carrera.specialCareerName : ""}
                        handleUpdateCarrerRegularSuggest={handleUpdateCarrerRegularSuggest}
                        handleUpdateCarrerMinimunSubject={handleUpdateCarrerMinimunSubject}
                        handleUpdateCarrerName={handleUpdateCarrerName}
                    />
                    </Box>
                        <ButtonGroup 
                            variant='contained'
                            sx={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '20px', 
                                    margin: '15px 15px 15px 15px', 
                                    boxShadow: 'none'
                                }}>
                        <Button
                            onClick={ volver }
                                startIcon={<ArrowCircleLeftIcon />}>
                            VOLVER</Button>  
                            <Button
                                startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
                                onClick={toggleEdit}>{isEdit ? 'GUARDAR':'EDITAR'}</Button>  
                            <Button
                                startIcon={<BuildIcon />}
                                onClick={ handleOnClickCondiciones }
                                >CONDICIONES</Button>  
                            <Button
                                startIcon={<ListIcon />}>MATERIAS</Button>  
                        </ButtonGroup>
                    
                </Box>

                <Alert
                    severity={message.code === 200 ? 'success': (message.code === 400 ? 'error':'')}
                    variant='outlined'
                    sx={{m:1}}
                    >
                        {message.msg}
                </Alert>
                

            </Box>
        </>
    );
}

export default ConfiguracionCarrera;