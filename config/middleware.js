var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    bcrypt = require('bcrypt-nodejs');

var verifyHandler = function (accessToken, refreshToken, profile, done) {
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
                        tokenFb: accessToken,
                        picture: 'http://graph.facebook.com/' + profile.id + '/picture?type=square',
                        city: profile._json.location && profile._json.location.name ? profile._json.location.name.split(",")[0] : '',
                        admin: false,
                        registered: false
                    }).done(function (err, user) {
                        console.log(user);
                        return done(err, user);
                    });
                }
            });
        });
    };

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Carrotmobber.findOne({
        id: id
    }).done(function (err, user) {
        done(err, user)
    });
});

module.exports = {
    express: {
        customMiddleware: function (app) {
            passport.use(new FacebookStrategy({
                clientID: "289471504541619",
                clientSecret: "eb34c24658e64ca075438e1295d1acaf",
                callbackURL: "http://localhost:1337/auth/facebook/callback",
            }, verifyHandler));
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};