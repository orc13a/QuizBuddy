import { Alert, Button, Card, Divider, Loader, LoadingOverlay, Space, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useForm } from '@mantine/hooks';
import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNotifications } from "@mantine/notifications";
import { studentConnectFindTeam, studentConnectTeam } from "../../../api";

export default function StudentJoinTeam() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [loading, setLoading] = useState(false);
    const [connectLoading, setConnectLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formError, setFormError] = useState(false);
    const [foundTeamCheck, setFoundTeamCheck] = useState(false);
    const [foundTeam, setFoundTeam] = useState(null);

    const form = useForm({
        initialValues: {
            teamShareCode: '',
            teamCreatorId: '',
        },
        validationRules: {
            teamShareCode: (value) => value.length > 1 && value.replace(/[^-]/g, "").length >= 4,
        },
    });

    const onFindSubmit = (values) => {
        setLoading(true);
        studentConnectFindTeam(values).then((res) => {
            const data = res.data;
            setFoundTeam(data);
            form.setFieldValue('teamCreatorId', data.creatorId);
            setFoundTeamCheck(true);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            notifications.showNotification({
                title: 'Ops...',
                message: err.response.data.message,
                color: 'red'
            });
            setLoading(false);
        })
    }

    const onConnectSubmit = (values) => {
        setConnectLoading(true);
        studentConnectTeam(values).then((res) => {
            const data = res.data;
            notifications.showNotification({
                title: 'Tilsluttet hold',
                message: data.message,
                color: 'teal'
            });
            setConnectLoading(false);
            navigate('/student/hold', { replace: true });
        }).catch((err) => {
            console.error(err);
            notifications.showNotification({
                title: 'Ops...',
                message: err.response.data.message,
                color: 'red'
            });
            setConnectLoading(false);
        });
        // teacherCreateTeam(values).then((res) => {
        //     notifications.showNotification({
        //         title: 'Hold oprettet',
        //         message: res.data.message,
        //         color: 'teal'
        //     });
        //     navigate('/teacher/hold', { replace: true });
        // }).catch((err) => {
        //     console.error(err);
        //     setErrorMsg(err.response.data.message);
        //     setFormError(true);
        //     setLoading(false);
        // });
    }

    const errorIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
    );

    const keyIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
    );

    return(
        <>
            <Navbar>
                <div className="center">
                    <div hidden={foundTeamCheck}>
                        <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={loading} />
                        <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                            <div style={{ textAlign: 'center' }}>
                                <Title order={2}>
                                    Find hold
                                </Title>
                            </div>
                            <Space h="lg" />
                            <Divider />
                            <div hidden={!formError}>
                                <Space h="lg" />
                                <Alert icon={errorIcon} color="red" title="Ops..." withCloseButton onClose={() => setFormError(false)}>
                                    { errorMsg }
                                </Alert>
                                <Space h="lg" />
                                <Divider />
                            </div>
                            <Space h="lg" />
                            <form onSubmit={ form.onSubmit((values) => onFindSubmit(values)) }>
                                <TextInput
                                icon={keyIcon}
                                size="md"
                                autoFocus
                                radius="md"
                                required
                                label="Hold kode"
                                error={ form.errors.teamShareCode && 'Angiv hold kode'}
                                value={form.values.teamShareCode}
                                onChange={(event) => form.setFieldValue('teamShareCode', event.currentTarget.value)}
                                />
                                <Space h="lg" />
                                <Space h="sm" />
                                <Button onClick={ () => navigate('/student/hold', { replace: true }) } size="md" style={{ float: 'left' }} variant="light" color="indigo" radius="md">
                                    Fortryd
                                </Button>
                                <Button size="md" style={{ float: 'right' }} color="indigo" radius="md" type="submit">
                                    Find
                                </Button>
                            </form>
                        </Card>
                    </div>
                    <div hidden={!foundTeamCheck}>
                        <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={connectLoading} />
                        <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                            <div style={{ textAlign: 'center' }}>
                                <Title order={2}>
                                    Tilslut hold
                                </Title>
                            </div>
                            <Space h="lg" />
                            <Divider />
                            <div hidden={!formError}>
                                <Space h="lg" />
                                <Alert icon={errorIcon} color="red" title="Ops..." withCloseButton onClose={() => setFormError(false)}>
                                    { errorMsg }
                                </Alert>
                                <Space h="lg" />
                                <Divider />
                            </div>
                            <Space h="lg" />
                            <form onSubmit={ form.onSubmit((values) => onConnectSubmit(values)) }>
                                <Text>
                                    Vil du tilslutte dig holdet:<br /><b>{ foundTeam !== null ? foundTeam.teamName : null }</b>?
                                </Text>
                                <Space h="lg" />
                                <Space h="sm" />
                                <Button onClick={ () => navigate('/student/hold', { replace: true }) } size="md" style={{ float: 'left' }} variant="light" color="indigo" radius="md">
                                    Fortryd
                                </Button>
                                <Button size="md" style={{ float: 'right' }} color="indigo" radius="md" type="submit">
                                    Tilslut
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </Navbar>
        </>
    );
}