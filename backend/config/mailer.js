import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.SMTP_PASS
    },
});

transporter.verify((err, success) => {
  if (err) console.error("Erreur SMTP ", err.message)
    else console.log('SMTP connecté');
});


export const sendMail = async (subject, text, html, to) => {
    try {
        await transporter.sendMail({
            from: "SignEm <"+process.env.EMAIL_SENDER+">",
            to: to.toString(),
            subject,
            text,
            html
        });
        return true;
    } catch (error) {
        return error;
    } 
};

export const sendVerificationMail = async (email, token) => {

    await transporter.sendMail({
        from: `Authentification API  <${process.env.EMAIL_SENDER || ""}>`,
        to: email,
        subject: 'Confirmez votre email',
        html: `<h2>   Bienvenue ${email} ! </h2>
        <p> Merci pour votre inscription , veuillez clique sur le lien ci-dessous pour vérifier cotre email:  </p> <br/>
        <a href="http://localhost:5000/api/auth/verify?token=${token}">Vérifier mon email</a>`
    })
}


export const sendResetPasswordEmail = async (email, token) => {

    await transporter.sendMail({
        from: `Verification API  <${process.env.EMAIL_SENDER || ""}>`,
        to: email,
        subject: 'Rénitialisation de la passwordé',
        html: `<h2>   Bienvenue ${email} ! </h2>
        <p> Cliquez sur le lien pour rénitialiser votre mot de passe :  </p> <br/>
        <a href="http://localhost:5000/api/auth/reset-password-request?token=${token}">rénitialiser votre mot de passe </a>`
    })
}

