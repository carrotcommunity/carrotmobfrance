// ProcessImage utilities and helper methods

var fs = require('fs'),
    gm = require('gm').subClass({ imageMagick: true }),
    mkdirp = require('mkdirp'),
    exec = require('child_process').exec;

exports.generateThumb = function (originalPath, cb) {

    var UPLOAD_THUMB_PATH = 'upload/thumb';
    var UPLOAD_DETAIL_PATH = 'upload/detail';

    // Create repositories
    try {
        mkdirp.sync(UPLOAD_THUMB_PATH, 0755);
    } catch (e) {
        console.log(e);
    }

    try {
        mkdirp.sync(UPLOAD_DETAIL_PATH, 0755);
    } catch (e) {
        console.log(e);
    }

    // Settings size and path
    var originalFileName = originalPath.replace(/^.*[\\\/]/, ''),
        thumbSize = ['460', '286'],
        detailSize = ['1024', '580'];


    gm(originalPath).thumb(thumbSize[0], thumbSize[1], UPLOAD_THUMB_PATH + '/' + originalFileName, 100, function (err) {
        if (!err) {
            console.log(' Thumb Resize Ok! ');
            gm(originalPath).thumb(detailSize[0], detailSize[1], UPLOAD_DETAIL_PATH  + '/' +  originalFileName,100, function (err) {
                if (!err) {
                    console.log('Detail resize Ok !');
                    cb(null, {
                        'result': 'success',
                        'originalFileName': originalFileName,
                        'originalPath': '/' + originalPath,
                        'thumbPath': '/' + UPLOAD_THUMB_PATH + '/' + originalFileName,
                        'detailPath': '/' + UPLOAD_DETAIL_PATH  + '/' +  originalFileName
                    });
                }
                else  console.log(err);
            });
        }
        else console.log(err);
    });

}