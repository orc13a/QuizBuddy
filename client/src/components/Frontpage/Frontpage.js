import { Button, Card, Col, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Frontpage() {
    let navigate = useNavigate();

    return (
        <>
            <Card padding="lg" align="stretch" radius="md" withBorder>
                <Grid columns={10}>
                    <Col span={5}>
                        <span className="logoTitle">
                            QuizBuddy
                        </span>
                    </Col>
                    <Col span={5}>
                        <div style={{ display: 'table', width: '100%', height: '100%' }}>
                            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                <Button onClick={ () => navigate('/login') } onClick radius="md" size="md" style={{ float: 'right' }}>
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