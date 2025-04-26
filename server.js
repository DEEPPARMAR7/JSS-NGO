const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendEmail } = require('./email');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    try {
        const result = await sendEmail(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in /send-email endpoint:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error sending email: ' + error.message 
        });
    }
});

// Test endpoint
app.get('/test-email', async (req, res) => {
    try {
        const testMailOptions = {
            from: `"JSS NGO Test" <${process.env.EMAIL_USER}>`,
            to: 'evilsocket19@gmail.com',
            subject: 'Test Email from JSS NGO Website',
            html: '<h1>Test Email</h1><p>This is a test email to verify the email sending functionality.</p>'
        };

        const info = await transporter.sendMail(testMailOptions);
        console.log('Test email sent successfully:', info.messageId);
        
        res.status(200).json({
            success: true,
            message: 'Test email sent successfully',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending test email: ' + error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 