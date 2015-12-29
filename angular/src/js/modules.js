'use strict';
/* global window */

angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.jq',
    'ngMaterial',
    'ui.calendar',
    'ui.grid',
    'nemLogging',
    'ui-leaflet',
    'angular-oauth2',
    'ui.grid.pagination'
]);

// config

var app =
        angular.module('app')
            .config(
            [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                    // lazy controller, directive and service
                    app.controller = $controllerProvider.register;
                    app.directive = $compileProvider.directive;
                    app.filter = $filterProvider.register;
                    app.factory = $provide.factory;
                    app.service = $provide.service;
                    app.constant = $provide.constant;
                    app.value = $provide.value;
                }
            ])
            .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
                return {
                    response: function (response) {
                        if (response.status === 401) {
                        }
                        return response || $q.when(response);
                    },
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $location.path('/login').search('returnTo', $location.path());
                        }
                        if (rejection.status === 403) {
                            $location.path('/login').search('returnTo', $location.path());
                        }
                        return $q.reject(rejection);
                    }
                }
            }])

            .config(function (OAuthProvider, OAuthTokenProvider, $httpProvider) {
                OAuthProvider.configure({
                    baseUrl: (location.origin || location.protocol + '//' + location.host),
                    clientId: window.clientId,
                    clientSecret: window.clientSecret,
                    grantPath: '/o/token/',
                    revokePath: '/o/revoke/'
                });


                OAuthTokenProvider.configure({
                    name: 'token',
                    options: {
                        secure: location.protocol == 'https'
                    }
                });

                $httpProvider.interceptors.push('authHttpResponseInterceptor');

            })

            .run(function ($rootScope, $state, OAuth) {
                $rootScope.$on('oauth:error', function (event, rejection) {
                    if ('invalid_grant' === rejection.data.error) {
                        return;
                    }

                    if ('invalid_token' === rejection.data.error) {
                        return OAuth.getRefreshToken();
                    }

                    return $state.go('login');
                });
            })

    ;



/**
 * Created by reyrodrigues on 12/28/15.
 */


var countryList = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"};


'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/app/map');

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: "tpl/blocks/material.layout.html"
                    })


            }
        ]
    );

angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
  }]);
angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {        
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
            el.addClass('hide').removeClass('active');
          })
        });
      }
     };
  }]);
angular.module('app')
  .directive('uiFocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
           scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
 angular.module('app')
  .directive('uiFullscreen', function($document, $window) {
    return {
      restrict: 'AC',
      template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
      link: function(scope, el, attr) {
        el.addClass('hide');
          // disable on ie11
          if (screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
            el.removeClass('hide');
          }
          el.on('click', function(){
            var target;
            attr.target && ( target = $(attr.target)[0] );
            screenfull.toggle(target);
          });
          $document.on(screenfull.raw.fullscreenchange, function () {
            if(screenfull.isFullscreen){
              el.addClass('active');
            }else{
              el.removeClass('active');
            }
          });
      }
    };
  });

'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq').
  value('uiJqConfig', {}).
  directive('uiJq', ['uiJqConfig', '$timeout', function uiJqInjectingFunction(uiJqConfig, $timeout) {

  return {
    restrict: 'A',
    compile: function uiJqCompilingFunction(tElm, tAttrs) {

      if (!angular.isFunction(tElm[tAttrs.uiJq])) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

      return function uiJqLinkingFunction(scope, elm, attrs) {

        function getOptions(){
          var linkOptions = [];

          // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options, linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          return linkOptions;
        }

        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.bind('change', function() {
            elm.trigger('input');
          });
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          $timeout(function() {
            elm[attrs.uiJq].apply(elm, getOptions());
          }, 0, false);
        }

        function refresh(){
          // If ui-refresh is used, re-fire the the method upon every change
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function() {
              callPlugin();
            });
          }
        }

          callPlugin();
          refresh();
      };
    }
  };
}]);

angular.module('app')
  .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window),
        _mb = 768,
        wrap = $('.app-aside'),
        next,
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.off-screen').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }

          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);

angular.module('app')
  .directive('uiScrollTo', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.uiScrollTo);
          $anchorScroll();
        });
      }
    };
  }]);

angular.module('app')
  .directive('uiShift', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        // get the $prev or $parent of this el
        var _el = $(el),
            _window = $(window),
            prev = _el.prev(),
            parent,
            width = _window.width()
            ;

        !prev.length && (parent = _el.parent());
        
        function sm(){
          $timeout(function () {
            var method = attr.uiShift;
            var target = attr.target;
            _el.hasClass('in') || _el[method](target).addClass('in');
          });
        }
        
        function md(){
          parent && parent['prepend'](el);
          !parent && _el['insertAfter'](prev);
          _el.removeClass('in');
        }

        (width < 768 && sm()) || md();

        _window.resize(function() {
          if(width !== _window.width()){
            $timeout(function(){
              (_window.width() < 768 && sm()) || md();
              width = _window.width();
            });
          }
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          e.preventDefault();
          var classes = attr.uiToggleClass.split(','),
              targets = (attr.target && attr.target.split(',')) || Array(el),
              key = 0;
          angular.forEach(classes, function( _class ) {
            var target = targets[(targets.length && key)];            
            ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
            $( target ).toggleClass(_class);
            key ++;
          });
          $(el).toggleClass('active');

          function magic(_class, target){
            var patt = new RegExp( '\\s' + 
                _class.
                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
                  split( ' ' ).
                  join( '\\s|\\s' ) + 
                '\\s', 'g' );
            var cn = ' ' + $(target)[0].className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            $(target)[0].className = $.trim( cn );
          }
        });
      }
    };
  }]);
'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl',
    function ($scope, $rootScope, $localStorage, $window, $mdSidenav, $mdBottomSheet, $q) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        $rootScope.config = "HELLO!";
        // config
        $rootScope.app = {
            name: 'Classification',
            version: '0.0.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            }
        };

        $scope.toggleItemsList = toggleItemsList;


        if ($localStorage.currentUser)
            $rootScope.currentUser = $localStorage.currentUser;

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function toggleItemsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

    }
);

/**
 * Created by reyrodrigues on 12/25/15.
 */
