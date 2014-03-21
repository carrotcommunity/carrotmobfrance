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

module.exports = {
    
    index: function (req, res) {
        var validator = function (err, user) {
            res.view('user/signup', { user: user, errors: null });
        };
        if (req.session && req.session.passport && req.session.passport.user)
            Carrotmobber.findOne({ id: req.session.passport.user }).done(validator);
        else
            validator(null, null);
    },
    save: function (req, res) {
        var validator = function (err, user) {
            var fieldOrNull = function (p) {
                return p ? p : '';
            }
            var formUser = {
                id: user ? user.id : null,
                firstname: fieldOrNull(req.param("inputFirstName")),
                lastname: fieldOrNull(req.param("inputLastName")),
                city: fieldOrNull(req.param("inputTown")),
                email: fieldOrNull(req.param("inputEmail")),
                password: fieldOrNull(req.param("inputPassword"))
            };
            
            var errorStrings = new Object;
            errorStrings["inputFirstName"] = "Vous devez insérer un prénom";
            errorStrings["inputLastName"] = "Vous devez insérer un nom de famille";
            errorStrings["inputTown"] = "Vous devez insérer une ville";
            errorStrings["inputEmail"] = "Vous devez insérer un email valide";
            errorStrings["inputEmailUsed"] = "L'email inséré est déjà utilisé";
            errorStrings["inputPassword"] = "Vous devez insérer un mot de passe d'au moins six caractères";

            var errors = new Object;
            errors["hasErrors"] = function() {
                for (var p in errors)
                    if (errors.hasOwnProperty(p) && errors[p] === true)
                        return true;
                return false;
            };
            errors["inputFirstName"] = !formUser.firstname || formUser.firstname.length == 0 ? errorStrings["inputFirstName"] : "";
            errors["inputLastName"] = !formUser.lastname || formUser.lastname.length == 0 ? errorStrings["inputLastName"] : "";
            errors["inputTown"] = !formUser.city || formUser.city.length == 0 ? errorStrings["inputTown"] : "";
            errors["inputEmail"] = !formUser.email || formUser.email.length == 0 ? errorStrings["inputEmail"] : "";
            errors["inputPassword"] = !formUser.id && (!formUser.password || formUser.password.length == 0) ? errorStrings["inputPassword"] : "";

            if (errors.hasErrors())
            {
                for (var p in errors)
                    if (errors.hasOwnProperty(p) && errors[p] === true)
                        console.log(p);
                res.view('user/signup', { user: formUser, errors: errors });
                return;
            }

            var saveCallback = function(err, user) {
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
                res.view('user/signup', { user: formUser, errors: errors });
                return user;
            };
            
            var u = null;
            
            if (user)
            {
                _.extend(user, formUser);
                u = user.save(saveCallback);
            }
            else
            {
                var hasEmail = Carrotmobber.findOne({ email: formUser.email }).done(function(err, user) {
                    return user;
                });
                
                if (hasEmail) {
                    errors["inputEmail"] = errorStrings["inputEmailUsed"];
                    saveCallback(true, null);
                }
                
                u = Carrotmobber.create({
                    firstname: formUser.firstname,
                    lastname: formUser.lastname,
                    email: formUser.email,
                    password: formUser.password,
                    uid: null,
                    tokenFb: null,
                    picture: '',
                    city: formUser.city,
                    admin: false,
                    registered: true
                }).done(saveCallback);
            }

            if (!u)
                return;

            res.redirect('/');
        };
        if (req.session && req.session.passport && req.session.passport.user)
            Carrotmobber.findOne({ id: req.session.passport.user }).done(validator);
        else
            validator(null, null);
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SignupController)
   */
  _config: {}

  
};
