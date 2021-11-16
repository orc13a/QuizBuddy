import { Accordion, Card } from "@mantine/core";
import { useEffect, useState } from "react";

export default function CardInfo({ createdAt }) {
    const [createdDate, setCreatedDate] = useState('');

    const days = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

    useEffect(() => {
        let date = '';
        const d = new Date(createdAt);
        // date += days[d.getDay()] + ', ';
        date += (d.getDate() + 1) + '/';
        date += (d.getMonth() + 1) + '/';
        date += d.getFullYear();

        setCreatedDate(date);
    });

    return (
        <>
            <Accordion>
                <Accordion.Item label="Andet information">
                    <Card>
                        <span style={{ float: 'left' }}><b>Oprettet:</b></span>
                        <span style={{ float: 'right' }}>{ createdDate }</span>
                    </Card>
                </Accordion.Item>
            </Accordion>
        </>
    );
}