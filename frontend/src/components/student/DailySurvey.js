import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import apiClient from '../../api/apiClient';

const DailySurvey = ({ onSurveySubmit }) => {
    const [formData, setFormData] = useState({
        stress_level: 3,
        sleep_quality: 3,
        study_hours: 2,
        motivation_level: 3,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/students/survey', formData);
            setMessage('Thank you! Your survey has been submitted.');
            onSurveySubmit(); // Refresh dashboard data
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to submit survey. Please try again.');
             setTimeout(() => setMessage(''), 3000);
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slide-up sticky top-24">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <ClipboardList className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Daily Check-in</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Each survey question */}
                {[
                    { name: 'stress_level', label: 'Stress Level', min: 1, max: 5 },
                    { name: 'sleep_quality', label: 'Sleep Quality', min: 1, max: 5 },
                    { name: 'study_hours', label: 'Study Hours Today', min: 0, max: 10, step: 0.5 },
                    { name: 'motivation_level', label: 'Motivation Level', min: 1, max: 5 },
                ].map(item => (
                    <div key={item.name}>
                        <label htmlFor={item.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.label}: <span className="font-bold text-electric-blue-600">{formData[item.name]}</span>
                        </label>
                        <input
                            type="range"
                            name={item.name}
                            min={item.min}
                            max={item.max}
                            step={item.step || 1}
                            value={formData[item.name]}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                ))}

                <button type="submit" className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md bg-electric-blue-600 hover:bg-electric-blue-700 focus:outline-none focus:ring-2 focus:ring-electric-blue-500 focus:ring-opacity-75">
                    Submit Today's Check-in
                </button>
                {message && <p className="text-center text-sm text-gray-500 mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default DailySurvey;