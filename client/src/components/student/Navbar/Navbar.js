import { ActionIcon, Avatar, Button, Card, Space, Col, Drawer, Grid, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logout } from "../../../api";
import { useNotifications } from "@mantine/notifications";

export default function Navbar({ children }) {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    const burgerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
    );

    const getActive = () => {
        const url = window.location.href;
        const urlSplit = url.split('/');
        const page = urlSplit[4]; // urlSplit.length - 1
        const btn = document.getElementById(`${page}NavBtn`);
        if (btn !== null) {
            btn.classList.add('navBtnActive');
            btn.classList.remove('navBtn');
        }
    }

    const openDrawer = () => {
        setDrawerOpen(true);
        setTimeout(() => {
            getActive();
        }, 30);
    }

    const logoutClick = () => {
        setLogoutLoading(true);
        logout().then((res) => {
            notifications.showNotification({
                title: 'Vi ses',
                message: 'Du er blevet logget ud.',
                color: 'teal'
            })
            navigate('/login', { replace: true });
        }).catch((err) => {
            console.error(err);
            setLogoutLoading(false);
        });
    }

    const sunIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>
    );

    const moonIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        </svg>
    );

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
                title={
                    <>
                        <ActionIcon onClick={ () => setDarkTheme(!darkTheme) } color="indigo" variant="outline" radius="md" size="lg" style={{ position: 'absolute', left: 25, top: 36 }}>
                            { darkTheme ? sunIcon : moonIcon }
                        </ActionIcon>
                        <Avatar onClick={() => navigate('/student/profil')} style={{ cursor: 'pointer', position: 'absolute', right: 100, top: 33 }} radius="md" color="indigo">
                            { localStorage.getItem('qbavatar') }
                        </Avatar>
                    </>
                }
            >
                <div style={{ height: '85%', overflowY: 'scroll' }}>
                    <Link to="/student/forside" className="navBtnLink">
                        <Button id="forsideNavBtn" className="navBtn" fullWidth radius={0} size="md" color="indigo" variant="light">
                            Forside
                        </Button>
                    </Link>
                    <Space h="md" />
                    <Link to="/student/hold" className="navBtnLink">
                        <Button id="holdNavBtn" className="navBtn" fullWidth radius={0} size="md" color="indigo" variant="light">
                            Mine hold
                        </Button>
                    </Link>
                    <Space h="md" />
                    <Link to="/student/opgave" className="navBtnLink">
                        <Button id="opgaveNavBtn" className="navBtn" fullWidth radius={0} size="md" color="indigo" variant="light">
                            Mine opgaver
                        </Button>
                    </Link>
                </div>
                <div style={{ width: '320px', position: 'absolute', bottom: 0, paddingBottom: 0 }}>
                    <Card radius="md">
                        <Button loading={ logoutLoading } onClick={ logoutClick } fullWidth radius="md" size="md" color="red" variant="light">
                            Log ud
                        </Button>
                    </Card>
                </div>
            </Drawer>
            <div style={{ padding: 10, position: 'sticky', top: 8, zIndex: 1000 }}>
                <Card withBorder padding="sm" style={{ paddingRight: 25 }} align="stretch" radius="md">
                    <Grid columns={11}>
                        <Col span={6}>
                            <span className="logoTitleTeacher" style={{ marginLeft: 15 }}>
                                <Link style={{ color: theme.colors.indigo[3], textDecoration: 'none' }} to="/student/forside">
                                    { window.innerWidth < 385 ? 'QB' : 'QuizBuddy' }
                                </Link>
                            </span>
                        </Col>
                        <Col span={5}>
                            <div style={{ textAlign: 'right', display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                    <div style={{ display: 'inline-block', position: 'relative', top: 2 }}>
                                        <Avatar onClick={() => navigate('/student/profil')} style={{ cursor: 'pointer' }} radius="md" color="indigo">
                                            { localStorage.getItem('qbavatar') }
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