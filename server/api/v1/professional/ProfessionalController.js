import ProfessionalService from './ProfessionalService'

export class ProfessionalController {

  create(req, res) {
    ProfessionalService.create(req.body)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  update(req, res) {
    const { id } = req.params
    ProfessionalService.update(id, req.body)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  listAll(req, res) {
    ProfessionalService.listAll(req.query)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  delete(req, res) {
    const { id } = req.params
    ProfessionalService.delete(id)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }
}
export default new ProfessionalController();
