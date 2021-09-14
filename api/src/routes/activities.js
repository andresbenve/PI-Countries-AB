const { Router } = require('express');
const {Activity, Country, countries_activities} = require('../db')
const {Op} = require('sequelize')
const axios = require('axios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/', async (req, res, next) => {
    const {name, difficulty, duration, season,countryId} = req.body;

    try {
    
    let newActivity = await Activity.findOrCreate({
        where: {
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season
        }
    })
    console.log('Countryy', countryId);
    //Así lo tenían antes y claramente no le funcionaba
    // for(let i = 0; i < countryId.length; i++){
    //     console.log(countryId);
        
    const match = await Country.findOne({
        where: {
            name: countryId//[i]
        }
    })
    console.log('MATCHHH', match);
    await newActivity[0].addCountry(match);
    //}
    res.json(newActivity)
    } catch(error){
        next(error)
    }
});


router.get("/", async (req, res, next) => {
    try {
        const activities = await Activity.findAll({
           include: [Country]
        });
        return res.json(activities)
    } catch (err) {
        return next(err);
    }
});


module.exports = router;

