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

	create: function(req, res) {
		Campaign.create(req.body).done(function(err, campaign) {
			if (err)
				res.send(err, 500);
			res.redirect('/campaign/coming');
		});
	},

	past: function(req, res) {
		var date = new Date();
		Campaign.find().where({epoch : {'<' : date.getTime()}}).where({validated: true}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.view('campaign/list_campaign', {campaigns: campaign, context: "past"});
		})
	},

	current: function(req, res) {
		var date = new Date();
		Campaign.find().where({epoch : {'>' : date.getTime()}}).where({validated: true}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.view('campaign/list_campaign', {campaigns: campaign, context: "current"});
		})
	},

	coming: function(req, res) {
		var date = new Date();
		Campaign.find().where({validated : false}).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.view('campaign/list_campaign', {campaigns: campaign, context: "coming"});
		})
	},

	getCampaign: function(req, res) {
		var id = req.param('id');

		Campaign.find(id: id).exec(function(err, campaign) {
			if (err)
				return (res.send(err, 500));
			res.end();
			//res.view('campaign/singleCampaign', {campaign: campaign});
		})
	}

};

module.exports = CampaignController;
