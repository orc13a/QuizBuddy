import EmptyState from "../../EmptyState/EmptyState";
import Navbar from "../Navbar/Navbar";
import ConfusedImg from '../../../images/confused.png';

export default function StudentHome() {
    return (
        <>
            <Navbar>
                { false ? null : (
                    <EmptyState
                    image={ ConfusedImg }
                    text="Her er helt tomt" 
                    />
                )}
            </Navbar>
        </>
    );
}