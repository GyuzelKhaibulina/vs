import nodemailer from 'nodemailer';


class SendOutlook {
    transporter = null;
    constructor() {
        this.transporter = this.getTransporter();    
        this.transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          return error;          
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    }



    getTransporter () {
        return nodemailer.createTransport({
            host: process.env.OUTLOOK_HOST, 
            secureConnection: false, 
            port: process.env.SMTP_PORT_TLS,
            auth: {
                user: process.env.OUTLOOK_USER,
                pass: process.env.OUTLOOK_PASSW
            },
            tls: {
                ciphers:'SSLv3'
            },
            // logger: true,
            // debug: true
        })
    }
    async send (reciever, message, subject, html) {
        try {
            const info = await this.transporter.sendMail ({
                from: "'VsRecepti' <vsrecepti@outlook.com>",
                to: reciever,
                subject: subject,
                text: message,
                html: html,
            })
            return info.messageId
        }
        catch (e) {
            return e
        }
        
    }
}

export default new SendOutlook;
