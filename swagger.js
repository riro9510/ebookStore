const swaggerAutogen = require('swagger-autogen')()
const j2s = require('joi-to-swagger')
const bookSchema = require('./src/schemas/bookSchema')
const reviewSchema = require('./src/schemas/reviewSchema')

const { swagger: swaggerBookSchema } = j2s(bookSchema.bookSchema)
const { swagger: swaggerReviewSchema } = j2s(reviewSchema.reviewSchema)

function generateSchemaFromJ2S(rawJ2SSchema) {
  const output = {}
  const props = rawJ2SSchema.properties || {}
  for (const key in props) {
    if (props[key].example !== undefined) {
      output[key] = props[key].example
    }
  }
  return output
}

const doc = {
  swagger: '2.0',
  info: {
    title: 'Contacts API',
    description: 'Contacts API',
    version: '1.0.0',
  },
  definitions: {
    Book: generateSchemaFromJ2S(swaggerBookSchema),
    Review: generateSchemaFromJ2S(swaggerReviewSchema),
  },
  host: 'cse341-u4ne.onrender.com',
  schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
