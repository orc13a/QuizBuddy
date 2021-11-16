import { useMantineTheme, Accordion, Button, Card, Divider, Loader, LoadingOverlay, Space, Title, Text, Modal } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteAssignment, getAssignment } from '../../../api/index.js';
import Navbar from '../Navbar/Navbar';

export default function TeacherAssignment() {
    const { assignmentId } = useParams();
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [assignment, setAssignment] = useState(null);
    const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] = useState(false);
    const [deletingAssignment, setDeletingAssignment] = useState(false);
    const [deleteAssignmentLoading, setDeleteAssignmentLoading] = useState(false);

    useEffect(() => {
        getAssignment(assignmentId).then((res) => {
            setAssignment(res.data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            if (err.response !== undefined) {
                navigate('/teacher/hold', { replace: true });
            }
        });
    });

    const deleteAssignmentClick = () => {
        setDeleteAssignmentLoading(true);
        deleteAssignment({ assignmentId }).then((res) => {
            notifications.showNotification({
                title: 'Slettet',
                message: res.data.message,
                color: 'teal'
            });
            navigate('/teacher/hold', { replace: true });
        }).catch((err) => {
            console.error(err);
            notifications.showNotification({
                title: 'Ops...',
                message: 'Der opstod en fejl, prøv igen',
                color: 'red'
            });
            setDeleteAssignmentLoading(false);
        });
    }

    return (
        <>
            <Navbar>
                <div className="center">
                    { fetching ? (
                        <Loader color="indigo" size="xl" variant="dots" />
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
                                    <Button onClick={ () => setShowDeleteAssignmentModal(false)} disabled={deletingAssignment} color="indigo">
                                        Fortryd
                                    </Button>
                                    <Button onClick={ deleteAssignmentClick } loading={deleteAssignmentLoading} color="red" variant="light" style={{ float: 'right' }}>
                                        Slet
                                    </Button>
                                </Modal>
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
                                <Accordion>
                                    <Accordion.Item label="Alle spørgsmål">
                                        { assignment.questions.length === 0 ? (
                                            <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                <Text size="sm">
                                                    Ingen spørgsmål i denne opgave
                                                </Text>
                                            </div>
                                        ) : null }
                                    </Accordion.Item>
                                </Accordion>
                                <Space h="lg" />
                                <Button fullWidth radius="md" size="md" color="indigo">
                                    Opret spørgsmål
                                </Button>
                                <Space h="lg" />
                                <Space h="sm" />
                                <Button onClick={ () => setShowDeleteAssignmentModal(true) } radius="md" size="md" color="red" variant="light">
                                    Slet opgave
                                </Button>
                            </Card>
                        </>
                    ) }
                </div>
            </Navbar>
        </>
    );
}