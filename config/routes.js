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


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': {
      view: 'home/index'
  },


  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/connect': {
      view: 'home/connect'
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


  '/campaign/details': {
      controller: 'campaign',
      action: 'details'
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

  'get /upload/images/*': {
      controller: 'file',
      action: 'get'
  }


  // Custom routes here...


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};
