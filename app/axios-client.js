import axios from 'axios';
import SecureStore from "@react-native-async-storage/async-storage/src";

const axiosClient = axios.create({
    baseURL: 'http://139.162.186.130:3000/api',
});


//SecureStoreage
axiosClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItem('ACCESS_TOKEN');

            //console.warn("token in storage ", token)
            config.headers.Authorization = `Bearer ${token}`;

        } catch (error) {
            console.error('Error reading ACCESS_TOKEN:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            try {
                await SecureStore.removeItem('ACCESS_TOKEN');
            } catch (removeError) {
                console.error('Error removing ACCESS_TOKEN:', removeError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
