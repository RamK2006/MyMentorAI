const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllStudents, getStudentData, submitSurvey } = require('../controllers/studentController');

// @route   GET api/students
// @desc    Get all students (for teachers)
// @access  Private (Teacher role)
router.get('/', auth, getAllStudents);

// @route   GET api/students/me
// @desc    Get current student's data
// @access  Private (Student role)
router.get('/me', auth, getStudentData);

// @route   GET api/students/:id
// @desc    Get a specific student's data (for teachers/parents)
// @access  Private (Teacher/Parent role)
router.get('/:id', auth, getStudentData);

// @route   POST api/students/survey
// @desc    Submit daily survey
// @access  Private (Student role)
router.post('/survey', auth, submitSurvey);

module.exports = router;