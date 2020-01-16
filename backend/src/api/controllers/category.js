import logger from '../../logger';
const category = require('../../database/models/category');


exports.getCategories = async (request, response) => {
    category.find(function(err, category){
        if(err) {
            logger.error('🔥 error: %o', err.message);
            return res.status(400).json({
                error: "Sorry, cannot retrieve category."
            });
        }
        else{
            response.status(200).json(category);
        }    
    });
}