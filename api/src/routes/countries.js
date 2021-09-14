const { Router } = require('express');
const {Country, Activity, countries_activities} = require('../db')
const {Op} = require('sequelize')
const axios = require('axios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const data = async () => {
    const arr = await axios.get('https://restcountries.eu/rest/v2/all');
    return arr
}

router.get('/', async (req, res ) => {
    const name = req.query.name
    
    let apiCountries = await data()
    
    apiCountries = apiCountries.data.map(country =>{
        return{
          id: country.alpha3Code,
          name:country.name,
          flag:country.flag,
          region:country.region,
          capital:country.capital,
          subregion:country.subregion,
          area:country.area,
          population:country.population
        }
        
      })
    
    try {
        let hay = await Country.findAll();
        if(!hay.length) await Country.bulkCreate(apiCountries)
    } 
        catch(error) {
            console.log(error);   
        }
    
    if(name){
        try{
            let coun = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                 limit: 10,  // treeme los primeros 6 
                // offset: req.query.page,  // pero los primeros 6 contando desde le offset
                // order: [['name', req.query.order]], // ordenamelos por nombre y con el segundo parametro le digo de que manera
                // include: {model: Activity},   // inclume el modelo episodio (se va a fijar a la tabla intermendia)
            });
            return res.status(200).json(coun)
        } 
            catch(error){
                console.log(error);    
        }
    
    } else if(req.query.filter){
        try{
            let coun = await Country.findAll({
                where: {
                    region: req.query.filter
                },
                limit: 10,  // treeme los primeros 6 
                offset: req.query.page,  // pero los primeros 6 contando desde le offset
                order: [['name', req.query.order]], // ordenamelos por nombre y con el segundo parametro le digo de que manera
                // include: {model: Activity},   // inclume el modelo episodio (se va a fijar a la tabla intermendia)
            });
            return res.status(200).json(coun)
        } 
            catch(error){
                console.log(error);
        }
    
    } else {
        try {
            console.log('ENTREEEEE');
            let coun = await Country.findAll({
                limit: 10,
                offset: req.query.page,
                order: [['name', 'ASC']],
                include: {model: Activity}
            });
            console.log(coun);
            return res.status(200).json(coun)
        }
             catch(error){
                console.log(error);
        }
    }})
    

router.get('/:idPais', async (req,res, next)=>{
    const {idPais} = req.params;
    console.log(idPais, 'hola soy el back');
    
    if(!idPais){
        res.status(200).json({msg: "Debes agregar el id del Pais que deseas buscar"})
    }

    
    try{
        let country = await Country.findByPk(idPais, {
            include: Activity
            
        })
        console.log(country, 'backend');
        return res.status(200).json(country)

    }catch(error){
        next(error)
    }
} )

module.exports = router;
