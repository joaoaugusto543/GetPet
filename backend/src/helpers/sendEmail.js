const {createTransport}=require('nodemailer')

async function sendEmail(content){
    const transporter=createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        secure:true,
        auth:{
            user:process.env.EMAIL_REACTX,
            pass:process.env.PASSWORD_EMAIL
        }
    })

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log('Server is ready to take our messages')
                resolve(success)
            }
        })
    })

    const emailToBeSent={
        from:process.env.EMAIL_REACTX,
        to:content.email
    }

    if(content.type === 'code'){
        emailToBeSent.subject='Código de verificação'
        emailToBeSent.text=`seu código de verificação é ${content.code}\n\n Não compartilhe essa informação com ninguém e se você não solicitou esse código apenas ignore`
    }

    if(content.type === 'checked'){
        emailToBeSent.subject=`${content.name} sua conta foi verificado`
        emailToBeSent.html=`<img src='https://res.cloudinary.com/dezsbjgjj/image/upload/v1706301527/aptsy487ylzpbrghue9e.png' alt='checked'/>`
    }

    await new Promise((resolve, reject) => {
    // send mail
        transporter.sendMail(emailToBeSent, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        })
    })

}

module.exports=sendEmail