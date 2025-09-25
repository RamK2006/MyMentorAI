import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Loader from '../common/Loader';
import { ArrowLeft } from 'lucide-react';
// Reusable components
import RiskScoreCard from './RiskScoreCard';
import AISuggestions from '../student/AISuggestions';
import GradesSummary from '../student/GradesSummary';
import AttendanceChart from '../student/AttendanceChart';

const StudentDetailView = ({ studentId, onBack }) => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            if (!studentId) return;
            try {
                setLoading(true);
                const res = await apiClient.get(`/students/${studentId}`);
                setStudentData(res.data);
            } catch (err) {
                setError('Failed to fetch student details.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudentData();
    }, [studentId]);

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-danger-red p-8">{error}</div>;
    if (!studentData) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <button onClick={onBack} className="flex items-center text-sm font-medium text-electric-blue-600 hover:text-electric-blue-800 dark:hover:text-electric-blue-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Class Overview
            </button>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {studentData.profile.full_name}'s Dashboard
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <RiskScoreCard score={studentData.risk.score} zone={studentData.risk.zone} />
                    <AISuggestions suggestions={studentData.suggestions} />
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <GradesSummary grades={studentData.grades} />
                    <AttendanceChart attendance={studentData.attendance} />
                </div>
            </div>
        </div>
    );
};

export default StudentDetailView;