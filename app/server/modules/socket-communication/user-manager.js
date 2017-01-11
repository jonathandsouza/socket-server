'use strict';

/*
 USER DATA FORMAT

 ID : {
 id: <user ID>,
 socketId: <socket ID> ,
 socket : <socket>,
 profile: <user profile>
 }


 */

(function(module) {

	module.exports = function() {

		// FACTORY
		var factObj = {};

		// USER REPOSITORY
		var userRepository = {};

		// REGISTER NEW USER
		factObj.register = function(transmission, socket) {

			userRepository[transmission.meta.from] = {
				id: transmission.meta.from,
				socketId: socket.id,
				socket,
				profile: transmission.profile
			};
		};

		// GET USER BASED ON ID
		factObj.getUser = function(id) {

			return userRepository[id];
		};


		// REOMVE USER

		// @todo: add custom code to delete user based on socket.id
		factObj.removeUser = function(id) {
			delete userRepository[id];
		};


		return factObj;

	};

})(module);

