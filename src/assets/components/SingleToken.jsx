import { Link } from "react-router";

function SingleToken({ tokens }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {tokens.map((token) => (
                <div
                    key={token.id}
                    className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200 transition hover:shadow-lg hover:bg-gray-50 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                            {token.nameToken}
                        </h1>
                        {token.favorite ? (
                            <span className="w-5 h-5 text-yellow-500" title="Favoriet">★</span>
                        ) : (
                            <span className="w-5 h-5 text-gray-400" title="Niet favoriet">☆</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{token.tigger}</p>
                    <Link
                        to={`/details/${token.id}`}
                        className="text-blue-500 hover:underline text-sm mt-auto"
                    >
                        Detail
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SingleToken;
