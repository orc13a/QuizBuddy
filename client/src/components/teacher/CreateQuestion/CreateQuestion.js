import { useMantineTheme, ActionIcon, Button, Card, Col, Divider, Grid, Group, InputWrapper, Loader, LoadingOverlay, Overlay, Space, Text, Textarea, TextInput, Tooltip, Title, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createQuestion } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherCreateQuestion() {
    const { assignmentId } = useParams();
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [visible, setVisible] = useState(true);
    const [mathWindow, setMathWindow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noCorrectAnswer, setNoCorrectAnswer] = useState(false);

    const form = useForm({
        initialValues: {
            assignmentId: assignmentId,
            questionText: '',
            questionTitle: '',
            noCorrectAnswer: !noCorrectAnswer,
            questionAnswer: '',
        },
        validationRules: {
            questionText: (value) => value.length >= 1,
            questionTitle: (value) => value.length >= 1,
        },
    });

    const onSubmit = (values) => {
        setLoading(true);
        window.scrollTo(0, 0);
        createQuestion(values).then((res) => {
            notifications.showNotification({
                title: res.data.message,
                message: '',
                color: 'teal'
            });
            navigate(`/teacher/opgave/${assignmentId}`)
        }).catch((err) => {
            console.error(err);
            notifications.showNotification({
                title: 'Ops...',
                message: err.response.data.message,
                color: 'red'
            });
            setLoading(false);
        });
    }

    const boldIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
        </svg>
    );

    const italicIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-type-italic" viewBox="0 0 16 16">
            <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
        </svg>
    );

    const underLineIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-type-underline" viewBox="0 0 16 16">
            <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
        </svg>
    );

    const hyperlinkIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
        </svg>
    );

    const imageIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
        </svg>
    );

    return (
        <>
            <Navbar>
                <Grid justify="center">
                    <Col span={12} md={8}>
                        <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                            <Card withBorder radius="md" padding="lg">
                                <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={loading} />
                                <div style={{ textAlign: 'center' }}>
                                    <Title order={2}>
                                        Opret spørgsmål
                                    </Title>
                                </div>
                                <Space h="lg" />
                                <Divider />
                                <Space h="lg" />
                                <Col span={12} md={8}>
                                    <TextInput
                                    label="Spørgsmålets overskrift"
                                    size="md"
                                    radius="md"
                                    error={ form.errors.questionTitle && 'Angiv overskrift'}
                                    value={form.values.questionTitle}
                                    onChange={(event) => form.setFieldValue('questionTitle', event.currentTarget.value)}
                                    />
                                    <Space h="md" />
                                    <Divider />
                                    <Space h="md" />
                                    <div>
                                        <Group>
                                            <Button onClick={ () => setVisible(true) } variant={ visible ? 'filled' : 'outline' } size="md" color="indigo" radius="md">Skriv</Button>
                                            <Button onClick={ () => setVisible(false) } variant={ visible ? 'outline' : 'filled' } size="md" color="indigo" radius="md">Visning</Button>
                                        </Group>
                                        <Space h="md" />
                                    </div>
                                    <Card radius="md" padding="lg">
                                        {!visible && <Overlay opacity={0.05} color="#000" zIndex={5} />}
                                        <Group>
                                            <Tooltip gutter={10} label="Fed skrift" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    { boldIcon }
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip gutter={10} label="Kursive skrift" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    { italicIcon }
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip gutter={10} label="Understreget skrift" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    { underLineIcon }
                                                </ActionIcon>
                                            </Tooltip>
                                            <Divider orientation="vertical" />
                                            <Tooltip gutter={10} label="Indsæt link" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    { hyperlinkIcon }
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip gutter={10} label="Indsæt billede" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    { imageIcon }
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip gutter={10} label="Special tegn / bogstav" position="top" withArrow color="indigo">
                                                <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                    Ω
                                                </ActionIcon>
                                            </Tooltip>
                                            <Divider orientation="vertical" />
                                            <Tooltip gutter={10} label="Matematik" position="top" withArrow color="indigo">
                                                <ActionIcon onClick={ () => setMathWindow(!mathWindow) } variant={ mathWindow ? 'filled' : 'light' } color="indigo" radius="md" size="lg">
                                                    <i>ƒx</i>
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                        <div hidden={!mathWindow}>
                                            <Space h="xs" />
                                            <Divider variant="dashed" />
                                            <Space h="xs" />
                                            <Group gutter={20}>
                                                <Tooltip gutter={10} label="Plus" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        +
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Minus" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        -
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Gange" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        ⋅
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Dividere" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        /
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Ligmed" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        =
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Ikke ligmed" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        ≠
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Mindre end" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        {'<'}
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Større end" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        {'>'}
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Mindre end og ligmed" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        ≤
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Større end og ligmed" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        ≥
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="x i anden" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        x<sup>2</sup>
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Navngiv" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        x<sub>2</sub>
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip gutter={10} label="Kvadratrod" position="bottom" withArrow color="indigo">
                                                    <ActionIcon variant="light" color="indigo" radius="md" size="lg">
                                                        √
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </div>
                                    </Card>
                                    <div hidden={ !visible }>
                                        <InputWrapper label="Spørgsmålet" size="md">
                                            <Textarea
                                            radius="md"
                                            size="md"
                                            placeholder="Dit spørgsmål"
                                            multiline={true}
                                            autosize
                                            minRows={10}
                                            error={ form.errors.questionText && 'Angiv spørgsmål'}
                                            value={form.values.questionText}
                                            onChange={(event) => form.setFieldValue('questionText', event.currentTarget.value)}
                                            />
                                        </InputWrapper>
                                    </div>
                                    <div hidden={ visible }>
                                        <Space h="md" />
                                        {/* <Textarea
                                        readOnly
                                        radius="md"
                                        size="md"
                                        description="Her vises dit spørgsmål som det vil blive vist for eleverne"
                                        multiline={true}
                                        autosize
                                        minRows={10}
                                        /> */}
                                        <Card radius="md" withBorder>
                                            <Text>
                                                <div style={{whiteSpace: "pre-wrap"}}>{ form.values.questionText }</div>
                                            </Text>
                                        </Card>
                                    </div>
                                </Col>
                                <Col span={12} xs={1}>
                                    <Checkbox label="Spørgsmål har ikke et rigtigt svar" onClick={ () => setNoCorrectAnswer(!noCorrectAnswer) } defaultChecked={noCorrectAnswer} />
                                    <Space h="md" />
                                    { noCorrectAnswer ? null : (
                                        <TextInput
                                        label="Det rigtigte svar"
                                        size="md"
                                        radius="md"
                                        error={ form.errors.questionAnswer && 'Angiv svar'}
                                        value={form.values.questionAnswer}
                                        onChange={(event) => form.setFieldValue('questionAnswer', event.currentTarget.value)}
                                        />
                                    ) }
                                </Col>
                                <Col span={12} xs={1}>
                                    <Space h="xl" />
                                    <Button onClick={ () => navigate(`/teacher/opgave/${assignmentId}`, { replace: true }) } variant="light" color="red" size="md" radius="md">
                                        Kassér
                                    </Button>
                                    <Button type="submit" style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                        Opret
                                    </Button>
                                </Col>
                            </Card>
                        </form>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}