import { Accordion, ActionIcon, Button, Card, Divider, Input, InputWrapper, Loader, Menu, MenuLabel, Modal, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { teacherDeleteTeam, teacherGetTeam, teacherRemoveStudentTeam } from "../../../api";
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import CardInfo from "../../CardInfo/CardInfo";
import { Link } from "react-router-dom";

export default function TeacherTeam() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
    const [team, setTeam] = useState(null);
    const [okDelete, setOkDelete] = useState(false);
    const [deletingTeam, setDeletingTeam] = useState(false);
    
    useEffect(() => {
        teacherGetTeam(teamId).then((res) => {
            const data = res.data;
            setTeam(data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            setFetching(false);
        });
    });

    const checkDeleteInput = (e) => {
        const inputValue = e.target.value;
        const teamName = e.target.id;
        
        if (inputValue === teamName) {
            setOkDelete(true);
        } else {
            setOkDelete(false);
        }
    }

    const deleteTeam = () => {
        setDeletingTeam(true);
        if (team !== null) {
            teacherDeleteTeam(team.teamId).then((res) => {
                notifications.showNotification({
                    title: 'Hold slettet',
                    message: `Dit hold '${team.teamName}' er blevet slettet`,
                    color: 'teal'
                });
                navigate('/teacher/hold', { replace: true });
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

    const removeStudent = (student) => {
        const bodyObj = {
            studentId: student.userId,
            teamId: team.teamId
        }

        const notifi = notifications.showNotification({
            loading: true,
            color: 'indigo',
            title: `Fjerner ${student.firstname}`,
            message: 'Vent venligst',
            autoClose: false,
            disallowClose: true,
        });

        teacherRemoveStudentTeam(bodyObj).then((res) => {
            notifications.updateNotification(notifi, {
                notifi,
                color: 'teal',
                title: `${student.firstname} er blevet fjernet`,
                message: '',
                autoClose: 3000,
            });
        }).catch((err) => {
            console.error(err);
            notifications.updateNotification(notifi, {
                notifi,
                color: 'red',
                title: `Ops...`,
                message: err.response.data.message,
                autoClose: 4000,
            });
        });
    }

    const removeUser = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
    );

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
                            navigate('/teacher/hold', { replace: true })
                        ) : (
                            <>
                                <Modal
                                opened={showDeleteTeamModal}
                                hideCloseButton={deletingTeam}
                                closeOnClickOutside={!deletingTeam}
                                onClose={ () => setShowDeleteTeamModal(false) }
                                title={<Title order={3}>Slet spørgsmål hold '{team.teamName}'</Title>}
                                >
                                    <Text>
                                        Er du sikker på at du vil slette dit hold '{team.teamName}'?<br />
                                        Denne handling kan ikke fortrydes.
                                    </Text>
                                    <Space h="md" />
                                    <Text>
                                        Skriv '{team.teamName}' forneden i feltet for at slette holdet. 
                                    </Text>
                                    <Input disabled={deletingTeam} id={team.teamName} onInput={ checkDeleteInput } radius="md" size="md" />
                                    <Space h="md" />
                                    <Button size="md" radius="md" color="indigo" onClick={ () => setShowDeleteTeamModal(false)} disabled={deletingTeam}>
                                        Fortryd
                                    </Button>
                                    <Button size="md" radius="md" onClick={ deleteTeam } loading={deletingTeam} disabled={!okDelete} color="red" variant="light" style={{ float: 'right' }}>
                                        Slet
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
                                            <InputWrapper description="Del denne kode med de elever som skal være med på dette hold" size="md" label="Hold kode">
                                                <Input variant="filled" value={ team.shareCode } readOnly radius="md" size="md" />
                                            </InputWrapper>
                                            <Space h="lg" />
                                            <Accordion>
                                                <Accordion.Item label="Elever">
                                                    { team.members.length === 0 ? (
                                                        <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                            <Text size="sm">
                                                                Ingen elever i dette hold
                                                            </Text>
                                                        </div>
                                                    ) : (
                                                        <>  
                                                            <Space h="md" />
                                                            { team.members.map((student) => (
                                                                <>
                                                                    <Card withBorder radius="md">
                                                                        <div style={{ display: 'inline-block', width: '90%', position: 'relative', bottom: 2 }}>
                                                                            { student.firstname } { student.lastname  }
                                                                        </div>
                                                                        <div style={{ display: 'inline-block', width: '10%' }}>
                                                                            <Menu radius="md">
                                                                                <MenuLabel>Elev menu</MenuLabel>
                                                                                <Menu.Item onClick={ () => removeStudent(student) } color="red" icon={removeUser}>Fjern elev</Menu.Item>
                                                                            </Menu>
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
                                                                    <Link to={`/teacher/opgave/${assignment.assignmentId}`}>
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
                                            <CardInfo createdAt={team.createdAt} />
                                            <Space h="lg" />
                                            <Space h="sm" />
                                            <Button onClick={ () => setShowDeleteTeamModal(true)} variant="light" color="red">
                                                Slet hold
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