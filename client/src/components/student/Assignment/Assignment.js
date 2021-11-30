import { Button, Card, Divider, Loader, Skeleton, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { studentGetAssignment } from "../../../api";
import LoadingCard from "../../LoadingCard/LoadingCard";
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
    // {/* <div className="center">
    //                     <Loader color="indigo" size="xl" variant="dots" />
    //                 </div> */}
    return(
        <>
            <Navbar>
                { fetching ? (
                    
                    <LoadingCard align="center" />
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
                                            <div>
                                                <span>
                                                    Antal spørgsmål:
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    { assignment.questions.length }
                                                </span>
                                            </div>
                                            <Space h="md" />
                                            <div>
                                                <span>
                                                    Tid:
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    { assignment.timeLimitHours } t. { assignment.timeLimitMinutes } min
                                                </span>
                                            </div>
                                            <Space h="md" />
                                            <div>
                                                <span>
                                                    Frist:
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    { assignment.openTo }
                                                </span>
                                            </div>
                                        </Text>
                                    </div>
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button onClick={ () => navigate(`/student/hold/${assignment.teamId}`) } variant="outline" color="indigo" size="md" radius="md">
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