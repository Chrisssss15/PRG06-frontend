import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function EditToken() {
    const { id } = useParams();
    const navigate = useNavigate(); // leidt de client naar een ander pagina
    const [formData, setFormData] = useState({ nameToken: '', tigger: '', adress: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTokenDetail() {
            try {
                const response = await fetch(`http://145.24.223.22:8888/tokens/${id}`, {
                // const response = await fetch(`http://localhost:8888/tokens/${id}`, {

                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch token details");
                }

                const data = await response.json();
                setFormData({
                    nameToken: data.nameToken,
                    tigger: data.tigger,
                    adress: data.adress,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching token details:", error);
                setIsLoading(false);
            }
        }
        fetchTokenDetail();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://145.24.223.22:8888/tokens/${id}`, {
            // const response = await fetch(`http://localhost:8888/tokens/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update token");
            }

            alert("Token successfully updated");
            navigate(`/`); // Redirect terug naar de detailpagina
        } catch (error) {
            console.error("Error updating token:", error);
            alert("Failed to update token");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-10 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Edit Token</h1>
                <form onSubmit={handleEdit} className="space-y-8">
                    {/* Title Input */}
                    <div>
                        <label
                            htmlFor="nameToken"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Name token:
                        </label>
                        <input
                            type="text"
                            id="nameToken"
                            name="nameToken"
                            value={formData.nameToken}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Body Input */}
                    <div>
                        <label
                            htmlFor="tigger"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Tigger:
                        </label>
                        <textarea
                            id="tigger"
                            name="tigger"
                            value={formData.tigger}
                            onChange={handleInputChange}
                            rows="6"
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Author Input */}
                    <div>
                        <label
                            htmlFor="adres"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Adres:
                        </label>
                        <input
                            type="text"
                            id="adres"
                            name="adres"
                            value={formData.adress}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between mt-8">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/`)}
                            className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditToken;
