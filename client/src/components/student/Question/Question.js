import { Button, Card, Col, Divider, Grid, Skeleton, Space, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { studentGetQuestion, studentGetQuestionByIndex } from '../../../api';
import Navbar from '../Navbar/Navbar';

export default function StudentQuestion() {
    const { assignmentId, questionId } = useParams();

    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        if (questionId.replace(/[^-]/g, "").length >= 4) {
            studentGetQuestion({ assignmentId, questionId }).then((res) => {
                const data = res.data;
                setQuestion(data);
                setFetching(false);
            }).catch((err) => {
                console.error(err);
            });
        } else {
            studentGetQuestionByIndex({ assignmentId, questionId }).then((res) => {
                const data = res.data;
                setQuestion(data);
                setFetching(false);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [question]);

    const form = useForm({
        initialValues: {
            answer: '',
        },
        validationRules: {
            answer: (value) => value.length > 0,
        },
    });

    const onSubmit = () => {
        
    }

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
                                            <Card style={{ minHeight: 200 }} withBorder radius="md">
                                                <Text>
                                                    <div style={{whiteSpace: "pre-wrap"}}>{ fetching ? null : question.text }</div>
                                                </Text>
                                            </Card>
                                        </Skeleton>
                                    </Col>
                                    <Col span={4}>
                                        <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                                            {/* <TextInput disabled={fetching} placeholder="Dit svar" size="md" radius="md" color="indigo" /> */}
                                            <Textarea
                                            disabled={fetching}
                                            multiline={true}
                                            rows={4}
                                            placeholder="Dit svar"
                                            radius="md"
                                            error={form.errors.answer && 'Du skal skrive dit svar'}
                                            value={form.values.answer}
                                            onChange={(event) => form.setFieldValue('answer', event.currentTarget.value)}
                                            />
                                            <Space h="lg" />
                                            <Button type="submit" disabled={fetching} size="md" radius="md" color="indigo" fullWidth>Svar</Button>
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