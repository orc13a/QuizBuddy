import { Card, Col, Grid, Text, useMantineTheme } from "@mantine/core";
import Navbar from "../Navbar/Navbar";

export default function TeacherTeams() {
    const theme = useMantineTheme();

    return(
        <>
            <Navbar>
                <Grid gutter="xl">
                    <Col span={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 1</Text>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card className="teamCard" withBorder>
                            <Text weight={500}>Hold 2</Text>
                        </Card>
                    </Col>
                </Grid>
            </Navbar>
        </>
    );
}