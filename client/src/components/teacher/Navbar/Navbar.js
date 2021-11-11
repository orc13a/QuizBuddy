import { ActionIcon, Card, Col, Drawer, Grid, useMantineTheme } from "@mantine/core";
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
            title="Register"
            padding="md"
            size="md"
            overlayOpacity={0.15}
            >
                Hej
            </Drawer>
            <Card padding="lg" style={{ paddingRight: 25 }} align="stretch" radius="md">
                <Grid columns={10}>
                    <Col span={5}>
                        <span className="logoTitle">
                            <Link style={{ color: theme.colors.indigo[3], textDecoration: 'none' }} to="/">
                                QuizBuddy
                            </Link>
                        </span>
                    </Col>
                    <Col span={5}>
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
        </>
    );
}