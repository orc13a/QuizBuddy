import { ActionIcon, Avatar, Button, Card, Space, Col, Drawer, Grid, useMantineTheme, Divider } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const theme = useMantineTheme();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const burgerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
    );

    return (
        <>  
            <Drawer
            opened={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            position="right"
            title=""
            padding="md"
            size="md"
            overlayOpacity={0.15}
            >
                <Button color="indigo" variant="light" fullWidth radius="md" size="md">
                    Overblik
                </Button>
                <Space h="md" />
                <div>
                    <Divider variant="solid" />
                    <Space h="md" />
                    <Button color="red" variant="light" fullWidth radius="md" size="md">
                        Log ud
                    </Button>
                </div>
            </Drawer>
            <div style={{ padding: 10, position: 'sticky', marginBottom: '50px' }}>
                <Card padding="sm" style={{ paddingRight: 25 }} align="stretch" radius="md">
                    <Grid columns={12}>
                        <Col span={10}>
                            <span className="logoTitleTeacher" style={{ marginLeft: 15 }}>
                                <Link style={{ color: theme.colors.indigo[3], textDecoration: 'none' }} to="/teacher">
                                    QuizBuddy
                                </Link>
                            </span>
                        </Col>
                        <Col span={1}>
                            <div style={{ display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ textAlign: 'right', display: 'table-cell', verticalAlign: 'middle' }}>
                                    <Link to="/teacher/profile">
                                        <Avatar style={{ float: 'right', cursor: 'pointer' }} radius="md" color="indigo">
                                            OC
                                        </Avatar>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col span={1}>
                            <div style={{ display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ textAlign: 'right', display: 'table-cell', verticalAlign: 'middle' }}>
                                    <ActionIcon onClick={ () => setDrawerOpen(true) } style={{ float: 'right' }} radius="md" size="lg">
                                        { burgerIcon }
                                    </ActionIcon>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                </Card>
            </div>
        </>
    );
}