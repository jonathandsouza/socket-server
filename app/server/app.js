'use strict';

// APP BOOTSTRAPPING
(function() {
	module.exports = function(options) {

		// LOGGER CONFIGURATION
		var $log = require('./utils/log.js');


		// UTILITIES
		var _ = require('lodash');

		// DEFAULTS
		var _defaults = {};

		// OVERRIDES
		options = _.extend({}, _defaults, options);

		// PRIVATE VARIABLES
		var _io = options.io;

		// CONFIGURATION
		var _configuration = require('./config.json');


		return {
			init() {

				// BOOTSTRAP SOCKET COMMUNICATION MODULE
				var socketCommunication = require('./modules/socket-communication/core')(_io, {
					config: _configuration
				});

				// INITIALIZE SOCKET COMMUNICATION MODULE
				socketCommunication.init();

				// BOOTSTRAP CHAT MODULE
				var chatManager = require('./modules/chat-manager/core')({
					config: _configuration,
					socketCommunication
				});

				// INIT CHAT MODULE
				chatManager.init();

				$log.log('info', 'APPLICATION STARTED...');
			}
		};


	};
})();