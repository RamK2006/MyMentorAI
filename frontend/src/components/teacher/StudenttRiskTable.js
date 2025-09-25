import React from 'react';
import { ChevronRight } from 'lucide-react';

const getZoneClasses = (zone) => {
    switch (zone) {
        case 'green': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
        case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
        case 'red': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
        default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
};

const StudentRiskTable = ({ students, onSelectStudent }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Risk Score</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Risk Zone</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.full_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.student_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.calculated_score || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getZoneClasses(student.risk_zone)}`}>
                                        {student.risk_zone ? student.risk_zone.charAt(0).toUpperCase() + student.risk_zone.slice(1) : 'No Data'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onSelectStudent(student)} className="text-electric-blue-600 hover:text-electric-blue-800 dark:hover:text-electric-blue-400 flex items-center">
                                        View <ChevronRight className="h-4 w-4 ml-1" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentRiskTable;