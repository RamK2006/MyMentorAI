import React from 'react';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import ThemeToggle from './ThemeToggle';
import { LogOut } from 'lucide-react';

const Header = () => {
    const { auth, logout } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Logo className="h-8 w-8 text-electric-blue-600 dark:text-electric-blue-500" />
                        <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                            Student Success Predictor
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Welcome, {auth.user?.name || 'User'}
                        </span>
                        <ThemeToggle />
                        <button
                            onClick={logout}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue-500"
                            aria-label="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;