module.exports = {
    libs:{
        files:[
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-messages/angular-messages.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'angular-touch/angular-touch.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js',
                    'angular-bootstrap-nav-tree/dist/**',
                    'angular-file-upload/angular-file-upload.js',
                    'angular-loading-bar/build/**',
                    'angular-material/angular-material.js',
                    'angular-material/angular-material.css',
                    'angular-smart-table/dist/**',
                    'angular-ui-grid/ui-grid.*',
                    'angular-ui-calendar/src/calendar.js',
                    'angular-ui-map/ui-map.js',
                    'angular-ui-router/release/**',
                    'angular-ui-select/dist/**',
                    'angular-ui-utils/ui-utils.js',
                    'angular-xeditable/dist/**',
                    'angularjs-toaster/toaster.js',
                    'angularjs-toaster/toaster.css',
                    'angular-skycons/angular-skycons.min.js',
                    'jquery.easy-pie-chart/dist/angular.easypiechart.js',
                    'ngImgCrop/compile/minified/**',
                    'ngstorage/ngStorage.js',
                    'textAngular/dist/**',
                    'venturocket-angular-slider/build/**',
                    'ui-leaflet/dist/ui-leaflet.js',
                    'angular-simple-logger/dist/angular-simple-logger.js',

                    'query-string/query-string.js',
                    'angular-oauth2/dist/angular-oauth2.js'
                ],
                dest: 'classification/static/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'datatables/media/js/jquery.dataTables.min.js',
                    'plugins/integration/bootstrap/3/**',
                    'plugins/integration/bootstrap/images/**',
                    'footable/dist/footable.all.min.js',
                    'footable/css/footable.core.css',
                    'footable/css/fonts/**',
                    'bower-jvectormap/*.js',
                    'flot/jquery.flot.js',
                    'flot/jquery.flot.resize.js',
                    'flot/jquery.flot.pie.js',
                    'flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'flot-spline/js/jquery.flot.spline.min.js',
                    'flot.orderbars/js/jquery.flot.orderBars.js',
                    'moment/moment.js',
                    'screenfull/dist/screenfull.min.js',
                    'slimscroll/jquery.slimscroll.min.js',
                    'html5sortable/jquery.sortable.js',
                    'nestable/jquery.nestable.js',
                    'bootstrap-filestyle/src/bootstrap-filestyle.js',
                    'bootstrap-slider/bootstrap-slider.js',
                    'bootstrap-slider/bootstrap-slider.css',
                    'chosen/chosen.jquery.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
                    'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'bootstrap-wysiwyg/external/jquery.hotkeys.js',
                    'fullcalendar/dist/fullcalendar.min.js',
                    'bootstrap-daterangepicker/daterangepicker.js',
                    'bootstrap-daterangepicker/daterangepicker-bs3.css',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'jquery_appear/jquery.appear.js'
                ],
                dest: 'classification/static/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  '**/*.*',
                dest: 'classification/static/libs/jquery',
                cwd:  'angular/src/libs/jquery',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**',
                    'simple-line-icons/css/**',
                    'simple-line-icons/fonts/**'
                ],
                dest: 'classification/static/libs/assets',
                cwd:  'bower_components',
                expand: true
            },
            {src: '**', cwd: 'bower_components/bootstrap/dist/fonts', dest: 'classification/static/fonts', expand: true},
            {src: '**', cwd: 'libs', dest: 'classification/static/libs', expand: true}
        ]
    },
    angular: {
        files: [
            {
                src:  '**/*.*',
                dest: 'classification/static/libs/angular',
                cwd:  'angular/src/libs/angular',
                expand: true
            },
            {expand: true, src: ['css/**/*.css', 'fonts/**', 'libs/**', 'img/**', 'js/modules.js'], cwd: 'angular/src/',   dest: "classification/static/"}
        ]
    }

};
