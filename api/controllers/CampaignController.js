/**
 * CampaignController
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
   * /campaign/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/index.ejs
    res.view();

  },


  /**
   * /campaign/create
   */ 
  create: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/create.ejs
    res.view();

  },


  /**
   * /campaign/request
   */ 
  request: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/request.ejs
    res.view();

  },


  /**
   * /campaign/view
   */ 
  view: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/view.ejs
    res.view();

  },


  /**
   * /campaign/vote
   */ 
  vote: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/vote.ejs
    res.view();

  },


  /**
   * /campaign/edit
   */ 
  edit: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/edit.ejs
    res.view();

  },


  /**
   * /campaign/destroy
   */ 
  destroy: function (req,res) {

    // This will render the view: 
    // /Users/cyrildotcc/Sites/carrotmobfrance/views/campaign/destroy.ejs
    res.view();

  }

};
