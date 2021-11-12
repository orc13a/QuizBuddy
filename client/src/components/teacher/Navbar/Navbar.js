import { ActionIcon, Avatar, Button, Card, Space, Col, Drawer, Grid, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Navbar({ children }) {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const burgerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
    );

    const goTo = (e) => {
        console.log(e.target);
    }

    const getActive = () => {
        const url = window.location.href;
        const urlSplit = url.split('/');
        const page = urlSplit[urlSplit.length - 1];
        const btn = document.getElementById(`${page}NavBtn`);
        btn.classList.add('navBtnActive');
        btn.classList.remove('navBtn');
    }

    const openDrawer = () => {
        setDrawerOpen(true);
        setTimeout(() => {
            getActive();
        }, 30);
    }

    return (
        <>
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                position="right"
                title=""
                padding={0}
                size="md"
                overlayOpacity={0.15}
                noFocusTrap
                zIndex={2000}
            >
                <div style={{ height: '85%', overflowY: 'scroll' }}>
                    <Link to="/teacher/forside" className="navBtnLink">
                        <Button id="forsideNavBtn" className="navBtn" onClick={ goTo } fullWidth radius={0} size="md" color="indigo" variant="light">
                            Forside
                        </Button>
                    </Link>
                    <Space h="md" />
                    <Link to="/teacher/hold" className="navBtnLink">
                        <Button id="holdNavBtn" className="navBtn" onClick={ goTo } fullWidth radius={0} size="md" color="indigo" variant="light">
                            Mine hold
                        </Button>
                    </Link>
                    <Space h="md" />
                    <Link to="/teacher/opgave/tilføj" className="navBtnLink">
                        <Button id="tilføjNavBtn" className="navBtn" onClick={ goTo } fullWidth radius={0} size="md" color="indigo" variant="light">
                            Opret opgave
                        </Button>
                    </Link>
                </div>
                <div style={{ width: '320px', position: 'absolute', bottom: 0, paddingBottom: 16 }}>
                    <Card radius="md">
                        <Button fullWidth radius="md" size="md" color="red" variant="light">
                            Log ud
                        </Button>
                    </Card>
                </div>
            </Drawer>
            <div style={{ padding: 10, position: 'sticky', top: 8 }}>
                <Card padding="sm" style={{ paddingRight: 25 }} align="stretch" radius="md">
                    <Grid columns={10}>
                        <Col span={6}>
                            <span className="logoTitleTeacher" style={{ marginLeft: 15 }}>
                                <Link style={{ color: theme.colors.indigo[3], textDecoration: 'none' }} to="/teacher/profil">
                                    QuizBuddy
                                </Link>
                            </span>
                        </Col>
                        <Col span={4}>
                            <div style={{ textAlign: 'right', display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                    <div style={{ display: 'inline-block', position: 'relative', top: 2 }}>
                                        <Avatar onClick={() => navigate('/teacher/profil')} style={{ cursor: 'pointer' }} radius="md" color="indigo">
                                            OC
                                        </Avatar>
                                    </div>
                                    <div style={{ display: 'inline-block', position: 'relative', bottom: 3, marginLeft: 25 }}>
                                        <ActionIcon onClick={openDrawer} radius="md" size="lg">
                                            {burgerIcon}
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                </Card>
            </div>
            <div style={{ padding: 25 }}>
                { children }
            </div>
        </>
    );
}