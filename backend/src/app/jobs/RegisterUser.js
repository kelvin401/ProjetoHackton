import Mail from '../../lib/Mail'
 
class RegisterUser {
  get key () {
    return 'RegisterUser'
  }

   async handle ({ data })  {
    const { token, user } = data
    await Mail.sendMail({
      from: 'pegn.hackton@gmail.com',
      to: user.email,
      subject: 'Seu cadastro foi realizado com sucesso',
      template: 'register',
      context: {
        token: token.token,     
      }      
    })
  }
}
export default new RegisterUser()
