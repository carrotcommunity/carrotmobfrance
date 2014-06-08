// ProcessImage utilities and helper methods
//TO BE CONTINUED

exports.generateThumb = function(id,path, cb) {

    cb(null, {
        'result': 'success',
        'id': id,
        'path': '/' + path
    });
}