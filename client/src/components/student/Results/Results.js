import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Table } from '@mantine/core';

export default function StudentResults() {
    const { assignmentId } = useParams();

    return (
        <>
            <Navbar />

        </>
    );
}