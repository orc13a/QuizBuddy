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
export const getTeacher = () => api.get('teachers/teacher');
export const teacherCreateTeam = (data) => api.post('teachers/teams/create', data);
export const teacherGetTeams = () => api.get('teachers/teams/get/all');
export const teacherGetTeamsSelect = () => api.get('teachers/teams/get/select');
export const teacherGetTeam = (teamId) => api.get(`teachers/teams/get/${teamId}`);
export const teacherDeleteTeam = (teamId) => api.post(`teachers/teams/delete/${teamId}`, '');
export const teacherRemoveStudentTeam = (data) => api.post(`teachers/teams/remove/student`, data);

// Student 
export const studentRF = () => api.post('r_t/student', '');
export const getStudent = () => api.get('students/student');
export const studentGetTeam = (teamId) => api.get(`students/teams/get/${teamId}`);
export const studentLeaveTeam = (teamId) => api.post(`students/teams/leave/${teamId}`);
export const studentConnectFindTeam = (data) => api.post('/students/teams/find', data);
export const studentConnectTeam = (data) => api.post('/students/teams/join', data);
export const studentStartAssignment = (data) => api.post(`/students/assignment/${data.assignmentId}/start`);
export const studentGetQuestion = (data) => api.get(`/students/assignment/${data.assignmentId}/get/question/${data.questionId}`);
export const studentGetQuestionByIndex = (data) => api.get(`/students/assignment/${data.assignmentId}/getIndex/question/${data.questionId}`);
export const studentAnswerQuestion = (data) => api.post(`/students/assignment/${data.assignmentId}/question/${data.questionId}/answer`);

// Assignments
export const getAssignment = (id) => api.get(`assignments/get/${id}`);
export const studentGetAssignment = (id) => api.get(`assignments/student/get/${id}`);
export const createAssignment = (data) => api.post('assignments/create', data);
export const deleteAssignment = (data) => api.post('assignments/delete', data);
export const createQuestion = (data) => api.post('assignments/question/create', data);
export const getQuestion = (data) => api.get(`assignments/get/${data.assignmentId}/question/${data.questionId}`);
export const deleteQuestion = (data) => api.post('assignments/question/delete', data);