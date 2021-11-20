import { Button, Card, Divider, Loader, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { studentGetAssignment } from "../../../api";
import Navbar from "../Navbar/Navbar";

export default function StudentAssignment() {
    const { assignmentId } = useParams();
    const navigate = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [assignment, setAssignment] = useState(null);

    useEffect(() => {
        studentGetAssignment(assignmentId).then((res) => {
            setAssignment(res.data);
            setFetching(false);
        }).catch((err) => {
            console.error(err);
        });
    });

    return(
        <>
            <Navbar>
                { fetching ? (
                    <div className="center">
                        <Loader color="indigo" size="xl" variant="dots" />
                    </div>
                ) : (
                    <>
                        {/* <div className="centerH-o">
                            <div className="centerH-i"> */}
                        <div className="center">
                                <Card withBorder style={{ width: 300 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Title order={2}>
                                            { assignment.name }
                                        </Title>
                                    </div>
                                    <Space h="lg" />
                                    <Divider />
                                    <Space h="lg" />
                                        <div style={{ padding: '0px 15px' }}>
                                            <Text size="lg">
                                                <div style={{ marginBottom: '15px' }}>
                                                    <span>
                                                        Antal spørgsmål:
                                                    </span>
                                                    <span style={{ float: 'right' }}>
                                                        { assignment.questions.length }
                                                    </span>
                                                </div>
                                                <div>
                                                    <span>
                                                        Tid:
                                                    </span>
                                                    <span style={{ float: 'right' }}>
                                                        02:00
                                                    </span>
                                                </div>
                                            </Text>
                                        </div>
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button onClick={ () => navigate(`/student/hold/${''}`) } variant="outline" color="indigo" size="md" radius="md">
                                        Tilbage
                                    </Button>
                                    <Button style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                        Start
                                    </Button>
                                </Card>
                        </div>
                            {/* </div>
                        </div> */}
                    </>
                )}
            </Navbar>
        </>
    );
}