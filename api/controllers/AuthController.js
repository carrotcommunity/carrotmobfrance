/**
 * AuthController
 *
 * @module      :: Model
 * @description :: Module d'authentification Facebook
 */

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

var AuthController = {

    index: function (req, res) {
        res.view();
    },
    signin: function (req, res) {
    },
    logout: function (req, res) {
        req.logout();
        var ref = req.param("next");
        res.redirect(ref ? ref : '/');
    },
    'facebook': function (req, res, next) {
        passport.authenticate('facebook', {
            scope: ['email', 'basic_info', 'user_location', 'user_friends']
        }, function (err, user) {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                    res.view('500');
                    return;
                }
                res.redirect(user.registered ? '/' : '/signup');
                return;
            });
        })(req, res, next);
    },
    'facebook/callback': function (req, res, next) {
        passport.authenticate('facebook', function (req, res) {
            res.redirect('/');
        })(req, res, next);
    }
};

module.exports = AuthController;