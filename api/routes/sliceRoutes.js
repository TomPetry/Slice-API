module.exports = function(app){
    var players = require("../controllers/sliceController");
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/login').post(players.login);
    app.route('/register').post(players.register);
    
    app.route('/score/getByName').post(tokenAuthenticator.authenticate,players.getPlayerScore);
    app.route('/score').get(tokenAuthenticator.authenticate,players.getMaxScore);
    app.route('/player').post(tokenAuthenticator.authenticate,players.updatePlayer);
    app.route('/player/getUpgrades').post(tokenAuthenticator.authenticate,players.getPlayerUpgrades);
}