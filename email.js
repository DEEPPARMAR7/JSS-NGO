// Email configuration
const emailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'evilsocket19@gmail.com',
        pass: 'Deep@2710'
    },
    tls: {
        rejectUnauthorized: false
    }
};

// Email template
const emailTemplate = (firstName, lastName, email, phone, message) => {
    return `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
};

// Send email function
async function sendEmail(formData) {
    try {
        const { firstName, lastName, email, phone, message } = formData;

        // Validate input
        if (!firstName || !lastName || !email || !message) {
            throw new Error('Please fill in all required fields');
        }

        // Create transporter
        const transporter = nodemailer.createTransport(emailConfig);

        // Verify transporter
        await transporter.verify();

        // Email options
        const mailOptions = {
            from: 'evilsocket19@gmail.com',
            to: 'evilsocket19@gmail.com',
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: emailTemplate(firstName, lastName, email, phone, message)
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        
        return {
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Export functions
module.exports = {
    sendEmail,
    emailConfig
}; 