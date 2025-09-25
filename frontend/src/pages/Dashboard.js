import React from 'react';
import Header from '../components/common/Header';
import useAuth from '../hooks/useAuth';
// Import role-specific dashboards
import StudentDashboard from '../components/student/StudentDashboard';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import ParentDashboard from '../components/parent/ParentDashboard';

const Dashboard = () => {
    const { auth } = useAuth();

    const renderDashboard = () => {
        switch (auth.user?.role) {
            case 'student':
                return <StudentDashboard />;
            case 'teacher':
                return <TeacherDashboard />;
            case 'parent':
                // For this demo, ParentDashboard can reuse Teacher components
                return <ParentDashboard />;
            default:
                return <div className="p-8">Invalid user role.</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderDashboard()}
            </main>
        </div>
    );
};

export default Dashboard;