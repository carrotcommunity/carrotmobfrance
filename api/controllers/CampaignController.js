/**
 * CampaignController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
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

    new: function (req, res) {
        res.view('campaign/create_campaign', {campaign: null, errors: null});
    },

    create: function (req, res) {
        var validator = function (err, campaign) {
            var fieldOrNull = function (p) {
                return p ? p : '';
            };

            var formCampaign = {
                id: campaign ? campaign.id : null,
                title: fieldOrNull(req.param("title")),
                desc: fieldOrNull(req.param("desc")),
                engagement: fieldOrNull(req.param("engagement")),
                address: fieldOrNull(req.param("address")),
                city: fieldOrNull(req.param("city")),
                startDateStr: fieldOrNull(req.param("startDateStr"))
            };

            var errorStrings = {};
            errorStrings["inputTitle"] = "Vous devez choisir un titre pour votre campagne";
            errorStrings["inputDesc"] = "Vous devez décrire votre campagne";
            errorStrings["startDateStr"] = "Vous devez choisir une date supérieure à aujourd'hui";
            errorStrings["inputEngag"] = "Vous devez spécifier les engagements du commerçant";
            errorStrings["inputAddr"] = "Vous devez indiquer l'adresse de la campagne";
            errorStrings["inputCity"] = "Vous devez renseigner la ville dans laquelle à lieu cette campagne";

            var errors = {};
            errors["hasErrors"] = function () {
                for (var p in errors)
                    if (errors.hasOwnProperty(p) && typeof errors[p] == "string" && errors[p].length > 0)
                        return true;
                return false;
            };
            errors["inputTitle"] = !formCampaign.title || formCampaign.title.length == 0 ? errorStrings["inputTitle"] : "";
            errors["inputDesc"] = !formCampaign.desc || formCampaign.desc.length == 0 ? errorStrings["inputDesc"] : "";
            errors["inputEngag"] = !formCampaign.engagement || formCampaign.engagement.length == 0 ? errorStrings["inputEngag"] : "";
            errors["inputAddr"] = !formCampaign.address || formCampaign.address.length == 0 ? errorStrings["inputAddr"] : "";
            errors["inputCity"] = !formCampaign.city || formCampaign.city.length == 0 ? errorStrings["inputCity"] : "";
            errors["startDateStr"] = !formCampaign.startDateStr || formCampaign.startDateStr.length == 0 ? errorStrings["startDateStr"] : "";


            if (errors.hasErrors()) {
                res.view('campaign/create_campaign', { campaign: formCampaign, errors: errors });
                return;
            }

            var saveCallback = function(err, _campaign) {
                if (err && err !== true) {
                    for (var p in err)
                        if (err.hasOwnProperty(p))
                            for (var d in err[p])
                            {
                                switch (d)
                                {
                                    case 'title':
                                        errors["inputTitle"] = errorStrings["inputTitle"];
                                        break;
                                    case 'desc':
                                        errors["inputDesc"] = errorStrings["inputDesc"];
                                        break;
                                    case 'engagement':
                                        errors["inputEngag"] = errorStrings["inputEngag"];
                                        break;
                                    case 'address':
                                        errors["inputAddr"] = errorStrings["inputAddr"];
                                        break;
                                    case 'city':
                                        errors["inputCity"] = errorStrings["inputCity"];
                                        break;
                                    case 'date':
                                        errors["startDateStr"] = errorStrings["startDateStr"];
                                        break;
                                    default:
                                        break;
                                }
                            }
                }
                if (errors.hasErrors())
                    res.view('campaign/create_campaign', { campaign: formCampaign, errors: errors });
                else
                    res.redirect('/campaign/coming');
                return _campaign;
            };

            Campaign.create(req.body).done(saveCallback);
        };
        validator(null, null);
    },

    past: function (req, res) {
        var date = new Date();
        Campaign.find().where({epoch: {'<': date.getTime()}}).where({validated: true}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            res.view('campaign/list_campaign', {campaigns: campaign, context: "past"});
        })
    },

    current: function (req, res) {
        var date = new Date();
        Campaign.find().where({epoch: {'>': date.getTime()}}).where({validated: true}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            res.view('campaign/list_campaign', {campaigns: campaign, context: "current"});
        })
    },

    coming: function (req, res) {
        var date = new Date();
        Campaign.find().where({validated: false}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            res.view('campaign/list_campaign', {campaigns: campaign, context: "coming"});
        })
    },

    details: function (req, res) {
        var id = req.param('id');
        Campaign.findOne({'id': id}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            res.view('campaign/details', {c: campaign});
        })
    },

    activate: function (req, res) {
        var id = req.param('id');

        if (!req.session.passport.user.admin) {
            res.send("err", 500);
            return;
        }

        Campaign.findOne({'id': id}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            campaign.validated = true;
            campaign.save(function (err, ress) {
                res.view('campaign/details', {c: campaign});
            });
        });
    },

    desactivate: function (req, res) {
        var id = req.param('id');

        if (!req.session.passport.user.admin) {
            res.send("err", 500);
            return;
        }

        Campaign.findOne({'id': id}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            campaign.validated = false;
            campaign.save(function (err, ress) {
                res.view('campaign/details', {c: campaign});
            });
        });
    }

};

module.exports = CampaignController;
