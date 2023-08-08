const nodemailer = require("nodemailer")

module.exports = async (email, foods) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_EMAIL_USER,
            pass: process.env.GOOGLE_EMAIL_SECERT
        }
    });
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL_USER,
        to: `${email}`,
        subject: 'Foodox',
        html: `
        <h2>Hi ${email} 😊</h2>
        <h4 style="display:block">Your Food is Already Prepared And Will Arrival Within  <h3 style="color:red;display:inline;">5 minutes</h3></h4>
        <h4>Your Food Today Is ${foods.join("-------")}</h4>
    `
    };
    return await transporter.sendMail(mailOptions)
}