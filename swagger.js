const swagAuto = require('swagger-autogen');
const j2s = require('joi-to-swagger');
const bookSchema = require('./src/schemas/booksSchema');
const userSchema = require('./src/schemas/usersSchema');
require('dotenv').config();

const { swagger: swaggerBookSchema } = j2s(bookSchema.bookSchema);
const { swagger: swaggerUserSchema } = j2s(userSchema.registerUserSchema);

const isDev = process.env.NODE_ENV === 'development';

function generateSchemaFromJ2S(rawJ2SSchema) {
  function extractExamples(schema) {
    const result = {};
    const props = schema.properties || {};
    for (const key in props) {
      const value = props[key];
      if (value.type === 'object' && value.properties) {
        result[key] = extractExamples(value);
      } else if (value.example !== undefined) {
        result[key] = value.example;
      }
    }
    return result;
  }

  return extractExamples(rawJ2SSchema);
}

const doc = {
  info: {
    title: 'ebookstore Api',
    description: 'ebookstore Api',
  },
  definitions: {
    Books: generateSchemaFromJ2S(swaggerBookSchema),
    Users: generateSchemaFromJ2S(swaggerUserSchema),
  },
  host: isDev
    ? process.env.DEV_IP || 'localhost:3000'
    : 'ebookstore-s1o5.onrender.com',
  schemes: isDev ? ['http'] : ['https', 'http'],
};

const output = './swagger.json';
const endpointsFile = ['./src/routes/index.js'];

swagAuto(output, endpointsFile, doc);
