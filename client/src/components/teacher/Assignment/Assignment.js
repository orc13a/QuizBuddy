import { Card, Divider, Loader, Space, Title } from '@mantine/core';
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
                            </Card>
                        </>
                    ) }
                </div>
            </Navbar>
        </>
    );
}