/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
    function ($stateProvider) {
        $stateProvider
            .state('app.worksheets', {
                url: '/worksheets',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.worksheets.list', {
                url: '/list',
                templateUrl: 'js/modules/classification/tpl/worksheets.list.html'
            })
            .state('app.worksheets.create', {
                url: '/create',
                templateUrl: 'js/modules/classification/tpl/worksheets.edit.html',
                controller: 'CreateWorksheetController'
            })
            .state('app.worksheets.edit', {
                url: '/edit/:id',
                templateUrl: 'js/modules/classification/tpl/worksheets.edit.html',
                controller: 'EditWorksheetController'
            })


            .state('app.scorecards', {
                url: '/scorecards',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.scorecards.list', {
                url: '/list',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
            .state('app.scorecards.create', {
                url: '/create',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
            .state('app.scorecards.edit', {
                url: '/edit/:id',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
        ;
    });


/**
 * Created by reyrodrigues on 12/27/15.
 */

angular
    .module('app')
    .controller('ListWorksheetController', function ($scope, Worksheet, $mdDialog) {
        $scope.gridOptions = {
            paginationPageSizes: [5, 25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            customOptions: {limit: 25, offset: 0},

            columnDefs: [
                { 'name': 'id' },
                { 'name': 'title'},
                { 'name': 'emergency_country'},
                { 'name': 'origin_country'},
                { 'name': 'start', type:'date'},
                {
                    'name': 'actions',
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                        '<a class="btn btn-primary btn-xs" ui-sref="^.edit({id:row.entity.id})">Edit</a>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" ng-click="grid.appScope.deleteWorksheet($event, row.entity.id)">Delete</button>' +
                        '</div>',
                    enableSorting: false,
                    enableHiding: false
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    var sort = sortColumns.map(function (s) {
                        return (s.sort.direction == "desc" ? "-" : "") + s.name;
                    }).join(", ");

                    $scope.gridOptions.customOptions.sort = sort;
                    getPage();

                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    var limit = pageSize * (newPage);
                    var offset = pageSize * (newPage - 1);
                    $scope.gridOptions.customOptions.limit = limit;
                    $scope.gridOptions.customOptions.offset = offset;

                    getPage();

                });
            }

        };

        $scope.deleteWorksheet = function (ev, id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .textContent('Are you sure you would like to delete this record? This operation can\'t be reversed')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('no');
            $mdDialog.show(confirm).then(function () {
                Worksheet.delete({id: id}, getPage);
            }, function () {
            });
        };

        getPage();
        function getPage() {

            var limit = $scope.gridOptions.customOptions.limit;
            var offset = $scope.gridOptions.customOptions.offset;
            var sort = $scope.gridOptions.customOptions.sort;
            Worksheet.query({limit: limit, offset: offset, ordering: sort })
                .$promise
                .then(function (worksheets) {
                    $scope.gridOptions.totalItems = worksheets.count;

                    $scope.gridOptions.data = worksheets.results;
                    console.log(worksheets.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    })
    .controller('EditWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window) {
        $scope.worksheet = Worksheet.get($state.params);
        $scope.metadata = Worksheet.metadata();

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });


        $scope.save = function () {
            $scope.worksheet.$save().then(function () {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Record Saved!')
                        .position('Top right')
                        .hideDelay(3000)
                );
            }).fail(function () {
                console.log('fail', arguments);
            });
        };
    })
    .controller('CreateWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window) {
        $scope.worksheet = new Worksheet();
        $scope.metadata = Worksheet.metadata();

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });


        $scope.save = function () {
            $scope.worksheet.$create().then(function () {
                $state.go('^.list');
            }).fail(function () {
                console.log('fail', arguments);
            });
        };
    })

;

/**
 * Created by reyrodrigues on 12/25/15.
 */
var defaultOptions = {
    metadata: {method: 'OPTIONS', transformResponse: ReadOption},
    'save': {method: 'PUT', transformRequest: MapRequest, transformResponse: MapGet},
    'create': {method: 'POST', transformRequest: MapRequest, transformResponse: MapGet},
    'get': {method: 'GET', transformResponse: MapGet},
    'query': {method: 'GET', isArray: false}

};

angular
    .module('app')

    .factory('Worksheet', function ($resource) {
        return $resource('/api/worksheets/:id/', { id: '@id' }, defaultOptions, {
            stripTrailingSlashes: false
        });
    })
    .factory('Scorecard', function ($resource) {
        return $resource('/api/scorecards/:id/', { id: '@id' }, defaultOptions, {
            stripTrailingSlashes: false
        });
    })
;

function ReadOption(data, headers) {
    var json = angular.fromJson(data);
    return json.actions.POST;
}

function MapGet(data, headers) {
    var dateRegex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
    var json = angular.fromJson(data);

    for (var key in json) {
        if (dateRegex.test(json[key])) {
            json[key] = moment(json[key]).toDate();
        }

    }
    return json;
}
function MapRequest(data, headers) {
    var json = angular.toJson(data);
    console.log(json);
    return json;
}
angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'js/modules/dashboard/tpl/dashboard.html'
                })

        });

'use strict';

/* Controllers */

app
  // Flot Chart controller
  .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.round( Math.sin(i)*100)/100] );
    }

    $scope.d3 = [
      { label: "iPhone5S", data: 40 },
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(Math.round(y*100)/100);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();
  }]);

angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.grid', {
                    url: '/grid',
                    template: '<div ui-view></div>'
                })
                .state('app.grid.gridDemo', {
                    url: '/grid-demo',
                    templateUrl: 'js/modules/grid/tpl/grid-demo.html'
                })
                .state('app.grid.foodtableDemo', {
                    url: '/footable-demo',
                    templateUrl: 'js/modules/grid/tpl/footable-demo.html'
                })
                ;
        });

