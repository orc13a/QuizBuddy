import { AppShell, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TeacherRoute from "./components/routes/TeacherRoute";
import StudentRoute from "./components/routes/StudentRoute";
import Frontpage from './components/public/Frontpage/Frontpage';
import Login from "./components/public/Login/Login";
import Signup from "./components/public/Signup/Signup";
import TeacherHome from "./components/teacher/Home/Home";
import TeacherTeams from "./components/teacher/Teams/Teams";
import TeacherCreateTeam from './components/teacher/CreateTeam/CreateTeam';
import TeacherTeam from "./components/teacher/Team/Team";
import StudentHome from './components/student/Home/Home';
import StudentTeams from "./components/student/Teams/Teams";
import StudentJoinTeam from "./components/student/JoinTeam/JoinTeam";
import StudentTeam from "./components/student/Team/Team";
import TeacherCreateAssignment from "./components/teacher/CreateAssignment/CreateAssignment";
import TeacherProfile from "./components/teacher/Profile/Profile";
import StudentProfile from "./components/student/Profile/Profile";
import TeacherAssignment from "./components/teacher/Assignment/Assignment";
import TeacherCreateQuestion from "./components/teacher/CreateQuestion/CreateQuestion";
import TeacherQuestion from "./components/teacher/Question/Question";
import StudentAssignment from "./components/student/Assignment/Assignment";

function App() {
    const t = useMantineTheme();

    useEffect(() => {
        if (t.colorScheme === 'dark') {
            document.body.style.backgroundColor = t.colors.dark[8];
        } else {
            document.body.style.backgroundColor = t.colors.gray[0];
        }
    });

    return (
        <AppShell
            style={{ minHeight: '100vh' }}
            padding={8}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Routes>
                {/* #### Public #### */}
                <Route index path="/" element={<Frontpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* #### Teacher #### */}
                <Route path="/teacher/forside" element={
                    <TeacherRoute>
                        <TeacherHome />
                    </TeacherRoute>
                } />
                <Route path="/teacher/profil" element={
                    <TeacherRoute>
                        <TeacherProfile />
                    </TeacherRoute>
                } />
                <Route path="/teacher/hold" element={
                    <TeacherRoute>
                        <TeacherTeams />
                    </TeacherRoute>
                } />
                <Route path="/teacher/hold/opret" element={
                    <TeacherRoute>
                        <TeacherCreateTeam />
                    </TeacherRoute>
                } />
                <Route path="/teacher/hold/:teamId" element={
                    <TeacherRoute>
                        <TeacherTeam />
                    </TeacherRoute>
                } />
                <Route path="/teacher/opgave/opret" element={
                    <TeacherRoute>
                        <TeacherCreateAssignment />
                    </TeacherRoute>
                } />
                <Route path="/teacher/opgave/:assignmentId" element={
                    <TeacherRoute>
                        <TeacherAssignment />
                    </TeacherRoute>
                } />
                <Route path="/teacher/opgave/spoergsmaal/opret/:assignmentId" element={
                    <TeacherRoute>
                        <TeacherCreateQuestion />
                    </TeacherRoute>
                } />
                <Route path="/teacher/opgave/:assignmentId/spoergsmaal/:questionId" element={
                    <TeacherRoute>
                        <TeacherQuestion />
                    </TeacherRoute>
                } />
                {/* #### Student #### */}
                <Route path="/student/forside" element={
                    <StudentRoute>
                        <StudentHome />
                    </StudentRoute>
                } />
                <Route path="/student/profil" element={
                    <StudentRoute>
                        <StudentProfile />
                    </StudentRoute>
                } />
                <Route path="/student/hold" element={
                    <StudentRoute>
                        <StudentTeams />
                    </StudentRoute>
                } />
                <Route path="/student/hold/tilslut" element={
                    <StudentRoute>
                        <StudentJoinTeam />
                    </StudentRoute>
                } />
                <Route path="/student/hold/:teamId" element={
                    <StudentRoute>
                        <StudentTeam />
                    </StudentRoute>
                } />
                <Route path="/student/opgave/:assignmentId" element={
                    <StudentRoute>
                        <StudentAssignment />
                    </StudentRoute>
                } />
            </Routes>
        </AppShell>
    );
}

export default App;
