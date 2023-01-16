const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Storage = require('local-storage')
const main = (method,user)=> {

    const token = jwt.sign({email:user.email},process.env.SECRET_TOCKEN)
    let subject = ''
    let html = ''
    
    if(method=='register'){
        subject = 'Bonjour voila votre données'
        html = `<div style='height: 150px; width: 100%;'>
        <h4>Hi ${user.username}</h4>
        <p>Your email : ${user.email}</p>
        <p>Your email : ${user.password}</p>
      </div>`
    }

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth:{
            user:'wlahlali343@gmail.com',
            pass:process.env.MAILER,
        },
    })

    let info ={
        from: '"Marhaba ✨" <wlahlali343@gmail.com>',
        to: user.email,
        subject: subject,
        html:html,
      };
      transporter.sendMail(info);
      console.log("Message sent");
}

module.exports={main}