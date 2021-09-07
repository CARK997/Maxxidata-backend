import Express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as OpenApiValidator from 'express-openapi-validator';
import l from './logger';
import cors from 'cors';
import errorHandler from '../api/middlewares/error.handler';

const app = new Express();
const corsOption = {
  allowedHeaders: [
    'OIDC-ID-TOKEN',
    'Authorization',
    'Accept',
    'Content-type',
    'userid',
    'Akana-Cookie',
    'languagecode',
    'countrycode',
    'X-Atlassian-Token',
    'X-CF-APP-INSTANCE',
    'user-id',
    'x-correlation-id',
    'pragma',
    'cache-control',
    'audit-details',
    'access-control-allow-methods',
    'access-control-allow-origin',
    'access-control-allow-credentials',
    'x-requested-with',
    'access-control-allow-headers'
  ]
}

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '10mb' }));
    app.use(cors(corsOption));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '10mb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '10mb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));

    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb+srv://user-database:Sa93742110@pet-database.terjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => l.info(
      `up and running in ${process.env.NODE_ENV
      || 'development'} @: ${os.hostname()} on port: ${p}}`,
    );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
