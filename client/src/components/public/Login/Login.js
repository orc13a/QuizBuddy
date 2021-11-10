import { Button, Card, Divider, LoadingOverlay, PasswordInput, Space, TextInput, Title, useMantineTheme } from "@mantine/core";
import Logo from "../Logo/Logo";
import { useForm } from '@mantine/hooks';
import { useState } from "react";

export default function Login() {
    const theme = useMantineTheme();

    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        }
    });

    // validationRules: {
    //     email: (value) => /^\S+@\S+$/.test(value),
    // },

    const onSubmit = (values) => {
        setLoading(true);
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
                <LoadingOverlay visible={loading} />
                <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                    <div style={{ textAlign: 'center' }}>
                        <Title order={2}>
                            Log ind
                        </Title>
                    </div>
                    <Space h="lg" />
                    <Divider />
                    <Space h="lg" />
                    <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                        <TextInput
                        icon={userIcon}
                        autoFocus
                        radius="md"
                        label="E-mail"
                        error={form.errors.email && 'Please specify valid email'}
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        />
                        <Space h="lg" />
                        <PasswordInput
                        icon={keyIcon}
                        radius="md"
                        label="Adgangskode"
                        error={form.errors.password && 'forkert'}
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        />
                        <Space h="lg" />
                        <Button loading={loading} style={{ float: 'right' }} radius="md" type="submit">
                            Log ind
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}