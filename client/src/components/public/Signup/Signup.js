// Importere hvad vi skal bruge på siden
// Det kan være alt fra UI components eller hooks (funktioner)
// og andre af vores components eller billeder
import { Button, Text, Card, Divider, Loader, LoadingOverlay, PasswordInput, Popover, Progress, Space, TextInput, Title, useMantineTheme, SegmentedControl, InputWrapper, Alert } from "@mantine/core";
import Logo from "../Logo/Logo";
import { useForm } from '@mantine/hooks';
import { useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../../../api";
import { useNotifications } from "@mantine/notifications";

// Const er et variable som værdi ikke kan ændres
const requirements = [
    { re: /[0-9]/, label: 'Skal indholde et tal' },
    { re: /[a-z]/, label: 'Skal indholde småt bogstav' },
    { re: /[A-Z]/, label: 'Skal indholde stort bogstav' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Skal indholde specielt tegn' },
];

// Laver vi vores eget React component
// mere om det ved linje 58
function PasswordRequirement({ meets, label }) {
    const checkIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>
    );

    const crossIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    );

    return (
        <Text
        color={meets ? 'teal' : 'red'}
        style={{ display: 'flex', alignItems: 'center', marginTop: 7 }}
        size="sm"
        >
            {meets ? checkIcon : crossIcon} <span style={{ marginLeft: 10 }}>{label}</span>
        </Text>
    );
}

