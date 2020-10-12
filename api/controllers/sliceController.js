var mongoose = require('mongoose'),
    Player = mongoose.model('Player');

exports.login = function (req, res) {
    Player.findOne({ name: req.body.name }, function (err, player) {
        if (err) { res.send(err); }
        if(player){
            if (player.validatePassword(req.body.password)) {
                var tok = player.generateAuthToken();
                res.send(tok);
            }
            else res.send('Login failed');
        }else{
            res.send('please register first')
        }
        
    });


};

exports.register = function (req, res) {
    var new_player = new Player(req.body);
    new_player.setPassword(req.body.password);
    new_player.save(function (err, player) {
        if (err) res.send(err);
        res.json("Player successfully registered");
    });
};


exports.getMaxScore = function (req, res) {
    Player.find().sort('-highscore').exec(function(err,player){
        if(err) res.send(err);
        else{           
            res.json(player);
        }        
    });
};

exports.getPlayerScore = function (req, res) {
    Player.findOne({ name: req.body.name }, function (err, player) {
        if (err) {
            res.send(err);
        } else {
            res.json(player.highscore);
        }
    });
};

exports.getPlayerUpgrades = function(req,res){
    Player.findOne({ name: req.body.name }, function (err, player) {
        if (err) {
            res.send(err);
        } else {
            res.json(player);
        }
    });
}


exports.updatePlayer = function (req, res) {
    Player.findOneAndUpdate({ name: req.body.name }, req.body, { new: true }, function (err, player) {
        if (err) {
            res.send(err);
        } else {
            console.log(req.body);
            res.json(player);
        }
    })
}


