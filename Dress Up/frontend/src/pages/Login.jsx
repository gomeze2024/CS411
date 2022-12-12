import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f9ff",
            }}
        >
            Login Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default LoginPage;