import axios from 'axios';

//Not gonna put this on .env to be more easy to test the code
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
        console.error('Erro get cats', error);
        throw error;
    }
};

export const voteForCat = async (imageId: string, value: 1 | -1, subId?: string) => {
    try {
        const response = await api.post('/votes', {
            image_id: imageId,
            sub_id: subId,
            value,
        });

        return response.data;
    } catch (error) {
        console.error('Error api image vote:', error);
        throw error;
    }
};


export default api;
