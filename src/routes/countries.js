const {Router} = require('express');
const { Op } = require('sequelize');
const {Country, Activity} = require('../db.js');
const { getAllCountryDetail } = require('../middlewares/middleware.js');


const router = Router()

router.get('/', async (req, res) => {
    try {
        const {name} = req.query 
    if(name){
        const country = await Country.findAll({
            where: {name : {
                [Op.iLike] :
                `${name}%`
            }
        },
        include: Activity
        });
        if(country.length > 0){
          res.status(200).send(country)  
        } else {
            res.status(404).send({msg : 'Try with another name'})
        }
        
    } 
    else {
        const countries = await Country.findAll({
        include : Activity
    })
        res.status(200).send(countries)
    } 
    } catch (error) {
        res.status(404).send({msg: error})
    }
    
})



router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        // await getApiInfo()
    const country = await Country.findAll({
        where: 
        {id : id}, 
        include: Activity
    })
    country ? 
    res.status(200).send(country) :
    res.status(404).send('The id does not exist')

    } catch (error) {
        res.status(404).send({msg: error})
    }
    
})

router.get('/filters', async (req, res) =>{
    try {
       const countries = await getAllCountryDetail()
       console.log(countries)
       
        res.status(200).send(countries) 
    } catch (error) {
        res.status(404).send(error)
    }
    
})



  

module.exports = router