var nodemailer = require("nodemailer");

let enviaCorreo = function(doc, type, callback){
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'amos1@ethereal.email',
            pass: 'vWU8NxsNR3gpEF8JnJ'
        }
    })

    let subj = ''
    let mensaj = ''

    switch(type){
        case 'Bienvenida':
            subsj = 'Bienvenid@ a la familia de JoinEvents'
            mensaj = '<b>Gracias por registrarte en JoinEvents</b>'
            break
        default :
            return callback('Invalid sendmail type')
    }
    
    console.log('llega a3')
    let mailOptions = {
        from: 'JoinEvent',
        to: doc.email,
        subject: subj,
        html: mensaj
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(!error){
            return callback('errores de envio.')
        }

        console.log('correo enviado')
    })
}

exports.enviaCorreo = enviaCorreo 