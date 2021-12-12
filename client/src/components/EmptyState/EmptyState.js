import { Space, Text } from "@mantine/core";

export default function EmptyState({ image, text, action }) {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src={image} height="300" />
                {/* <Space h="md" /> */}
                <Text style={{ fontSize: '18px' }}>
                    { text }
                </Text>
                <Space h="xl" />
                { action }
            </div>
        </>
    );
}