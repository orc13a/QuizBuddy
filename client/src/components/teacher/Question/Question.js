import { Button, Card, Col, Divider, Grid, Input, InputWrapper, Loader, Space, Text, TextInput, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getQuestion } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherQuestion() {
    const { assignmentId, questionId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState(null);

    useEffect((res) => {
        getQuestion({ assignmentId, questionId }).then((res) => {
            const data = res.data;
            setQuestion(data);
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

    return (
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader size="xl" variant="dots" color="indigo" />
                    </div>
                ) : (
                    <>
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
                                    <TextInput value={ question.answer } variant="filled" readOnly label="Svar" size="md" radius="md" />
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button color="red" radius="md" size="md" variant="light">
                                        Slet
                                    </Button>
                                    <Button color="indigo" radius="md" size="md" style={{ float: 'right' }}>
                                        Rediger
                                    </Button>
                                </Card>
                                <Space h="lg" />
                                <Button onClick={ () => navigate(`/teacher/opgave/${assignmentId}`, { replace: true }) } variant="outline" color="indigo" size="md" radius="md">
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