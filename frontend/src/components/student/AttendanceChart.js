import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CheckSquare } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

const AttendanceChart = ({ attendance }) => {
    const { theme } = useTheme();
    
    const processAttendanceData = (attendanceData) => {
        if (!attendanceData || attendanceData.length === 0) return [];
        const presentCount = attendanceData.filter(a => a.status === 'present').length;
        const absentCount = attendanceData.filter(a => a.status === 'absent').length;
        const lateCount = attendanceData.filter(a => a.status === 'late').length;

        return [
            { name: 'Present', count: presentCount, fill: '#10b981' },
            { name: 'Late', count: lateCount, fill: '#f59e0b' },
            { name: 'Absent', count: absentCount, fill: '#ef4444' },
        ];
    };

    const chartData = processAttendanceData(attendance);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slide-up">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <CheckSquare className="h-6 w-6 text-electric-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Attendance Summary (Last 30 Days)</h2>
            </div>
            {chartData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4a5568' : '#e2e8f0'} />
                            <XAxis dataKey="name" tick={{ fill: theme === 'dark' ? '#A0AEC0' : '#4A5568' }} />
                            <YAxis tick={{ fill: theme === 'dark' ? '#A0AEC0' : '#4A5568' }} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
                                    borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0'
                                }}
                            />
                            <Bar dataKey="count" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                 <p className="text-center text-gray-500 dark:text-gray-400 py-10">No attendance data to display.</p>
            )}
        </div>
    );
};

export default AttendanceChart;