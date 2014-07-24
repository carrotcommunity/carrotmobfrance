/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {
    // For debug:
    // '/*': function(req, res, next) {console.log(req.method, req.url); next();},

    '/': {
        view: 'home/index'
    },

    '/connect': {
        view: 'user/connect'
    },

    '/signin': {
        controller: 'auth',
        action: 'signin'
    },

    '/fbsignin': {
        controller: 'auth',
        action: 'facebook'
    },

    '/logout': {
        controller: 'auth',
        action: 'logout'
    },

    '/signup': {
        controller: 'signup',
        action: 'index'
    },

    '/register': {
        controller: 'signup',
        action: 'save'
    },

    '/forgot_password': {
        controller: 'forgot',
        action: 'index'
    },

    '/confirm_password': {
        controller: 'forgot',
        action: 'confirm'
    },

    '/campaign/current': {
        controller: 'campaign',
        action: 'current'
    },

    '/campaign/past': {
        controller: 'campaign',
        action: 'past'
    },

    '/campaign/coming': {
        controller: 'campaign',
        action: 'coming'
    },

    '/campaign/details': {
        controller: 'campaign',
        action: 'details'
    },

    'get /upload/*': {
        controller: 'file',
        action: 'get'
    },

    '/manifesto': {
        controller: 'manifesto',
        action: 'index'
    },

    '/association': {
        controller: 'association',
        action: 'index'
    },

    '/pad': {
        controller: 'pad',
        action: 'index'
    },

    '/pad/view': {
        controller: 'pad',
        action: 'view'
    },

    '/calc': {
        controller: 'calc',
        action: 'index'
    },

    '/calc/view': {
        controller: 'calc',
        action: 'view'
    },

};
