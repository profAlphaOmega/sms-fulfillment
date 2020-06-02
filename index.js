'use strict';

// require each functions
const sendSMS = require('./functions/sendSMS');


// map each function to an export
// when we deploy this code using `npm run deploy` it will deploy each function individually:
exports.sendSMS = sendSMS.handler;

// for local development in order to have a single port serve all our functions, we'll do the following:
exports.local = async function local(req, res) {
    switch (req.path) {
      case '/sendSMS':
        return sendSMS.handler(req, res)
      default:
        res.send('Route Not Found')
    }
  }
