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
var sid = require('shortid');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Writable = require('stream').Writable;

var UPLOAD_PATH = 'upload/images';

// Setup id generator
sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
sid.seed(42);


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
                startDateStr: fieldOrNull(req.param("startDateStr")),
                inputImg: fieldOrNull(req.param("inputImg")),
                address: fieldOrNull(req.param("address")),
                city: fieldOrNull(req.param("city")),
                desc: fieldOrNull(req.param("desc")),
                engagement: fieldOrNull(req.param("engagement"))
            };

            var errorStrings = {};
            errorStrings["inputTitle"] = "Choisis un titre pour ta campagne";
            errorStrings["startDateStr"] = "Choisis une date supérieure à aujourd'hui";
            errorStrings["inputAddr"] = "Indique l'adresse de la campagne";
            errorStrings["inputCity"] = "Renseigne la ville dans laquelle a lieu cette campagne";
            errorStrings["inputDesc"] = "Décris ta campagne";
            errorStrings["inputEngag"] = "Spécifie les engagements du commerçant";

            var errors = {};
            errors["hasErrors"] = function () {
                for (var p in errors)
                    if (errors.hasOwnProperty(p) && typeof errors[p] == "string" && errors[p].length > 0)
                        return true;
                return false;
            };
            errors["inputTitle"] = !formCampaign.title || formCampaign.title.length == 0 ? errorStrings["inputTitle"] : "";
            errors["startDateStr"] = !formCampaign.startDateStr || formCampaign.startDateStr.length == 0 ? errorStrings["startDateStr"] : "";
            errors["inputAddr"] = !formCampaign.address || formCampaign.address.length == 0 ? errorStrings["inputAddr"] : "";
            errors["inputCity"] = !formCampaign.city || formCampaign.city.length == 0 ? errorStrings["inputCity"] : "";
            errors["inputDesc"] = !formCampaign.desc || formCampaign.desc.length == 0 ? errorStrings["inputDesc"] : "";
            errors["inputEngag"] = !formCampaign.engagement || formCampaign.engagement.length == 0 ? errorStrings["inputEngag"] : "";

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
                                    case 'date':
                                        errors["startDateStr"] = errorStrings["startDateStr"];
                                        break;
                                    case 'address':
                                        errors["inputAddr"] = errorStrings["inputAddr"];
                                        break;
                                    case 'city':
                                        errors["inputCity"] = errorStrings["inputCity"];
                                        break;
                                    case 'desc':
                                        errors["inputDesc"] = errorStrings["inputDesc"];
                                        break;
                                    case 'engagement':
                                        errors["inputEngag"] = errorStrings["inputEngag"];
                                        break;

                                    default:
                                        errors["err"] = d;
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

            var camp = req.body;
            camp.carrotmobberId = req.session.passport.user.id;

            try {
                mkdirp.sync(UPLOAD_PATH, 0755);
            } catch (e) {
                console.log(e);
            }

            var results = [],
                streamOptions = {
                    dirname: UPLOAD_PATH+'/',
                    saveAs: function(file) {
                        return sid.generate() + path.extname(file.filename);
                    },
                    completed: function(fileData, next) {
                        results.push({
                            id: fileData.id,
                            url: UPLOAD_PATH + '/' + fileData.localName
                        });
                        next();
                    }
                };


            req.file('banner').upload(Uploader.documentReceiverStream(streamOptions),function(err,files){
                if (err) {
                    console.log(err);
                    res.json({'error': 'could not write file to storage'});
                } else {
                    ProcessImage.generateThumb(results[0].id, results[0].url, function (err, data) {
                        if (err) {
                            res.json(err);
                        } else {
                            camp.image = data.path;
                            Campaign.create(camp).exec(saveCallback);
                        }
                    });
                }
            });
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
            Carrotmobber.findOne({id: campaign.carrotmobberId}).exec(function(err, user) {
                campaign.carrotmobber = user;
                res.view('campaign/details', {c: campaign});
            });
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
                Carrotmobber.findOne({id: campaign.carrotmobberId}).exec(function(err, user) {
                    campaign.carrotmobber = user;
                    res.view('campaign/details', {c: campaign});
                });
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
                Carrotmobber.findOne({id: campaign.carrotmobberId}).exec(function(err, user) {
                    campaign.carrotmobber = user;
                    res.view('campaign/details', {c: campaign});
                });
            });
        });
    }

};

module.exports = CampaignController;
