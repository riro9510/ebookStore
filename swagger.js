const swagAuto = require('swagger-autogen');
const j2s = require('joi-to-swagger');
const bookSchema = require('./src/schemas/booksSchema');
const userSchema = require('./src/schemas/usersSchema');

const { swagger: swaggerBookSchema } = j2s(bookSchema.bookSchema);
const { swagger: swaggerUserSchema } = j2s(userSchema.registerUserSchema);

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
  host: 'ebookstore-s1o5.onrender.com',
  schemes: ['https', 'http'],
  // host: 'localhost:3000',
  // schemes: ['http']
};

const output = './swagger.json';
const endpointsFile = ['./src/routes/index.js'];

swagAuto(output, endpointsFile, doc);
