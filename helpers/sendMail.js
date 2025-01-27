const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // or 'STARTTLS'
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_MAIL_APP_PASS
    }
});

const sendMail = async (email, saubject, content) => {
    try {
        var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: saubject,
            html: content
        }
        await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }
            return true;
        });
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = sendMail