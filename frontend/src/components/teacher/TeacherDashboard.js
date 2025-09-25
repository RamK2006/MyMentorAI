import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Loader from '../common/Loader';
import StudentRiskTable from './StudentRiskTable';
import StudentDetailView from './StudentDetailView';

const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await apiClient.get('/students');
                setStudents(res.data);
            } catch (err) {
                setError('Failed to fetch student data.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-danger-red p-8">{error}</div>;

    return (
        <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Class Overview</h1>
            {selectedStudent ? (
                <StudentDetailView studentId={selectedStudent.id} onBack={() => setSelectedStudent(null)} />
            ) : (
                <StudentRiskTable students={students} onSelectStudent={setSelectedStudent} />
            )}
        </div>
    );
};

export default TeacherDashboard;