app.controller('GridDemoController',
function ($scope, uiGridConstants) {


    $scope.gridOptionsSimple = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 10,
        rowHeight: 36,
        data: [{
            "name": "Ethel Price",
            "gender": "female",
            "company": "Enersol"
        }, {
            "name": "Claudine Neal",
            "gender": "female",
            "company": "Sealoud"
        }, {
            "name": "Beryl Rice",
            "gender": "female",
            "company": "Velity"
        }, {
            "name": "Wilder Gonzales",
            "gender": "male",
            "company": "Geekko"
        }, {
            "name": "Georgina Schultz",
            "gender": "female",
            "company": "Suretech"
        }, {
            "name": "Carroll Buchanan",
            "gender": "male",
            "company": "Ecosys"
        }, {
            "name": "Valarie Atkinson",
            "gender": "female",
            "company": "Hopeli"
        }, {
            "name": "Schroeder Mathews",
            "gender": "male",
            "company": "Polarium"
        }, {
            "name": "Lynda Mendoza",
            "gender": "female",
            "company": "Dogspa"
        }, {
            "name": "Sarah Massey",
            "gender": "female",
            "company": "Bisba"
        }, {
            "name": "Robles Boyle",
            "gender": "male",
            "company": "Comtract"
        }, {
            "name": "Evans Hickman",
            "gender": "male",
            "company": "Parleynet"
        }, {
            "name": "Dawson Barber",
            "gender": "male",
            "company": "Dymi"
        }, {
            "name": "Bruce Strong",
            "gender": "male",
            "company": "Xyqag"
        }, {
            "name": "Nellie Whitfield",
            "gender": "female",
            "company": "Exospace"
        }, {
            "name": "Jackson Macias",
            "gender": "male",
            "company": "Aquamate"
        }, {
            "name": "Pena Pena",
            "gender": "male",
            "company": "Quarx"
        }, {
            "name": "Lelia Gates",
            "gender": "female",
            "company": "Proxsoft"
        }, {
            "name": "Letitia Vasquez",
            "gender": "female",
            "company": "Slumberia"
        }, {
            "name": "Trevino Moreno",
            "gender": "male",
            "company": "Conjurica"
        }]
    };
});

angular.module('app')

    .config(
        function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'js/modules/login/tpl/login.html'
                })
                ;
        });

;

/**
 * Created by reyrodrigues on 12/26/15.
 */
app.controller('LoginController', function LoginController($rootScope, $scope, OAuth, $state, $cookies, $localStorage, User) {
    $cookies.remove('token');

    $scope.login = function (username, password) {
        OAuth.getAccessToken({username: username, password: password}).then(function (token) {
            var me = User.get({id: 'me'});
            me.$promise.then(function () {
                $localStorage.currentUser = me.toJSON();
                $rootScope.currentUser = $localStorage.currentUser;

                $state.go('app.dashboard');
            });
        });
    };

});

/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')

    .factory('User', function ($resource) {
        return $resource('/api/users/:id', { id: '@id' }, { }, {
            stripTrailingSlashes: false
        });
    })
;

/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.map', {
                    url: '/map',
                    templateUrl: 'js/modules/map/tpl/map.html'
                })
                ;
        });

/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')
    .controller('MapController', function MapController($scope, $http, leafletData, OAuth, Worksheet) {
        $scope.defaults = {
            tileLayer: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            path: {
            }
        };

        $scope.center = {
            lat: 0.0,
            lng: 0.0,
            zoom: 3
        };


        leafletData.getMap('map').then(function (map) {
            $http.get('/scale/').then(function (r) {
                var world = L.geoJson(r.data, {
                    style: style,
                    onEachFeature: onEachFeature
                });
                world.addTo(map);

                function getColor(d) {
                    return  d == 5 ? '#800026' :
                            d == 4 ? '#800026' :
                            d == 3 ? '#E31A1C' :
                            d == 2 ? '#FD8D3C' :
                            d == 1 ? '#e3e3e3' :
                        '#c3c3c3';
                }

                function style(feature) {
                    var countryData = feature.properties.countryData;
                    var value = 0;

                    if (countryData) {
                        value = countryData.IRCR;
                    }

                    return {
                        fillColor: getColor(value),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: value == 5 ? 1 : .7
                    };
                }

                function highlightFeature(e) {
                    var layer = e.target;

                    layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.5
                    });

                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                }

                function resetHighlight(e) {
                    world.resetStyle(e.target);
                }

                function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight
                    });
                }
            });
        });
    });


angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('tpl/blocks/_material.layout.html',
    "<div ng-init=\"app.settings.container = false;\" class=\"md-navbar navbar blue-grey md-whiteframe-z1\"\r" +
    "\n" +
    "     data-ng-include=\" 'tpl/blocks/material.header.html' \">\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div layout=\"row\">\r" +
    "\n" +
    "    <!-- menu -->\r" +
    "\n" +
    "    <div flex class=\"bg-white md-whiteframe-z0 md-aside md-content hidden-xs fill-screen\"\r" +
    "\n" +
    "         data-ng-include=\" 'tpl/blocks/material.aside.html' \">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- / menu -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- view -->\r" +
    "\n" +
    "    <div flex layout=\"column\">\r" +
    "\n" +
    "        <div ui-butterbar></div>\r" +
    "\n" +
    "        <a href class=\"off-screen-toggle hide\" ui-toggle-class=\"off-screen\" data-target=\".md-aside\"></a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"md-content\" ui-view></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- / view -->\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('tpl/blocks/material.aside.html',
    "<div class=\"clearfix\" id=\"aside-user\">\r" +
    "\n" +
    "  <div class=\"wrapper light-blue-100\">\r" +
    "\n" +
    "    <a href class=\"hidden-folded\" ui-toggle-class=\"show\" target=\"#user\">\r" +
    "\n" +
    "      <span class=\"block m-t-sm auto\">\r" +
    "\n" +
    "        <span class=\"pull-right\">\r" +
    "\n" +
    "          <i class=\"fa fa-fw fa-caret-down text\"></i>\r" +
    "\n" +
    "          <i class=\"fa fa-fw fa-caret-up text-active\"></i>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "        <strong class=\"font-bold text-lt\">{{ currentUser.first_name }} {{ currentUser.last_name }}</strong>\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<!-- / user -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!-- nav -->\r" +
    "\n" +
    "<nav class=\"navi hide\" id=\"user\">\r" +
    "\n" +
    "  <ul class=\"nav b-b m-t-sm\">\r" +
    "\n" +
    "    <li class=\"m-b-sm\">\r" +
    "\n" +
    "      <a ui-sref=\"login\">\r" +
    "\n" +
    "        <i class=\"glyphicon glyphicon-log-out icon\"></i>\r" +
    "\n" +
    "        <span>Logout</span>\r" +
    "\n" +
    "      </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "</nav>\r" +
    "\n" +
    "<nav ui-nav class=\"navi clearfix\" ng-include=\"'tpl/blocks/material.nav.html'\"></nav>\r" +
    "\n" +
    "<!-- nav -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('tpl/blocks/material.header.html',
    "<!-- navbar header -->\n" +
    "<div class=\"navbar-header\">\n" +
    "    <button class=\"pull-right visible-xs\" ui-toggle-class=\"off-screen\" data-target=\".md-aside\" ui-scroll-to=\"app\">\n" +
    "        <i class=\"glyphicon glyphicon-align-justify\"></i>\n" +
    "    </button>\n" +
    "    <!-- brand -->\n" +
    "    <a href=\"#/\" class=\"navbar-brand text-lt\">\n" +
    "        <span class=\"hidden-folded m-l-xs\">{{app.name}}</span>\n" +
    "    </a>\n" +
    "    <!-- / brand -->\n" +
    "</div>\n" +
    "<!-- / navbar header -->\n"
  );


  $templateCache.put('tpl/blocks/material.layout.html',
    "<md-sidenav md-is-locked-open=\"$mdMedia('gt-sm')\" md-component-id=\"left\"\r" +
    "\n" +
    "            class=\"md-whiteframe-z2 md-sidenav-left\">\r" +
    "\n" +
    "    <md-toolbar md-theme=\"custom\" class=\"md-hue-1 md-whiteframe-z2\">\r" +
    "\n" +
    "        <md-button layout=\"row\" layout-align=\"center center\" class=\"md-toolbar-tools md-warn\"\r" +
    "\n" +
    "                   href=\"https://github.com/flatlogic/angular-material-dashboard\">\r" +
    "\n" +
    "            <h1>{{ app.name }}</h1>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "    </md-toolbar>\r" +
    "\n" +
    "    <md-button ng-repeat-start=\"item in vm.menuItems\" layout=\"column\" layout-align=\"center center\"\r" +
    "\n" +
    "               flex class=\"capitalize\" ng-click=\"vm.selectItem(item)\"\r" +
    "\n" +
    "               ui-sref-active=\"md-warn\" ui-sref=\"{{ item.sref }}\">\r" +
    "\n" +
    "        <div hide-sm hide-md class=\"md-tile-content\">\r" +
    "\n" +
    "            <i class=\"material-icons md-36\">{{ item.icon }}</i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"md-tile-content\">\r" +
    "\n" +
    "            {{ item.name }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "    <md-divider ng-repeat-end></md-divider>\r" +
    "\n" +
    "    <md-button hide-gt-md flex ng-click=\"vm.showActions($event)\">\r" +
    "\n" +
    "        <div layout=\"row\" class=\"md-tile-content\">\r" +
    "\n" +
    "            Actions\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "</md-sidenav>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div layout=\"column\" flex>\r" +
    "\n" +
    "    <md-toolbar layout=\"row\" layout-align=\"end center\">\r" +
    "\n" +
    "        <md-button hide-sm class=\"toolbar-button\" aria-label=\"Search\">\r" +
    "\n" +
    "            <i class=\"material-icons\">search</i>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <md-button hide-sm class=\"toolbar-button\" aria-label=\"Notifications\">\r" +
    "\n" +
    "            <i class=\"material-icons\">notifications</i>\r" +
    "\n" +
    "            <span class=\"notifications-label\">7</span>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <md-button hide-sm class=\"toolbar-button\" aria-label=\"Settings\">\r" +
    "\n" +
    "            <i class=\"material-icons\">settings</i>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <md-button hide-gt-sm ng-click=\"toggleItemsList()\" aria-label=\"Menu\">\r" +
    "\n" +
    "            <i class=\"material-icons\">menu</i>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "    </md-toolbar>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <md-content flex class=\"page-content\">\r" +
    "\n" +
    "        <div ui-view></div>\r" +
    "\n" +
    "    </md-content>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('tpl/blocks/material.nav.html',
    "<!-- list -->\r" +
    "\n" +
    "<ul class=\"nav\">\r" +
    "\n" +
    "    <li>\r" +
    "\n" +
    "        <a ui-sref=\"app.map\" md-ink-ripple class=\"auto\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-globe icon\"></i>\r" +
    "\n" +
    "            <span class=\"font-bold\">Map</span>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li>\r" +
    "\n" +
    "        <a ui-sref=\"app.worksheets.list\" md-ink-ripple class=\"auto\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-th-large icon\"></i>\r" +
    "\n" +
    "            <span class=\"font-bold\">Worksheets</span>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "    <li>\r" +
    "\n" +
    "        <a ui-sref=\"app.scorecards.list\" md-ink-ripple class=\"auto\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-th-large icon\"></i>\r" +
    "\n" +
    "            <span class=\"font-bold\">Scorecards</span>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<!-- / list -->\r" +
    "\n"
  );


  $templateCache.put('js/modules/classification/tpl/worksheets.edit.html',
    "<div>\n" +
    "<form name=\"editForm\" ng-submit=\"save\">\n" +
    "<md-toolbar md-scroll-shrink>\n" +
    "    <div class=\"md-toolbar-tools\">Worksheet - {{ worksheet.title }}</div>\n" +
    "</md-toolbar>\n" +
    "<md-card>\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">Emergency Summary</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "            <label>{{ metadata.title.label }}</label>\n" +
    "            <input name=\"title\" ng-required=\"metadata.title.required\" ng-model=\"worksheet.title\"/>\n" +
    "\n" +
    "            <div class=\"hint\">{{ metadata.title.help_text }}</div>\n" +
    "        </md-input-container>\n" +
    "        <div layout>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.emergency_country.label }}</label>\n" +
    "                <md-select ng-model=\"worksheet.emergency_country\"\n" +
    "                           ng-required=\"metadata.emergency_country.required\"\n" +
    "                           placeholder=\"{{ metadata.emergency_country.label }}\"\n" +
    "                           name=\"emergency_country\">\n" +
    "                    <md-option ng-value=\"country.id\"\n" +
    "                               ng-repeat=\"country in countries\">{{ country.name }}</md-option>\n" +
    "                </md-select>\n" +
    "                <div class=\"hint\">{{ metadata.emergency_country.help_text }}</div>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.origin_country.label }}</label>\n" +
    "                <md-select ng-model=\"worksheet.origin_country\"\n" +
    "                           ng-required=\"metadata.origin_country.required\"\n" +
    "                           name=\"origin_country\"\n" +
    "                           placeholder=\"{{ metadata.origin_country.label }}\">\n" +
    "                    <md-option ng-value=\"country.id\"\n" +
    "                               ng-repeat=\"country in countries\">{{ country.name }}</md-option>\n" +
    "                </md-select>\n" +
    "                <div class=\"hint\">{{ metadata.origin_country.help_text }}</div>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <h5>{{ metadata.start.label }}:</h5>\n" +
    "\n" +
    "        <div layout>\n" +
    "            <md-datepicker ng-model=\"worksheet.start\" flex></md-datepicker>\n" +
    "        </div>\n" +
    "        <div layout>\n" +
    "            <md-input-container>\n" +
    "                <md-checkbox ng-model=\"worksheet.natural_disaster\"\n" +
    "                             aria-label=\"{{ metadata.natural_disaster.label }}\"\n" +
    "                             class=\"md-primary\">\n" +
    "                    {{ metadata.natural_disaster.label }}\n" +
    "                </md-checkbox>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "            <label>{{ metadata.description.label }}</label>\n" +
    "            <textarea ng-model=\"worksheet.description\" columns=\"1\" md-maxlength=\"1000\" rows=\"5\"></textarea>\n" +
    "\n" +
    "            <div class=\"hint\">{{ metadata.description.help_text }}</div>\n" +
    "        </md-input-container>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">Emergency Facts</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content>\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex=\"30\">\n" +
    "                <label>{{ metadata.number_deaths.label }}</label>\n" +
    "                <input name=\"number_deaths\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_deaths.required\"\n" +
    "                       ng-model=\"worksheet.number_deaths\"/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex=\"70\">\n" +
    "                <label>{{ metadata.number_deaths_source.label }}</label>\n" +
    "                <input name=\"number_deaths_source\" type=\"text\" ng-required=\"metadata.number_deaths_source.required\"\n" +
    "                       ng-model=\"worksheet.number_deaths_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex=\"30\">\n" +
    "                <label>{{ metadata.number_injuries.label }}</label>\n" +
    "                <input name=\"number_injuries\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_injuries.required\"\n" +
    "                       ng-model=\"worksheet.number_injuries\"/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex=\"70\">\n" +
    "                <label>{{ metadata.number_injuries_source.label }}</label>\n" +
    "                <input name=\"number_injuries_source\" type=\"text\" ng-required=\"metadata.number_injuries_source.required\"\n" +
    "                       ng-model=\"worksheet.number_injuries_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex=\"30\">\n" +
    "                <label>{{ metadata.number_affected.label }}</label>\n" +
    "                <input name=\"number_affected\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_affected.required\"\n" +
    "                       ng-model=\"worksheet.number_affected\"/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex=\"70\">\n" +
    "                <label>{{ metadata.number_affected_source.label }}</label>\n" +
    "                <input name=\"number_affected_source\" type=\"text\" ng-required=\"metadata.number_affected_source.required\"\n" +
    "                       ng-model=\"worksheet.number_affected_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex=\"30\">\n" +
    "                <label>{{ metadata.number_displaced.label }}</label>\n" +
    "                <input name=\"number_displaced\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_displaced.required\"\n" +
    "                       ng-model=\"worksheet.number_displaced\"/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex=\"70\">\n" +
    "                <label>{{ metadata.number_displaced_source.label }}</label>\n" +
    "                <input name=\"number_displaced_source\" type=\"text\"\n" +
    "                       ng-required=\"metadata.number_displaced_source.required\"\n" +
    "                       ng-model=\"worksheet.number_displaced_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">Emergency Details</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content>\n" +
    "        <div layout=\"column\">\n" +
    "            <md-checkbox ng-model=\"worksheet.concurrent_emergencies\"\n" +
    "                         aria-label=\"{{ metadata.concurrent_emergencies.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.concurrent_emergencies.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.possible_concurrent_emergency\"\n" +
    "                         aria-label=\"{{ metadata.possible_concurrent_emergency.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.possible_concurrent_emergency.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.rapid_access_possible\"\n" +
    "                         aria-label=\"{{ metadata.rapid_access_possible.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.rapid_access_possible.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.registration_required\"\n" +
    "                         aria-label=\"{{ metadata.registration_required.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.registration_required.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.registration_possible\"\n" +
    "                         aria-label=\"{{ metadata.registration_possible.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.registration_possible.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.crisis_will_remain_same\"\n" +
    "                         aria-label=\"{{ metadata.crisis_will_remain_same.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.crisis_will_remain_same.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">Other Actors</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content>\n" +
    "        <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "            <md-checkbox ng-model=\"worksheet.msf\" aria-label=\"{{ metadata.msf.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.msf.label }}\n" +
    "            </md-checkbox>\n" +
    "            <md-checkbox ng-model=\"worksheet.sci\" aria-label=\"{{ metadata.sci.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.sci.label }}\n" +
    "            </md-checkbox>\n" +
    "            <md-checkbox ng-model=\"worksheet.world_vision\" aria-label=\"{{ metadata.world_vision.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.world_vision.label }}\n" +
    "            </md-checkbox>\n" +
    "            <md-checkbox ng-model=\"worksheet.crs\" aria-label=\"{{ metadata.crs.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.crs.label }}\n" +
    "            </md-checkbox>\n" +
    "        </div>\n" +
    "        <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"worksheet.red_cross\" aria-label=\"{{ metadata.red_cross.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.red_cross.label }}\n" +
    "            </md-checkbox>\n" +
    "            <md-checkbox ng-model=\"worksheet.mercy_corps\" aria-label=\"{{ metadata.mercy_corps.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.mercy_corps.label }}\n" +
    "            </md-checkbox>\n" +
    "            <md-checkbox ng-model=\"worksheet.imc\" aria-label=\"{{ metadata.imc.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.imc.label }}\n" +
    "            </md-checkbox>\n" +
    "        </div>\n" +
    "\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "    <md-card-content>\n" +
    "        <div layout=\"row\" layout-xs=\"column\" layout-align=\"end center\">\n" +
    "            <md-button class=\"md-raised md-warn\" ui-sref=\"^.list\">Cancel</md-button>\n" +
    "            <md-button class=\"md-raised md-primary\" ng-click=\"save()\">Save</md-button>\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "</form>\n" +
    "</div>"
  );


  $templateCache.put('js/modules/classification/tpl/worksheets.list.html',
    "<div ng-controller=\"ListWorksheetController\">\n" +
    "    <md-toolbar md-scroll-shrink>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>\n" +
    "                <span>Worksheets</span>\n" +
    "            </h2>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-raised\" aria-label=\"Add New\" ui-sref=\"^.create\">\n" +
    "                Add New\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-card class=\"fill-grid-screen\">\n" +
    "        <md-card-content style=\"padding: 0\">\n" +
    "            <div ui-grid=\"gridOptions\" ui-grid-pagination class=\"fill-grid-screen\"></div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('js/modules/dashboard/tpl/dashboard.html',
    "<div class=\"bg-light lt b-b wrapper-md\">\r" +
    "\n" +
    "  <div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-sm-6 col-xs-12\">\r" +
    "\n" +
    "      <h1 class=\"m-n font-thin h3 text-black\">Dashboard</h1>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"hbox hbox-auto-xs hbox-auto-sm\">\r" +
    "\n" +
    "  <!-- main -->\r" +
    "\n" +
    "  <div class=\"col\">\r" +
    "\n" +
    "    <!-- / main header -->\r" +
    "\n" +
    "    <div class=\"wrapper-md\" ng-controller=\"FlotChartDemoCtrl\">\r" +
    "\n" +
    "      <!-- stats -->\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-5\">\r" +
    "\n" +
    "          <div class=\"row row-sm text-center\">\r" +
    "\n" +
    "            <div class=\"col-xs-6\">\r" +
    "\n" +
    "              <div class=\"panel padder-v item card\">\r" +
    "\n" +
    "                <div class=\"h1 text-info font-thin h1\">521</div>\r" +
    "\n" +
    "                <span class=\"text-muted text-xs\">New items</span>\r" +
    "\n" +
    "                <div class=\"top text-right w-full\">\r" +
    "\n" +
    "                  <i class=\"fa fa-caret-down text-warning m-r-sm\"></i>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-xs-6\">\r" +
    "\n" +
    "              <a href class=\"block panel padder-v item card\">\r" +
    "\n" +
    "                <span class=\"text-success font-thin h1 block\">930</span>\r" +
    "\n" +
    "                <span class=\"text-muted text-xs\">Uploads</span>\r" +
    "\n" +
    "                <span class=\"bottom text-right w-full\">\r" +
    "\n" +
    "                  <i class=\"fa fa-cloud-upload text-success m-r-sm\"></i>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "              </a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-xs-6\">\r" +
    "\n" +
    "              <a href class=\"block panel padder-v item card\">\r" +
    "\n" +
    "                <span class=\"text-primary font-thin h1 block\">432</span>\r" +
    "\n" +
    "                <span class=\"text-muted text-xs\">Comments</span>\r" +
    "\n" +
    "                <span class=\"top text-left\">\r" +
    "\n" +
    "                  <i class=\"fa fa-caret-up text-warning m-l-sm\"></i>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "              </a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-xs-6\">\r" +
    "\n" +
    "              <div class=\"panel padder-v item card\">\r" +
    "\n" +
    "                <div class=\"font-thin h1\">129</div>\r" +
    "\n" +
    "                <span class=\"text-muted text-xs\">Feeds</span>\r" +
    "\n" +
    "                <div class=\"bottom text-left\">\r" +
    "\n" +
    "                  <i class=\"fa fa-caret-up text-warning m-l-sm\"></i>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-xs-12 m-b-md\">\r" +
    "\n" +
    "              <div class=\"r blue-600 item hbox no-border md-whiteframe-z0\">\r" +
    "\n" +
    "                <div class=\"col w-xs v-middle hidden-md\">\r" +
    "\n" +
    "                  <div ng-init=\"data1=[60,40]\" ui-jq=\"sparkline\" ui-options=\"{{data1}}, {type:'pie', height:40, sliceColors:['{{app.color.warning}}','#fff']}\" class=\"sparkline inline\"></div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col blue padder-v r-r\">\r" +
    "\n" +
    "                  <div class=\"font-thin h1\"><span>$12,670</span></div>\r" +
    "\n" +
    "                  <span class=\"text-xs\">Revenue, 60% of the goal</span>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-7\">\r" +
    "\n" +
    "          <div class=\"panel wrapper\">\r" +
    "\n" +
    "            <label class=\"i-switch bg-warning pull-right\" ng-init=\"showSpline=true\">\r" +
    "\n" +
    "              <input type=\"checkbox\" ng-model=\"showSpline\">\r" +
    "\n" +
    "              <i></i>\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <h4 class=\"font-thin m-t-none m-b text-muted\">Latest Campaign</h4>\r" +
    "\n" +
    "            <div ui-jq=\"plot\" ui-refresh=\"showSpline\" ui-options=\"\r" +
    "\n" +
    "              [\r" +
    "\n" +
    "                { data: {{d0_1}}, label: 'Unique Visits', points: { show: true } }, \r" +
    "\n" +
    "                { data: {{d0_2}}, label: 'Page Views', bars: { show: true, barWidth: 0.6, fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.4}] } } }\r" +
    "\n" +
    "              ],\r" +
    "\n" +
    "              {\r" +
    "\n" +
    "                colors: [ '{{app.color.success}}','{{app.color.info}}' ],\r" +
    "\n" +
    "                series: { shadowSize: 2 },\r" +
    "\n" +
    "                xaxis:{ font: { color: '#ccc' } },\r" +
    "\n" +
    "                yaxis:{ font: { color: '#ccc' } },\r" +
    "\n" +
    "                grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },\r" +
    "\n" +
    "                tooltip: true,\r" +
    "\n" +
    "                tooltipOpts: { content: '%s of %x.1 is %y.4',  defaultTheme: false, shifts: { x: 0, y: 20 } }\r" +
    "\n" +
    "              }\r" +
    "\n" +
    "            \" style=\"height:252px\" >\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <!-- / stats -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <!-- service -->\r" +
    "\n" +
    "      <div class=\"panel hbox hbox-auto-xs no-border\">\r" +
    "\n" +
    "        <div class=\"col wrapper\">\r" +
    "\n" +
    "          <i class=\"fa fa-circle-o text-info m-r-sm pull-right\"></i>\r" +
    "\n" +
    "          <h4 class=\"font-thin m-t-none m-b-none text-primary-lt\">Managed Services</h4>\r" +
    "\n" +
    "          <span class=\"m-b block text-sm text-muted\">Service report of this year (updated 1 hour ago)</span>\r" +
    "\n" +
    "          <div ui-jq=\"plot\" ui-options=\"\r" +
    "\n" +
    "            [\r" +
    "\n" +
    "              { data: {{d4}}, lines: { show: true, lineWidth: 1, fill:true, fillColor: { colors: [{opacity: 0.2}, {opacity: 0.8}] } } }\r" +
    "\n" +
    "            ], \r" +
    "\n" +
    "            {\r" +
    "\n" +
    "              colors: ['{{app.color.light}}'],\r" +
    "\n" +
    "              series: { shadowSize: 3 },\r" +
    "\n" +
    "              xaxis:{ show:false },\r" +
    "\n" +
    "              yaxis:{ font: { color: '#a1a7ac' } },\r" +
    "\n" +
    "              grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#dce5ec' },\r" +
    "\n" +
    "              tooltip: true,\r" +
    "\n" +
    "              tooltipOpts: { content: '%s of %x.1 is %y.4',  defaultTheme: false, shifts: { x: 10, y: -25 } }\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "          \" style=\"height:240px\" >\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col wrapper-lg w-lg bg-light dk r-r\">\r" +
    "\n" +
    "          <h4 class=\"font-thin m-t-none m-b\">Reports</h4>\r" +
    "\n" +
    "          <div class=\"\">\r" +
    "\n" +
    "            <div class=\"\">\r" +
    "\n" +
    "              <span class=\"pull-right text-primary\">60%</span>\r" +
    "\n" +
    "              <span>Consulting</span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <progressbar value=\"60\" class=\"progress-xs m-t-sm bg-white\" animate=\"true\" type=\"primary\"></progressbar>\r" +
    "\n" +
    "            <div class=\"\">\r" +
    "\n" +
    "              <span class=\"pull-right text-info\">35%</span>\r" +
    "\n" +
    "              <span>Online tutorials</span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <progressbar value=\"35\" class=\"progress-xs m-t-sm bg-white\" animate=\"true\" type=\"info\"></progressbar>\r" +
    "\n" +
    "            <div class=\"\">\r" +
    "\n" +
    "              <span class=\"pull-right text-warning\">25%</span>\r" +
    "\n" +
    "              <span>EDU management</span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <progressbar value=\"25\" class=\"progress-xs m-t-sm bg-white\" animate=\"true\" type=\"warning\"></progressbar>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <p class=\"text-muted\">Dales nisi nec adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <!-- / service -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <!-- tasks -->\r" +
    "\n" +
    "      <div class=\"panel wrapper\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "          <div class=\"col-md-6 b-r b-light no-border-xs\">\r" +
    "\n" +
    "            <a href class=\"text-muted pull-right text-lg\"><i class=\"icon-arrow-right\"></i></a>\r" +
    "\n" +
    "            <h4 class=\"font-thin m-t-none m-b-md text-muted\">My Tasks</h4>\r" +
    "\n" +
    "            <div class=\" m-b\">\r" +
    "\n" +
    "              <div class=\"m-b\">\r" +
    "\n" +
    "                <span class=\"label text-base bg-warning pos-rlt m-r\"><i class=\"arrow right arrow-warning\"></i> 19:30</span>\r" +
    "\n" +
    "                <a href>Feed cat</a>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div class=\"m-b\">\r" +
    "\n" +
    "                <span class=\"label text-base bg-info pos-rlt m-r\"><i class=\"arrow right arrow-info\"></i> 12:30</span>\r" +
    "\n" +
    "                <a href>Fishing Time</a>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div class=\"m-b\">\r" +
    "\n" +
    "                <span class=\"label text-base bg-primary pos-rlt m-r\"><i class=\"arrow right arrow-primary\"></i> 10:30</span>\r" +
    "\n" +
    "                <a href>Kick-off meeting</a>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div class=\"m-b\">\r" +
    "\n" +
    "                <span class=\"label text-base bg-light pos-rlt m-r\"><i class=\"arrow right arrow-light\"></i> 07:30</span>\r" +
    "\n" +
    "                <a href>Morning running</a>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"col-md-6\">            \r" +
    "\n" +
    "            <div class=\"row row-sm\">\r" +
    "\n" +
    "              <div class=\"col-xs-6 text-center\">\r" +
    "\n" +
    "                <div ui-jq=\"easyPieChart\" ui-options=\"{\r" +
    "\n" +
    "                    percent: 75,\r" +
    "\n" +
    "                    lineWidth: 4,\r" +
    "\n" +
    "                    trackColor: '{{app.color.light}}',\r" +
    "\n" +
    "                    barColor: '{{app.color.primary}}',\r" +
    "\n" +
    "                    scaleColor: false,\r" +
    "\n" +
    "                    size: 115,\r" +
    "\n" +
    "                    rotate: 90,\r" +
    "\n" +
    "                    lineCap: 'butt'\r" +
    "\n" +
    "                  }\" class=\"inline m-t\">\r" +
    "\n" +
    "                  <div>\r" +
    "\n" +
    "                    <span class=\"text-primary h4\">75%</span>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"text-muted font-bold text-xs m-t m-b\">Work Done</div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "              <div class=\"col-xs-6 text-center\">\r" +
    "\n" +
    "                <div ui-jq=\"easyPieChart\" ui-options=\"{\r" +
    "\n" +
    "                    percent: 50,\r" +
    "\n" +
    "                    lineWidth: 4,\r" +
    "\n" +
    "                    trackColor: '{{app.color.light}}',\r" +
    "\n" +
    "                    barColor: '{{app.color.info}}',\r" +
    "\n" +
    "                    scaleColor: false,\r" +
    "\n" +
    "                    size: 115,\r" +
    "\n" +
    "                    rotate: 180,\r" +
    "\n" +
    "                    lineCap: 'butt'\r" +
    "\n" +
    "                  }\" class=\"inline m-t\">\r" +
    "\n" +
    "                  <div>\r" +
    "\n" +
    "                    <span class=\"text-info h4\">50%</span>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"text-muted font-bold text-xs m-t m-b\">Started</div>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div>            \r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <!-- / tasks -->\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/modules/grid/tpl/footable-demo.html',
    "<div class=\"bg-light lter b-b wrapper-md\">\r" +
    "\n" +
    "  <h1 class=\"m-n font-thin h3\">Footable</h1>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"wrapper-md\">\r" +
    "\n" +
    "  <div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "      Footable - make HTML tables on smaller devices look awesome\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "      <table class=\"table\" ui-jq=\"footable\" ui-options='{\r" +
    "\n" +
    "        \"paging\": {\r" +
    "\n" +
    "          \"enabled\": true\r" +
    "\n" +
    "        },\r" +
    "\n" +
    "        \"filtering\": {\r" +
    "\n" +
    "          \"enabled\": true\r" +
    "\n" +
    "        },\r" +
    "\n" +
    "        \"sorting\": {\r" +
    "\n" +
    "          \"enabled\": true\r" +
    "\n" +
    "        }}'>\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <th data-breakpoints=\"xs\">ID</th>\r" +
    "\n" +
    "            <th>First Name</th>\r" +
    "\n" +
    "            <th>Last Name</th>\r" +
    "\n" +
    "            <th data-breakpoints=\"xs\">Job Title</th>\r" +
    "\n" +
    "            <th data-breakpoints=\"xs sm\">Started On</th>\r" +
    "\n" +
    "            <th data-breakpoints=\"xs sm md\" data-title=\"DOB\">Date of Birth</th>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "          <tr data-expanded=\"true\">\r" +
    "\n" +
    "            <td>1</td>\r" +
    "\n" +
    "            <td>Dennise</td>\r" +
    "\n" +
    "            <td>Fuhrman</td>\r" +
    "\n" +
    "            <td>High School History Teacher</td>\r" +
    "\n" +
    "            <td>November 8th 2011</td>\r" +
    "\n" +
    "            <td>July 25th 1960</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>2</td>\r" +
    "\n" +
    "            <td>Elodia</td>\r" +
    "\n" +
    "            <td>Weisz</td>\r" +
    "\n" +
    "            <td>Wallpaperer Helper</td>\r" +
    "\n" +
    "            <td>October 15th 2010</td>\r" +
    "\n" +
    "            <td>March 30th 1982</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>3</td>\r" +
    "\n" +
    "            <td>Raeann</td>\r" +
    "\n" +
    "            <td>Haner</td>\r" +
    "\n" +
    "            <td>Internal Medicine Nurse Practitioner</td>\r" +
    "\n" +
    "            <td>November 28th 2013</td>\r" +
    "\n" +
    "            <td>February 26th 1966</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>4</td>\r" +
    "\n" +
    "            <td>Junie</td>\r" +
    "\n" +
    "            <td>Landa</td>\r" +
    "\n" +
    "            <td>Offbearer</td>\r" +
    "\n" +
    "            <td>October 31st 2010</td>\r" +
    "\n" +
    "            <td>March 29th 1966</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>5</td>\r" +
    "\n" +
    "            <td>Solomon</td>\r" +
    "\n" +
    "            <td>Bittinger</td>\r" +
    "\n" +
    "            <td>Roller Skater</td>\r" +
    "\n" +
    "            <td>December 29th 2011</td>\r" +
    "\n" +
    "            <td>September 22nd 1964</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>6</td>\r" +
    "\n" +
    "            <td>Bar</td>\r" +
    "\n" +
    "            <td>Lewis</td>\r" +
    "\n" +
    "            <td>Clown</td>\r" +
    "\n" +
    "            <td>November 12th 2012</td>\r" +
    "\n" +
    "            <td>August 4th 1991</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>7</td>\r" +
    "\n" +
    "            <td>Usha</td>\r" +
    "\n" +
    "            <td>Leak</td>\r" +
    "\n" +
    "            <td>Ships Electronic Warfare Officer</td>\r" +
    "\n" +
    "            <td>August 14th 2012</td>\r" +
    "\n" +
    "            <td>November 20th 1979</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "          <tr>\r" +
    "\n" +
    "            <td>8</td>\r" +
    "\n" +
    "            <td>Lorriane</td>\r" +
    "\n" +
    "            <td>Cooke</td>\r" +
    "\n" +
    "            <td>Technical Services Librarian</td>\r" +
    "\n" +
    "            <td>September 21st 2010</td>\r" +
    "\n" +
    "            <td>April 7th 1969</td>\r" +
    "\n" +
    "          </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "      </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/modules/grid/tpl/grid-demo.html',
    "<div ng-controller=\"GridDemoController\">\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">uiGrid</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\">\n" +
    "        <h4>Basic Example</h4>\n" +
    "        <div ui-grid=\"gridOptionsSimple\" ui-grid-pagination></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/modules/login/tpl/login.html',
    "<div layout=\"column\" flex id=\"content\" role=\"main\" ng-controller=\"LoginController\">\n" +
    "    <md-content layout=\"vertical\" flex id=\"content\">\n" +
    "        <div layout=\"row\" layout-align=\"center center\" layout-fill>\n" +
    "            <md-whiteframe class=\"md-whiteframe-z1\" layout=\"column\" flex=\"30\" layout-padding>\n" +
    "                <form ng-submit=\"login(user.username, user.password)\">\n" +
    "                    <md-content layout=\"column\">\n" +
    "                        <md-input-container class=\"md-block\">\n" +
    "                            <label>User name</label>\n" +
    "                            <input ng-model=\"user.username\">\n" +
    "                        </md-input-container>\n" +
    "                        <md-input-container class=\"md-block\">\n" +
    "                            <label>Password</label>\n" +
    "                            <input ng-model=\"user.password\" type=\"password\">\n" +
    "                        </md-input-container>\n" +
    "                        <md-input-container layout-align=\"center center\">\n" +
    "                            <div layout=\"row\" layout-sm=\"column\" layout-margin>\n" +
    "                                <md-button class=\"md-raised\" flex=\"50\" flex-sm=\"100\"\n" +
    "                                           ng-click=\"login(user.username, user.password)\">Login\n" +
    "                                </md-button>\n" +
    "                            </div>\n" +
    "                        </md-input-container>\n" +
    "                    </md-content>\n" +
    "                </form>\n" +
    "            </md-whiteframe>\n" +
    "    </md-content>\n" +
    "</div>"
  );


  $templateCache.put('js/modules/map/tpl/map.html',
    "<div ng-controller=\"MapController\">\n" +
    "    <leaflet class=\"fill-screen map\" defaults=\"defaults\" lf-center=\"center\" id=\"map\"></leaflet>\n" +
    "</div>"
  );

}]);
