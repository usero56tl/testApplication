/**
 * ContactInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

 	attributes: {
 		id:{
 			type: 'integer',
 			primaryKey: true,
 			autoIncrement: true
 		},
 		email: {
 			type: 'string',
 			unique:true,
 			required: true
 		},
 		name: {
 			type: 'string',
 			required: true
 		},
 		message: {
 			type: 'string',
 			required: false
 		}
 	}
 };

