const swagAuto = require('swagger-autogen')

const doc = {
    info: {
        title: 'ebookstore Api',
        description: 'ebookstore Api'
    },
    // host: 'proj2-7bps.onrender.com',
    // schemes: ['https']
    host: 'localhost:3000',
    schemes: ['http']
};

const output = './swagger.json';
const endpointsFile = ['./src/routes/index.js'];

swagAuto(output, endpointsFile, doc);
