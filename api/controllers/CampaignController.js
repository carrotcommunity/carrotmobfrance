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
	    var fieldOrNull = function (p) {
		return p ? p : '';
	    }
	    
	    var formCampaign = {
		id: campaign ? campaign.id : null,
		title: fieldOrNull(req.param("inputTitle")),
		description: fieldOrNull(req.param("inputDesc")),
		engagements: fieldOrNull(req.param("inputEngag")),
		address: fieldOrNull(req.param("inputAddr")),
		city: fieldOrNull(req.param("inputCity"))
	    };
	    
	    var errorStrings = new Object;
	    errorStrings["inputTitle"] = "Vous devez choisir un titre pour votre campagne";
	    errorStrings["inputDesc"] = "Vous devez décrire votre campagne";
	    errorStrings["inputEngag"] = "Vous devez spécifier les engagements de l'entreprise";
	    errorStrings["inputAddr"] = "Vous devez indiquer l'adresse de la campagne";
	    errorStrings["inputCity"] = "Vous devez renseigner la ville dans laquelle à lieu cette campagne";
	    
	    var errors = new Object;
	    errors["hasErrors"] = function() {
		for (var p in errors)
		    if (errors.hasOwnProperty(p) && typeof errors[p] == "string" && errors[p].length > 0)
			return true;
		return false;
	    };
	    errors["inputTitle"] = !formCampaign.title || formCampaign.title.length == 0 ? errorStrings["inputTitle"] : "";
	    errors["inputDesc"] = !formCampaign.description || formCampaign.description.length == 0 ? errorStrings["inputDesc"] : "";
	    errors["inputEngag"] = !formCampaign.engagements || formCampaign.engagements.length == 0 ? errorStrings["inputEngag"] : "";
	    errors["inputAddr"] = !formCampaign.address || formCampaign.address.length == 0 ? errorStrings["inputAddr"] : "";
	    errors["inputCity"] = !formCampaign.city || formCampaign.city.length == 0 ? errorStrings["inputCity"] : "";
	    
	    if (errors.hasErrors())
	    {
		res.view('campaign/new', { campaign: formCampaign, errors: errors });
		return;
	    }

	    var saveCallback = function(err, user) {
		if (err) {
		    for (var p in err)
		    {
			if (err.hasOwnProperty(p))
			{
			    for (var d in err[p])
			    {
				switch (d)
				{
				case 'title':
				    errors["inputTitle"] = errorStrings["inputTitle"];
				    break;
				case 'description':
				    errors["inputDesc"] = errorStrings["inputDesc"];
				    break;
				case 'engagements':
				    errors["inputEngag"] = errorStrings["inputEngag"];
				    break;
				case 'address':
				    errors["inputAddr"] = errorStrings["inputAddr"];
				    break;
				case 'city':
				    errors["inputCity"] = errorStrings["inputCity"];
				    break;
				default:
				    break;
				}
			    }
			}
		    }
		}
		if (errors.hasErrors())
		    res.view('/campaign/create_campaign', { campaign: formCampaign, errors: errors });
		else
		    res.redirect('/campaign/coming');
		return campaign;
	    }
	})
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
	
	Campaign.find({'id': id}).exec(function(err, campaign) {
	    if (err)
		return (res.send(err, 500));
	    res.end();
	    //res.view('campaign/singleCampaign', {campaign: campaign});
	})
    }
};

module.exports = CampaignController;
