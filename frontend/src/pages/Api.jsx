import { Link } from "react-router-dom";

function ApiPage() {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f9ff",
            }}
        >
            API Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default ApiPage;