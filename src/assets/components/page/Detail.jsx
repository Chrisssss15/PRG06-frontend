import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import DeleteToken from "./Delete.jsx";
import NotFound from "./NotFound.jsx";

function Detail() {
    const { id } = useParams();
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        async function fetchNoteDetail() {
            try {
                const response = await fetch(`http://145.24.223.22:8888/tokens/${id}`, {
                // const response = await fetch(`http://localhost:8888/tokens/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch note details");
                }
                if (!isLoading && !token) {
                    return <NotFound />;
                }
                const data = await response.json();
                setToken(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching note details:", error);
                setIsLoading(false);
            }
        }
        fetchNoteDetail();
    }, [id]);

    const toggleFavorite = async () => {
        if (!token) return;

        setIsUpdating(true);
        try {
            const response = await fetch(`http://145.24.223.22:8888/tokens/${id}`, {
            // const response = await fetch(`http://localhost:8888/tokens/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json", // Voeg deze header expliciet toe
                },
                body: JSON.stringify({ favorite: !token.favorite }),
            });

            if (!response.ok) {
                throw new Error("Failed to update favorite status");
            }

            const updatedToken = await response.json();
            setToken(updatedToken);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    // if (!token) {
    //     return <p>Token not found.</p>;
    // }

    if (!token) {
        return <NotFound />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    Token Details
                </h1>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-600">Name token:</span>
                        <span className="text-lg text-gray-800">{token.nameToken}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-600">Tigger:</span>
                        <span className="text-lg text-gray-800">{token.tigger}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-600">Token adress:</span>
                        <p className="text-gray-700 mt-2">{token.adress}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-600">Favorite:</span>
                        <span className="text-lg text-gray-800">{token.favorite ? "Yes" : "No"}</span>
                    </div>
                </div>
                <div className="mt-8 space-y-4">
                    {/* Eerste rij: Favorite, Edit, Delete */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleFavorite}
                            disabled={isUpdating}
                            className={`px-4 py-2 font-medium rounded-lg shadow transition ${
                                token.favorite
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            {isUpdating ? "Updating..." : token.favorite ? "Unfavorite" : "Favorite"}
                        </button>
                        <Link
                            to={`/edit/${token.id}`}
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Edit Token
                        </Link>
                        <DeleteToken id={id} />
                    </div>
                    <div className="flex justify-start">
                        <Link
                            to="/"
                            className="px-6 py-3  text-black font-medium rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            Terug naar Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
