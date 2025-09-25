const db = require('../utils/db');
const calculateRiskScore = require('../utils/riskCalculator');
const generateSuggestions = require('../utils/aiSuggestions');

// For Teachers: Get all students in their class
exports.getAllStudents = async (req, res) => {
    try {
        // In a real app, this would be scoped to the teacher's class
        const students = await db.query(`
            SELECT u.id, u.full_name, s.student_id, s.grade_level, rs.calculated_score, rs.risk_zone
            FROM users u
            JOIN students s ON u.id = s.user_id
            LEFT JOIN (
                SELECT student_id, calculated_score, risk_zone, ROW_NUMBER() OVER(PARTITION BY student_id ORDER BY calculated_at DESC) as rn
                FROM risk_scores
            ) rs ON s.id = rs.student_id AND rs.rn = 1
            WHERE u.role = 'student'
        `);
        res.json(students.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// For a single student (student, teacher, or parent view)
exports.getStudentData = async (req, res) => {
    try {
        // Student ID from request parameters for teachers/parents, or from token for students
        const user_id = req.params.id || req.user.id; 
        
        const studentInfo = await db.query('SELECT s.id, s.grade_level, u.full_name FROM students s JOIN users u ON s.user_id = u.id WHERE s.user_id = $1', [user_id]);
        if (studentInfo.rows.length === 0) return res.status(404).json({ msg: 'Student not found' });
        
        const student_db_id = studentInfo.rows[0].id;

        const grades = await db.query('SELECT * FROM grades WHERE student_id = $1 ORDER BY date_recorded DESC', [student_db_id]);
        const attendance = await db.query('SELECT * FROM attendance WHERE student_id = $1 ORDER BY date DESC', [student_db_id]);
        const surveys = await db.query('SELECT * FROM daily_surveys WHERE student_id = $1 ORDER BY date DESC', [student_db_id]);
        
        const allData = {
            grades: grades.rows,
            attendance: attendance.rows,
            surveys: surveys.rows
        };

        const riskData = calculateRiskScore(allData);
        
        // Store the new risk score
        await db.query(
            'INSERT INTO risk_scores (student_id, calculated_score, risk_zone, factors) VALUES ($1, $2, $3, $4)',
            [student_db_id, riskData.score, riskData.zone, JSON.stringify(riskData.factors)]
        );

        const suggestions = await generateSuggestions(riskData, studentInfo.rows[0]);
        
        res.json({
            profile: studentInfo.rows[0],
            risk: riskData,
            suggestions: suggestions,
            ...allData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// For students to submit their daily survey
exports.submitSurvey = async (req, res) => {
    const { stress_level, sleep_quality, study_hours, motivation_level } = req.body;
    try {
        const student = await db.query('SELECT id FROM students WHERE user_id = $1', [req.user.id]);
        if (student.rows.length === 0) return res.status(404).json({ msg: 'Student profile not found.' });

        const student_db_id = student.rows[0].id;

        await db.query(
            `INSERT INTO daily_surveys (student_id, stress_level, sleep_quality, study_hours, motivation_level) 
             VALUES ($1, $2, $3, $4, $5)`,
            [student_db_id, stress_level, sleep_quality, study_hours, motivation_level]
        );
        res.status(201).json({ msg: 'Survey submitted successfully.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};