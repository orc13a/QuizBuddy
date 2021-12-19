import { Button, Space, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SadImgPath from '../../images/sad.png';
import Logo from "../public/Logo/Logo";

export default function NotFound404() {
    const navigate = useNavigate();

    return (
        <>
            <Logo />
            <div className="center">
                <div style={{ textAlign: 'center' }}>
                    <img src={SadImgPath} alt="billede der viser mood af vores maskot" height="300" />
                    <Text style={{ fontSize: '18px' }}>
                        Denne side findes ikke
                    </Text>
                    <Space h="xl" />
                    <Button radius="md" size="md" color="indigo" onClick={ () => navigate(-1, { replace: true }) }>
                        Gå tilbage
                    </Button>
                </div>
            </div>
        </>
    );
}