const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const routeactivities = require('./activities')
const routecountries = require('./countries')

router.use('/activities', routeactivities)
router.use('/countries', routecountries)






module.exports = router;
