const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();

// HTTP API logging
app.use(morgan('dev'));

require('./config/express')(app);
require('./config/passport')(app);
require('./routes')(app);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));