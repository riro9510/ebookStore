const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

router.use('/api-docs', [
  /* #swagger.ignore = true */
  ...swaggerUi.serve,
]);

router.get('/api-docs', (req, res) => {
  /* #swagger.ignore = true */
  swaggerUi.setup(swaggerDoc)(req, res);
});

module.exports = router;
