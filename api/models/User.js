 /**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

 module.exports = {

  attributes: {
    User_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: 'string',
      required: false
    },
    lastName: {
      type: 'string',
      required: false
    },
    email: {
      type: 'string',
      required: false,
      unique: true
    },
    password: {
      type: 'string',
      required: false
    },
    phone: {
      type: 'string',
      required: false
    },
    isEmailConfirmed:{
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    accountActivationCode:{
      type: 'string',
      required: false
    }
  },
  

  toJSON: function() {
    var obj = this.toObject();
    //delete obj.password;
    return obj;
  }

};

