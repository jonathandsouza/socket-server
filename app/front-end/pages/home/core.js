'use strict';

(function() {

	angular.module('chat.pages.home', [])

		.constant('EVENTS', {
			CONNECTION: {

				CONNECT: 'connection',

				DISCONNECT: 'disconnect',
			},

			USER: {
				INIT: 'USER_INITIALIZE'
			},

			CHAT: {

				SEND: 'CHAT_SEND',

				RECEIVE: 'CHAT_RECEIVE',

				TYPING: 'CHAT_TYPING',

				USER_JOINED: 'CHAT_USER_JOINED',

				USER_LEFT: 'CHAT_USER_LEFT',

			}

		})

		.controller('MainController', function(socket, EVENTS) {

			var self = this;

			self.user = {
				id: null
			};

			self.connect = function() {
				socket.init({EVENTS: EVENTS}, self.user.id, {id: self.user.id});

				socket.receiver(EVENTS.CHAT.RECEIVE, function(response) {
					console.log(response);
				});
			};

			self.chat = {

				message: '',
				to: null,
				send: function() {
					socket.transmitter(EVENTS.CHAT.SEND, this.to, {message: this.message});
				}
			};


		});

})();

