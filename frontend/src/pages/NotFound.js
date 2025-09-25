import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <ShieldAlert className="w-24 h-24 text-danger-red animate-pulse" />
            <h1 className="mt-8 text-6xl font-bold text-gray-800 dark:text-white">404</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Oops! The page you're looking for doesn't exist.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">It might have been moved or deleted.</p>
            <Link
                to="/dashboard"
                className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-electric-blue-600 rounded-lg shadow-md hover:bg-electric-blue-700 transition-colors duration-300"
            >
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;