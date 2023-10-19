export const API_URL = 'http://localhost:25784/api/v1/';

export const TAREA = {
    GETBYID: `${API_URL}?userId=1&limit=10`,
    GET: `${API_URL}Tarea`,
    DELETE: `${API_URL}Tarea`,
    ADD: `${API_URL}Tarea`,
    PUT: `${API_URL}Tarea`
}

export const CATEGORIA = {
    GETBYID: `${API_URL}Categoria`,
    GET: `${API_URL}Categoria`,
    DELETE: `${API_URL}Categoria`,
    ADD: `${API_URL}Categoria`,
    PUT: `${API_URL}Categoria`
}

export const ENDPOINTS = {
    TAREA,
    CATEGORIA
}