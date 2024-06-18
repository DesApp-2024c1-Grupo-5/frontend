import axios from 'axios';

const baseURL = 'http://localhost:3001/api'

/**
 * Obtener la configuracion de una carrera
 * @param {*} careerId es el ID de carrera
 * @returns una lista que puede contener o no el dato.
 */
export const getCurrentConfigCareer = async(careerId)  => {
    try {
        const response = await axios.get(`${baseURL}/carreras`, {params:{careerId}});
        return response;
    } catch (error) {
        return error;
    }
}

//Actualizar una carrera

export const updateOneCareer = async(data) => {
    try{
        const response = await axios.put(`${baseURL}/carreras`,data);
        return response;
    }
    catch(error){
        return error;
    }
}

//obtener todas las carreras
export const getAllCareer = async() => {
    //TODO hacer este metodo.
}

