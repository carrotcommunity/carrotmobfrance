/**
 * Campaign
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

      title: {
        type: 'string',
        minLength: 1,
        required: true
      },
      desc: {
        type: 'string',
        minLength: 1,
        required: true
      },
      engagement: {
        type: 'string',
        minLength: 1,
        required: true
      },
      place: {
        type: 'string',
        minLength: 1,
        required: true
      },
      startDate: {
        type: 'date',
        required: true
      },
      endDate: 'date',
      image: 'string',
      carrotmobberId: {
        type: 'string',
        required: true
      },
      validated: {
        type: 'boolean',
        defaultsTo: false
      }
    
  }

};
