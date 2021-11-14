import { ActionIcon, Affix, Card, Col, Grid, Text, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function TeacherTeams() {
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
                    label="Opret hold"
                    color="indigo"
                    position="left"
                    withArrow
                    >
                        <Link to="/teacher/hold/opret">
                            <ActionIcon color="indigo" size="lg" radius="md" variant="filled">
                                { addIcon }
                            </ActionIcon>
                        </Link>
                    </Tooltip>
                </Affix>
                <Grid gutter="xl">
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 1</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 2</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 3</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 4</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 5</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 6</Text>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}