/**
 * CampagneController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /campagne/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campagne/index.ejs
    res.view();

  },


  /**
   * /campagne/jeveuxlecarrotmobber
   */ 
  jeveuxlecarrotmobber: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campagne/jeveuxlecarrotmobber.ejs
    res.view();

  },


  /**
   * /campagne/mefairecarrotmobber
   */ 
  mefairecarrotmobber: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campagne/mefairecarrotmobber.ejs
    res.view();

  },

};
