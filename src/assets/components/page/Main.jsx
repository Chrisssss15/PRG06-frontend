import { useEffect, useState } from "react";
import SingleToken from "../SingleToken.jsx";

function Token() {
    const [tokens, setTokens] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState("all"); // Filterstatus: all, favorite, notFavorite


    const ITEMS_PER_PAGE = 12; // Totaal 12 items per pagina

    useEffect(() => {
        async function fetchTokens(page) {
            try {
                setIsLoading(true);
                const response = await fetch(`http://145.24.223.22:8888/tokens?page=${page}&limit=${ITEMS_PER_PAGE}`, {
                // const response = await fetch(`http://localhost:8888/tokens?page=${page}&limit=${ITEMS_PER_PAGE}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const data = await response.json();
                setTokens(data.items);
                setCurrentPage(data.pagination.currentPage);
                setTotalPages(data.pagination.totalPages);
                setIsLoading(false);
            } catch (error) {
                console.error("Fout bij het ophalen van tokens:", error);
                setIsLoading(false);
            }
        }

        fetchTokens(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    //Filter systeem
    const filteredTokens = tokens.filter((token) => {
        if (filter === "favorite") return token.favorite === true; // Als filter favoriet is, toon alleen favorieten
        if (filter === "notFavorite") return token.favorite === false; // Als filter niet favoriet is, toon alleen niet favorieten
        return true; // "all" toont alles
    });

    return (
        <div>
            {isLoading && <div>Loading...</div>}

            <div className="flex justify-center space-x-4 my-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    Alle
                </button>
                <button
                    onClick={() => setFilter("favorite")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        filter === "favorite" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    Gefavoriet
                </button>
                <button
                    onClick={() => setFilter("notFavorite")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        filter === "notFavorite" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    Niet Gefavoriet
                </button>
            </div>

            <SingleToken tokens={filteredTokens} />

            <div className="flex items-center justify-center space-x-4 mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default Token;
