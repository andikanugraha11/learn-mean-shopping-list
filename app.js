const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');

const items = require('./routes/api/items.api')

const app = express();

// BodyParser MiddleWare
app.use(bodyParser.json());

// DB Config
const config = require("./config/apps-config");

// Connect to Mongo
mongoose
    .connect(config.database, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Routes
app.use('/api/items', items);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`))