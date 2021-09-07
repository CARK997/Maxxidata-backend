import ProfessionalTypeService from './ProfessionalTypeService'

export class ProfessionalController {

  create(req, res) {
    ProfessionalTypeService.create(req.body)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  update(req, res) {
    const { id } = req.params
    ProfessionalTypeService.update(id, req.body)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  listAll(req, res) {
    ProfessionalTypeService.listAll(req.query)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }

  delete(req, res) {
    const { id } = req.params
    ProfessionalTypeService.delete(id)
      .then(response => {
        return res.json(response)
      }).catch(erro => {
        return res.json(erro)
      })
  }
}
export default new ProfessionalController();
