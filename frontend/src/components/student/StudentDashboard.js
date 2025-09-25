import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Loader from '../common/Loader';
import AISuggestions from './AISuggestions';
import GradesSummary from './GradesSummary';
import AttendanceChart from './AttendanceChart';
import DailySurvey from './DailySurvey';

const StudentDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await apiClient.get('/students/me');
            setData(res.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-danger-red p-8">{error}</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <AISuggestions suggestions={data?.suggestions} />
                    <GradesSummary grades={data?.grades} />
                    <AttendanceChart attendance={data?.attendance} />
                </div>
                <div className="lg:col-span-1">
                    <DailySurvey onSurveySubmit={fetchData} />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;