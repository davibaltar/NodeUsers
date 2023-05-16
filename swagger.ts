import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
	  title: 'ListApp API',
	  description: 'This swagger generates the endpoints for our ListApp',
	},
	host: 'localhost:3000',
	schemas: ['http'],
  };
  
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)