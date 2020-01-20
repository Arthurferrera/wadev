const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({ github_username });

        if(!dev) {

            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = parseStringAsArray(techs.toLowerCase());
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name, 
                avatar_url,
                bio, 
                techs: techsArray,
                location
            });
            
            // Filtrar as conexões que estão no maximo a 10km de distância
            // e que o novo dev tenha pelo menos uma das techs filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        } else {
            // TODO: Retonar mensagem para o usuário
        }
    
        
        return res.json(dev);
    },

    // TODO
    // atualizar os dados de um dev
    // não atualizar o github_username
    async update() {

    },

    async destroy(req, res) {
        let { _id } = req.query;

        Dev.findByIdAndDelete(
            {_id},
            (response) => {
                console.log(`Response: ${response}`);
                if (response != null) {
                    return res.json({error: response})
                }   
            }
        )
        const devs = await Dev.find();
        return res.json(devs);
    }
};