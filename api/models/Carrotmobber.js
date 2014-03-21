/**
 * Carrotmobber
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

      firstname: {
        type: 'string',
        required: true
      },
      lastname: {
        type: 'string',
        required: true
      },
      email: {
        type: 'email',
        required: true
      },
      password: {
        type: 'string',
        minLength: 6,
        required: true
      },
      tokenFb: 'string',
      picture: 'string',
      city: {
        minLenth: 1,
        required: true
      },
      admin: {
        defaultsTo: false
      }
    
  }

};
