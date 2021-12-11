import { Button, Card, Divider, Space, Text, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { studentGetAssignment, studentStartAssignment } from "../../../api";
import { checkDatePastToday } from "../../checkDatePastToday";
import LoadingCard from "../../LoadingCard/LoadingCard";
import Navbar from "../Navbar/Navbar";

export default function StudentAssignment() {
    const { assignmentId } = useParams();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const [fetching, setFetching] = useState(true);
    const [starting, setStarting] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [studentId, setStudentId] = useState('');
    const [startedAssignment, setStartedAssignment] = useState(null);

    useEffect(() => {
        studentGetAssignment(assignmentId).then((res) => {
            setAssignment(res.data.assignment);
            setStudentId(res.data.studentId);
            setFetching(false);
            if (fetching === false && res.data.assignment.questions.length === 0) {
                notifications.showNotification({
                    title: 'Hov',
                    message: 'Der er ingen spørgsmål i denne opgave, din lærer skal oprette nogen spørgsmål.',
                    color: 'yellow',
                    autoClose: 5000
                });
            }
            assignment.studentsStarted.forEach(student => {
                if (student.studentId === studentId) {
                    setStartedAssignment(student);
                }
            });
        }).catch((err) => {
            console.error(err);
        });
    }, [fetching]);

    const startAssignment = () => {
        setStarting(true);
        studentStartAssignment(assignment).then((res) => {
            const data = res.data;
            navigate(`/student/opgave/${assignment.assignmentId}/spoergsmaal/${data.startQuestionId}`, { replace: true });
        }).catch((err) => {
            console.error(err);
        });
    }

    const continueAssignment = () => {
        setStarting(true);
        navigate(`/student/opgave/${assignmentId}/spoergsmaal/${startedAssignment.questionIndex}`, { replace: true });
    }

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
                                            { startedAssignment !== null ? (
                                                <>
                                                    <div>
                                                        <span>
                                                            Du er ved spørgsmål:
                                                        </span>
                                                        <span style={{ float: 'right' }}>
                                                            { startedAssignment.questionIndex + 1 }
                                                        </span>
                                                    </div>
                                                    <Space h="md" />
                                                </>
                                            ) : null }
                                            <div>
                                                <span>
                                                    Tid:
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    { assignment.timeType === 'limit' ? (
                                                            assignment.timeLimitHours + ' t. ' + assignment.timeLimitMinutes + ' min'
                                                    ) : 'Tidstagning' }
                                                </span>
                                            </div>
                                            <Space h="md" />
                                            <div>
                                                <span>
                                                    Frist:
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    { checkDatePastToday(assignment.openToDate) ? (
                                                        <>
                                                            <Tooltip label={assignment.openTo}>
                                                                <Text style={{ cursor: 'default' }} color="red">
                                                                    Lukket
                                                                </Text>
                                                            </Tooltip>
                                                        </>
                                                    ) : assignment.openTo }
                                                </span>
                                            </div>
                                        </Text>
                                    </div>
                                    { checkDatePastToday(assignment.openToDate) ? (
                                        <div>
                                            <Space h="lg" />
                                            <Button fullWidth color="indigo" size="md" radius="md">
                                                Dine resultater
                                            </Button>
                                        </div>
                                    ) : null }
                                    <Space h="lg" />
                                    <Space h="sm" />
                                    <Button disabled={ starting } onClick={ () => navigate(`/student/hold/${assignment.teamId}`) } variant="outline" color="indigo" size="md" radius="md">
                                        Tilbage
                                    </Button>
                                    { !checkDatePastToday(assignment.openToDate) && assignment.questions.length > 0 ? (
                                        <>
                                            { startedAssignment === null ? (
                                                <Button loading={starting} onClick={ startAssignment } style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                                    Start
                                                </Button>
                                            ) : (
                                                <Button loading={starting} onClick={ continueAssignment } style={{ float: 'right' }} color="indigo" size="md" radius="md">
                                                    Forsæt
                                                </Button>
                                            ) }
                                        </>
                                    ) : null }
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