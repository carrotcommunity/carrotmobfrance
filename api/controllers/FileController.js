/**
 * FileController
 */

var FileController = {

    /**
     * Action blueprints:
     *    `/file/get`
     */
    get: function (req, res) {
        res.sendfile(req.path.substr(1));
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to FileController)
     */
    _config: {
            rest: false,
            shortcuts: false
    }

};

module.exports = FileController;
