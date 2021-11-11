import { Routes, Route } from "react-router-dom";
import Frontpage from './components/public/Frontpage/Frontpage';
import Login from "./components/public/Login/Login";
import Signup from "./components/public/Signup/Signup";

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Frontpage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
        </Routes>
    );
}

export default App;
