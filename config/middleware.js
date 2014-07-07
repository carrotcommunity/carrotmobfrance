var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto');

var verifyFBHandler = function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        Carrotmobber.findOne({
            uid: profile.id
        }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                Carrotmobber.create({
                    uid: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile._json.email,
                    password: '',
                    gender: profile._json.gender ? (profile._json.gender == 'male' ? 2 : profile._json.gender == 'female' ? 1 : -1) : -1,
                    tokenFb: accessToken,
                    picture: 'http://graph.facebook.com/' + profile.id + '/picture?type=square',
                    city: profile._json.location && profile._json.location.name ? profile._json.location.name.split(",")[0] : '',
                    newPassword: null,
                    newPasswordToken: null,
                    admin: false,
                    registered: false
                }).exec(function (err, user) {
                    return done(err, user);
                });
            }
        });
    });
};

var verifyHandler = function (username, password, done) {
    if(!username || !password) done(null, false, { message: 'Email et mot de passe obligatoires.' });
    process.nextTick(function () {
        Carrotmobber.findOne({
            email: username
        }).exec(function (err, user) {
            if (err) {
                return done(err, false, { message: err });
            }
            if (!user) {
                return done(null, false, { message: 'Email inconnu.' });
            }
            if (user.tokenFb) {
                return done(null, false, { message: 'Veuillez vous connecter avec Facebook.' });
            }

            var md5er = crypto.createHash('md5');
            md5er.update(password);
            var passwordEncrypted = md5er.digest('hex');

            if (user.password != passwordEncrypted) {
                return done(null, false, { message: 'Mot de passe invalide.' });
            }
            return done(null, user);
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    Carrotmobber.findOne({
        id: user.id
    }).exec(function (err, user) {
        done(err, user)
    });
});

module.exports = {
    express: {
        fbConfig: {
            clientID: "603130836441870",
            clientSecret: "c5093cb587385b875d723cab6b05ff6d",
            callbackURL: "http://localhost:1337/auth/facebook/callback"
        },
        customMiddleware: function (app) {
            passport.use(new FacebookStrategy(this.fbConfig, verifyFBHandler));
            passport.use(new LocalStrategy(verifyHandler));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};
