import { Button, Card, Col, Divider, Grid, Skeleton, Space, Text, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { studentAnswerQuestion, studentGetQuestion, studentGetQuestionByIndex } from '../../../api';
import Navbar from '../Navbar/Navbar';
import SadImage from '../../../images/happy.png';

export default function StudentQuestion() {
    const { assignmentId, questionId } = useParams();
    const navigate = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState(null);
    const [checkingAnswerLoading, setCheckingAnswerLoading] = useState(false);
    const [answerFeeback, setAnswerFeeback] = useState(null);
    const [showDoneScreen, setShowDoneScreen] = useState(false);

    useEffect(() => {
        if (answerFeeback === null) {
            if (questionId.replace(/[^-]/g, "").length >= 4) {
                studentGetQuestion({ assignmentId, questionId }).then((res) => {
                    const data = res.data;
                    if (res.data === null || res.data.length === 0) {
                        navigate(`/student/opgave/${assignmentId}`, { replace: true });
                    }
    
                    setQuestion(data);
                    setFetching(false);
                }).catch((err) => {
                    navigate(`/student/opgave/${assignmentId}`, { replace: true });
                    console.error(err);
                });
            } else {
                studentGetQuestionByIndex({ assignmentId, questionId }).then((res) => {
                    const data = res.data;
                    if (res.data === null || res.data.length === 0) {
                        navigate(`/student/opgave/${assignmentId}`, { replace: true });
                    }
    
                    setQuestion(data);
                    setFetching(false);
                }).catch((err) => {
                    navigate(`/student/opgave/${assignmentId}`, { replace: true });
                    console.error(err);
                });
            }
        }
    }, [question, answerFeeback, assignmentId, navigate, questionId]);

    const nextQuestion = () => {
        setFetching(true);
        form.setFieldValue('answer', '');
        form.setFieldValue('questionId', answerFeeback.nextQuestionId);
        navigate(`/student/opgave/${assignmentId}/spoergsmaal/${answerFeeback.nextQuestionId}`, { replace: true });
        setCheckingAnswerLoading(false);
        setAnswerFeeback(null);
        setFetching(false);
    }

    const form = useForm({
        initialValues: {
            assignmentId: assignmentId,
            questionId: questionId,
            answer: '',
        },
        validationRules: {
            answer: (value) => value.length > 0,
        },
    });

    const onSubmit = (values) => {
        setCheckingAnswerLoading(true);

        studentAnswerQuestion(values).then((res) => {
            setAnswerFeeback(res.data);
            setCheckingAnswerLoading(false);
        }).catch((err) => {
            setCheckingAnswerLoading(false);
            console.error(err);
        });
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
                                { answerFeeback === null ? (
                                    <>
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
                                                    disabled={fetching || checkingAnswerLoading}
                                                    multiline={true}
                                                    rows={4}
                                                    placeholder="Dit svar"
                                                    radius="md"
                                                    error={form.errors.answer && 'Du skal skrive dit svar'}
                                                    value={form.values.answer}
                                                    onChange={(event) => form.setFieldValue('answer', event.currentTarget.value)}
                                                    />
                                                    <Space h="lg" />
                                                    <Button type="submit" disabled={fetching} loading={checkingAnswerLoading} size="md" radius="md" color="indigo" fullWidth>Svar</Button>
                                                </form>
                                            </Col>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        { showDoneScreen ? (
                                            <>
                                                <Title order={3}>
                                                    Du er færdige med denne opgave
                                                </Title>
                                                <div style={{ textAlign: 'center' }}>
                                                    <img alt="trist maskot" src={SadImage} height={350} />
                                                </div>
                                                <Button onClick={ () => navigate(`/student/opgave/${assignmentId}`, { replace: true }) } style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                                    Afslut
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Title style={{ color: answerFeeback.isAnswerCorrect ? '#37B24D' : '#F03E3E' }} order={3}>
                                                    { answerFeeback.question.noCorrectAnswer ? (
                                                        <>
                                                            Dit svar er blevet sendt
                                                        </>
                                                    ) : (
                                                        answerFeeback.isAnswerCorrect ? 'Dit svar er rigtigt' : 'Dit svar er forkert'
                                                    ) }
                                                </Title>
                                                { answerFeeback.isAnswerCorrect ? null : (
                                                    <>
                                                        <Space h="lg" />
                                                        <Divider />
                                                        <Space h="lg" />
                                                        <Text>
                                                            Det rigtigte svar er: { answerFeeback.question.answer }
                                                        </Text>
                                                    </>
                                                )}
                                                <Space h="lg" />
                                                { answerFeeback.nextQuestionId === undefined ? (
                                                    <Button onClick={ () => setShowDoneScreen(true) } style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                                        Næste
                                                    </Button>
                                                ) : (
                                                    <Button onClick={ nextQuestion } style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                                        Næste
                                                    </Button>
                                                ) }
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}