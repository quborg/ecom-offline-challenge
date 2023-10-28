/* Swagger configuration */
const options = {
  openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
  // language: 'en-US',      // Change response language. By default is 'en-US'
  // disableLogs: false,     // Enable/Disable logs. By default is false
  autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
  autoQuery: false,       // Enable/Disable automatic query capture. By default is true
  autoBody: false         // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '2.0.0',      // by default: '1.0.0'
    // title: 'REST API',        // by default: 'REST API'
    // description: 'API for Managing queue calls',  // by default: ''
    contact: {
      'name': 'API Support',
      'email': 'miloud.laftah@gmail.com'
    },
  },
  // host: '',      // by default: 'localhost:3000'
  // basePath: '/',  // by default: '/'
  // schemes: ['http'],   // by default: ['http']
  // consumes: ['application/json'],  // by default: ['application/json']
  // produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: 'cooktime',         // Tag name
      description: 'Cooktime calculation for a given Ramadan day',  // Tag description
    },
    {
      name: 'suggest',
      description: 'Suggest some dishes for a choosen Ramadan day'
    }
  ],
  // securityDefinitions: {},  // by default: empty object
  definitions: {
    successResponse: [{
      name: "Veggie Couscous",
      ingredients: [
        "Semolina",
        "Potatoe",
        "Carrot",
        "Onion",
        "Tomato paste"
      ],
      cooktime: "30 minutes before Asr"
    }],
    'errorResponse.400': 'Needs argument X',
    'errorResponse.500': 'The server encountered an unexpected condition that prevented it from fulfilling the request',
    'errorResponse.404': 'The server cannot find the requested resource'
  },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./src/routes/endPoints.ts'];

/* NOTE: if you use the express Router, you must pass in the 
 'endpointsFiles' only the root file where the route starts,
 such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });