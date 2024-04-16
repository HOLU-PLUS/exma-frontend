import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_HOST_BACKEND } = getEnvVariables();

// Creamos una función que devuelve la instancia de axios con el host deseado
const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL: `${baseURL}/api`
    });

    instance.interceptors.request.use((request) => {
        const tokenAux = localStorage.getItem(`tokenAux`);
        const token = localStorage.getItem(`token`);
        if (tokenAux) request.headers.set('Authorization', `Bearer ${tokenAux}`);
        if (token) request.headers.set('Authorization', `Bearer ${token}`);
        return request;
    });

    return instance;
};

export const coffeApi = createAxiosInstance(VITE_HOST_BACKEND);
