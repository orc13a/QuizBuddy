import { Card, Divider, Skeleton, Space } from "@mantine/core";

export default function LoadingCard({ align, style }) {
    const loadingCard = (
        <>
            <Card withBorder style={{ width: 300 }}>
                <div style={{ textAlign: 'center' }}>
                    <Skeleton height={50} radius="md" />
                </div>
                <Space h="lg" />
                <Divider />
                <Space h="lg" />
                <Skeleton height={40} radius="md" />
                <Space h="lg" />
                <Skeleton height={40} radius="md" />
                <Space h="lg" />
                <Space h="sm" />
                <div style={{ width: '100px', display: 'inline-block' }}>
                    <Skeleton height={35} radius="md" />
                </div>
                <div style={{ width: '100px', display: 'inline-block', float: 'right' }}>
                    <Skeleton height={35} radius="md" />
                </div>
            </Card>
        </>
    );

    return (
        <>
            { align === 'center' ? (
                <div className="center" style={style}>
                    { loadingCard }
                </div>
            ) : null }
            { align === 'middle' ? (
                <div className="centerH-o" style={style}>
                    <div className="centerH-i">
                        { loadingCard }
                    </div>
                </div>
            ) : null }
        </>
    );
}