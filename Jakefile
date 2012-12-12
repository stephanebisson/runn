desc('This is the default task.');
task('default', function(params) {
    console.log('This is the default task.');
});

desc('run e2e tests');
task('e2e', function(params) {
    jake.exec('testacular start ./config/testacular-e2e.conf.js', {
        printStdout: true
    });
});

desc('run e2e tests continuously');
task('e2e-watch', function(params) {
    jake.exec('testacular start ./config/testacular-e2e-watch.conf.js', {
        printStdout: true
    });
});

desc('run unit tests');
task('ut', function(params) {
    jake.exec('testacular start ./config/testacular.conf.js', {
        printStdout: true
    });
});

desc('auto-run unit tests');
task('ut-watch', function(params) {
    jake.exec('testacular start ./config/testacular-watch.js', {
        printStdout: true
    });
});

desc('deploy to local couch');
task('deploy-local', function(password) {
    var deploy = require('./scripts/deploy.js').deploy;
    deploy('127.0.0.1:5984', 'admin', password);
});

desc('deploy to iris couch');
task('deploy-iris', function(password) {
    var deploy = require('./scripts/deploy.js').deploy;
    deploy('sbisson.iriscouch.com', 'admin', password);
});
