import { Button, Card, Divider, Select, Space, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import Navbar from "../Navbar/Navbar";

export default function TeacherCreateAssignment() {

    const form = useForm({
        initialValues: {
            teamName: '',
        },
        validationRules: {
            teamName: (value) => value.length > 1,
        },
    });

    const onSubmit = () => {

    }

    return (
        <>
            <Navbar>
                <div className="centerH-o" style={{ paddingTop: 50, paddingBottom: 100 }}>
                    <div className="centerH-i">
                        <Card style={{ width: 300 }} withBorder radius="md">
                            <div style={{ textAlign: 'center' }}>
                                <Title order={2}>
                                    Opret opgave
                                </Title>
                            </div>
                            <Space h="lg" />
                            <Divider />
                            <Space h="lg" />
                            <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                                <Select
                                label="Your favorite framework/library"
                                placeholder="Pick one"
                                data={[
                                    { value: 'react', label: 'React' },
                                    { value: 'ng', label: 'Angular' },
                                    { value: 'svelte', label: 'Svelte' },
                                    { value: 'vue', label: 'Vue' },
                                ]}
                                />
                                <Space h="lg" />
                                <Space h="sm" />
                                <Button radius="md" size="md" color="indigo" type="submit" style={{ float: 'right' }}>
                                    Opret
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </Navbar>
        </>
    );
}