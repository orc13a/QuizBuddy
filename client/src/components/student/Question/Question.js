import { Button, Card, Col, Divider, Grid, Skeleton, Space, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { studentGetQuestion } from '../../../api';
import TimeCountUp from '../../TimeCountUp/TimeCountUp';
import Navbar from '../Navbar/Navbar';

export default function StudentQuestion() {
    const { assignmentId, questionId } = useParams();

    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        studentGetQuestion({ assignmentId, questionId }).then((res) => {
            const data = res.data;
            console.log(data);
            setQuestion(data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
        });
    }, [question]);

    return (
        <>
            <Navbar>
                <Grid justify="center">
                    <Col span={12} sm={8}>
                        <Card style={{ width: 250 }} radius="md" withBorder>
                            <Text>
                                <span>
                                    Tid: 
                                </span>
                                <span style={{ float: 'right' }}>
                                    { fetching ?
                                        <Skeleton radius="md" height={25} width={125} />
                                    : '00:00:00' }
                                </span>
                            </Text>
                        </Card>
                        <Space h="xl" />
                        <Card withBorder radius="md" padding="lg">
                            <div>
                                { fetching ?
                                    <Skeleton radius="md" height={29.5} width={250} />
                                : (
                                    <>
                                        <Title order={3}>
                                            { question.title }
                                        </Title>
                                    </>
                                ) }
                                <Space h="lg" />
                                <Divider />
                                <Space h="lg" />
                                <Grid>
                                    <Col span={8}>
                                        <Skeleton visible={fetching} radius="md">
                                            <Card style={{ minHeight: 200 }} withBorder>
                                                <Text>
                                                    <div style={{whiteSpace: "pre-wrap"}}>{ fetching ? null : question.text }</div>
                                                </Text>
                                            </Card>
                                        </Skeleton>
                                    </Col>
                                    <Col span={4}>
                                        <form>
                                            <TextInput disabled={fetching} placeholder="Dit svar" size="md" radius="md" color="indigo" />
                                            <Space h="lg" />
                                            <Button disabled={fetching} size="md" radius="md" color="indigo" fullWidth>Svar</Button>
                                        </form>
                                    </Col>
                                </Grid>
                            </div>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}