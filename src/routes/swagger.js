const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

const swaggerOptions = {
  swaggerOptions: {
    withCredentials: true,
  },
};

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, swaggerOptions)
);

module.exports = router;
