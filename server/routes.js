import * as express from 'express';

import AuthRouter from './api/v1/auth/AuthRouter'
import ProfessionalRouter from './api/v1/professional/ProfessionalRouter'
import ProfessionalTypeRouter from './api/v1/professionalType/ProfessionalTypeRouter'

export default function routes(app) {
  app.use(
    '/api',
    express
      .Router()
      .use('/v1/login', AuthRouter)       
      .use('/v1/professional', ProfessionalRouter) 
      .use('/v1/professional-type', ProfessionalTypeRouter) 
  );
}