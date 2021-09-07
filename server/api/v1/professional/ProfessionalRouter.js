import * as express from 'express';
import ProfessionalController from './ProfessionalController';
import JwtAcessAutorization from '../../../../config/tokenVerify'

export default express
  .Router()
  .post('/', ProfessionalController.create)
  .put('/:id', ProfessionalController.update)
  .get('/', ProfessionalController.listAll)
  .delete('/:id', ProfessionalController.delete);
