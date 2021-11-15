import { ActionIcon, Affix, Card, Col, Grid, Text, Tooltip, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudent } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function StudentTeams() {
    const [fetching, setFetching] = useState(true);
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        getStudent().then((res) => {
            const data = res.data;
            setTeams(data.teams);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
            setFetching(false);
        });
    });

    const addIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
    );

    return(
        <>
            <Navbar>
                <Affix position={{ bottom: 25, right: 25 }}>
                    <Tooltip
                    zIndex={999}
                    label="Tilslut hold"
                    color="indigo"
                    position="left"
                    withArrow
                    >
                        <Link to="/student/hold/tilslut">
                            <ActionIcon color="indigo" size="lg" radius="md" variant="filled">
                                { addIcon }
                            </ActionIcon>
                        </Link>
                    </Tooltip>
                </Affix>
                { fetching ? (
                    <Grid gutter="xl">
                        <Col span={12} sm={3} md={4} lg={3}>
                            <Skeleton radius="md" height={58.8} />
                        </Col>
                        <Col span={12} sm={3} md={4} lg={3}>
                            <Skeleton radius="md" height={58.8} />
                        </Col>
                        <Col span={12} sm={3} md={4} lg={3}>
                            <Skeleton radius="md" height={58.8} />
                        </Col>
                    </Grid>
                ) : (
                    <Grid gutter="xl">
                        { teams === null || Object.keys(teams).length === 0 ? (
                            <Text>Du er i nogen hold, endnu</Text>
                        ) : (
                            teams.map((team) => (
                                <Col span={12} sm={3} md={4} lg={3} key={ team.teamId }>
                                    <Link to={`/student/hold/${team.teamId}`} style={{ textDecoration: 'none' }}>
                                        <Card className="teamCard" withBorder>
                                            <Text weight={500}>{ team.teamName }</Text>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) }
                    </Grid>
                ) }
            </Navbar>
        </>
    );
}