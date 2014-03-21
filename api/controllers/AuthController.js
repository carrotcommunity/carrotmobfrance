/**
 * AuthController
 *
 * @module      :: Model
 * @description :: Module d'authentification Facebook
 */

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    bcrypt = require('bcrypt-nodejs');

var AuthController = {

    index: function (req, res) {
        res.view();
    },
    signup: function (req, res) {
        res.view('user/signup');
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
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
                console.log(user);
                console.log(req.session);
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