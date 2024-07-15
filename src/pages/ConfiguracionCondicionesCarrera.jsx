import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Tooltip, Table } from '@mui/material';
import Button from '@mui/material/Button';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import SelectMultipleAR from '../components/SelectMultipleAR';

//import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SelectComponent from '../components/SelectR';
import { getAllSuggestionCondition } from '../services/RegistrationSuggestionConditionService';
import { getAllSuggestionConditionUse, createConditionUse, deleteConditionUse } from '../services/RegistrationSuggestionConditionUseService';
import { getAllSubjectData } from '../services/SubjectDataService';


function createData(key, id, anio, materia, codigo_condicion, config_condicion, obj) {
    return {key, id, anio, materia, codigo_condicion, config_condicion, obj };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'block',
    borderRadius:3
};

function ConfiguracionCondicionCarrera() {

    const navigate = useNavigate();

    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);


    useEffect(() => {
        if (IdCarrera == null || IdCarrera == "") {
            navigate('/configuracion/');
        }
    },[IdCarrera, navigate]);

    const [message, setMessage] = useState({ codigo: 0, msg: "" });

    const [condicionesList, setCondicionesList] = useState([]);
    const [actualizarTablaCondiciones, setActualizarTablaCondiciones] = useState(false); 
    const [sePuedeGuardar, setSePuedeGuardar] = useState(true);

    useEffect(() => {
        setMessage({});
        const obtenerCondicionesSugestionUse = async () => {
            const carreras = await getAllSuggestionConditionUse();
            if (carreras.status === 200) {
                const career = carreras.data;
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las condiciones.`
                });
                const lista = career.conditionsCareerData
                    .filter(c => c.id_carrera == IdCarrera)
                    .map((c, index) => {
                        let configCondicion;
                        let nobj = c;
                        //console.log(nobj);
                        if (c.codigo_condicion === "MATERIAS-ESPECIFICAS") {
                            configCondicion = "Materias:- " + c.config_condicion.materias.map((m, idx) => idx === c.config_condicion.materias.length - 1 ? m : m + " - ").join("");
                        } else if (c.codigo_condicion === "ANIOS-COMPLETOS") {
                            configCondicion = `Año: ${c.config_condicion.anio} ${c.config_condicion.salvo_cantidad != null ? "- Cantidad: " + c.config_condicion.salvo_cantidad : ""} `;
                        } else if (c.codigo_condicion === "CAMPOS-COMPLETOS") {
                            configCondicion = `Campos: ${c.config_condicion.campos.map((cam, idx) => idx === c.config_condicion.campos.length - 1 ? cam : cam + " - ").join("")}`;
                        } else if (c.codigo_condicion === "CANT-MATERIAS-ANIO") {
                            configCondicion = `Año: ${c.config_condicion.anio} - Cantidad: ${c.config_condicion.cantidad} - Campos: ${c.config_condicion.campos.map((cam, idx) => idx === c.config_condicion.campos.length - 1 ? cam : cam + " - ").join("")}`;
                        } else if (c.codigo_condicion === "CANT-MATERIAS") {
                            configCondicion = `Cantidad: ${c.config_condicion.cantidad} ${c.config_condicion.campos_excepto == null ? "" : "- Campos exceptuados: -" + c.config_condicion.campos_excepto.map((ce, idx) => idx === c.config_condicion.campos_excepto.length - 1 ? ce : ce + " ").join("")}`
                        } else {
                            configCondicion = "-";
                        }
                        return createData(index, c.id_carrera, c.anio ?? "-", c.id_materia ?? "-", c.codigo_condicion ?? "-", configCondicion, nobj);
                    });

                setCondicionesList(lista);
            } else {
                setMessage({
                    code: carreras.status,
                    msg: carreras.statusText
                })
            }
        }
        obtenerCondicionesSugestionUse();
    }, [actualizarTablaCondiciones]);

    const [tiposCondicionList, setTiposCondicionList] = useState([]);

    useEffect(() => {

        setMessage({});
        const obtenerCondicionesSugestion = async () => {
            const carreras = await getAllSuggestionCondition();
            if (carreras.status === 200) {
                const career = carreras.data;
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las sugerencias de condiciones.`
                });
                const lista = career.allSuggestionConditions.map(c => ({
                    label: c.codigo,
                    value: c.codigo
                }));

                lista.sort((a, b) => {
                    return a.label.localeCompare(b.label);
                });
                setTiposCondicionList(lista);
            } else {
                setMessage({
                    code: carreras.status,
                    msg: carreras.statusText
                })
            }
        }
        obtenerCondicionesSugestion();

    }, [])

    const [materiasList, setMateriasList] = useState([]);
    const [materiasCondicionList, setMateriasCondicionList] = useState([]);
    useEffect(() => {
        setMessage({});
        const obtenerMaterias = async () => {
            const materias = await getAllSubjectData();
            if (materias.status === 200) {
                const mats = materias.data;
                setMessage({
                    code: materias.status,
                    msg: `Se han traido todas las materias.`
                });
                const lista = mats.allSubjects.filter(c => c.id_carrera == IdCarrera).map(c => ({
                    label: `Materia ${c.id_materia}`,
                    value: c.id_materia
                }));
                setMateriasList(lista.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0)));
            } else {
                setMessage({
                    code: materias.status,
                    msg: materias.statusText
                })
            }
        }
        obtenerMaterias();
    }, [])

    //const handleSelect = (selectedValue, nomSelected) => {
    //    dispatch(addCarrera({ IdCarrera: selectedValue, nombreCarrera: nomSelected }));
    //};
    const [selectCarreraDisabled, setselectCarreraDisabled] = useState(false);
    const [inputAnio, setinputAnio] = useState(false);
    const [camposList, setCamposList] = useState([]);

    useEffect(() => {

        setMessage({});
        const obtenerMaterias = async () => {
            const materias = await getAllSubjectData();
            if (materias.status === 200) {
                const mats = materias.data;
                setMessage({
                    code: materias.status,
                    msg: `Se han traido todos los campos.`
                });
                const lista = mats.allSubjects.filter(c => c.id_carrera === IdCarrera && c.campo != "" && c.campo !== undefined)
                    .map(c => ({
                        label: c.campo,
                        value: c.campo
                    }));
                const eliminarDuplicados = (arr) => {
                    const map = new Map();
                    return arr.filter(item => !map.has(item.value) && map.set(item.value, true));
                };

                const listaSinDuplicados = eliminarDuplicados(lista);

                setCamposList(listaSinDuplicados);
            } else {
                setMessage({
                    code: materias.status,
                    msg: materias.statusText
                })
            }
        }
        obtenerMaterias();

    }, [IdCarrera]);

    //VARIABLES PARA EL OBJETO A GUARDAR

    const [materia, setmateria] = useState("");
    const [condicion, setCondicion] = useState("");
    const [anio, setAnio] = useState(""); // anio de la cabecera
    const [anioCompleto, setAnioCompleto] = useState(""); // anio de las opciones
    const [cantidad, setCantidad] = useState("");


    const setearAnio = (event) => {
        const valorAnio = event.target.value;
        setAnio(valorAnio);
        setMateriasCondicionList(materiasList);
        setselectCarreraDisabled(!!valorAnio && valorAnio > 0);
    }
    const setearMateria = (valor) => {
        setmateria(valor);
        const lista = materiasList.filter((a) => parseInt(a.value) !== valor)
        setMateriasCondicionList(lista);
        setinputAnio(!!valor);
    }
    const setearCantidad = (event) => {
        const value = event.target.value;
        if (value === '' || value >= 0) {
            setCantidad(value);
        }
    }
    const setearAnioCompleto = (event) => {
            setAnioCompleto(event.target.value);
    }
    const setearCondicion = (valor) => {
        setCondicion(valor);
        if (valor !== "") {
            setSePuedeGuardar(false);
        }
        else {
            setSePuedeGuardar(true);
        }
    }

    //useEffect(()=>{
    //    if (condicion === "N-1" || condicion === "N-2" || condicion === "N-1R-2A") {
    //        setinputAnio(true);
    //        setselectCarreraDisabled(true);
    //    }
    //    else {
    //        setinputAnio(false);
    //        setselectCarreraDisabled(false);
    //    }
    //}, [condicion])

    const [camposSeleccionados, setCamposSeleccionados] = useState([]);
    const setearcamposSeleccionados = (value) => {
        setCamposSeleccionados(value);
    }

    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
    const setearMateriasSeleccionadas = (value) => {
        setMateriasSeleccionadas(value);
    }

    const [exceptuadosSeleccionados, setExceptuadosSeleccionados] = useState([]);
    const setearExceptuadosSeleccionados = (value) => {
        setExceptuadosSeleccionados(value);
    }

    const guardarCondicion = async () => {

        let nuevaCondicion = {
            //key: condicionesList.length,
            id_carrera: IdCarrera,
            //anio: anio,
            //id_materia: materia,
            codigo_condicion: condicion
        }

        if (anio != "") {
            nuevaCondicion.anio = anio;
        }
        else if (materia !== "") {
            nuevaCondicion.id_materia = materia;
        }


        if (condicion === "CAMPOS-COMPLETOS") {
            nuevaCondicion.config_condicion = { campos: camposSeleccionados }
        }
        else if (condicion === "MATERIAS-ESPECIFICAS") {
            nuevaCondicion.config_condicion = { materias: materiasSeleccionadas }
        }
        else if (condicion === "CANT-MATERIAS") {
            if (exceptuadosSeleccionados.length > 0) {
                nuevaCondicion.config_condicion = { cantidad: cantidad, campos_excepto: exceptuadosSeleccionados };
            }
            else {
                nuevaCondicion.config_condicion = { cantidad: cantidad };
            }
        }
        else if (condicion === "ANIOS-COMPLETOS") {
            if (cantidad > 0) {
                nuevaCondicion.config_condicion = { anio: anioCompleto, salvo_cantidad: cantidad };
            }
            else {
                nuevaCondicion.config_condicion = { anio: anioCompleto };
            }
        }
        else if (condicion === "CANT-MATERIAS-ANIO") {
            nuevaCondicion.config_condicion = { anio: anioCompleto, cantidad: cantidad, campos: exceptuadosSeleccionados }
        }
        
            
        
        //console.log(nuevaCondicion);
        const postcondicion = await createConditionUse(nuevaCondicion);

        setearcamposSeleccionados([]);
        setearMateriasSeleccionadas([]);
        setearExceptuadosSeleccionados([]);
        setAnio("");
        setmateria("");
        setCantidad("");
        setAnioCompleto("");
        setSePuedeGuardar(true);
        handleClose();

        if (postcondicion.status === 200) {
            setActualizarTablaCondiciones(!actualizarTablaCondiciones); 
            setMessage({
                code: postcondicion.status,
                msg: `Condicion ID ${postcondicion.data.id_carrera} creada correctamente.`
            })

        } else {
            setMessage({
                code: postcondicion.status,
                msg: postcondicion.statusText
            })
        }
    }


    const eliminarCondicion = async (cond) => {

        let condicionEliminar = {
            id_carrera: cond.obj.id_carrera,
            codigo_condicion: cond.obj.codigo_condicion,
        }

        if (cond.obj.anio) { condicionEliminar.anio = cond.obj.anio }
        if (cond.obj.id_materia) { condicionEliminar.id_materia = cond.obj.id_materia }
        if (cond.obj.config_condicion) {
            condicionEliminar.config_condicion = cond.obj.config_condicion
            if (condicionEliminar.codigo_condicion === "CANT-MATERIAS") {
                if (cond.obj.config_condicion.campos_excepto) {
                    condicionEliminar.config_condicion = { cantidad: cond.obj.config_condicion.cantidad, campos_excepto: cond.obj.config_condicion.campos_excepto };
                }
                else {
                    condicionEliminar.config_condicion = { cantidad: cond.obj.config_condicion.cantidad };
                }
            }
            else if (condicionEliminar.codigo_condicion === "ANIOS-COMPLETOS") {
                if (cond.obj.config_condicion.salvo_cantidad) {
                    condicionEliminar.config_condicion = { anio: cond.obj.config_condicion.anio, salvo_cantidad: cond.obj.config_condicion.salvo_cantidad };
                }
                else {
                    condicionEliminar.config_condicion = { anio: cond.obj.config_condicion.anio };
                }
            }
            else if (condicionEliminar.codigo_condicion === "CANT-MATERIAS-ANIO") {
                condicionEliminar.config_condicion = { anio: cond.obj.config_condicion.anio, cantidad: cond.obj.config_condicion.cantidad, campos: cond.obj.config_condicion.campos }
            }
        }
        
       const deletecondicion = await deleteConditionUse(condicionEliminar);

        if (deletecondicion.status === 200) {
            setActualizarTablaCondiciones(!actualizarTablaCondiciones);
            setMessage({
                code: deletecondicion.status,
                msg: `Se ha eliminado la condición correctamente.`
            })

        } else {
            setMessage({
                code: deletecondicion.status,
                msg: deletecondicion.statusText
            })
        }
    }

    const paginaAnterior = () => {
        navigate('/configuracion/carrera');
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setAnio("");
        setmateria("");
        setCantidad("");
        setAnioCompleto("");
        setinputAnio(false);
        setselectCarreraDisabled(false);
        setOpen(true);
        setSePuedeGuardar(true);
    }
        
    const handleClose = () => setOpen(false);

    return (
    
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column' },
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    marginTop: 3,
                    marginBottom: 3
                }}>
                <Box
                    sx={{
                        maxWidth: '500px',
                    }}>
                    <Box
                        sx={{
                            marginBottom: '50px'
                        }}>
                        <Box>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            marginBottom:'10px'
                                        }}>
                                        <Typography variant="h6" >
                                            Nueva condición
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '5px',
                                        marginBottom: '10px'
                                    }}>
                                        <FormControl sx={{
                                            width: '100px'
                                        }}>
                                            <OutlinedInput
                                                disabled={inputAnio}
                                                type="number"
                                                title="Coloque el número del año, ejemplo 2"
                                                sx={{
                                                    '& input': {
                                                        textAlign: 'center',
                                                        height: '7px'
                                                    }
                                                }}
                                                placeholder="Año" onInput={ setearAnio } />
                                        </FormControl>
                                        <Box sx={{
                                            width: '100%',
                                            overflow: 'hidden'
                                        }}>
                                            <SelectComponent options={materiasList} onSelect={setearMateria} className={'selectcarreras'} placeholder='Seleccione Materia' disabled={selectCarreraDisabled} />
                                        </Box>
                                        
                                    </Box>
                                    <Box
                                        sx={{
                                            marginBottom: '10px'
                                        }}>
                                        <SelectComponent options={tiposCondicionList} onSelect={setearCondicion} className={'selectcarreras'} placeholder='Seleccione Condiciones' />
                                    </Box>
                                    {
                                        condicion == "CAMPOS-COMPLETOS" && (

                                            <Box sx={{
                                                width:'100%',
                                                overflow: 'hidden'
                                            }}>
                                                {/*<SelectMultipleR options={camposList} onSelect={setearcamposSeleccionados} className={'selectcarreras'} placeholder='Seleccione Campos' style={{ whiteSpace: 'nowrap' }} />*/}
                                                <SelectMultipleAR options={camposList} onSelect={setearcamposSeleccionados}  placeholder='Seleccione Campos'></SelectMultipleAR>
                                            </Box>
                                                
                                        )
                                    }
                                    {
                                        condicion == "MATERIAS-ESPECIFICAS" && (

                                            <Box sx={{
                                                width:'100%',
                                                overflow: 'hidden'
                                            }}>
                                                {/*<SelectMultipleR options={materiasCondicionList} onSelect={setearMateriasSeleccionadas} className={'selectcarreras'} placeholder='Seleccione Materias' style={{ whiteSpace: 'nowrap' }} />*/}
                                                <SelectMultipleAR options={materiasCondicionList} onSelect={setearMateriasSeleccionadas} placeholder='Seleccione Materias'></SelectMultipleAR>
                                            </Box>
                                        )
                                    }
                                    {
                                        condicion == "CANT-MATERIAS" && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '5px',
                                                    justifyContent: 'center',
                                                }}>
                                                <FormControl sx={{
                                                    width: '100px'
                                                }}>
                                                    <OutlinedInput
                                                        type='number'
                                                        title="Coloque la cantidad de materias, ejemplo 12"
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                            }
                                                        }}
                                                        placeholder="Cant" onInput={ setearCantidad } />
                                                </FormControl>
                                                <Box sx={{
                                                    width: '100%',
                                                    overflow: 'hidden'
                                                    
                                                }}>
                                                    {/*<SelectMultipleR options={camposList} onSelect={setearExceptuadosSeleccionados} className={'selectcarreras'} placeholder='Seleccione Campos Exceptuados' style={{ whiteSpace: 'nowrap' }} />*/}
                                                    <SelectMultipleAR options={camposList} onSelect={setearExceptuadosSeleccionados} placeholder='Seleccione Campos Exceptuados'></SelectMultipleAR>
                                                </Box>
                                                
                                            </Box>
                                        )
                                    }
                                    {
                                        condicion == "ANIOS-COMPLETOS" && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    justifyContent: 'center',
                                                }}>
                                                <FormControl sx={{
                                                    width: '100%'
                                                }}>
                                                    <OutlinedInput
                                                        type="number"
                                                        title="Coloque el número del año que debe estar completo."
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 0px 16.5px 0px'
                                                            }
                                                        }}
                                                        placeholder="Año" onInput={setearAnioCompleto} />
                                                </FormControl>
                                                <FormControl sx={{
                                                    width: '100%'
                                                }}>
                                                    <OutlinedInput
                                                        type="number"
                                                        title="Coloque la cantidad de materias exceptuadas."
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 5px 16.5px 5px'
                                                            }
                                                        }}
                                                        placeholder="Salvo Cantidad" onInput={setearCantidad} />
                                                </FormControl>
                                            </Box>
                                        )
                                    }
                                    {
                                        condicion == "CANT-MATERIAS-ANIO" && (
                                            <Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '10px',
                                                        marginBottom:'10px'
                                                    }}>
                                                    <FormControl sx={{
                                                        width: '100%'
                                                    }}>
                                                        <OutlinedInput
                                                            type="number"
                                                            sx={{
                                                                '& input': {
                                                                    textAlign: 'center',
                                                                    height: '7px',
                                                                    padding: '16.5px 0px 16.5px 0px'
                                                                }
                                                            }}
                                                            placeholder="Año" onInput={setearAnioCompleto} />
                                                    </FormControl>
                                                    <FormControl sx={{
                                                        width: '100%'
                                                    }}>
                                                        <OutlinedInput
                                                            type="number"
                                                            sx={{
                                                                '& input': {
                                                                    textAlign: 'center',
                                                                    height: '7px',
                                                                    padding: '16.5px 0px 16.5px 0px'
                                                                }
                                                            }}
                                                            placeholder="Cantidad" onInput={setearCantidad} />
                                                    </FormControl>
                                                    
                                                </Box>

                                                <Box>
                                                    {/*<SelectMultipleR options={camposList} onSelect={setearExceptuadosSeleccionados} className={'selectcarreras'} placeholder='Seleccione Campos' style={{ whiteSpace: 'nowrap' }} />*/}
                                                    <SelectMultipleAR options={camposList} onSelect={setearExceptuadosSeleccionados} placeholder='Seleccione Campos'></SelectMultipleAR>
                                                </Box>
                                            </Box>

                                        )
                                    }
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: '25px'
                                        }}>

                                        <Button variant="contained" disabled={ sePuedeGuardar } onClick={guardarCondicion}>
                                            Guardar
                                        </Button>
                                    </Box>
                                    
                                </Box>
                            </Modal>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography variant="h4" >
                                {nombreCarrera}
                            </Typography>
                            <Tooltip title="Crear una nueva condición.">
                                <IconButton color="primary" aria-label="editar" sx={{ width: '40px' }} onClick={handleOpen}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            overflowY: 'auto', display: 'flex',
                            flexDirection: { xs: 'column' },
                            alignItems: 'center',
                            bgcolor: 'background.default',

                             }}>
                            <TableContainer component={Paper} sx={{  maxHeight: '350px', border:'1px #E4E4E4 solid' }} >
                                <Table stickyHeader aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '' }}>
                                            <TableCell sx={{ backgroundColor: '', color: '#333333' }} align="center">Año</TableCell>
                                            <TableCell sx={{ backgroundColor: '', color: '#333333' }} align="center">Materia</TableCell>
                                            <TableCell sx={{ backgroundColor: '', color: '#333333' }} align="center">Tipo de restricción</TableCell>
                                            <TableCell sx={{ backgroundColor: '', color: '#333333' }} align="center">Condiciones</TableCell>
                                            <TableCell sx={{ backgroundColor: '', color: '#333333' }} align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            condicionesList.length === 0 ? (
                                                <TableRow
                                                    key={""}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" colSpan={5} align="center">
                                                        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                                                            No hay condiciones.
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (

                                            condicionesList.map((row) => (
                                            <TableRow
                                                key={row.key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {row.anio}
                                                </TableCell>
                                                    <TableCell align="center">{row.materia}</TableCell>
                                                    <TableCell align="center">{row.codigo_condicion}</TableCell>
                                                    <TableCell align="center">
                                                        {typeof row.config_condicion === 'string' ? row.config_condicion.split('-').map((c, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {c}
                                                                {idx < row.config_condicion.split('-').length - 1 && <br />}
                                                    </React.Fragment>
                                                        )) : row.config_condicion}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {/*<IconButton color="primary" aria-label="editar" sx={{ width: '40px' }}*/}
                                                    {/*    <EditIcon />*/}
                                                    {/*</IconButton>*/}
                                                    <Tooltip title="Eliminar condición.">
                                                            <IconButton aria-label="eliminar" onClick={ () => eliminarCondicion(row) } sx={{ width: '40px', color:'red' }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>)
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            marginBottom: '20px'
                        }}>
                        <Button variant="contained" onClick={paginaAnterior} startIcon={<ArrowCircleLeftIcon />}>
                            Volver
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ConfiguracionCondicionCarrera;