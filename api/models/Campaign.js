/**
 * Campaign
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    beforeValidation: function (values, next) {
        // DD/MM/YYYY HH:MM:SS FORMAT DATE

        var table = values.startDateStr.split(' ');
        var date = table[0];
        var hours = table[1];

        var tableDate = date.split('/');
        var tableHours = hours.split(':');
        values.startDate = tableDate[2] + "-" + tableDate[1] + "-" + tableDate[0];
        values.epoch = new Date(tableDate[2], tableDate[1], tableDate[0], tableHours[0], tableHours[1], tableHours[2], 0).getTime();

        next();
    },

    attributes: {

        title: {
            type: 'string',
            minLength: 1,
            required: true
        },
        desc: {
            type: 'string',
            minLength: 1,
            required: true
        },
        engagement: {
            type: 'string',
            minLength: 1,
            required: true
        },
        address: {
            type: 'string',
            required: true
        },
        city: {
            type: 'string',
            required: true
        },
        epoch: 'int',
        startDateStr: {
            type: 'string',
            required: true
        },
        startDate: {
            type: 'date',
            after: function () {
                var date = new Date();

                return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            },
            required: true
        },
        endDate: {
            type: 'date',
            after: function () {
                return new Date();
            },
            required: false
        },
        image: 'string',
        carrotmobberId: {
            type: 'string',
            required: false
        },
        validated: {
            type: 'boolean',
            defaultsTo: false
        }

    }
};
