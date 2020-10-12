'use strict'

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {unique:true}
    },
    password: {
        type: String,
        required: true
    },
    highscore: {
        type: Number
    },
    salt: {
        type: String,
        required: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }       
    }],
    upgrades: [{
        name:{
            type: String
        },
        level:{
            type: Number
        }
    }]
});

PlayerSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(32).toString('hex');
    this.password = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
};

PlayerSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
    return this.password === hash;
};

PlayerSchema.methods.generateAuthToken = function(){
    const player = this;
    const token = jwt.sign({name: player.name}, process.env.JWT_KEY);
    player.tokens = player.tokens.concat({token});
    player.save();
    return token;
};

module.exports = mongoose.model('Player',PlayerSchema);