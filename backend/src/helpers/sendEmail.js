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

    if(content.type === 'addCandidate'){
        emailToBeSent.subject=`Alguém deseja adotador o(a) ${content.petName}`
        emailToBeSent.text=`O usuário ${content.adopterName} se candidatou para adotar o(a) ${content.petName}`
    }

    if(content.type === 'declineAdoption'){
        emailToBeSent.subject=`Seu pedido para adotar o(a) ${content.petName} foi recusado`
        emailToBeSent.html=`<img src='https://res.cloudinary.com/dezsbjgjj/image/upload/v1709304423/br2dthbm7fyvtrlh1qkg.png' alt='checked'/>`
    }
    
    if(content.type === 'acceptAdoption'){
        emailToBeSent.subject=`Seu pedido para adotar o(a) ${content.petName} foi aceito`
        emailToBeSent.html=`<img src='https://res.cloudinary.com/dezsbjgjj/image/upload/v1709304302/srkyqcmvmtw04dcpqnin.png' alt='checked'/>`
    }

    if(content.type === 'message'){
        emailToBeSent.subject=`Mensagem do ${content.userName} sobre adoção do(a) ${content.petName}`
        emailToBeSent.text=`${content.message}\n\nNão responda esse e-mail, entre em contato pelo e-mail ${content.userEmail}\n\nobrigado :)`
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