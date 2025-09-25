import React from 'react';
import { BookOpen } from 'lucide-react';

const GradesSummary = ({ grades }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slide-up">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <BookOpen className="h-6 w-6 text-success-green" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Grades</h2>
            </div>
            <div className="space-y-3">
                {grades && grades.length > 0 ? (
                    grades.slice(0, 5).map((grade) => (
                        <div key={grade.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{grade.subject}</span>
                            <span className={`font-bold ${grade.grade_value < 70 ? 'text-warning-orange' : 'text-success-green'}`}>
                                {grade.grade_value.toFixed(2)}%
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No grade data available yet.</p>
                )}
            </div>
        </div>
    );
};

export default GradesSummary;