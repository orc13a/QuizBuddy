import { Loader } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import { setAccessToken } from "../../accessToken";
import { studentRF } from "../../api";

export default function StudentRoute({ children }) {
    const notifications = useNotifications();

    const [loading, setLoading] = useState(true);
    const [tokenState, setTokenState] = useState('');

    useEffect(() => {
        studentRF().then((res) => {
            setAccessToken(res.data['accessToken']);
            setTokenState(res.data['type']);
            setLoading(false);
        }).catch((err) => {
            setTokenState('error');
            setLoading(false);
            console.error(err);
        });
    });

    if (loading) {
        return (
            <>
                <div className="center">
                    <Loader color="indigo" size="xl" variant="dots" />
                </div>
            </>
        );
    } else {
        if (tokenState === 'success') {
            // "children" er den side som denne "firewall" beskøter
            return children;
        } else {
            notifications.showNotification({
                title: 'Ops...',
                message: 'Du skal være logget ind for at se den side.',
                color: 'red'
            });
            return <Navigate to="/login" />;
        }
    }
}