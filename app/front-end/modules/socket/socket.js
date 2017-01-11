'use strict';

(function() {

	angular.module('chat.modules.socket')

		.constant('SOCKET_MODULE_DEFAULTS', {})

		.factory('socket', function(SOCKET_MODULE_DEFAULTS, $window, dispatcher, $location, $log) {

			// SOCKET.IO
			var io = $window.io;
			var socket = null;
			var userConnectionId = null;

			var factObj = {};
			var _dispatcher = null;

			// INITIALIZE DECORATORS
			var _decorators = {

				// OUTPUT PAYLOAD DECORATOR
				payloadDecorator: function(event, meta, payload) {
					return angular.extend({
						meta: {
							event: event,
							from: userConnectionId,
							to: meta.to
						}
					}, {payload: payload});
				},

				// SOCKET EVENT ENGINE DECORATOR
				socketDecorator: function(config, socket) {

					Object.keys(config.EVENTS).forEach(function(eventGroup) {

						Object.keys(config.EVENTS[eventGroup]).forEach(function(event) {

							socket.on(config.EVENTS[eventGroup][event], function(transmission) {
								var eventName = config.EVENTS[eventGroup][event];
								console.log('EVENT TRIGGERED', eventName, transmission);
								_dispatcher.trigger(eventName, transmission);
							});

						});

					});
				}
			};

			// INITIALIZATION FUNCTION
			factObj.init = function(initConfig, userId, userProfile) {

				if (userConnectionId) {
					console.warning('module initialized...');
					return;
				}

				socket = io(initConfig.host || $location.host() + ':' + $location.port());

				var eventConfig = initConfig.EVENTS;

				userConnectionId = userId;

				socket.emit(eventConfig.USER.INIT, {
					meta: {
						from: userId
					},
					profile: userProfile,
				});

				_dispatcher = dispatcher({EVENTS: eventConfig}, socket);

				// TRANSMIT EVENT
				factObj.transmitter = function(event, to, payload) {
					socket.emit(event, _decorators.payloadDecorator(event, {to}, payload));
				};

				// RECEIVES EVENTS
				factObj.receiver = function(event, callback) {
					_dispatcher.register(event, callback);
				};

				_decorators.socketDecorator(initConfig, socket);

			};

			factObj.reciever = factObj.transmitter = function() {
				$log.error('socket module not initialized, Please use the init method to initialize the module');
			};

			return factObj;

		});

})();
