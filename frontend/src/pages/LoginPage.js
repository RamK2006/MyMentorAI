import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BrainCircuit } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (!accessKey) {
            setError("An access key is required to log in.");
            setLoading(false);
            return;
        }
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-fade-in">
                <div className="text-center">
                    <BrainCircuit className="mx-auto h-12 w-auto text-electric-blue-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Student Success Predictor
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to access your dashboard
                    </p>
                </div>

                <div className="flex justify-center bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
                    {['student', 'teacher', 'parent'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-full transition-colors duration-300
                                ${role === r ? 'bg-electric-blue-600 text-white shadow' : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'}`}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-electric-blue-500 focus:border-electric-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-electric-blue-500 focus:border-electric-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                        <div>
                            <input
                                id="access-key"
                                name="accessKey"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-electric-blue-500 focus:border-electric-blue-500 focus:z-10 sm:text-sm"
                                placeholder="School/Organization Access Key"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-danger-red text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-electric-blue-600 hover:bg-electric-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue-500 disabled:bg-electric-blue-400"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;