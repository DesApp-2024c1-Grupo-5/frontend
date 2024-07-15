// listado condiciones carrera



import axios from 'axios';

const baseURL = 'http://localhost:3001/api'


export const getAllSuggestionConditionUse = async () => {
    try {
        const response = await axios.get(`${baseURL}/registrationsuggestionconditionuse/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const createConditionUse = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/registrationsuggestionconditionuse/`, data);
        return response;
    }
    catch (error) {
        return error;
    }
}

export const deleteConditionUse = async (filtro) => {
    try {
        // const flattenedFiltro =  {
        //     ...filtro,
        //     config_condicion: JSON.stringify(filtro.config_condicion)
        // };
        if(filtro.config_condicion) { filtro.config_condicion = JSON.stringify(filtro.config_condicion)}
        console.log(filtro)
        const queryParams = new URLSearchParams(filtro).toString();
        //console.log(queryParams);
        const response = await axios.delete(`${baseURL}/registrationsuggestionconditionuse/?${queryParams}`);
        //const response = await axios.delete(`${baseURL}/registrationsuggestionconditionuse/`, { data: filtro });
        return response;
    }
    catch (error) {
        return error;
    }
}
