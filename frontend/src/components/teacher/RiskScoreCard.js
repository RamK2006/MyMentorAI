import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RiskScoreCard = ({ score, zone }) => {
    const data = [{ name: 'Score', value: score }, { name: 'Remaining', value: 100 - score }];
    
    const getZoneInfo = (zone) => {
        switch (zone) {
            case 'green': return {
                color: 'text-success-green',
                bgColor: 'bg-green-100 dark:bg-green-900/50',
                borderColor: 'border-green-300 dark:border-green-700',
                icon: <TrendingUp className="h-8 w-8" />,
                text: 'Low Risk',
                pieColor: '#10b981'
            };
            case 'yellow': return {
                color: 'text-warning-orange',
                bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
                borderColor: 'border-yellow-400 dark:border-yellow-700',
                icon: <AlertTriangle className="h-8 w-8" />,
                text: 'Needs Attention',
                pieColor: '#f59e0b'
            };
            case 'red': return {
                color: 'text-danger-red',
                bgColor: 'bg-red-100 dark:bg-red-900/50',
                borderColor: 'border-red-400 dark:border-red-700',
                icon: <TrendingDown className="h-8 w-8" />,
                text: 'High Risk',
                pieColor: '#ef4444'
            };
            default: return {
                color: 'text-gray-500',
                bgColor: 'bg-gray-100 dark:bg-gray-700',
                borderColor: 'border-gray-300 dark:border-gray-600',
                icon: null,
                text: 'No Data',
                pieColor: '#6b7280'
            };
        }
    };

    const zoneInfo = getZoneInfo(zone);

    return (
        <div className={`rounded-xl shadow-lg p-6 border ${zoneInfo.bgColor} ${zoneInfo.borderColor}`}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Academic Risk Score</h2>
            <div className="flex items-center justify-between">
                <div className={`space-y-1 ${zoneInfo.color}`}>
                    <div className="flex items-center space-x-3">
                        {zoneInfo.icon}
                        <span className="text-5xl font-bold">{score}</span>
                    </div>
                    <p className="text-lg font-semibold">{zoneInfo.text}</p>
                </div>
                <div style={{ width: 100, height: 100 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={50} startAngle={90} endAngle={450}>
                                <Cell fill={zoneInfo.pieColor} />
                                <Cell fill={theme === 'dark' ? '#4a5568' : '#e2e8f0'} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Add this variable at the top of the file, outside the component
const theme = localStorage.getItem('theme') || 'light';

export default RiskScoreCard;