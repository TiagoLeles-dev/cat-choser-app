import axios from 'axios';


const API_KEY_CAT = 'live_atgYmdwPUqndGiPcVHgidX97pzGc3Xq8bYV4GeyoAR6lkuVtoc2koInnl7EXgY0f'

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY_CAT,
    },
});


export const getCats = async (limit = 20) => {
    try {
        const response = await api.get('/images/search', {
            params: {
                limit,
                has_breeds: 1,
            },
        });
        console.log("🚀 ~ getCats ~ response.data:", response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar gatos:', error);
        throw error;
    }
};

// Exporta a instância do Axios para reutilizar em outros endpoints
export default api;
