 
import jwt from 'jsonwebtoken'
 
import User from '../models/User'

class AuthController {
  async store (req, res){   

    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user || !await user.checkPassword(password)) {
      return res.status(400).json({ error: 'O e-mail ou a senha não corresponde a uma conta.' })
    }    

    return res.json({
      user,
      token: jwt.sign({ id: user.id }, 'f04af61b3f332afa0ceec786a42cd365', {
        expiresIn: '7d'
      })
    })
  }
}

export default new AuthController()
