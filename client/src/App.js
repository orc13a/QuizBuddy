import { Routes, Route } from "react-router-dom";
import Frontpage from './components/Frontpage/Frontpage';

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Frontpage /> } />
        </Routes>
    );
}

export default App;
