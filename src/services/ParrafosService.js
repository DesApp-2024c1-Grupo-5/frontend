import axios from 'axios';

const baseURL = 'http://localhost:3001/api'

/**
 * Crear un nuevo párrafo
 * @param {object} data - Los datos del nuevo párrafo
 * @returns {Promise<object>} - La respuesta del servidor
 */
export const createParrafo = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/parrafos`, data);
        return response.data; // Asumiendo que quieres devolver solo los datos, no el objeto completo de respuesta.
    } catch (error) {
        return error;
    }
}

/**
 * Actualizar la configuración de un párrafo
 * @param {object} data - Los datos del párrafo a actualizar
 * @returns {Promise<object>} - La respuesta del servidor
 */
export const updateOneParrafo = async (data) => {
    try {
        console.log(data);
        const response = await axios.put(`${baseURL}/parrafos`, data);
        return response.data; // Asumiendo que quieres devolver solo los datos, no el objeto completo de respuesta.
    } catch (error) {
        return error;
    }
};
/**
 * Obtener todas las configuraciones de párrafos
 * @returns {Promise<Array>} - Una lista de todas las configuraciones de párrafos
 */
export const getAllParrafos = async () => {
    try {
        const response = await axios.get(`${baseURL}/parrafos`);
        return response; // Retornar solo los datos
    } catch (error) {
        console.error('Error fetching all paragraphs:', error);
        throw error; // Lanzar el error para que la función llamante lo maneje
    }
};
/**
 * Eliminar un párrafo por ID
 * @param {string} parrafoId - El ID del párrafo
 * @returns {Promise<object>} - La respuesta del servidor
 */
export const deleteOneParrafo = async (parrafoKey) => {
    try {
        const response = await axios.delete(`${baseURL}/parrafos`, { data: { key: parrafoKey } });
        return response;
    } catch (error) {
        console.error('Error deleting paragraph:', error);
        throw error;
    }
};