function getStrength(password) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Signup() { // Sådan laver man et React component, skal starte med stort
    // Laver nogen variabler for nogen hooks
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const notifications = useNotifications();

    // Man kan kalde de her variabler i React,
    // når en af de har opdateres, opdateres hele siden
    //       👇 navn    👇 sæt variablen
    const [loading, setLoading] = useState(false);
    // useState er en hook i react til at holde styr på variablerne
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [userType, setUserType] = useState('student');
    const [errorMsg, setErrorMsg] = useState('');
    const [formError, setFormError] = useState(false);

    // Vores form values, en del af vores UI libary (Mantine)
    const form = useForm({
        initialValues: {
            studentType: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordRepeat: '',
        },
        validationRules: {
            firstname: (value) => value.length !== 0,
            lastname: (value) => value.length !== 0,
            email: (value) => /^\S+@\S+$/.test(value),
            password: () => checkStrength(),
            passwordRepeat: () => checkPwd(),
        },
    });

    // Ligesom at lave en funktion, bare en anden måde i Javascript, det er en arrow function
    // Tjekker om adgangskoderne er ens
    const checkPwd = () => {
        if (form.values.passwordRepeat === form.values.password) {
            return true;
        } else {
            return false;
        }
    }

    const strength = getStrength(form.values.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    const checks = requirements.map((requirement, index) => (
        // Her bruger vi så det component
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
    ));

    const checkStrength = () => {
        if (form.values.password.length > 7 && form.values.password.length !== 0 && strength === 100) {
            return true;
        } else {
            return false;
        }
    }

    // Når man trykker "Opret" knappen
    const onSubmit = (values) => {
        window.scrollTo(0, 0);
        setLoading(true); // Sådan sætter man en af "React variablerne"
        values.profileType = userType;

        // Her bruger vi "signup" fra api/index.js til at kalde serveren
        // Læs mere om det i den fil
        // Da vi skal vente på serveren svare tilbage, arbejder man med et promise i Javascript,
        // Dermed bruger vi "then and catch" til at venter og når den så kommer et svar (then)
        // Så arbejder vi med den data, catch er til at fange alle eventuelle errors
        signup(values).then((res) => { // res er responde fra serveren
            // Dette er til at lave de der popup notifications, en del af Mantine
            notifications.showNotification({
                title: 'Profil oprettet',
                message: 'Du kan nu logge ind med din profil',
                color: 'teal'
            });

            // Navigate er en hook til at gå til en ny side (url side)
            navigate(`/login`, { replace: true });
            // replace, er til at brugeren ikke kan gå tilbage i sin browser til denne side
        }).catch((err) => { // Hvis der er fejl, køre vi denne kode block
            const data = err.response.data;
            setErrorMsg(data.message);
            setFormError(true);
            setLoading(false);
        });
    }

    // Variable med JSX i, (JSX) er en form for javascript med HTML i sig
    // Det er et svg for et ikon
    const userIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
    );

    const atIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
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

    // Her i skriver vi vores JSX,
    // det er ved der ses på siden.
    // JSX er meget som HTML, men mere i en Javascript stil
    // så man har <tags>, dem med stort forbogstav er React components
    return (
        // Et tomt <tag>
        <>
            <Logo />
            <div className="centerH-o" style={{ paddingTop: 125, paddingBottom: 100 }}>
                <div className="centerH-i">
                    <Card padding="lg" style={{ width: '300px' }} shadow={theme.shadows.sm} withBorder>
                        <LoadingOverlay loader={<Loader variant="dots" size="xl" color={theme.colors.indigo[3]} />} visible={loading} />
                        <div style={{ textAlign: 'center' }}>
                            <Title order={2}>
                                Opret
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
                        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                            <InputWrapper size="md" label="Hvad er du?">
                            {/* Dem som fx "size" er ligesom HTML attributs, men dette er nogen som man selv kan lave når man laver det component */}
                            <SegmentedControl
                            size="md"
                            radius="md"
                            fullWidth
                            value={userType}
                            onChange={setUserType}
                            data={[
                                { label: 'Elev', value: 'student' },
                                { label: 'Lærer', value: 'teacher' },
                            ]}
                            />
                            </InputWrapper>
                            <Space h="lg" />
                            <TextInput
                                icon={userIcon}
                                required
                                size="md"
                                radius="md"
                                label="Fornavn"
                                error={form.errors.firstname && 'Angiv fornavn'}
                                value={form.values.firstname}
                                onChange={(event) => form.setFieldValue('firstname', event.currentTarget.value)}
                            />
                            <Space h="lg" />
                            <TextInput
                                icon={userIcon}
                                required
                                radius="md"
                                size="md"
                                label="Efternavn"
                                error={form.errors.lastname && 'Angiv efternavn'}
                                value={form.values.lastname}
                                onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}
                            />
                            <Space h="lg" />
                            <TextInput
                                icon={atIcon}
                                required
                                radius="md"
                                size="md"
                                label="E-mail"
                                error={form.errors.email && 'Angiv e-mail'}
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            />
                            <Space h="lg" />
                            <Popover
                                opened={popoverOpened}
                                position="top"
                                placement="start"
                                withArrow
                                styles={{ popover: { width: '258px' } }}
                                noFocusTrap
                                transition="pop-top-left"
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                                target={
                                    <PasswordInput
                                        style={{ width: '258px' }}
                                        required
                                        radius="md"
                                        size="md"
                                        icon={keyIcon}
                                        label="Adgangskode"
                                        // description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
                                        error={form.errors.password && 'Angiv en stærk adgangskode'}
                                        value={form.values.password}
                                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                    />
                                }
                            >
                                <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                                <PasswordRequirement label="Skal være mindst 8 tegn" meets={form.values.password.length > 7} />
                                {checks}
                            </Popover>
                            <Space h="lg" />
                            <PasswordInput
                                icon={keyIcon}
                                required
                                radius="md"
                                size="md"
                                label="Gentag adgangskode"
                                error={form.errors.passwordRepeat && 'Adgangskoderne passer ikke!'}
                                value={form.values.passwordRepeat}
                                onChange={(event) => form.setFieldValue('passwordRepeat', event.currentTarget.value)}
                            />
                            <Space h="xl" />
                            <Space h="sm" />
                            <Button size="md" style={{ float: 'left' }} variant="light" color="indigo" radius="md" onClick={() => navigate('/')}>
                                Fortryd
                            </Button>
                            <Button size="md" style={{ float: 'right' }} color="indigo" radius="md" type="submit">
                                Opret
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}