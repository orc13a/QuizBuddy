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
export const login = (data) => api.post('public/login', data);
export const logout = () => api.post('public/logout', '');

// Teacher
export const teacherRF = () => api.post('r_t/teacher', '');
export const teacherCreateTeam = (data) => api.post('teachers/teams/create', data);
export const teacherGetTeams = () => api.get('teachers/teams/get');