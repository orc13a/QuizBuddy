import { Button, Card, Col, Divider, Grid, Space, Text, TextInput, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';

export default function StudentQuestion() {
    const { assignmentId, questionId } = useParams();

    return (
        <>
            <Navbar>
                <Grid justify="center">
                    <Col span={12} sm={8}>
                        <Card style={{ width: 250 }} radius="md" withBorder>
                            <Text>
                                <span>
                                    Tid: 
                                </span>
                                <span style={{ float: 'right' }}>
                                    1:0
                                </span>
                            </Text>
                        </Card>
                        <Space h="xl" />
                        <Card withBorder radius="md" padding="lg">
                            <div>
                                <Title order={3}>
                                    Hej
                                </Title>
                                <Space h="lg" />
                                <Divider />
                                <Space h="lg" />
                                <Grid>
                                    <Col span={8}>
                                        <Card style={{ minHeight: 200 }} withBorder>
                                            hej
                                        </Card>
                                    </Col>
                                    <Col span={4}>
                                        <form>
                                            <TextInput placeholder="Dit svar" size="md" radius="md" color="indigo" />
                                            <Space h="lg" />
                                            <Button size="md" radius="md" color="indigo" fullWidth>Svar</Button>
                                        </form>
                                    </Col>
                                </Grid>
                            </div>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}