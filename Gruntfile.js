module.exports = function (grunt) {

    grunt.registerTask('install', 'install the backend and frontend dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();

        var cmd = require('bower/lib/util/cmd');
        cmd('install').then(function (stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb();

        });


    });


    var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
    gtx.alias('build:angular', [
        'recess:less',
        'clean:angular',

        'ngtemplates:app',
        'concat:angular',
        'ngAnnotate:angular',
        'copy:libs',
        'copy:angular',
        'clean:tmp'
    ]);

    gtx.alias('release', ['bower-install-simple', 'bump-commit']);
    gtx.alias('release-patch', ['bump-only:patch', 'release']);
    gtx.alias('release-minor', ['bump-only:minor', 'release']);
    gtx.alias('release-major', ['bump-only:major', 'release']);
    gtx.alias('prerelease', ['bump-only:prerelease', 'release']);
    gtx.alias('dokku:production', ['install', 'build:angular']);

    gtx.finalise();
}
