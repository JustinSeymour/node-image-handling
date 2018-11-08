var fs = require('fs');
var path = require('path');

var lib = {};

lib.baseDir = path.join(__dirname,'/.data/');

lib.create = function(dir, file, data, type, callback) {
    fs.open(lib.baseDir+dir+'/'+file+type,'wx', function(error, fileDescriptor){
        console.log(fileDescriptor, error)
        if(!error && fileDescriptor) {
            fs.writeFile(fileDescriptor,data, function(error) {
                if(!error) {
                    fs.close(fileDescriptor, function(error) {
                        if(!error){
                            callback(false);
                        } else {
                            callback('Error closing file');
                        };
                    });
                } else {
                    callback('Error writing to new file');
                };
            });
        } else {
            console.log('error from data create: '+error);
            callback('Could not create new file, if may already exists');
        };
    });
};


module.exports = lib;