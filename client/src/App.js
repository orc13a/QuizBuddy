import { Routes, Route } from "react-router-dom";
import Frontpage from './components/public/Frontpage/Frontpage';
import Login from "./components/public/Login/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Frontpage /> } />
            <Route path="/login" element={ <Login /> } />
        </Routes>
    );
}

export default App;
