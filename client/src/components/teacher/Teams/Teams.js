import { Card, Col, Grid, Text } from "@mantine/core";
import Navbar from "../Navbar/Navbar";

export default function TeacherTeams() {

    return(
        <>
            <Navbar>
                <Grid gutter="xl">
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 1</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 2</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 3</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 4</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 5</Text>
                        </Card>
                    </Col>
                    <Col span={12} sm={3} md={4} lg={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 6</Text>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}