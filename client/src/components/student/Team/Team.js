import { Accordion, ActionIcon, Button, Card, Divider, Loader, Modal, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import { studentGetTeam, studentLeaveTeam } from "../../../api";
import { Link } from "react-router-dom";

export default function StudentTeam() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
    const [team, setTeam] = useState(null);
    // const [okDelete, setOkDelete] = useState(false);
    const [deletingTeam, setDeletingTeam] = useState(false);
    
    useEffect(() => {
        studentGetTeam(teamId).then((res) => {
            const data = res.data;
            setTeam(data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            setFetching(false);
        });
    });

    const deleteTeam = () => {
        setDeletingTeam(true);
        if (team !== null) {
            studentLeaveTeam(team.teamId).then((res) => {
                notifications.showNotification({
                    title: 'Hold slettet',
                    message: `Dit hold '${team.teamName}' er blevet slettet`,
                    color: 'teal'
                });
                navigate('/student/hold', { replace: true });
            }).catch((err) => {
                console.error(err);
                setDeletingTeam(false);
                notifications.showNotification({
                    title: 'Ops...',
                    message: 'Der opstod en fejl, prøv igen',
                    color: 'red'
                });
            });
        }
    }

    const jumpToicon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
        </svg>
    );

    return (
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader variant="dots" size="xl" color="indigo" />
                    </div>
                ) : (
                    <>
                        { team === null ? (
                            navigate('/student/hold', { replace: true })
                        ) : (
                            <>
                                <Modal
                                opened={showDeleteTeamModal}
                                hideCloseButton={deletingTeam}
                                closeOnClickOutside={!deletingTeam}
                                onClose={ () => setShowDeleteTeamModal(false) }
                                title={<Title order={3}>Slet dit hold '{team.teamName}'</Title>}
                                >
                                    <Text>
                                        Er du sikker på at du vil forlade dette hold:<br />'<b>{team.teamName}</b>'?<br /><br />
                                        Denne handling kan ikke fortrydes.
                                    </Text>
                                    <Space h="md" />
                                    <Button onClick={ () => setShowDeleteTeamModal(false)} disabled={deletingTeam} color="indigo">
                                        Fortryd
                                    </Button>
                                    <Button onClick={ deleteTeam } loading={deletingTeam} color="red" variant="light" style={{ float: 'right' }}>
                                        Forlad
                                    </Button>
                                </Modal>
                                <div className="centerH-o" style={{ paddingTop: 50, paddingBottom: 100 }}>
                                    <div className="centerH-i">
                                        <Card style={{ width: 300 }} withBorder radius="md">
                                            <div style={{ textAlign: 'center' }}>
                                                <Title order={2}>
                                                    { team.teamName }
                                                </Title>
                                            </div>
                                            <Space h="lg" />
                                            <Divider />
                                            <Space h="lg" />
                                            <Accordion>
                                                <Accordion.Item label="Opgaver">
                                                    { team.assignments.length === 0 ? (
                                                        <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                            <Text size="sm">
                                                                Ingen opgaver i dette hold
                                                            </Text>
                                                        </div>
                                                    ) : (
                                                        <>  
                                                            <Space h="md" />
                                                            { team.assignments.map((assignment) => (
                                                                <>
                                                                    <Link to={`/student/opgave/${assignment.assignmentId}`}>
                                                                        <Card style={{ cursor: 'pointer' }} withBorder radius="md">
                                                                            <div style={{ display: 'inline-block', width: '90%', position: 'relative', bottom: 2 }}>
                                                                                { assignment.name }
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
                                            <Space h="sm" />
                                            <Button onClick={ () => setShowDeleteTeamModal(true)} size="md" radius="md" variant="light" color="red">
                                                Forlad hold
                                            </Button>
                                        </Card>
                                    </div>
                                </div>
                            </>
                        ) }
                    </>
                ) }
            </Navbar>
        </>
    );
}