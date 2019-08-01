const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db');
const Event = require('./event/EventModel.js')
const app = express();
const port = 4000;
const middleware = cors()
const jsonParser = bodyParser.json()
const eventRouter = require('./event/router')

app.use(middleware)
app.use(jsonParser)
app.use(eventRouter)
app.listen(port);