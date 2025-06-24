import axios from 'axios';

const URL_BASE = "http://localhost:5000";

export const traerPreciosPorCategoria = async () => {
    const respuesta = await axios.get(`${URL_BASE}/precios-por-categoria`);
    return respuesta.data;
};

export const traerProductosPorMarca = async () => {
    const respuesta = await axios.get(`${URL_BASE}/productos-por-marca`);
    return respuesta.data;
};