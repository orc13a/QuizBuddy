import { Button, Card, Divider, Input, InputWrapper, LoadingOverlay, Space, Title, useMantineTheme } from "@mantine/core";
import Logo from "../Logo/Logo";
import { useForm } from '@mantine/hooks';

export default function Login() {
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: () => false,
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        form.onSubmit((values) => console.log(values))
    }

    const userIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
    );

    const keyIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
    );

    return (
        <>
            <Logo />
            <div className="center">
                <LoadingOverlay  visible={false} />
                <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                    <form onSubmit={ onSubmit }>
                        <Card.Section>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <Title order={2}>
                                    Log ind
                                </Title>
                            </div>
                        </Card.Section>
                        <Divider />
                        <Card.Section style={{ marginTop: 25 }}>
                            <InputWrapper label="Brugernavn" required>
                                <Input value={form.values.email} onChange={(event) => form.setFieldValue('email', event.currentTarget.value)} icon={userIcon} autoFocus required />
                            </InputWrapper>
                            <Space h="xl" />
                            <InputWrapper label="Adgangskode" required>
                                <Input type="password" value={form.values.password} onChange={(event) => form.setFieldValue('password', event.currentTarget.value)} icon={keyIcon} required />
                            </InputWrapper>
                            <Space h="xl" />
                            <Button type="submit" style={{ float: 'right', backgroundColor: theme.colors.indigo[3] }}>
                                Log ind
                            </Button>
                        </Card.Section>
                    </form>
                </Card>
            </div>
        </>
    );
}