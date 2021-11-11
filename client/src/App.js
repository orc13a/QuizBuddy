import { Routes, Route } from "react-router-dom";
import Frontpage from './components/public/Frontpage/Frontpage';
import Login from "./components/public/Login/Login";
import Signup from "./components/public/Signup/Signup";
import TeacherHome from "./components/teacher/Home/Home";

function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={ <Frontpage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            {/* Teacher */}
            <Route path="/teacher/" element={ <TeacherHome /> } />
            {/* Student */}
        </Routes>
    );
}

export default App;
