/**
 * CampaignController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var CampaignController = {
	listCampaign: function(req, res) {
		Campaign.find().exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			console.log(campaign);
		});
		res.end();
	},

	past: function(req, res) {
		var date = new Date();
		Campaign.find().where({epoch : {'<' : date.getTime()}}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.end();
		})
	},

	current: function(req, res) {
		var date = new Date();
		Campaign.find().where({epoch : {'>' : date.getTime()}}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.end();
		})
	},

	coming: function(req, res) {
		var date = new Date();
		Campaign.find().where({validated : false}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.end();
		})
	}
};

module.exports = CampaignController;
