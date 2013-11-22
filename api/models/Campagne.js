/**
 * Campagne
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
	start_date : 'DATE',    //date de debut de la campagne
	end_date: 'DATE',       //date de fin de la campagne
	type: 'STRING',         //type de campagne (classique, voucher)
	title: 'STRING',        //titre de la campagne     
	description: 'TEXT',    //description 
	if: 'TEXT',             //si le commerce s'engage à
	then: 'TEXT',           //alors ...
	merchant: 'INTEGER',    //identifiant du commerce
	created_by: 'TEXT',     //admin, commercant, visiteur
	status: 'TEXT',         //non-validé, terminé, en cours, proposé, annulé    
  },
  afterCreate: function(obj, next){
      /**
       * @todo: envoyer un email 
      **/
      next();
  }

};
