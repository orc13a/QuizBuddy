import { Accordion, Button, Card, Divider, Loader, Space, Title } from '@mantine/core';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';

export default function TeacherAssignment() {
    const [fetching, setFetching] = useState(false);

    return (
        <>
            <Navbar>
                <div className="center">
                    { fetching ? (
                        <Loader color="indigo" size="xl" variant="dots" />
                    ) : (
                        <>
                            <Card withBorder style={{ width: 300 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Title order={2}>
                                        title
                                    </Title>
                                </div>
                                <Space h="lg" />
                                <Divider />
                                <Space h="lg" />
                                <Accordion>
                                    <Accordion.Item label="Alle spørgsmål">
                                        Hej
                                    </Accordion.Item>
                                </Accordion>
                                <Space h="lg" />
                                <Button fullWidth radius="md" size="md" color="indigo">
                                    Opret spørgsmål
                                </Button>
                                <Space h="lg" />
                                <Space h="sm" />
                                <Button radius="md" size="md" color="red" variant="light">
                                    Slet opgave
                                </Button>
                            </Card>
                        </>
                    ) }
                </div>
            </Navbar>
        </>
    );
}