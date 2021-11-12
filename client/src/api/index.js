import axios from 'axios';
import { getAccessToken } from '../accessToken';

// Dev
const api = axios.create({
    baseURL: 'http://localhost:2000/',
    withCredentials: true,
    credentials: 'include'
});
// Pro
// const api = axios.create({
//     baseURL: '',
//     withCredentials: true,
//     credentials: 'include'
// });

api.interceptors.request.use((req) => {
    const token = 'bearer ' + getAccessToken();
    req.headers['authorization'] = token;

    return req;
});

// Public
export const signup = (data) => api.post('public/signup', data);

// Teacher
export const teacherRF = () => api.post('r_t/teacher', '');