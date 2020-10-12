'use strict'

const jwt = require('jsonwebtoken');
const player = require('../models/sliceModel');

exports.authenticate = function(request,response,next){
    try{
        const headerData = request.header('Authorization');
        if(!headerData){
            throw new Error('No authorization given');
        }

        const token = headerData.replace('Bearer ','');
        const data = jwt.verify(token,process.env.JWT_KEY);
        const receivedPlayer = player.findOne({name: data.name,'tokens.token': token});
    
        if(!receivedPlayer){
            throw new Error('No player found');
        }
        next();

    }
    catch(error){
        response.status(401).send({error: 'Not authorized to access this resource', message: error.message});
    }
}