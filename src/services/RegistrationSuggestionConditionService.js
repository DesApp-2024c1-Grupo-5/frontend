// listado registracion condiciones


import axios from 'axios';

const baseURL = 'http://localhost:3001/api'


export const getAllSuggestionCondition = async () => {
    try {
        const response = await axios.get(`${baseURL}/SuggestionCondition/`);
        return response;
    } catch (error) {
        return error;
    }
}
