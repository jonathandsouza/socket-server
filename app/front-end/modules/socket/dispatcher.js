'use strict';

(function() {

	angular
		.module('chat.modules.socket')

		.factory('dispatcher', function(eventQueueManager) {

			return function(configuration, socket) {

				// DISPATCHER INSTANCE
				var dispatcher = {};

				// OVERRIDES
				var _config = configuration;
				var _queueManager = eventQueueManager();


				// EVENT REGISTRATION
				Object.keys(_config.EVENTS).forEach(function(eventGroup) {
					_queueManager.addEvents(_config.EVENTS[eventGroup]);
				});


				// PUBLIC METHODS

				// REGISTER EVENTS
				dispatcher.register = function(event, callback) {
					_queueManager.register(event, callback);
				};

				// TRIGGER EVENTS
				dispatcher.trigger = function(event, transmission) {
					_queueManager.trigger(event, transmission);

				};

				return dispatcher;
			};


		})

		.factory('eventQueueManager', function() {

			return function() {

				// EVENT QUEUE :  used to maintain event queue
				var eventQueue = {};

				// PRIVATE METHODS & OBJECTS
				var _internal = {};

				_internal.addEvent = function(event) {
					// REGISTER EVENT
					eventQueue[event] = eventQueue[event] || [];
				};

				var factObj = {};

				// PUBLIC METHODS

				// ADD EVENTS
				factObj.addEvents = function(eventCategory) {
					Object.keys(eventCategory).forEach(function(evt) {
						_internal.addEvent(eventCategory[evt]);
					});
				};

				// REGISTER CALLBACKS TO EVENTS
				factObj.register = function(event, callback) {

					_internal.addEvent(event);

					eventQueue[event].push(callback);
				};

				// TRIGGER EVENT
				factObj.trigger = function(event, transmission) {

					eventQueue[event].forEach(function(callback) {
						callback(transmission);
					});

				};
				return factObj;
			};
		});

})();

