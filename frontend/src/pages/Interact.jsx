import { Link } from "react-router-dom";

function InteractPage() {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f9ff",
            }}
        >
            Interact Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default InteractPage;