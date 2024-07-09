const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { mailService } = require('../configs/database');
const { getOne, updateOne } = require('../helpers/dbHelper');
const db = require('../configs/database').db;

const register = (req, res) => {
    console.log(req.body);

    const { name, username, password, passwordConfirm } = req.body;

    db.query("SELECT username FROM users WHERE username = ?", [username], async (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).send({ message: 'Database query error' });
        }

        if (results.length > 0) {
            return res.status(400).send({ message: 'That username is already in use' });
        } else if (password !== passwordConfirm) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        try {
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log('Hashed Password:', hashedPassword);

            db.query('INSERT INTO users SET ?', { name: name, username: username, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.error('Error in INSERT query:', error);
                    return res.status(500).send({ message: 'Error registering user' });
                } else {
                    return res.status(201).send({ message: 'User registered' });
                }
            });
        } catch (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send({ message: 'Error processing request' });
        }
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Please provide a username and password' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).send({ message: 'Database query error' });
        }

        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send({ message: 'Username or password is incorrect' });
        } else {
            const id = results[0].id;
            const token = jwt.sign({ id }, 'YOUR_SECRET_KEY', {
                expiresIn: '1h'
            });

            console.log(`Token: ${token}`);
            return res.status(200).send({ message: 'Login successful', token });
        }
    });
};

const sendMail = async function (req, res) {
    try {
        const { emailFrom, emailTo, emailSubject, emailText } = req.body;
        await mailService.sendEmail({
            emailFrom: emailFrom,
            emailTo: emailTo,
            emailSubject: emailSubject,
            emailText: emailText,
        });

        return res.status(200).json({
            message: 'Reset password email sent successfully',
        });
    } catch (error) {
        console.log('Error in sendMail:', error);
        return res.status(500).json({
            message: 'Error sending email',
            error: error.message,
        });
    }
};

const forgotPassword = async function (req, res) {
    try {
        const { email } = req.body;

        const user = await getOne({
            db,
            query: 'SELECT * FROM users1 WHERE email = ?',
            params: [email],
        });

        if (!user) {
            return res.status(400).json({
                message: 'Email not found',
            });
        }

        const secretKey = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto.createHash('sha256').update(secretKey).digest('hex');
        const passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000);

        const updateStatus = await updateOne({
            db,
            query: 'UPDATE users1 SET passwordResetToken = ?, passwordResetExpiration = ? WHERE email = ?',
            params: [passwordResetToken, passwordResetExpiration, email],
        });

        if (updateStatus) {
            await mailService.sendEmail({
                emailFrom: 'admin@gmail.com',
                emailTo: email,
                emailSubject: 'Reset password',
                emailText: 'Here is your reset password token: ' + passwordResetToken,
            });

            return res.status(200).json({
                message: 'Reset password email sent successfully',
            });
        }

        return res.status(400).json({
            message: "Can't reset password!",
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

const resetPassword = async function (req, res) {
    try {
        const { email, passwordResetToken, newPassword } = req.body;

        const user = await getOne({
            db,
            query: 'SELECT * FROM users1 WHERE email = ? AND passwordResetToken = ? AND passwordResetExpiration >= ?',
            params: [email, passwordResetToken, new Date(Date.now())],
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired password reset token',
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);

        const updateStatus = await updateOne({
            db,
            query: 'UPDATE users1 SET password = ?, passwordResetToken = NULL, passwordResetExpiration = NULL WHERE email = ?',
            params: [hashedPassword, email],
        });

        if (updateStatus) {
            return res.status(200).json({
                message: 'Password reset successfully',
            });
        }

        return res.status(400).json({
            message: "Can't reset password!",
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    sendMail,
    forgotPassword,
    resetPassword,
};