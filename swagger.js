const swagAuto = require('swagger-autogen');

const doc = {
    info: {
        title: 'ebookstore Api',
        description: 'ebookstore Api'
    },
    host: 'ebookstore-s1o5.onrender.com',
    schemes: ['https']
    // host: 'localhost:3000',
    // schemes: ['http']
};

const output = './swagger.json';
const endpointsFile = ['./src/routes/index.js'];

swagAuto(output, endpointsFile, doc);
