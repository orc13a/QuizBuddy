import { useMantineTheme } from "@mantine/styles";
import { Link } from "react-router-dom";

export default function Logo() {
    const theme = useMantineTheme();

    return (
        <>
            <div className="logo">
                <Link to="/" style={{ color: theme.colors.indigo[3], textDecoration: 'none' }}>
                    QuizBuddy
                </Link>
            </div>
        </>
    );
}