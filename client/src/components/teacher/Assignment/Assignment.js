import { Accordion, Button, Card, Divider, Loader, Space, Title, Text, Modal, ActionIcon, Tooltip } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteAssignment, getAssignment } from '../../../api/index.js';
import { checkDatePastToday } from '../../checkDatePastToday.js';
import LoadingCard from '../../LoadingCard/LoadingCard.js';
import Navbar from '../Navbar/Navbar';

export default function TeacherAssignment() {
    const { assignmentId } = useParams();
    const tId = assignmentId.teamId;
    // const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [assignment, setAssignment] = useState(null);
    const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] = useState(false);
    const [deletingAssignment, setDeletingAssignment] = useState(false);
    const [deleteAssignmentLoading, setDeleteAssignmentLoading] = useState(false);

    useEffect(() => {
        getAssignment(assignmentId).then((res) => {
            if (res.data === null && assignment !== null) {
                notifications.showNotification({
                    title: 'Ops...',
                    message: 'Opgave findes ikke',
                    color: 'red'
                });
                navigate(`/teacher/hold/${tId}`, { replace: true });
            }
            setAssignment(res.data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            if (err.response !== undefined) {
                navigate(`/teacher/hold/${tId}`, { replace: true });
            }
        });
    }, [assignment]);

    const deleteAssignmentClick = () => {
        setDeleteAssignmentLoading(true);
        setDeletingAssignment(true);
        deleteAssignment({ assignmentId, teamId: assignment.teamId }).then((res) => {
            notifications.showNotification({
                title: 'Slettet',
                message: res.data.message,
                color: 'teal'
            });
            navigate(`/teacher/hold/${tId}`, { replace: true });
        }).catch((err) => {
            console.error(err);
            notifications.showNotification({
                title: 'Ops...',
                message: 'Der opstod en fejl, prøv igen',
                color: 'red'
            });
            setDeleteAssignmentLoading(false);
            setDeletingAssignment(false);
        });
    }

    const jumpToicon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
        </svg>
    );

    // <div className="center">
    //  <Loader color="indigo" size="xl" variant="dots" />
    // </div>

    return (
        <>
            <Navbar>
                {/* <div className="center"> */}
                    { fetching ? (
                        <LoadingCard align="middle" />
                    ) : (
                        <>
                            <Modal
                            opened={showDeleteAssignmentModal}
                            hideCloseButton={deletingAssignment}
                            closeOnClickOutside={!deletingAssignment}
                            onClose={ () => setShowDeleteAssignmentModal(false) }
                            title={<Title order={3}>Slet opgave '{assignment.name}'</Title>}
                            >
                                <Text>
                                    Er du sikker på at du vil slette denne opgave<br />
                                    Denne handling kan ikke fortrydes.
                                </Text>
                                <Space h="md" />
                                <Button size="md" radius="md" onClick={ () => setShowDeleteAssignmentModal(false)} disabled={deletingAssignment} color="indigo">
                                    Fortryd
                                </Button>
                                <Button size="md" radius="md" onClick={ deleteAssignmentClick } loading={deleteAssignmentLoading} color="red" variant="light" style={{ float: 'right' }}>
                                    Slet
                                </Button>
                            </Modal>
                            <div className="centerH-o">
                                <div className="centerH-i">
                                    <Card withBorder style={{ width: 300 }}>
                                    {/* <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={deleteAssignmentLoading} /> */}
                                        <div style={{ textAlign: 'center' }}>
                                            <Title order={2}>
                                                { assignment.name }
                                            </Title>
                                        </div>
                                        <Space h="lg" />
                                        <Divider />
                                        <Space h="lg" />
                                        <div style={{ padding: '0px 15px' }}>
                                            <Text size="lg">
                                                <div>
                                                    <span>
                                                        Antal spørgsmål:
                                                    </span>
                                                    <span style={{ float: 'right' }}>
                                                        { assignment.questions.length }
                                                    </span>
                                                </div>
                                                <Space h="md" />
                                                <div>
                                                    <span>
                                                        Tid:
                                                    </span>
                                                    <span style={{ float: 'right' }}>
                                                        { assignment.timeType === 'limit' ? (
                                                                assignment.timeLimitHours + ' t. ' + assignment.timeLimitMinutes + ' min'
                                                        ) : 'Tidstagning' }
                                                    </span>
                                                </div>
                                                <Space h="md" />
                                                <div>
                                                    <span>
                                                        Frist:
                                                    </span>
                                                    <span style={{ float: 'right' }}>
                                                        { checkDatePastToday(assignment.openToDate) ? (
                                                            <>
                                                                <Tooltip label={assignment.openTo}>
                                                                    <Text style={{ cursor: 'default' }} color="red">
                                                                        Lukket
                                                                    </Text>
                                                                </Tooltip>
                                                            </>
                                                        ) : assignment.openTo }
                                                    </span>
                                                </div>
                                            </Text>
                                        </div>
                                        <Space h="lg" />
                                        <Accordion>
                                            <Accordion.Item label="Elever påbegyndt opgave">
                                                { assignment.studentsStarted.length === 0 ? (
                                                    <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                        <Text size="sm">
                                                            Ingen elever påbegyndt opgave
                                                        </Text>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Space h="md" />
                                                        { assignment.studentsStarted.map((student) => (
                                                            <>
                                                                <Card style={{ cursor: 'pointer' }} withBorder radius="md">
                                                                    <div style={{ display: 'inline-block', width: '90%', position: 'relative', bottom: 2 }}>
                                                                        { student.firstname } { student.lastname }
                                                                    </div>
                                                                    <div style={{ display: 'inline-block', width: '10%' }}>
                                                                        {/* plads til ikon */}
                                                                    </div>
                                                                </Card>
                                                                <Space h="md" />
                                                            </>
                                                        )) }
                                                    </>
                                                ) }
                                            </Accordion.Item>
                                        </Accordion>
                                        <Space h="lg" />
                                        <Accordion>
                                            <Accordion.Item label="Se spørgsmål">
                                                { assignment.questions.length === 0 ? (
                                                    <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                        <Text size="sm">
                                                            Ingen spørgsmål i denne opgave
                                                        </Text>
                                                    </div>
                                                ) : (
                                                    <>  
                                                        <Space h="md" />
                                                        { assignment.questions.map((question) => (
                                                            <>
                                                                <Link to={`/teacher/opgave/${question.assignmentId}/spoergsmaal/${question.questionId}`}>
                                                                    <Card style={{ cursor: 'pointer' }} withBorder radius="md">
                                                                        <div style={{ display: 'inline-block', width: '90%', position: 'relative', bottom: 2 }}>
                                                                            { question.title }
                                                                        </div>
                                                                        <div style={{ display: 'inline-block', width: '10%' }}>
                                                                            <ActionIcon radius="md">
                                                                                { jumpToicon }
                                                                            </ActionIcon>
                                                                        </div>
                                                                    </Card>
                                                                </Link>
                                                                <Space h="md" />
                                                            </>
                                                        )) }
                                                    </>
                                                ) }
                                            </Accordion.Item>
                                        </Accordion>
                                        <Space h="lg" />
                                        <div hidden={ assignment.studentsStarted.length > 0 || checkDatePastToday(assignment.openToDate) }>
                                        {/* <div hidden={ checkDatePastToday(assignment.openToDate) }> */}
                                            <Button onClick={ () => navigate(`/teacher/opgave/spoergsmaal/opret/${assignment.assignmentId}`) } fullWidth radius="md" size="md" color="indigo">
                                                Opret spørgsmål
                                            </Button>
                                            <Space h="lg" />
                                        {/* </div> */}
                                        </div>
                                        <Button fullWidth radius="md" size="md" color="indigo">
                                            Se resultater
                                        </Button>
                                        <Space h="lg" />
                                        <Space h="sm" />
                                        <Button onClick={ () => setShowDeleteAssignmentModal(true) } radius="md" size="md" color="red" variant="light">
                                            Slet
                                        </Button>
                                        { !checkDatePastToday(assignment.openToDate) ? (
                                            <Button style={{ float: 'right' }} variant="light" radius="md" size="md" color="indigo">
                                                Rediger
                                            </Button> 
                                        ) : null }
                                    </Card>
                                    <Space h="lg" />
                                    <Button onClick={ () => navigate(`/teacher/hold/${assignment.teamId}`) } variant="outline" size="sm" radius="md" color="indigo">
                                        Tilbage
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) }
                {/* </div> */}
            </Navbar>
        </>
    );
}