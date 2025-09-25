const calculateRiskScore = (studentData) => {
    const { grades, attendance, surveys } = studentData;
    const safeGrades = grades && grades.length > 0 ? grades : [{ grade_value: 70, max_grade: 100 }];
    const safeAttendance = attendance && attendance.length > 0 ? attendance : [{ status: 'present' }];
    const safeSurveys = surveys && surveys.length > 0 ? surveys : [{ stress_level: 3, motivation_level: 3 }];
    const avgGrade = safeGrades.reduce((sum, g) => sum + (g.grade_value / g.max_grade * 100), 0) / safeGrades.length;
    const gradeScore = Math.max(0, 100 - avgGrade);
    const presentDays = safeAttendance.filter(a => a.status === 'present').length;
    const attendanceRate = (presentDays / safeAttendance.length) * 100;
    const attendanceScore = Math.max(0, 100 - attendanceRate);
    const avgStress = safeSurveys.reduce((sum, s) => sum + s.stress_level, 0) / safeSurveys.length;
    const avgMotivation = safeSurveys.reduce((sum, s) => sum + s.motivation_level, 0) / safeSurveys.length;
    const surveyScore = ((avgStress - 1) * 25 + (5 - avgMotivation) * 25) / 2;
    const totalScore = Math.round(gradeScore * 0.5 + attendanceScore * 0.3 + surveyScore * 0.2);
    let zone;
    if (totalScore <= 40) zone = 'green';
    else if (totalScore <= 70) zone = 'yellow';
    else zone = 'red';
    return {
        score: Math.min(100, Math.max(0, totalScore)),
        zone,
        factors: {
            grades: gradeScore.toFixed(2),
            attendance: attendanceScore.toFixed(2),
            wellbeing: surveyScore.toFixed(2),
            avgGrade: avgGrade.toFixed(2)
        }
    };
};
module.exports = calculateRiskScore;