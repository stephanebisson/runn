desc('This is the default task.');
task('default', function (params) {
  console.log('This is the default task.');
});

desc('run e2e tests');
task('e2e', function (params) {
    jake.exec('./scripts/e2e-test.sh', {printStdout: true});
});

desc('deploy to couch');
task('deploy', function (password) {
  jake.exec('node ./scripts/deploy.js ' + password, {printStdout: true});
});