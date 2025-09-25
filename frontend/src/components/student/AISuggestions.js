import React from 'react';
import { Lightbulb } from 'lucide-react';

const AISuggestions = ({ suggestions }) => {
    const formattedSuggestions = suggestions?.split('\n').filter(s => s.trim() !== '');

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slide-up">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-electric-blue-100 dark:bg-electric-blue-900 rounded-full">
                    <Lightbulb className="h-6 w-6 text-electric-blue-600 dark:text-electric-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI-Powered Suggestions</h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
                {formattedSuggestions && formattedSuggestions.length > 0 ? (
                    formattedSuggestions.map((suggestion, index) => (
                        <p key={index} className="pl-2">{suggestion}</p>
                    ))
                ) : (
                    <p>No suggestions available at the moment. Keep up the good work!</p>
                )}
            </div>
        </div>
    );
};

export default AISuggestions;