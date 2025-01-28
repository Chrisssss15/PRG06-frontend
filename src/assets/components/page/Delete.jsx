import { useNavigate } from "react-router";

function DeleteToken({ id }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://145.24.223.22:8888/tokens/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete note");
            }

            alert("Token deleted successfully");
            navigate("/"); // Redirect to the homepage after deletion
        } catch (error) {
            console.error("Error message:", error);
            alert("Failed to delete token");
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Token
        </button>
    );
}

export default DeleteToken;
