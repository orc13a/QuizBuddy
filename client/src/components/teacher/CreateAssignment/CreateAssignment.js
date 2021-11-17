import { useMantineTheme, Button, Card, Divider, Loader, LoadingOverlay, Select, Space, Title, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createAssignment, teacherGetTeams, teacherGetTeamsSelect } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherCreateAssignment() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [, setTeams] = useState(null);
    const [selectTeams, setSelectTeams] = useState([]);

    useEffect(() => {
        teacherGetTeams().then((res) => {
            const data = res.data;
            setTeams(data); 
            setFetching(false);
        }).then(() => {
            teacherGetTeamsSelect().then((res) => {
                setSelectTeams(res.data);
                setFetching(false);
            }).catch((err) => {
                console.error(err);
                if (err.response !== undefined) {
                    navigate('/teacher/forside', { replace: true });
                }
            });
        }).catch((err) => {
            console.error(err);
            if (err.response !== undefined) {
                navigate('/teacher/forside', { replace: true });
            }
        })
    });

    const form = useForm({
        initialValues: {
            selectedTeamId: '',
            assignmentName: '',
        },
        validationRules: {
            selectedTeamId: (value) => value.length !== 0,
            assignmentName: (value) => value.length > 1,
        },
    });

    const onSubmit = (values) => {
        setLoading(true);
        createAssignment(values).then((res) => {
            notifications.showNotification({
                title: res.data.message,
                message: 'Vent venligst...',
                color: 'teal'
            })
            navigate(`/teacher/opgave/${res.data.assignmentId}`, { replace: true });
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }

    return (
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} />
                    </div>
                ) : (
                    <>
                        {/* <div className="centerH-o" style={{ paddingTop: 50, paddingBottom: 100 }}> */}
                            {/* <div className="centerH-i"> */}
                            <div className="center">
                                <Card style={{ width: 300 }} withBorder radius="md">
                                <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={loading} />
                                    <div style={{ textAlign: 'center' }}>
                                        <Title order={2}>
                                            Opret opgave
                                        </Title>
                                    </div>
                                    <Space h="lg" />
                                    <Divider />
                                    <Space h="lg" />
                                    <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                                        <Select
                                        searchable
                                        radius="md"
                                        size="md"
                                        label="Vælg hold"
                                        placeholder="Søg efter hold"
                                        required
                                        data={selectTeams}
                                        description='Vælg de hold som opgaven skal gives til. Du kan søge efter hold.'
                                        limit={3}
                                        error={ form.errors.selectedTeamId && 'Vælg hold'}
                                        value={form.values.selectedTeamId}
                                        onChange={(value) => form.setFieldValue('selectedTeamId', value)}
                                        />
                                        <Space h="lg" />
                                        <TextInput
                                        required
                                        label="Opgave titel"
                                        size="md"
                                        radius="md"
                                        error={ form.errors.assignmentName && 'Angiv titel'}
                                        value={form.values.assignmentName}
                                        onChange={(event) => form.setFieldValue('assignmentName', event.currentTarget.value)}
                                        />
                                        <Space h="lg" />
                                        <Space h="sm" />
                                        <Button onClick={ () => navigate('/teacher/forside', { replace: true }) } radius="md" size="md" color="red" variant="light" style={{ float: 'left' }}>
                                            Kassér
                                        </Button>
                                        <Button radius="md" size="md" color="indigo" type="submit" style={{ float: 'right' }}>
                                            Opret
                                        </Button>
                                    </form>
                                </Card>
                            </div>
                            {/* </div> */}
                        {/* </div> */}
                    </>
                ) }
            </Navbar>
        </>
    );
}