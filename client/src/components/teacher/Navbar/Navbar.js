import { ActionIcon, Avatar, Button, Card, Space, Col, Drawer, Grid, useMantineTheme, Divider } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Navbar() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

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
                <div style={{ display: 'table', float: 'none' }}>
                    <div style={{ display: 'table-cell', float: 'none' }}>
                        hej
                    </div>
                </div>
            </Drawer>
            <div style={{ padding: 10, position: 'sticky', marginBottom: '50px' }}>
                <Card padding="sm" style={{ paddingRight: 25 }} align="stretch" radius="md">
                    <Grid columns={10}>
                        <Col span={6}>
                            <span className="logoTitleTeacher" style={{ marginLeft: 15 }}>
                                <Link style={{ color: theme.colors.indigo[3], textDecoration: 'none' }} to="/teacher">
                                    QuizBuddy
                                </Link>
                            </span>
                        </Col>
                        <Col span={4}>
                            <div style={{ textAlign: 'right', display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                    <div style={{ display: 'inline-block', position: 'relative', top: 2 }}>
                                        <Avatar onClick={ () => navigate('/teacher/profile') } style={{ cursor: 'pointer' }} radius="md" color="indigo">
                                            OC
                                        </Avatar>
                                    </div>
                                    <div style={{ display: 'inline-block', position: 'relative', bottom: 3, marginLeft: 25 }}>
                                        <ActionIcon onClick={() => setDrawerOpen(true)} radius="md" size="lg">
                                            {burgerIcon}
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                </Card>
            </div>
        </>
    );
}