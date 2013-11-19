/**
 * Campagne
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
	start_date : 'DATE',
	end_date: 'DATE',
	type: 'STRING', //type de campagne (classique, voucher)
	title: {
		type: 'STRING', 
		required: true
	},
	description: 'TEXT', //Description 
	if: 'TEXT', //Si le commerce s'engage à
	then: 'TEXT',  //Alors ...
	merchant: '', //identifiant du commerce
	created_by: 'TEXT', //admin, commercant
	status: 'TEXT', //terminé, en cours, proposé, annulé
	
	
	
  
    
  }

};
