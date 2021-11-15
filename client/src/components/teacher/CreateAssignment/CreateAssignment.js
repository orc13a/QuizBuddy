import { useMantineTheme, Button, Card, Divider, Loader, LoadingOverlay, Select, Space, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { teacherGetTeams } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function TeacherCreateAssignment() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [teams, setTeams] = useState(null);
    const [selectTeams, setSelectTeams] = useState([]);

    useEffect(() => {
        teacherGetTeams().then((res) => {
            const data = res.data;
            setTeams(data);
            createSelectList();
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            navigate('/teacher/forside', { replace: true });
        });
    });

    const form = useForm({
        initialValues: {
            teamName: '',
        },
        validationRules: {
            teamName: (value) => value.length > 1,
        },
    });

    const onSubmit = () => {

    }

    const createSelectList = () => {
        if (teams !== null ) {
            if (selectTeams.length !== teams.length) {
                teams.forEach(team => {
                    setSelectTeams(selectTeams => [...selectTeams, { value: team.teamId, label: team.teamName }])
                });
            }
        }
    }

    return (
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} />
                    </div>
                ) : (
                    <div className="centerH-o" style={{ paddingTop: 50, paddingBottom: 100 }}>
                        <div className="centerH-i">
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
                                    label="Your favorite framework/library"
                                    placeholder="Pick one"
                                    data={selectTeams}
                                    />
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button radius="md" size="md" color="indigo" type="submit" style={{ float: 'right' }}>
                                        Opret
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                ) }
            </Navbar>
        </>
    );
}