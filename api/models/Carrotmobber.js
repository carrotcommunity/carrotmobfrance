/**
 * Carrotmobber
 */

module.exports = {
    attributes: {
        firstname: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true
        },
        password: {
            type: 'string',
            minLength: 6
        },
        gender: {
            type: 'integer',
            defaultsTo: -1
        },
        uid: 'string',
        tokenFb: 'string',
        picture: 'string',
        city: 'string',
        campaigns: {
            collection: 'campaign',
            via: 'carrotmobbers',
            dominant: true
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        registered: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};
