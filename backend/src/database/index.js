'use strict';

import Logger from '../logger';
import mongoose from 'mongoose';
import config from '../config';

async function checkConnection(){
    mongoose.set('useFindAndModify', false);

    // Mongoose DB connection
    mongoose.connect(`mongodb://${config.database_port}/${config.database}`,{useCreateIndex: true, useNewUrlParser:true}, (err) => {
        if (err) {
            Logger.error('Error in Connecting to DB', err);
        }
    });

    const db = mongoose.connection;

    //Check connection
    db.once('open', function(){
        Logger.info('✌️ DB loaded and connected!');
    });

    //Check DB errors
    db.on('error', function(err){
        Logger.error('Error in Connecting to DB', err);

    });

}

module.exports = {
    checkConnection: checkConnection,
}