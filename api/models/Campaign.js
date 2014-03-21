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
        type: 'datetime',
        after: function() {
          var date = new Date();

          return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        }
      },
      endDate: {
        type: 'date',
        after: function() {
          return new Date();
        },
        required: false
      },
      image: 'string',
      carrotmobberId: {
        type: 'string',
        required: false
      },
      validated: {
        type: 'boolean',
        defaultsTo: false
      }
    
  }
};
