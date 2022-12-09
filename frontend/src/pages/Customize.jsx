import { Link } from "react-router-dom";

function CustomizePage() {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f9ff",
            }}
        >
            Customize Page
            <Link to="/">
                Back to Main Page
            </Link>
        </div>
    );
}

export default CustomizePage;