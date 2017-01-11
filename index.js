(function(env) {

	const lodash = require('lodash');
	const express = require('express');
	const path = require('path');
	const app = express();
	const server = require('http').createServer(app);
	const io = require('socket.io')(server);

	// CONFIGURATIONS
	process.env = lodash.extend({}, process.env, env);


	// ROUTES

	// DEPENDENCIES
	app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));
	app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));

	// APPLICATION ROUTE
	app.use('/app', express.static(path.join(__dirname + '/app')));

	// FRONT END ROUTE
	app.get('/chat', function(req, res) {
		res.sendFile(path.join(__dirname + process.env.FRONT_END));
	});

	// FRONT END ROUTE
	app.get('/', function(req, res) {
		res.send('hello jona');
	});

	// BOOTSTRAPING APPLICATION
	var serverApplication = require('./app/server/app')({io});
	serverApplication.init();


	// START SERVER
	server.listen(process.env.PORT, function() {
		console.log('CHAT SERVER ONLINE ON...', process.env.PORT);
	});

})(require(__dirname + '/.tmp/config.json'));