const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter
        console.log('Verifying transporter configuration...');
        await transporter.verify();
        console.log('Transporter verification successful!');

        // Send test email
        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: `"JSS NGO Test" <${process.env.EMAIL_USER}>`,
            to: 'evilsocket19@gmail.com',
            subject: 'Test Email from JSS NGO Website',
            html: '<h1>Test Email</h1><p>This is a test email to verify the email sending functionality.</p>'
        });

        console.log('Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error:', error);
    }
}

testEmail(); 