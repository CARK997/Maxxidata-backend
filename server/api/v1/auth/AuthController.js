import AuthService from './AuthService'

export class AuthController {

  login(req, res) {
    AuthService.login(req.body)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

}
export default new AuthController();
