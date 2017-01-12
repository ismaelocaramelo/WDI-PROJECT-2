const express  = require('express');
const app      = express();
const cors     = require('cors');
const mongoose = require('mongoose');
const routes   = require('./config/routes');
const config   = require('./config/config');

mongoose.connect(config.db);

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/', routes);

app.listen(config.port, console.log(`Server has stated on config.port: ${config.port}`));
