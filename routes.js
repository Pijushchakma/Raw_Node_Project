// dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHanlder');
const {userHandler} = require('./handlers/routeHandlers/userHandler')

const routes = {
    'sample': sampleHandler, 
    'user'  :userHandler,
   
}
module.exports = routes;