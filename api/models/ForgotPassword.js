/**
 * ForgotPassword.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

 	attributes: {
 		ForgotPassword_id: {
 			type: 'integer',
 			primaryKey: true,
 			autoIncrement: true
 		},
 		User_id: {
 			type: 'integer',
 			required: true
 		},
 		token: {
 			type: 'string',
 			required: true
 		},
 		isUsed:{
 			type: 'boolean',
 			required: true,
 			defaultsTo: false
 		},
 		expiration: {
 			type: 'datetime',
 			required: false
 		}
 	},
 };

