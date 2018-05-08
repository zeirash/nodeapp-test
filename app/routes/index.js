const mainRoutes = require('./main_routes.js');
const articleRoutes = require('./article_routes.js');
const replyRoutes = require('./reply_routes.js');

module.exports = function(app, db){
    mainRoutes(app, db);
    articleRoutes(app, db);
    replyRoutes(app,db);
}