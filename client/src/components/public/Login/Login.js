import { Alert, Button, Card, Divider, Loader, LoadingOverlay, PasswordInput, Space, TextInput, Title, useMantineTheme } from "@mantine/core";
import Logo from "../Logo/Logo";
import { useForm } from '@mantine/hooks';
import { useState } from "react";
import { login } from "../../../api";
import { useNavigate } from "react-router";
import { setAccessToken } from "../../../accessToken";

export default function Login() {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formError, setFormError] = useState(false);

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
        login(values).then((res) => {
            const data = res.data;
            setAccessToken(data.qbid);
            localStorage.setItem('qbavatar', data.userAvatar);
            navigate(`/${data.profileType}/forside`, { replace: true });
        }).catch((err) => {
            const data = err.response.data;
            setErrorMsg(data.message);
            setFormError(true);
            setLoading(false);
        });
    }

    const atIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
        </svg>
    );

    const keyIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
    );

    const errorIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>
    );

    return (
        <>
            <Logo />
            <div className="center">
                <LoadingOverlay loader={ <Loader variant="dots" size="xl" color={theme.colors.indigo[3]} /> } visible={loading} />
                <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                    <div style={{ textAlign: 'center' }}>
                        <Title order={2}>
                            Log ind
                        </Title>
                    </div>
                    <Space h="lg" />
                    <Divider />
                    <div hidden={!formError}>
                        <Space h="lg" />
                        <Alert icon={errorIcon} color="red" title="Ops..." withCloseButton onClose={() => setFormError(false)}>
                            { errorMsg }
                        </Alert>
                        <Space h="lg" />
                        <Divider />
                    </div>
                    <Space h="lg" />
                    <form onSubmit={ form.onSubmit((values) => onSubmit(values)) }>
                        <TextInput
                        icon={atIcon}
                        size="md"
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
                        size="md"
                        label="Adgangskode"
                        error={form.errors.password && 'forkert'}
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        />
                        <Space h="lg" />
                        <Button size="md" style={{ float: 'right' }} color="indigo" radius="md" type="submit">
                            Log ind
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}