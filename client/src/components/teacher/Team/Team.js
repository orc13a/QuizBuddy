import { Accordion, Button, Card, Divider, Input, InputWrapper, Loader, Menu, MenuLabel, Modal, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { teacherGetTeam } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherTeam() {
    const { teamId } = useParams();

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
    } 

    const removeUser = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
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
                        <Modal
                        opened={showDeleteTeamModal}
                        hideCloseButton={deletingTeam}
                        closeOnClickOutside={!deletingTeam}
                        onClose={ () => setShowDeleteTeamModal(false) }
                        title={<Title order={3}>Slet dit hold '{team.teamName}'</Title>}
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
                            <Button onClick={ () => setShowDeleteTeamModal(false)} disabled={deletingTeam}>
                                Fortryd
                            </Button>
                            <Button onClick={ deleteTeam } loading={deletingTeam} disabled={!okDelete} color="red" variant="light" style={{ float: 'right' }}>
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
                                                    { team.members.map((student) => (
                                                        <Card withBorder radius="md">
                                                            <div style={{ display: 'inline-block', width: '90%' }}>
                                                                { student.firstname } { student.lastname  }
                                                            </div>
                                                            <div style={{ display: 'inline-block', width: '10%' }}>
                                                                <Menu radius="md">
                                                                    <MenuLabel>Elev menu</MenuLabel>
                                                                    <Menu.Item color="red" icon={removeUser}>Fjern elev</Menu.Item>
                                                                </Menu>
                                                            </div>
                                                        </Card>
                                                    )) }
                                                </>
                                            ) }
                                        </Accordion.Item>
                                    </Accordion>
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
            </Navbar>
        </>
    );
}