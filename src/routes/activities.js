const { Router } = require('express');
const { Activity, Country } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    try {
    const allActivities = await Activity.findAll({ include: Country })

    const filterA = allActivities.map(e => e.name.toLowerCase())
    res.status(200).json(filterA)  
    } catch (error) {
        res.status(404).send({msj : error})
    }
    
});

router.post('/', async (req, res, next) => {

    try {
         const {
        name,
        difficulty,
        duration,
        season,
        countries
    } = req.body;

    if(!name || !difficulty || !season || !duration || !countries){
        throw new Error({msg : 'This field ust be complete'})
    }

    const activity = await Activity.create({
            name,
            difficulty,
            duration,
            season 
    })
    

    const countryDb = await Country.findAll({
        where : {name : countries}
    })
    await activity.addCountries(countryDb)
    res.status(200).json('Creado')
     
    } catch (error) {
        res.status(404).send(error)
    }

  

});

module.exports = router;