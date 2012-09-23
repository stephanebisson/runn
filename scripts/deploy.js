var util = require('util'),
    fs   = require('fs'),
    dive = require('dive');

var username = 'admin'; //process.argv[2];
var password = process.argv[2];
//var host = 'sbisson.iriscouch.com';
var host = '127.0.0.1:5984';
var docUrl = '/apps/runn';
var url = username + ':' + password + '@' + host + docUrl;

var generateAppDocument = function(callback){
    var contentTypes = {
        'ico': 'image/ico', 
        'html': 'text/html',
        'css': 'text/css', 
        'png': 'image/png',
        'js': 'text/javascript'
    };
    var here = process.cwd() + '/app/';
    var doc = {
        "_id": "runn", 
        "_attachments": {}
    };
    dive('./app', function(err, file){
        var name = file.replace(here, ''), 
            ext = file.substr(file.indexOf('.') + 1),
            type = contentTypes[ext.toLowerCase()],
            data = fs.readFileSync(file);
        doc['_attachments'][name] = {
            "content_type": type, 
            "data": data.toString('base64')
        };
    }, function(){
        callback(doc);
    });
};

var getLatestRev = function(url, callback){
    util.exec('curl ' + url, function(ignore, data){
        data = JSON.parse(data || '');
        var rev = data['_rev'];
        callback(rev);
    });    
};

var updateDocument = function(url, rev, documentFile, callback){
    rev = rev ? '?rev=' + rev : '';
    util.exec('curl -X PUT ' + url + rev + ' -d @' + documentFile, function(err, resp){
        callback(err, resp);
    });
};

generateAppDocument(function(doc){
    var docFile  = './app_document.js';
    fs.writeFileSync(docFile, JSON.stringify(doc));
    getLatestRev(url, function(rev){
        updateDocument(url, rev, docFile, function(err, resp){
            console.log('done:', err || resp);
        });
    });  
});


