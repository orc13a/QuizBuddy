import { Button, Card, Col, Grid } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

export default function Frontpage() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    return (
        <>
            <div style={{ padding: 10 }}>
                <Card padding="md" align="stretch" radius="md" withBorder>
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
                                <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'middle' }}>
                                    <Button onClick={ () => navigate('/signup') } color="indigo" variant="light" radius="md" size="md" >
                                        Opret
                                    </Button>
                                    <span style={{ margin: '0px 10px 0px 10px' }} />
                                    <Button onClick={ () => navigate('/login') } color="indigo" radius="md" size="md">
                                        Log ind
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                </Card>
            </div>
        </>
    );
}