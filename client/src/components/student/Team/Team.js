import { Accordion, Button, Card, Divider, Loader, Modal, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import { studentGetTeam, studentLeaveTeam } from "../../../api";

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

                                                </Accordion.Item>
                                            </Accordion>
                                            <Space h="lg" />
                                            <Space h="sm" />
                                            <Button onClick={ () => setShowDeleteTeamModal(true)} variant="light" color="red">
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