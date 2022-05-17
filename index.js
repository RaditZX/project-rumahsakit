const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');



//middleware
app.use(bodyParser.json());
app.use(cors());




//database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RumahSakit', { useNewUrlParser: true },() => {
    console.log('connected to mongodb')});


// Route
require ('./Route/Route')(app);




//listen on port
app.listen(port, () => {
    console.log('listening on port ' + port);
});




