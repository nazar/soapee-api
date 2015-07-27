var utils = require( 'shipit-utils' );


module.exports = function ( gruntOrShipit ) {
    var shipit = utils.getShipit(gruntOrShipit);

    require( 'shipit-deploy' )( shipit );
    require( './update' )( shipit );


    utils.registerTask( shipit, 'link:node_modules', function () {
        return shipit.remote(
            'ln -s /var/www/soapee.com/api/shared/node_modules ' + shipit.releasePath + '/node_modules'
        );
    } );


    utils.registerTask( shipit, 'npm:install', function () {
        return shipit.remote(
            'cd ' + shipit.releasePath + ' && npm install --production'
        );
    } );

    utils.registerTask( shipit, 'soapee:configs', function () {

        function makeConfigsDir() {
            return shipit.remote(
                'mkdir ' + shipit.releasePath + '/config'
            );
        }

        function copyProductionConfig() {
            return shipit.remote(
                'cp /var/www/soapee.com/api/shared/config/production.json ' + shipit.releasePath + '/config'
            );
        }

        return makeConfigsDir()
            .then( copyProductionConfig );

    } );

    utils.registerTask( shipit, 'reload:soapee', function () {
        return shipit.remote(
            'touch ' + shipit.releasePath + '/tmp'
        );
    } );

    utils.registerTask( shipit, 'deploy-local', [
        'deploy:init',
        'deploy:update-local',
        'soapee:configs',
        'link:node_modules',
        'npm:install',
        'deploy:publish',
        'deploy:publish',
        'deploy:clean',
        'reload:soapee'
    ] );
};