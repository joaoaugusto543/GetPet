const sendEmail = require('./sendEmail')

async function sendVerificationCode(email){

    const numberRandom=Math.floor(Math.random() * 1000)

    const code=numberRandom.toString().padEnd(4,'0')

    const content={
        type:'code',
        code,
        email
    }

    await sendEmail(content)


    return code
}

module.exports = sendVerificationCode