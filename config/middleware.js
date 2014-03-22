var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy;

var verifyFBHandler = function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        Carrotmobber.findOne({
            uid: profile.id
        }).done(function (err, user) {
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
                }).done(function (err, user) {
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
        }).done(function (err, user) {
            if (err) {
                return done(err, false, { message: err });
            }
            if (!user) {
                return done(null, false, { message: 'Email inconnu.' });
            }
            if (!user.password && user.tokenFb) {
                return done(null, false, { message: 'Veuillez vous connecter avec Facebook.' });
            }
            if (user.password != password) {
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
    }).done(function (err, user) {
        done(err, user)
    });
});

module.exports = {
    express: {
        customMiddleware: function (app) {
            var fbConfig;
            switch(config.environment) {
                case 'dev':
                    fbConfig = {
                        clientID: "668328976558876",
                        clientSecret: "fa9ef89b37652c55d9c156040c336942",
                        callbackURL: "http://dev.carrotmob.fr/auth/facebook/callback"
                    };
                    break;
                case 'test':
                    fbConfig = {
                        clientID: "1388878811336973",
                        clientSecret: "fc570cad359c3d543b5d7b1cbb18cc13",
                        callbackURL: "http://test.carrotmob.fr/auth/facebook/callback"
                    };
                    break;
                case 'prod':
                    fbConfig = {
                        clientID: "289471504541619",
                        clientSecret: "eb34c24658e64ca075438e1295d1acaf",
                        callbackURL: "http://www.carrotmob.fr/auth/facebook/callback"
                    };
                    break;
                default:
                    fbConfig = {
                        clientID: "603130836441870",
                        clientSecret: "c5093cb587385b875d723cab6b05ff6d",
                        callbackURL: "http://localhost:1337/auth/facebook/callback"
                    };
                    break;
            }

            passport.use(new FacebookStrategy(fbConfig, verifyFBHandler));

            passport.use(new LocalStrategy(verifyHandler));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};