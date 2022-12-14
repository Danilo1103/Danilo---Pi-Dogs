const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { searchNameDog , searchIdDog , createDog, dataApiTemper, deleteDog} = require('../controllers/index');
const router = Router();

// Configurar los routers
router.get('/dogs', searchNameDog ); 
router.get('/dogs/:id', searchIdDog);
router.post('/dogs', createDog);
router.get('/temperaments', dataApiTemper);
router.delete('/dogsDelete/:id', deleteDog);

module.exports = router;