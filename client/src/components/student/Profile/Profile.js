import { Avatar, Button, Card, Col, Divider, Grid, Loader, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getStudent } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function StudentProfile() {
    const [fetching, setFetching] = useState(true);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        getStudent().then((res) => {
            setStudent(res.data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
        });
    });

    return (
        <>
            <Navbar>
                <div className="center">
                    { fetching ? (
                        <Loader color="indigo" size="xl" variant="dots" />
                    ) : (
                        <Card withBorder radius="md" style={{ width: 300 }}>
                            {/* <div style={{ textAlign: 'right', display: 'table', width: '100%', height: '100%' }}>
                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}> */}
                                    <Grid align="center">
                                        <Col span={2}>
                                            <Avatar radius="md" size="lg" color="indigo">
                                                { localStorage.getItem('qbavatar') }
                                            </Avatar>
                                        </Col>
                                        <Col span={10}>
                                            <div style={{ position: 'relative', left: 20 }}>
                                                <Text size="md">
                                                    { student.firstname } { student.lastname }
                                                </Text>
                                            </div>
                                        </Col>
                                    </Grid>
                                {/* </div>
                            </div> */}
                            <Space h="lg" />
                            <Divider />
                            <Space h="lg" />
                            <Button color="indigo" radius="md" size="md" fullWidth>
                                Ændre adgangskode
                            </Button>
                            <Space h="lg" />
                            <Button color="red" variant="light" radius="md" size="md" fullWidth>
                                Slet profil
                            </Button>
                        </Card>
                    ) }
                </div>
            </Navbar>
        </>
    );
}