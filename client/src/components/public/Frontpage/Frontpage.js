import { Button, Card, Col, Grid } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

export default function Frontpage() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    return (
        <>
            <Card padding="lg" align="stretch" radius="md" withBorder>
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
                            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                <Button onClick={ () => navigate('/login') } radius="md" size="md" style={{ float: 'right', backgroundColor: theme.colors.indigo[3] }}>
                                    Log ind
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Grid>
            </Card>
        </>
    );
}