/**
 * PadController
 */

var PadController = {

    index: function (req, res) {
        res.view();
    },

    view: function (req, res) {
        var id = req.param('campaign_id');
        Campaign.findOne({'id': id}).exec(function (err, campaign) {
            if (err)
                return (res.send(err, 500));
            if (typeof campaign === 'undefined')
                return (res.send(err, 500));
            res.view('pad/view', {pad_id: id, campaign_id: id});
        })
    }

};

module.exports = PadController;
