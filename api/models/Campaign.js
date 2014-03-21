/**
 * Campaign
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

      title: 'string',
      desc: 'string',
      engagement: 'string',
      place: 'string',
      startDate: 'date',
      endDate: 'date',
      image: 'string',
      carrotmobberId: 'Carrotmobber',
      validated: 'boolean'
    
  }

};
