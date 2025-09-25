const db = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, fullName, role, accessKey } = req.body;
    // In a real app, accessKey would be validated against a school database
    if (!accessKey) {
        return res.status(400).json({ msg: 'Access Key is required.' });
    }

    try {
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
            [email, password_hash, fullName, role]
        );
        
        // If student, create a corresponding entry in the students table
        if (role === 'student') {
            await db.query(
                'INSERT INTO students (user_id, student_id) VALUES ($1, $2)',
                [newUser.rows[0].id, `ST-${Date.now()}`] // Simple unique student ID
            );
        }

        res.status(201).json({ msg: 'User registered successfully.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }
        
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
                name: user.full_name
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};