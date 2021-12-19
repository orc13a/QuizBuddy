import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Accordion, Button, Card, Divider, Skeleton, Space, Table, Text } from '@mantine/core';
import { useEffect, useState } from "react";
import { teacherGetResults } from "../../../api";
import { useNotifications } from "@mantine/notifications";

export default function TeacherResults() {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const { assignmentId, assignmentName } = useParams();
    const [students, setStudents] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    let nr = 0;

    useEffect(() => {
        teacherGetResults(assignmentId)
            .then((res) => {
                if (res.data.results.length === 0 && isFetching) {
                    notifications.showNotification({
                        title: 'Ingen resultater',
                        message: 'Ingen elever har besvaret denne opgave',
                        color: 'yellow',
                        autoClose: 5000
                    });
                } else {
                    setStudents(res.data.results);
                }

                setIsFetching(false);
            }).catch((err) => {
                console.error(err);
            });
    }, [isFetching]);

    const createRow = (row) => {
        nr++;
        return (
            <>
                <tr key={nr}>
                    <td style={{ width: '30px' }}>
                        { nr }
                    </td>
                    <td style={{ maxWidth: '100px' }}>
                        { row.questionTitle }
                    </td>
                    <td style={{ maxWidth: '100px' }}>
                        { row.questionText }
                    </td>
                    <td style={{ maxWidth: '100px' }}>
                        { row.questionAnswer }
                    </td>
                    <td style={{ maxWidth: '100px' }}>
                        { row.answer }
                    </td>
                    <td style={{ fontSize: '18px', width: '50px', textAlign: 'center' }}>
                        { row.questionAnswer.length > 0 ? (
                            <>
                                { row.isAnswerCorrect ? '✅' : '❌' }
                            </>
                        ) : '' }
                    </td>
                </tr>
            </>
        );
    }

    const createAccordion = (student) => {
        nr = 0;
        return (
            <>
                <Accordion>
                    <Accordion.Item label={student.firstname + ' ' + student.lastname}>
                        <Card withBorder>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Nr.</th>
                                        <th>Spørgsmål title</th>
                                        <th>Spørgsmål</th>
                                        <th>Rigtige svar</th>
                                        <th>Dit svar</th>
                                        <th>Rigtigt</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'left' }}>
                                    { student.userResults.map(r => (
                                        createRow(r)
                                    )) }
                                </tbody>
                            </Table>
                        </Card>
                    </Accordion.Item>
                </Accordion>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main style={{ textAlign: 'center' }}>
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Card radius="md" withBorder>
                        <div style={{ textAlign: 'left' }}>
                            <Button onClick={() => navigate(-1)} color="indigo" variant="outline" style={{ display: 'inline-block', marginRight: '25px' }}>
                                Tilbage
                            </Button>
                            <Text style={{ display: 'inline-block', fontSize: '26px', fontWeight: 600, position: 'relative', top: '4px' }}>
                                {assignmentName}
                            </Text>
                        </div>
                        <Space h="md" />
                        <Divider />
                        <Space h="md" />
                        {/* <Accordion> */}
                            { students.map(s => (
                                createAccordion(s)
                            )) }
                        {/* </Accordion> */}
                    </Card>
                </div>
            </main>
        </>
    );
}