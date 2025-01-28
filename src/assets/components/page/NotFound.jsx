import React from 'react';
import { Link } from 'react-router';

function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
