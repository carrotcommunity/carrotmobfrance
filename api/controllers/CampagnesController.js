/**
 * CampagnesController
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
   * /campagnes/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campagnes/index.ejs
    res.view();

  },
};
