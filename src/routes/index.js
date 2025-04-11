const router = require('express').Router();
const baseController = require('../controllers/baseController')

router.use('/', require('./swagger'));

router.use('/books', require('./books'));
router.use('/users', require('./users'));

router.get('/', 
  // #swagger.ignore = true 
  baseController.buildHome)
  
  

module.exports = router;
