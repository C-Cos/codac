import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

//import routes from './api';
import expressWinston from 'express-winston';
import winston from 'winston';

const session = require("express-session");

export default (app = express()) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
      res.status(200).end();
    });
    app.head('/status', (req, res) => {
      res.status(200).end();
    });
  
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
  
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());

    app.use(fileUpload());

    app.use(express.static('public'));

    //console log the source of the request and url that causes errors
    app.use(expressWinston.logger({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.cli(),
              winston.format.splat(),
            )
          })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP : {{req.method}} {{req.url}}, StatusCode : {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));

    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    //app.use(require('method-override')());

    /// Routes
    // let usersRouter = require('./Routes/users');
    // let categoryRouter = require('./Routes/category');
    // let commentRouter = require('./Routes/comment');
    // let eventRouter = require('./Routes/event');

    // app.use('/', usersRouter);
    // app.use('/', categoryRouter);
    // app.use('/', commentRouter);
    // app.use('/', eventRouter);
}  