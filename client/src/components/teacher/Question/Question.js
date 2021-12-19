import { Button, Card, Col, Divider, Grid, Input, InputWrapper, Loader, Modal, Space, Text, TextInput, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteQuestion, getQuestion } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherQuestion() {
    const { assignmentId, questionId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState(null);
    const [okDelete, setOkDelete] = useState(false);
    const [deletingTeam, setDeletingTeam] = useState(false);
    const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);

    useEffect((res) => {
        getQuestion({ assignmentId, questionId }).then((res) => {
            const data = res.data;
            if (data === null) {
                navigate(`/teacher/opgave/${assignmentId}`, { replace: true });
            } else {
                setQuestion(data);
            }
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            if (err.response !== undefined) {
                notifications.showNotification({
                    title: 'Ops...',
                    message: res.response.data.message,
                    color: 'red'
                });
                navigate(`/teacher/opgave/${assignmentId}`, { replace: true });
            }
        });
    });

    const checkDeleteInput = (e) => {
        const inputValue = e.target.value;
        const questionTitle = e.target.id;
        
        if (inputValue === questionTitle) {
            setOkDelete(true);
        } else {
            setOkDelete(false);
        }
    }

    const deleteQuestionClick = () => {
        setDeletingTeam(true);

        const qNotifi = notifications.showNotification({
            loading: true,
            color: 'indigo',
            title: `Sletter ${question.title}`,
            message: 'Vent venligst...',
            autoClose: false,
            disallowClose: true,
        });

        deleteQuestion({ assignmentId, questionId }).then((res) => {
            notifications.updateNotification(qNotifi, {
                qNotifi,
                color: 'teal',
                title: res.data.message,
                message: '',
                autoClose: 3000,
            });
            navigate(`/teacher/opgave/${assignmentId}`, { replace: true });
        }).catch((err) => {
            console.error(err);
            notifications.updateNotification(qNotifi, {
                qNotifi,
                color: 'red',
                title: `Ops...`,
                message: err.response.data.message,
                autoClose: 4000,
            });
        });
    }

    return (
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader size="xl" variant="dots" color="indigo" />
                    </div>
                ) : (
                    <>
                        <Modal
                        opened={showDeleteTeamModal}
                        hideCloseButton={deletingTeam}
                        closeOnClickOutside={!deletingTeam}
                        onClose={ () => setShowDeleteTeamModal(false) }
                        title={<Title order={3}>Slet spørgsmål '{question.title}'</Title>}
                        >
                            <Text>
                                Er du sikker på at du vil slette spørgsmålet '<b>{question.title}</b>'?<br />
                                Denne handling kan ikke fortrydes.
                            </Text>
                            <Space h="md" />
                            <Text>
                                Skriv '{question.title}' forneden i feltet for at slette spørgsmålet. 
                            </Text>
                            <Input disabled={deletingTeam} id={question.title} onInput={ checkDeleteInput } radius="md" size="md" />
                            <Space h="md" />
                            <Button size="md" radius="md" color="indigo" onClick={ () => setShowDeleteTeamModal(false)} disabled={deletingTeam}>
                                Fortryd
                            </Button>
                            <Button size="md" radius="md" onClick={ deleteQuestionClick } loading={deletingTeam} disabled={!okDelete} color="red" variant="light" style={{ float: 'right' }}>
                                Slet
                            </Button>
                        </Modal>
                        <Grid justify="center">
                            <Col span={12} md={8}>
                                <Card withBorder radius="md">
                                    <div style={{ textAlign: 'center' }}>
                                        <Title order={2}>
                                            { question.title }
                                        </Title>
                                    </div>
                                    <Space h="lg" />
                                    <Divider />
                                    <Space h="lg" />
                                    <InputWrapper label="Spørgsmål" size="md">
                                        <Card withBorder radius="md">
                                            <Text>
                                                <div style={{whiteSpace: "pre-wrap"}}>{ question.text  }</div>
                                            </Text>
                                        </Card>
                                    </InputWrapper>
                                    <Space h="lg" />
                                    <TextInput value={ question.noCorrectAnswer ? 'Spørgsmål har ikke et rigtigt svar' : question.answer } variant="filled" readOnly label="Svar" size="md" radius="md" />
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button onClick={ () => setShowDeleteTeamModal(true) } color="red" radius="md" size="md" variant="light">
                                        Slet
                                    </Button>
                                    <Button color="indigo" radius="md" size="md" style={{ float: 'right' }}>
                                        Rediger
                                    </Button>
                                </Card>
                                <Space h="lg" />
                                <Button onClick={ () => navigate(`/teacher/opgave/${assignmentId}`, { replace: true }) } variant="outline" color="indigo" size="sm" radius="md">
                                    Tilbage til opgave
                                </Button>
                            </Col>
                        </Grid>
                    </>
                ) }
            </Navbar>
        </>
    );
}