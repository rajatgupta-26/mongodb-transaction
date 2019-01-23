const express = require('express');
const mongoose = require('mongoose');
const config   = require('./config');
const bodyParser = require('body-parser');

const {	dbUri, port } = config;

mongoose.connect(dbUri, { replicaSet: 'rs' }, (err,res) => {
	if(err){
		console.log('error connecting to db', err);
		process.exit();
	} else {
		console.log('application satrted');
	}
});

const app = express();
const router = express.Router();

const routes = require('./routes.js');

try {
    routes.initRoutes(router);
} catch(err) {
    console.log("Routing Error", err.stack);
    process.exit();
}

app.use(bodyParser.json()); // for parsing application/json
app.use('/', router);
app.use(express.static('public'));


app.listen(port, () => {
	console.log('Server started and listening on port: ' + port);
});

