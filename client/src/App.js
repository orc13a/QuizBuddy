import { AppShell, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Frontpage from './components/public/Frontpage/Frontpage';
import Login from "./components/public/Login/Login";
import Signup from "./components/public/Signup/Signup";
import TeacherHome from "./components/teacher/Home/Home";

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
                {/* Public */}
                <Route index path="/" element={<Frontpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Teacher */}
                <Route path="/teacher/forside" element={<TeacherHome />} />
                {/* Student */}
            </Routes>
        </AppShell>
    );
}

export default App;
