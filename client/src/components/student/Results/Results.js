import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Button, Card, Divider, Skeleton, Space, Table, Text } from '@mantine/core';
import { useEffect, useState } from "react";
import { studentGetResults } from "../../../api";
import { useNotifications } from "@mantine/notifications";

export default function StudentResults() {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const { assignmentId, assignmentName } = useParams();
    const [rows, setRows] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    let nr = 0;

    useEffect(() => {
        studentGetResults(assignmentId)
            .then((res) => {
                if (res.data.studentResults.length === 0 && isFetching) {
                    notifications.showNotification({
                        title: 'Ingen resultater',
                        message: 'Du har ikke besvaret denne opgave',
                        color: 'yellow',
                        autoClose: 5000
                    });
                } else {
                    setRows(res.data.studentResults);
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
        )
    }

    return (
        <>
            <Navbar />
            <main style={{ textAlign: 'center' }}>
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Card radius="md" withBorder>
                        <div style={{ textAlign: 'left' }}>
                            <Button onClick={ () => navigate(-1) } color="indigo" variant="outline" style={{ display: 'inline-block', marginRight: '25px' }}>
                                Tilbage
                            </Button>
                            <Text style={{ display: 'inline-block', fontSize: '26px', fontWeight: 600, position: 'relative', top: '4px' }}>
                                { assignmentName }
                            </Text>
                        </div>
                        <Space h="md" />
                        <Divider />
                        <Space h="md" />
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
                                { isFetching ? (
                                    <>
                                        <tr key="0-1">
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                        </tr>
                                        <tr key="0-2">
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                        </tr>
                                        <tr key="0-3">
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                            <td><Skeleton height={35} /></td>
                                        </tr>
                                    </>
                                ) : 
                                    rows.map((row) => (
                                        createRow(row)
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </main>
        </>
    );
}