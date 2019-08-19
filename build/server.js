'use strict';

import Person from './src/controllers/Person';

app.post('/api/v1/people', Person.create);
app.get('/api/v1/people', Person.getAll);
app.get('/api/v1/people/:id', Person.getOne);
app.put('/api/v1/people/:id', Person.update);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // server.js


app.use(_express2.default.json());

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.listen(3000);
console.log('app running on port ', 3000);