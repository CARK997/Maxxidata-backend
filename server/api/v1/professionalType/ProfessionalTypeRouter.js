import * as express from 'express';
import ProfessionalTypeController from './ProfessionalTypeController';
import JwtAcessAutorization from '../../../../config/tokenVerify'

export default express
  .Router()
  .post('/', ProfessionalTypeController.create)
  .put('/:id', ProfessionalTypeController.update)
  .get('/', ProfessionalTypeController.listAll)
  .delete('/:id', ProfessionalTypeController.delete);
