import email from 'infra/email.js'

async function sendEmailToUser(user) {
  await email.send({
    from: "HunterCityNews <contato@huntercitynews.com.br>",
    to: user.email,
    subject: "Ative seu cadastro no HunterCityNews!",
    text: `${user.username}, clique no link abaixo para ativar seu cadastro no HunterCityNews:
https://link...

Atenciosamente,
Equipe HunterCityNews
`,
  })
}

const activation = {
  sendEmailToUser
}

export default activation