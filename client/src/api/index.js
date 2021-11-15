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
export const getTeacher = () => api.post('teachers/teacher', '');
export const teacherCreateTeam = (data) => api.post('teachers/teams/create', data);
export const teacherGetTeams = () => api.get('teachers/teams/get/all');
export const teacherGetTeam = (teamId) => api.get(`teachers/teams/get/${teamId}`);
export const teacherDeleteTeam = (teamId) => api.post(`teachers/teams/delete/${teamId}`, '');

// Student 
export const studentRF = () => api.post('r_t/student', '');
export const studentConnectFindTeam = (data) => api.post('/students/teams/find', data);
export const studentConnectTeam = (data) => api.post('/students/teams/join', data);