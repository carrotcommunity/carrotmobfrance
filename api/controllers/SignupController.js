/**
 * SignupController
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

var crypto = require('crypto');

module.exports = {
    
    index: function (req, res) {
        var validator = function (err, user) {
            res.view('user/signup', { user: user, errors: null });
        };
        if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.id)
            Carrotmobber.findOne({ id: req.session.passport.user.id }).exec(validator);
        else
            validator(null, null);
    },
    save: function (req, res) {

        var validator = function (err, user) {
            var fieldOrNull = function (p) {
                return p ? p : '';
            };

            var formUser = {
                id: user ? user.id : null,
                firstname: fieldOrNull(req.param("inputFirstName")),
                lastname: fieldOrNull(req.param("inputLastName")),
                city: fieldOrNull(req.param("inputTown")),
                email: fieldOrNull(req.param("inputEmail")),
                password: fieldOrNull(req.param("inputPassword")),
                password2: fieldOrNull(req.param("inputPassword2")),
                gender: fieldOrNull(req.param("inputGender"))
            };

            var errorStrings = new Object;
            errorStrings["inputGender"] = "Sélectionne ton genre";
            errorStrings["inputFirstName"] = "Renseigne ton prénom";
            errorStrings["inputLastName"] = "Renseigne ton nom de famille";
            errorStrings["inputTown"] = "Renseigne ta ville";
            errorStrings["inputEmail"] = "Renseigne un email valide";
            errorStrings["inputEmailUsed"] = "L'email renseigné est déjà utilisé";
            errorStrings["inputPassword"] = "Ton mot de passe doit faire plus de 5 caractères";
            errorStrings["inputPassword2"] = "La confirmation de ton mot de passee est invalide";

            var errors = {};
            errors["hasErrors"] = function() {
                for (var p in errors)
                    if (errors.hasOwnProperty(p) && typeof errors[p] == "string" && errors[p].length > 0)
                        return true;
                return false;
            };
            errors["inputGender"] = formUser.gender != '1' && formUser.gender != '2' ? errorStrings["inputGender"] : "";
            errors["inputFirstName"] = !formUser.firstname || formUser.firstname.length == 0 ? errorStrings["inputFirstName"] : "";
            errors["inputLastName"] = !formUser.lastname || formUser.lastname.length == 0 ? errorStrings["inputLastName"] : "";
            errors["inputTown"] = !formUser.city || formUser.city.length == 0 ? errorStrings["inputTown"] : "";
            errors["inputEmail"] = !formUser.email || formUser.email.length == 0 ? errorStrings["inputEmail"] : "";
            errors["inputPassword"] = !formUser.id && (!formUser.password || formUser.password.length < 6) ? errorStrings["inputPassword"] : "";
            errors["inputPassword2"] = !formUser.id && formUser.password && formUser.password != formUser.password2 ? errorStrings["inputPassword2"] : "";

            if (errors.hasErrors()) {
                res.view('user/signup', { user: formUser, errors: errors });
                return;
            }

            var saveCallback = function(err, _user) {
                if (err && err !== true) {
                    for (var p in err)
                        if (err.hasOwnProperty(p))
                            for (var d in err[p])
                            {
                                switch (d)
                                {
                                    case 'firstname':
                                        errors["inputFirstName"] = errorStrings["inputFirstName"];
                                        break;
                                    case 'lastname':
                                        errors["inputLastName"] = errorStrings["inputLastName"];
                                        break;
                                    case 'email':
                                        errors["inputEmail"] = errorStrings["inputEmail"];
                                        break;
                                    case 'password':
                                        errors["inputPassword"] = errorStrings["inputPassword"];
                                        break;
                                    default:
                                        break;
                                }
                            }
                }
                if (errors.hasErrors())
                    res.view('user/signup', { user: formUser, errors: errors });
                else
                    res.redirect('/connect');
                return _user;
            };

            if (user)
            {
                Carrotmobber.findOne({ email: formUser.email }).exec(function(err, _user) {
                    if (_user && _user.registered) {
                        errors["inputEmail"] = errorStrings["inputEmailUsed"];
                        saveCallback(true, null);
                        return;
                    }
                    _.extend(user, formUser);
                    user.registered = true;
                    user.save(saveCallback);
                });
            }
            else
            {
                Carrotmobber.findOne({ email: formUser.email }).exec(function(err, _user) {
                    if (_user) {
                        errors["inputEmail"] = errorStrings["inputEmailUsed"];
                        saveCallback(true, null);
                        return;
                    }

                    var md5er = crypto.createHash('md5');
                    md5er.update(formUser.password);
                    var passwordEncrypted = md5er.digest('hex');

                    Carrotmobber.create({
                        firstname: formUser.firstname,
                        lastname: formUser.lastname,
                        email: formUser.email,
                        password: passwordEncrypted,
                        gender: formUser.gender,
                        uid: null,
                        tokenFb: null,
                        picture: '',
                        city: formUser.city,
                        newPassword: null,
                        newPasswordToken: null,
                        admin: false,
                        registered: true
                    }).exec(saveCallback);
                });
            }
        };
        if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.id)
            Carrotmobber.findOne({ id: req.session.passport.user.id }).exec(validator);
        else
            validator(null, null);
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SignupController)
   */
  _config: {}

  
};
