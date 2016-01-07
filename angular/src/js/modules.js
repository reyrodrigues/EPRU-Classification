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

            .config(["OAuthProvider", "OAuthTokenProvider", "$httpProvider", function (OAuthProvider, OAuthTokenProvider, $httpProvider) {
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

            }])

            .run(["$rootScope", "$state", "OAuth", function ($rootScope, $state, OAuth) {
                $rootScope.$on('oauth:error', function (event, rejection) {
                    if ('invalid_grant' === rejection.data.error) {
                        return;
                    }

                    if ('invalid_token' === rejection.data.error) {
                        return OAuth.getRefreshToken();
                    }

                    return $state.go('login');
                });
            }])
            .config(["$mdThemingProvider", function ($mdThemingProvider) {
            }])
    ;



/**
 * Created by reyrodrigues on 12/28/15.
 */


var countryList = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"};

var isoCountriesCodes = [
  ["AF","AFG",4,"ISO 3166-2:AF"],
  ["AX","ALA",248,"ISO 3166-2:AX"],
  ["AL","ALB",8,"ISO 3166-2:AL"],
  ["DZ","DZA",12,"ISO 3166-2:DZ"],
  ["AS","ASM",16,"ISO 3166-2:AS"],
  ["AD","AND",20,"ISO 3166-2:AD"],
  ["AO","AGO",24,"ISO 3166-2:AO"],
  ["AI","AIA",660,"ISO 3166-2:AI"],
  ["AQ","ATA",10,"ISO 3166-2:AQ"],
  ["AG","ATG",28,"ISO 3166-2:AG"],
  ["AR","ARG",32,"ISO 3166-2:AR"],
  ["AM","ARM",51,"ISO 3166-2:AM"],
  ["AW","ABW",533,"ISO 3166-2:AW"],
  ["AU","AUS",36,"ISO 3166-2:AU"],
  ["AT","AUT",40,"ISO 3166-2:AT"],
  ["AZ","AZE",31,"ISO 3166-2:AZ"],
  ["BS","BHS",44,"ISO 3166-2:BS"],
  ["BH","BHR",48,"ISO 3166-2:BH"],
  ["BD","BGD",50,"ISO 3166-2:BD"],
  ["BB","BRB",52,"ISO 3166-2:BB"],
  ["BY","BLR",112,"ISO 3166-2:BY"],
  ["BE","BEL",56,"ISO 3166-2:BE"],
  ["BZ","BLZ",84,"ISO 3166-2:BZ"],
  ["BJ","BEN",204,"ISO 3166-2:BJ"],
  ["BM","BMU",60,"ISO 3166-2:BM"],
  ["BT","BTN",64,"ISO 3166-2:BT"],
  ["BO","BOL",68,"ISO 3166-2:BO"],
  ["BQ","BES",535,"ISO 3166-2:BQ"],
  ["BA","BIH",70,"ISO 3166-2:BA"],
  ["BW","BWA",72,"ISO 3166-2:BW"],
  ["BV","BVT",74,"ISO 3166-2:BV"],
  ["BR","BRA",76,"ISO 3166-2:BR"],
  ["IO","IOT",86,"ISO 3166-2:IO"],
  ["BN","BRN",96,"ISO 3166-2:BN"],
  ["BG","BGR",100,"ISO 3166-2:BG"],
  ["BF","BFA",854,"ISO 3166-2:BF"],
  ["BI","BDI",108,"ISO 3166-2:BI"],
  ["KH","KHM",116,"ISO 3166-2:KH"],
  ["CM","CMR",120,"ISO 3166-2:CM"],
  ["CA","CAN",124,"ISO 3166-2:CA"],
  ["CV","CPV",132,"ISO 3166-2:CV"],
  ["KY","CYM",136,"ISO 3166-2:KY"],
  ["CF","CAF",140,"ISO 3166-2:CF"],
  ["TD","TCD",148,"ISO 3166-2:TD"],
  ["CL","CHL",152,"ISO 3166-2:CL"],
  ["CN","CHN",156,"ISO 3166-2:CN"],
  ["CX","CXR",162,"ISO 3166-2:CX"],
  ["CC","CCK",166,"ISO 3166-2:CC"],
  ["CO","COL",170,"ISO 3166-2:CO"],
  ["KM","COM",174,"ISO 3166-2:KM"],
  ["CG","COG",178,"ISO 3166-2:CG"],
  ["CD","COD",180,"ISO 3166-2:CD"],
  ["CK","COK",184,"ISO 3166-2:CK"],
  ["CR","CRI",188,"ISO 3166-2:CR"],
  ["CI","CIV",384,"ISO 3166-2:CI"],
  ["HR","HRV",191,"ISO 3166-2:HR"],
  ["CU","CUB",192,"ISO 3166-2:CU"],
  ["CW","CUW",531,"ISO 3166-2:CW"],
  ["CY","CYP",196,"ISO 3166-2:CY"],
  ["CZ","CZE",203,"ISO 3166-2:CZ"],
  ["DK","DNK",208,"ISO 3166-2:DK"],
  ["DJ","DJI",262,"ISO 3166-2:DJ"],
  ["DM","DMA",212,"ISO 3166-2:DM"],
  ["DO","DOM",214,"ISO 3166-2:DO"],
  ["EC","ECU",218,"ISO 3166-2:EC"],
  ["EG","EGY",818,"ISO 3166-2:EG"],
  ["SV","SLV",222,"ISO 3166-2:SV"],
  ["GQ","GNQ",226,"ISO 3166-2:GQ"],
  ["ER","ERI",232,"ISO 3166-2:ER"],
  ["EE","EST",233,"ISO 3166-2:EE"],
  ["ET","ETH",231,"ISO 3166-2:ET"],
  ["FK","FLK",238,"ISO 3166-2:FK"],
  ["FO","FRO",234,"ISO 3166-2:FO"],
  ["FJ","FJI",242,"ISO 3166-2:FJ"],
  ["FI","FIN",246,"ISO 3166-2:FI"],
  ["FR","FRA",250,"ISO 3166-2:FR"],
  ["GF","GUF",254,"ISO 3166-2:GF"],
  ["PF","PYF",258,"ISO 3166-2:PF"],
  ["TF","ATF",260,"ISO 3166-2:TF"],
  ["GA","GAB",266,"ISO 3166-2:GA"],
  ["GM","GMB",270,"ISO 3166-2:GM"],
  ["GE","GEO",268,"ISO 3166-2:GE"],
  ["DE","DEU",276,"ISO 3166-2:DE"],
  ["GH","GHA",288,"ISO 3166-2:GH"],
  ["GI","GIB",292,"ISO 3166-2:GI"],
  ["GR","GRC",300,"ISO 3166-2:GR"],
  ["GL","GRL",304,"ISO 3166-2:GL"],
  ["GD","GRD",308,"ISO 3166-2:GD"],
  ["GP","GLP",312,"ISO 3166-2:GP"],
  ["GU","GUM",316,"ISO 3166-2:GU"],
  ["GT","GTM",320,"ISO 3166-2:GT"],
  ["GG","GGY",831,"ISO 3166-2:GG"],
  ["GN","GIN",324,"ISO 3166-2:GN"],
  ["GW","GNB",624,"ISO 3166-2:GW"],
  ["GY","GUY",328,"ISO 3166-2:GY"],
  ["HT","HTI",332,"ISO 3166-2:HT"],
  ["HM","HMD",334,"ISO 3166-2:HM"],
  ["VA","VAT",336,"ISO 3166-2:VA"],
  ["HN","HND",340,"ISO 3166-2:HN"],
  ["HK","HKG",344,"ISO 3166-2:HK"],
  ["HU","HUN",348,"ISO 3166-2:HU"],
  ["IS","ISL",352,"ISO 3166-2:IS"],
  ["IN","IND",356,"ISO 3166-2:IN"],
  ["ID","IDN",360,"ISO 3166-2:ID"],
  ["IR","IRN",364,"ISO 3166-2:IR"],
  ["IQ","IRQ",368,"ISO 3166-2:IQ"],
  ["IE","IRL",372,"ISO 3166-2:IE"],
  ["IM","IMN",833,"ISO 3166-2:IM"],
  ["IL","ISR",376,"ISO 3166-2:IL"],
  ["IT","ITA",380,"ISO 3166-2:IT"],
  ["JM","JAM",388,"ISO 3166-2:JM"],
  ["JP","JPN",392,"ISO 3166-2:JP"],
  ["JE","JEY",832,"ISO 3166-2:JE"],
  ["JO","JOR",400,"ISO 3166-2:JO"],
  ["KZ","KAZ",398,"ISO 3166-2:KZ"],
  ["KE","KEN",404,"ISO 3166-2:KE"],
  ["KI","KIR",296,"ISO 3166-2:KI"],
  ["KP","PRK",408,"ISO 3166-2:KP"],
  ["KR","KOR",410,"ISO 3166-2:KR"],
  ["KW","KWT",414,"ISO 3166-2:KW"],
  ["KG","KGZ",417,"ISO 3166-2:KG"],
  ["LA","LAO",418,"ISO 3166-2:LA"],
  ["LV","LVA",428,"ISO 3166-2:LV"],
  ["LB","LBN",422,"ISO 3166-2:LB"],
  ["LS","LSO",426,"ISO 3166-2:LS"],
  ["LR","LBR",430,"ISO 3166-2:LR"],
  ["LY","LBY",434,"ISO 3166-2:LY"],
  ["LI","LIE",438,"ISO 3166-2:LI"],
  ["LT","LTU",440,"ISO 3166-2:LT"],
  ["LU","LUX",442,"ISO 3166-2:LU"],
  ["MO","MAC",446,"ISO 3166-2:MO"],
  ["MK","MKD",807,"ISO 3166-2:MK"],
  ["MG","MDG",450,"ISO 3166-2:MG"],
  ["MW","MWI",454,"ISO 3166-2:MW"],
  ["MY","MYS",458,"ISO 3166-2:MY"],
  ["MV","MDV",462,"ISO 3166-2:MV"],
  ["ML","MLI",466,"ISO 3166-2:ML"],
  ["MT","MLT",470,"ISO 3166-2:MT"],
  ["MH","MHL",584,"ISO 3166-2:MH"],
  ["MQ","MTQ",474,"ISO 3166-2:MQ"],
  ["MR","MRT",478,"ISO 3166-2:MR"],
  ["MU","MUS",480,"ISO 3166-2:MU"],
  ["YT","MYT",175,"ISO 3166-2:YT"],
  ["MX","MEX",484,"ISO 3166-2:MX"],
  ["FM","FSM",583,"ISO 3166-2:FM"],
  ["MD","MDA",498,"ISO 3166-2:MD"],
  ["MC","MCO",492,"ISO 3166-2:MC"],
  ["MN","MNG",496,"ISO 3166-2:MN"],
  ["ME","MNE",499,"ISO 3166-2:ME"],
  ["MS","MSR",500,"ISO 3166-2:MS"],
  ["MA","MAR",504,"ISO 3166-2:MA"],
  ["MZ","MOZ",508,"ISO 3166-2:MZ"],
  ["MM","MMR",104,"ISO 3166-2:MM"],
  ["NA","NAM",516,"ISO 3166-2:NA"],
  ["NR","NRU",520,"ISO 3166-2:NR"],
  ["NP","NPL",524,"ISO 3166-2:NP"],
  ["NL","NLD",528,"ISO 3166-2:NL"],
  ["NC","NCL",540,"ISO 3166-2:NC"],
  ["NZ","NZL",554,"ISO 3166-2:NZ"],
  ["NI","NIC",558,"ISO 3166-2:NI"],
  ["NE","NER",562,"ISO 3166-2:NE"],
  ["NG","NGA",566,"ISO 3166-2:NG"],
  ["NU","NIU",570,"ISO 3166-2:NU"],
  ["NF","NFK",574,"ISO 3166-2:NF"],
  ["MP","MNP",580,"ISO 3166-2:MP"],
  ["NO","NOR",578,"ISO 3166-2:NO"],
  ["OM","OMN",512,"ISO 3166-2:OM"],
  ["PK","PAK",586,"ISO 3166-2:PK"],
  ["PW","PLW",585,"ISO 3166-2:PW"],
  ["PS","PSE",275,"ISO 3166-2:PS"],
  ["PA","PAN",591,"ISO 3166-2:PA"],
  ["PG","PNG",598,"ISO 3166-2:PG"],
  ["PY","PRY",600,"ISO 3166-2:PY"],
  ["PE","PER",604,"ISO 3166-2:PE"],
  ["PH","PHL",608,"ISO 3166-2:PH"],
  ["PN","PCN",612,"ISO 3166-2:PN"],
  ["PL","POL",616,"ISO 3166-2:PL"],
  ["PT","PRT",620,"ISO 3166-2:PT"],
  ["PR","PRI",630,"ISO 3166-2:PR"],
  ["QA","QAT",634,"ISO 3166-2:QA"],
  ["RE","REU",638,"ISO 3166-2:RE"],
  ["RO","ROU",642,"ISO 3166-2:RO"],
  ["RU","RUS",643,"ISO 3166-2:RU"],
  ["RW","RWA",646,"ISO 3166-2:RW"],
  ["BL","BLM",652,"ISO 3166-2:BL"],
  ["SH","SHN",654,"ISO 3166-2:SH"],
  ["KN","KNA",659,"ISO 3166-2:KN"],
  ["LC","LCA",662,"ISO 3166-2:LC"],
  ["MF","MAF",663,"ISO 3166-2:MF"],
  ["PM","SPM",666,"ISO 3166-2:PM"],
  ["VC","VCT",670,"ISO 3166-2:VC"],
  ["WS","WSM",882,"ISO 3166-2:WS"],
  ["SM","SMR",674,"ISO 3166-2:SM"],
  ["ST","STP",678,"ISO 3166-2:ST"],
  ["SA","SAU",682,"ISO 3166-2:SA"],
  ["SN","SEN",686,"ISO 3166-2:SN"],
  ["RS","SRB",688,"ISO 3166-2:RS"],
  ["SC","SYC",690,"ISO 3166-2:SC"],
  ["SL","SLE",694,"ISO 3166-2:SL"],
  ["SG","SGP",702,"ISO 3166-2:SG"],
  ["SX","SXM",534,"ISO 3166-2:SX"],
  ["SK","SVK",703,"ISO 3166-2:SK"],
  ["SI","SVN",705,"ISO 3166-2:SI"],
  ["SB","SLB",90,"ISO 3166-2:SB"],
  ["SO","SOM",706,"ISO 3166-2:SO"],
  ["ZA","ZAF",710,"ISO 3166-2:ZA"],
  ["GS","SGS",239,"ISO 3166-2:GS"],
  ["SS","SSD",728,"ISO 3166-2:SS"],
  ["ES","ESP",724,"ISO 3166-2:ES"],
  ["LK","LKA",144,"ISO 3166-2:LK"],
  ["SD","SDN",729,"ISO 3166-2:SD"],
  ["SR","SUR",740,"ISO 3166-2:SR"],
  ["SJ","SJM",744,"ISO 3166-2:SJ"],
  ["SZ","SWZ",748,"ISO 3166-2:SZ"],
  ["SE","SWE",752,"ISO 3166-2:SE"],
  ["CH","CHE",756,"ISO 3166-2:CH"],
  ["SY","SYR",760,"ISO 3166-2:SY"],
  ["TW","TWN",158,"ISO 3166-2:TW"],
  ["TJ","TJK",762,"ISO 3166-2:TJ"],
  ["TZ","TZA",834,"ISO 3166-2:TZ"],
  ["TH","THA",764,"ISO 3166-2:TH"],
  ["TL","TLS",626,"ISO 3166-2:TL"],
  ["TG","TGO",768,"ISO 3166-2:TG"],
  ["TK","TKL",772,"ISO 3166-2:TK"],
  ["TO","TON",776,"ISO 3166-2:TO"],
  ["TT","TTO",780,"ISO 3166-2:TT"],
  ["TN","TUN",788,"ISO 3166-2:TN"],
  ["TR","TUR",792,"ISO 3166-2:TR"],
  ["TM","TKM",795,"ISO 3166-2:TM"],
  ["TC","TCA",796,"ISO 3166-2:TC"],
  ["TV","TUV",798,"ISO 3166-2:TV"],
  ["UG","UGA",800,"ISO 3166-2:UG"],
  ["UA","UKR",804,"ISO 3166-2:UA"],
  ["AE","ARE",784,"ISO 3166-2:AE"],
  ["GB","GBR",826,"ISO 3166-2:GB"],
  ["US","USA",840,"ISO 3166-2:US"],
  ["UM","UMI",581,"ISO 3166-2:UM"],
  ["UY","URY",858,"ISO 3166-2:UY"],
  ["UZ","UZB",860,"ISO 3166-2:UZ"],
  ["VU","VUT",548,"ISO 3166-2:VU"],
  ["VE","VEN",862,"ISO 3166-2:VE"],
  ["VN","VNM",704,"ISO 3166-2:VN"],
  ["VG","VGB",92,"ISO 3166-2:VG"],
  ["VI","VIR",850,"ISO 3166-2:VI"],
  ["WF","WLF",876,"ISO 3166-2:WF"],
  ["EH","ESH",732,"ISO 3166-2:EH"],
  ["YE","YEM",887,"ISO 3166-2:YE"],
  ["ZM","ZMB",894,"ISO 3166-2:ZM"],
  ["ZW","ZWE",716,"ISO 3166-2:ZW"]
];
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
  .directive('uiFocus', ["$timeout", "$parse", function($timeout, $parse) {
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
  }]);
 angular.module('app')
  .directive('uiFullscreen', ["$document", "$window", function($document, $window) {
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
  }]);

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
  })
  .filter('localDate', function() {
    return function(date) {
      return moment(date).format('L');
    }
  });
'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl',
    ["$scope", "$rootScope", "$localStorage", "$window", "$mdSidenav", "$state", "User", function ($scope, $rootScope, $localStorage, $window, $mdSidenav, $state, User) {
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

        User.get({id: 'me'}).$promise.then(function (currentUser) {
            $rootScope.currentUser = currentUser.toJSON();
            $rootScope.isReviewer = $rootScope.currentUser.groups.filter(function (g) {
                return g.name == 'Reviewer'
            }).length > 0;
            $rootScope.isClassifier = $rootScope.currentUser.groups.filter(function (g) {
                return g.name == 'Classifier'
            }).length > 0;
        });

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }


    }]
);

/**
 * Created by reyrodrigues on 12/25/15.
 */
/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
    ["$stateProvider", function ($stateProvider) {
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
                templateUrl: 'js/modules/classification/tpl/scorecards.list.html'
            })
            .state('app.scorecards.create', {
                url: '/create',
                templateUrl: 'js/modules/classification/tpl/scorecards.edit.html',
                controller: 'CreateScorecardController'
            })
            .state('app.scorecards.edit', {
                url: '/edit/:id',
                templateUrl: 'js/modules/classification/tpl/scorecards.edit.html',
                controller: 'EditScorecardController'
            })
        ;
    }]);


/**
 * Created by reyrodrigues on 12/27/15.
 */

angular
    .module('app')
    .controller('ListWorksheetController', ["$scope", "Worksheet", "$mdDialog", function ($scope, Worksheet, $mdDialog) {
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
                { 'name': 'start', type: 'date'},
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

                    $scope.gridOptions.data = worksheets.results.map(function(r){
                        r.emergency_country = countryList[r.emergency_country];
                        r.origin_country = countryList[r.origin_country];
                        r.start = moment(r.start).format('L');

                        return r;
                    });
                    console.log(worksheets.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    }])
    .controller('ListScorecardController', ["$scope", "Scorecard", "$mdDialog", function ($scope, Scorecard, $mdDialog) {
        $scope.gridOptions = {
            paginationPageSizes: [5, 25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            customOptions: {limit: 25, offset: 0},
            columnDefs: [
                { 'name': 'id' },
                { 'field': 'worksheet.title', name: 'Emergency Name', enableSorting: false},
                { 'field': 'worksheet.emergency_country', name: 'Emergency Country', enableSorting: false},
                { 'field': 'worksheet.origin_country', name: 'Country of Origin', enableSorting: false},
                { 'field': 'worksheet.start', name: 'Start of Crisis', type: 'date', enableSorting: false},
                {
                    'name': 'actions',
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                        '<a class="btn btn-primary btn-xs" ui-sref="^.edit({id:row.entity.id})">Open</a>&nbsp;' +
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

        $scope.removeItem = function (ev, id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .textContent('Are you sure you would like to delete this record? This operation can\'t be reversed')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('no');
            $mdDialog.show(confirm).then(function () {
                Scorecard.delete({id: id}, getPage);
            }, function () {
            });
        };

        getPage();
        function getPage() {

            var limit = $scope.gridOptions.customOptions.limit;
            var offset = $scope.gridOptions.customOptions.offset;
            var sort = $scope.gridOptions.customOptions.sort;
            Scorecard.query({limit: limit, offset: offset, ordering: sort })
                .$promise
                .then(function (result) {
                    $scope.gridOptions.totalItems = result.count;

                    $scope.gridOptions.data = result.results.map(function(r){
                        r.worksheet.emergency_country = countryList[r.worksheet.emergency_country];
                        r.worksheet.origin_country = countryList[r.worksheet.origin_country];
                        r.worksheet.start = moment(r.worksheet.start).format('L');

                        return r;
                    });
                    console.log(result.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    }])

    .controller('EditWorksheetController', ["$scope", "$state", "$http", "Worksheet", "$mdToast", "$window", "$parse", function ($scope, $state, $http, Worksheet, $mdToast, $window, $parse) {
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

            var worksheet = $scope.worksheet.toJSON();
            worksheet.start = moment($scope.worksheet.start).toJSON().split('T')[0];

            var promise = Worksheet.save(worksheet).$promise;

            promise
                .then(function (worksheet) {
                    $window.scrollTo(0, 0);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Record Saved!')
                            .position('Top right')
                            .hideDelay(3000)
                    );
                    $scope.worksheet = worksheet;
                }).catch(function (resp) {
                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName];
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');

                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, serverResponse[fieldName]);
                    }
                });
        };
    }])
    .controller('CreateWorksheetController', ["$scope", "$state", "$http", "Worksheet", "$mdToast", "$window", "$parse", function ($scope, $state, $http, Worksheet, $mdToast, $window, $parse) {
        $scope.worksheet = new Worksheet({
            number_deaths: 0,
            number_injuries: 0,
            number_affected: 0,
            number_displaced: 0
        });
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
            var worksheet = $scope.worksheet.toJSON();
            worksheet.start = moment($scope.worksheet.start).toJSON().split('T')[0];

            var promise = Worksheet.create(worksheet).$promise;

            promise
                .then(function (worksheet) {
                    $state.go('^.^.scorecards.edit', {id: worksheet.scorecard.id });
                }).catch(function (resp) {
                    $window.scrollTo(0, 0);

                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName].join('\n');
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');


                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, message);
                    }
                });
        };
    }])
    .controller('EditScorecardController', ["$scope", "$state", "$http", "Worksheet", "Scorecard", "$parse", "$timeout", "$mdToast", "$window", "$q", "$mdDialog", function ($scope, $state, $http, Worksheet, Scorecard, $parse, $timeout, $mdToast, $window, $q, $mdDialog) {
        $scope.scorecard = Scorecard.get($state.params);
        $scope.scorecard.$promise.then(function (scorecard) {
            $scope.worksheet = scorecard.worksheet;
        });
        $q.all([Worksheet.metadata().$promise, Scorecard.metadata().$promise]).then(function (promises) {
            $scope.metadata = angular.extend(promises[0].toJSON(), promises[1].toJSON());

            console.log($scope.metadata);
        });

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });

        $scope.sendNotification = function (ev) {
            $window.scrollTo(0, 0);

            var confirm = $mdDialog.confirm()
                .targetEvent(ev)
                .title('Notify Reviewers')
                .textContent('This will notify all of the reviewers in the system. Are you sure you would like to continue?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                $timeout(function () {
                    $mdToast.simple()
                        .textContent('Notification Sent!')
                        .position('Top right')

                        .hideDelay(3000);
                }, 2000);
            }, function () {
            });
        };

        $scope.save = function () {
            $scope.scorecard.$save()
                .then(function () {
                    $window.scrollTo(0, 0);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Record Saved!')
                            .position('Top right')
                            .hideDelay(3000)
                    );
                }).catch(function (resp) {
                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName].join('\n');
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');


                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, message);
                    }
                });
        };
    }])

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

    .factory('Worksheet', ["$resource", function ($resource) {
        var options = angular.extend({
            createScorecard: {method: 'GET', url: '/api/worksheets/:id/create_scorecard/', transformResponse: MapGet}
        }, defaultOptions);

        return $resource('/api/worksheets/:id/', { id: '@id' }, options, {
            stripTrailingSlashes: false
        });
    }])
    .factory('Scorecard', ["$resource", function ($resource) {
        return $resource('/api/scorecards/:id/', { id: '@id' }, defaultOptions, {
            stripTrailingSlashes: false
        });
    }])
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
    return json;
}
angular.module('app')
    .config(
        ["$stateProvider", function ($stateProvider) {
            $stateProvider
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'js/modules/dashboard/tpl/dashboard.html'
                })

        }]);

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
        ["$stateProvider", function ($stateProvider) {
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
        }]);

app.controller('GridDemoController',
["$scope", "uiGridConstants", function ($scope, uiGridConstants) {


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
}]);

angular.module('app')

    .config(
        ["$stateProvider", function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'js/modules/login/tpl/login.html'
                })
                ;
        }]);

;

/**
 * Created by reyrodrigues on 12/26/15.
 */
app.controller('LoginController', ["$rootScope", "$scope", "OAuth", "$state", "$cookies", "$localStorage", "User", function LoginController($rootScope, $scope, OAuth, $state, $cookies, $localStorage, User) {
    $cookies.remove('token');

    $scope.login = function (username, password) {
        OAuth.getAccessToken({username: username, password: password}).then(function (token) {
            var me = User.get({id: 'me'});
            me.$promise.then(function () {
                $localStorage.currentUser = me.toJSON();
                $rootScope.currentUser = $localStorage.currentUser;

               document.location = '/';
            });
        });
    };

}]);

/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')

    .factory('User', ["$resource", function ($resource) {
        return $resource('/api/users/:id/', { id: '@id' }, { }, {
            stripTrailingSlashes: false
        });
    }])
;

/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
        ["$stateProvider", function ($stateProvider) {
            $stateProvider
                .state('app.map', {
                    url: '/map',
                    templateUrl: 'js/modules/map/tpl/map.html'
                })
                ;
        }]);

/**
 * Created by reyrodrigues on 12/25/15.
 */

var colors = [
    "#FFFF66",
    "#F2E65C",
    "#E6CC52",
    "#D9B247",
    "#CC993D",
    "#C08033",
    "#B36629",
    "#A64D1F",
    "#993314",
    "#8D190A",
    "#800000"
];
var stanceColors = [
    "#FFFF66",
    "#F2E65C",
    "#C08033",
    "#8D190A",
];
var stanceWording = [
    "#FFFF66",
    "A",
    "B",
    "C",
];

angular
    .module('app')
    .controller('MapController', ["$scope", "$http", "leafletData", "OAuth", "Scorecard", "$q", "$mdDialog", function MapController($scope, $http, leafletData, OAuth, Scorecard, $q, $mdDialog) {
        $scope.defaults = {
            tileLayer: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            path: {
            },
            legend: {
                position: 'topright',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            },
            minZoom: 3,
            worldCopyJump: true
        };

        $scope.center = {
            lat: 0.0,
            lng: 0.0,
            zoom: 3
        };

        $scope.colors = colors;
        $scope.stanceColors = stanceColors;
        $scope.stanceWording = stanceWording;

        var countryMap = isoCountriesCodes.reduce(function (obj, b) {
            obj[b[0]] = b[1];
            return obj;
        }, {});

        var reverseCountryMap = isoCountriesCodes.reduce(function (obj, b) {
            obj[b[1]] = b[0];
            return obj;
        }, {});

        $scope.scorecards = Scorecard.query({limit: 1000});

        var loaded = $q.all([$http.get('/scale/').then(function (r) {
            $scope.worldJson = r.data;
        }),
            $scope.scorecards.$promise
        ]);


        $scope.$watch('scale', function showScale(scale) {
            $q.when(loaded).then(function () {
                leafletData.getMap('map').then(function (map) {
                    var results = $scope.scorecards.results;
                    results.sort(function (a, b) {
                        return a.worksheet.start > b.worksheet.start ? 1 :
                            (a.worksheet.start == b.worksheet.start ? 0 : -1);
                    });

                    if ($scope.world)
                        map.removeLayer($scope.world);

                    $scope.world = getLayer(results, scale);
                    $scope.world.addTo(map);


                    $scope.world.on('click', onMapClick)
                    map.off('drag');
                    map.off('drag', function () {
                        $scope.world.addTo(map);

                    });

                    function onMapClick(e) {
                        var knn = leafletKnn($scope.world);

                        var id = e.layer.feature.id;
                        var props = e.layer.feature.properties;

                        var iso2 = reverseCountryMap[id];
                        var countryScorecards = $scope.scorecards.results.filter(function (s) {
                            return s.worksheet.emergency_country == iso2;
                        });

                        var confirm = $mdDialog.show({
                            targetEvent: e.originalEvent,
                            templateUrl: 'js/modules/map/tpl/countryDialog.html',
                            controller: ["$scope", "$state", "$mdDialog", function DialogController($scope, $state, $mdDialog) {
                                $scope.props = props;
                                $scope.scorecards = countryScorecards;

                                $scope.open = function (obj) {
                                    $mdDialog.hide().then(function () {
                                        $state.go('app.scorecards.edit', obj)
                                    });
                                };
                                $scope.hide = function () {
                                    $mdDialog.hide();
                                };
                            }],
                            locals: { props: props, scorecards: countryScorecards }
                        });

                        confirm.then(function () {
                        }, function () {
                        });
                    }
                });
            });

        });

        function getLayer(data, scale) {
            angular.forEach(data, function (d) {
                var countryISO3 = countryMap[d.worksheet.emergency_country];
                var country = $scope.worldJson.features.filter(function (a) {
                    return a.id == countryISO3
                });

                if (country && country.length) {
                    angular.forEach(country, function (c) {
                        c.properties.value = scale ? d.emergency_classification_rank : d.taken_stance;
                    });
                }
            });

            return L.geoJson($scope.worldJson, {
                style: style,
                onEachFeature: onEachFeature
            });

            function resetHighlight(e) {
                $scope.world.resetStyle(e.target);
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
            }

            function getColor(d) {
                if (scale) {
                    return  d > 0 ? colors[d] : '#c3c3c3';
                } else {
                    return  d > 0 ? stanceColors[d] : '#c3c3c3';
                }
            }

            function style(feature) {
                var value = feature.properties.value;

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
        }
    }])
;


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


  $templateCache.put('js/modules/classification/tpl/scorecards.edit.html',
    "<div>\n" +
    "<md-toolbar md-scroll-shrink>\n" +
    "    <div class=\"md-toolbar-tools\">Scorecard - {{ worksheet.title }}</div>\n" +
    "</md-toolbar>\n" +
    "<md-card>\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">Emergency Details</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content layout=\"row\">\n" +
    "        <div layout=\"column\" flex=\"50\">\n" +
    "            <md-input-container>\n" +
    "                <label>{{ metadata.title.label }}</label>\n" +
    "                <input ng-model=\"worksheet.title\" readonly/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container>\n" +
    "                <label>{{ metadata.emergency_country.label }}</label>\n" +
    "                <md-select ng-model=\"worksheet.emergency_country\"\n" +
    "                           disabled>\n" +
    "                    <md-option ng-value=\"country.id\"\n" +
    "                               ng-repeat=\"country in countries\">{{ country.name }}</md-option>\n" +
    "                </md-select>\n" +
    "            </md-input-container>\n" +
    "\n" +
    "        </div>\n" +
    "        <div layout=\"column\" flex=\"50\">\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.start.label }}</label>\n" +
    "                <input name=\"start\" ng-model=\"worksheet.start\" readonly/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.description.label }}</label>\n" +
    "                <textarea ng-model=\"worksheet.description\" columns=\"1\" readonly></textarea>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<form name=\"form\" ng-submit=\"save()\">\n" +
    "<input type=\"submit\" style=\"position: absolute; left: -9999px; width: 1px; height: 1px;\"/>\n" +
    "\n" +
    "<md-card>\n" +
    "    <md-card-content layout-wrap layout>\n" +
    "        <div layout=\"column\" flex=\"50\" flex-xs=\"100\">\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.emergency_classification_rank.label }}</label>\n" +
    "                <input name=\"emergency_classification_rank\"\n" +
    "                       ng-model=\"scorecard.emergency_classification_rank\" readonly/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.pre_crisis_vulnerability_rank.label }}</label>\n" +
    "                <input name=\"pre_crisis_vulnerability_rank\"\n" +
    "                       ng-model=\"scorecard.pre_crisis_vulnerability_rank\" readonly/>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.irc_robustness.label }}</label>\n" +
    "                <input name=\"irc_robustness\"\n" +
    "                       ng-model=\"scorecard.irc_robustness\" readonly/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <div layout=\"column\" flex=\"50\" flex-xs=\"100\" layout-wrap style=\"height:100%\">\n" +
    "            <md-list>\n" +
    "                <md-list-item>\n" +
    "                    <md-checkbox ng-model=\"scorecard.complex\"\n" +
    "                                 aria-label=\"{{ metadata.complex.label }}\"\n" +
    "                                 class=\"md-primary\" disabled>\n" +
    "                    </md-checkbox>\n" +
    "                    <p>{{ metadata.complex.label }}</p>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item>\n" +
    "                    <md-checkbox ng-model=\"scorecard.access\"\n" +
    "                                 aria-label=\"{{ metadata.access.label }}\"\n" +
    "                                 class=\"md-primary\" disabled>\n" +
    "                    </md-checkbox>\n" +
    "                    <p>\n" +
    "                        {{ metadata.access.label }}\n" +
    "                    </p>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item>\n" +
    "                    <md-checkbox ng-model=\"scorecard.duration\"\n" +
    "                                 aria-label=\"{{ metadata.duration.label }}\"\n" +
    "                                 class=\"md-primary\" disabled>\n" +
    "                    </md-checkbox>\n" +
    "                    <p>\n" +
    "                        {{ metadata.duration.label }}\n" +
    "                    </p>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item>\n" +
    "                    <md-checkbox ng-model=\"scorecard.lack_of_actors\"\n" +
    "                                 aria-label=\"{{ metadata.lack_of_actors.label }}\"\n" +
    "                                 class=\"md-primary\" disabled>\n" +
    "                    </md-checkbox>\n" +
    "                    <p>\n" +
    "                        {{ metadata.lack_of_actors.label }}\n" +
    "\n" +
    "                    </p>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<div layout=\"row\" layout-xs=\"column\" layout-wrap-xs>\n" +
    "    <md-card flex>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <h4>Decision</h4>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content layout=\"row\" layout-wrap>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\">\n" +
    "                <h5>Recommended </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.recorded_decision\" disabled>\n" +
    "                    <md-radio-button value=\"2\">The IRC country program will decide if they will respond\n" +
    "                    </md-radio-button>\n" +
    "                    <md-radio-button value=\"3\">IRC will respond</md-radio-button>\n" +
    "                    <md-radio-button value=\"1\">IRC will not respond</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\" ng-if=\"isReviewer\">\n" +
    "                <h5>Taken </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.taken_decision\">\n" +
    "                    <md-radio-button value=\"2\">The IRC country program will decide if they will respond\n" +
    "                    </md-radio-button>\n" +
    "                    <md-radio-button value=\"3\">IRC will respond</md-radio-button>\n" +
    "                    <md-radio-button value=\"1\">IRC will not respond</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "\n" +
    "    <md-card flex>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <h4>Stance</h4>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content layout=\"row\" layout-wrap>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\">\n" +
    "                <h5>Recommended </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.recorded_stance\" disabled>\n" +
    "                    <md-radio-button value=\"1\">A</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">B</md-radio-button>\n" +
    "                    <md-radio-button value=\"3\">C</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\" ng-if=\"isReviewer\">\n" +
    "                <h5>Taken </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.taken_stance\">\n" +
    "                    <md-radio-button value=\"1\">A</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">B</md-radio-button>\n" +
    "                    <md-radio-button value=\"3\">C</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<div layout=\"row\" layout-xs=\"column\" layout-wrap-xs>\n" +
    "    <md-card flex>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <h4>Management</h4>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content layout=\"row\" layout-wrap>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\">\n" +
    "                <h5>Recommended </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.recorded_management\" disabled>\n" +
    "                    <md-radio-button value=\"1\">Country Program Leads</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">EPRU Leads</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\" ng-if=\"isReviewer\">\n" +
    "                <h5>Taken </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.taken_management\">\n" +
    "                    <md-radio-button value=\"1\">Country Program Leads</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">EPRU Leads</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "    <md-card flex>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <h4>Type</h4>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content layout=\"row\" layout-wrap>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\">\n" +
    "                <h5>Recommended </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.recorded_type\" disabled>\n" +
    "                    <md-radio-button value=\"1\">One Team</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">Two Teams</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "            <div layout=\"column\" flex=\"50\" flex-xs=\"100\" ng-if=\"isReviewer\">\n" +
    "                <h5>Taken </h5>\n" +
    "                <md-radio-group ng-model=\"scorecard.taken_type\">\n" +
    "                    <md-radio-button value=\"1\">One Team</md-radio-button>\n" +
    "                    <md-radio-button value=\"2\">Two Teams</md-radio-button>\n" +
    "                </md-radio-group>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "\n" +
    "</div>\n" +
    "<md-card ng-if=\"isReviewer\">\n" +
    "    <md-card-content>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <span class=\"md-headline\">Affirmation or caveats to this decision</span>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "            <textarea ng-model=\"scorecard.caveats\" columns=\"1\" md-maxlength=\"10000\" rows=\"5\"></textarea>\n" +
    "        </md-input-container>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card ng-if=\"isReviewer\">\n" +
    "    <md-card-content>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <span class=\"md-headline\">Next Actions: (for response or monitoring)</span>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "            <textarea ng-model=\"scorecard.next_actions\" columns=\"1\" md-maxlength=\"10000\" rows=\"5\"></textarea>\n" +
    "        </md-input-container>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card ng-if=\"isReviewer\">\n" +
    "    <md-card-content>\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <span class=\"md-headline\">Actions Taken</span>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "            <textarea ng-model=\"scorecard.action_taken\" columns=\"1\" md-maxlength=\"10000\" rows=\"5\"></textarea>\n" +
    "        </md-input-container>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "    <md-card-content>\n" +
    "        <div layout=\"row\" layout-xs=\"column\">\n" +
    "            <md-button class=\"md-raised md-warn\" ng-click=\"sendNotification($event)\" ng-if=\"isClassifier\">Notify\n" +
    "            </md-button>\n" +
    "            <md-button class=\"md-raised\" ui-sref=\"^.^.worksheets.edit({id: scorecard.worksheet.id})\"\n" +
    "                       ng-if=\"isClassifier\">Update\n" +
    "            </md-button>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-raised\" ui-sref=\"app.map\">Back to Map</md-button>\n" +
    "            <md-button class=\"md-raised md-primary\" ng-click=\"save()\" ng-if=\"isReviewer\">Save</md-button>\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "</md-card>\n" +
    "</form>\n" +
    "</div>"
  );


  $templateCache.put('js/modules/classification/tpl/scorecards.list.html',
    "<div ng-controller=\"ListScorecardController\">\n" +
    "    <md-toolbar md-scroll-shrink>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h2>\n" +
    "                <span>Scorecards</span>\n" +
    "            </h2>\n" +
    "            <span flex></span>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-card class=\"fill-grid-screen\">\n" +
    "        <md-card-content style=\"padding: 0\">\n" +
    "            <div ui-grid=\"gridOptions\" ui-grid-pagination class=\"fill-grid-screen\"></div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('js/modules/classification/tpl/worksheets.edit.html',
    "<div>\n" +
    "<form name=\"form\" ng-submit=\"save()\">\n" +
    "<input type=\"submit\" style=\"position: absolute; left: -9999px; width: 1px; height: 1px;\"/>\n" +
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
    "            <div class=\"hint\" ng-hide=\"form.title.$error.serverMessage\">{{ metadata.title.help_text }}</div>\n" +
    "\n" +
    "            <div ng-messages=\"form.title.$error\">\n" +
    "                <div ng-each=\"form.title.$error.serverMessage\">{{ form.title.$error.serverMessage}}</div>\n" +
    "            </div>\n" +
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
    "                <div class=\"hint\"\n" +
    "                     ng-hide=\"form.emergency_country.$error.serverMessage\">{{ metadata.emergency_country.help_text }}</div>\n" +
    "                <div ng-messages=\"form.emergency_country.$error\">\n" +
    "                    <div ng-each=\"form.emergency_country.$error.serverMessage\">\n" +
    "                        {{ form.emergency_country.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
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
    "                <div class=\"hint\"\n" +
    "                     ng-hide=\"form.origin_country.$error.serverMessage\">{{ metadata.origin_country.help_text }}</div>\n" +
    "                <div ng-messages=\"form.origin_country.$error\">\n" +
    "                    <div ng-each=\"form.origin_country.$error.serverMessage\">\n" +
    "                        {{ form.origin_country.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <h5>{{ metadata.start.label }}:</h5>\n" +
    "\n" +
    "        <div layout>\n" +
    "            <md-datepicker ng-model=\"worksheet.start\" flex></md-datepicker>\n" +
    "            <div class=\"hint\"\n" +
    "                 ng-hide=\"form.start.$error.serverMessage\">{{ metadata.start.help_text }}</div>\n" +
    "            <div ng-messages=\"form.start.$error\">\n" +
    "                <div ng-each=\"form.start.$error.serverMessage\">\n" +
    "                    {{ form.start.$error.serverMessage}}</div>\n" +
    "            </div>\n" +
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
    "            <div class=\"hint hidden-xs\"\n" +
    "                 ng-hide=\"form.description.$error.serverMessage\">{{ metadata.description.help_text }}</div>\n" +
    "            <div ng-messages=\"form.description.$error\">\n" +
    "                <div ng-each=\"form.description.$error.serverMessage\">\n" +
    "                    {{ form.description.$error.serverMessage}}</div>\n" +
    "            </div>\n" +
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
    "            <md-input-container flex-gt-sm=\"30\" flex>\n" +
    "                <label>{{ metadata.number_deaths.label }}</label>\n" +
    "                <input name=\"number_deaths\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_deaths.required\"\n" +
    "                       ng-model=\"worksheet.number_deaths\"/>\n" +
    "\n" +
    "                <div ng-messages=\"form.number_deaths.$error\">\n" +
    "                    <div ng-each=\"form.number_deaths.$error.serverMessage\">\n" +
    "                        {{ form.number_deaths.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.number_deaths_source.label }}</label>\n" +
    "                <input name=\"number_deaths_source\" type=\"text\" ng-required=\"metadata.number_deaths_source.required\"\n" +
    "                       ng-model=\"worksheet.number_deaths_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex-gt-sm=\"30\" flex>\n" +
    "                <label>{{ metadata.number_injuries.label }}</label>\n" +
    "                <input name=\"number_injuries\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_injuries.required\"\n" +
    "                       ng-model=\"worksheet.number_injuries\"/>\n" +
    "\n" +
    "                <div ng-messages=\"form.number_injuries.$error\">\n" +
    "                    <div ng-each=\"form.number_injuries.$error.serverMessage\">\n" +
    "                        {{ form.number_deaths.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.number_injuries_source.label }}</label>\n" +
    "                <input name=\"number_injuries_source\" type=\"text\" ng-required=\"metadata.number_injuries_source.required\"\n" +
    "                       ng-model=\"worksheet.number_injuries_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex-gt-sm=\"30\" flex>\n" +
    "                <label>{{ metadata.number_affected.label }}</label>\n" +
    "                <input name=\"number_affected\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_affected.required\"\n" +
    "                       ng-model=\"worksheet.number_affected\"/>\n" +
    "\n" +
    "                <div ng-messages=\"form.number_affected.$error\">\n" +
    "                    <div ng-each=\"form.number_affected.$error.serverMessage\">\n" +
    "                        {{ form.number_affected.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>{{ metadata.number_affected_source.label }}</label>\n" +
    "                <input name=\"number_affected_source\" type=\"text\" ng-required=\"metadata.number_affected_source.required\"\n" +
    "                       ng-model=\"worksheet.number_affected_source\"/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "\n" +
    "        <div layout layout-xs=\"column\">\n" +
    "            <md-input-container flex-gt-sm=\"30\" flex>\n" +
    "                <label>{{ metadata.number_displaced.label }}</label>\n" +
    "                <input name=\"number_displaced\" type=\"number\" ng-min=\"0\" ng-required=\"metadata.number_displaced.required\"\n" +
    "                       ng-model=\"worksheet.number_displaced\"/>\n" +
    "\n" +
    "                <div ng-messages=\"form.number_displaced.$error\">\n" +
    "                    <div ng-each=\"form.number_displaced.$error.serverMessage\">\n" +
    "                        {{ form.number_displaced.$error.serverMessage}}</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
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
    "            <md-checkbox ng-model=\"worksheet.irc_country_program\"\n" +
    "                         aria-label=\"{{ metadata.irc_country_program.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.irc_country_program.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-hide=\"worksheet.irc_country_program\" ng-model=\"worksheet.registration_required\"\n" +
    "                         aria-label=\"{{ metadata.registration_required.label }}\"\n" +
    "                         class=\"md-primary\">\n" +
    "                {{ metadata.registration_required.label }}\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-checkbox ng-hide=\"worksheet.irc_country_program\"  ng-model=\"worksheet.registration_possible\"\n" +
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
    "        <div layout=\"row\" layout-xs=\"column\">\n" +
    "            <md-button class=\"md-raised\" ng-click=\"worksheet.$createScorecard()\"\n" +
    "                       ng-if=\"!worksheet.scorecard && worksheet.id\">Create Scorecard\n" +
    "            </md-button>\n" +
    "            <md-button class=\"md-raised\" ui-sref=\"^.^.scorecards.edit({id: worksheet.scorecard.id})\"\n" +
    "                       ng-if=\"worksheet.scorecard\">Open Scorecard\n" +
    "            </md-button>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-raised\" ui-sref=\"^.list\">Back to List</md-button>\n" +
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
    "<div layout=\"column\" flex role=\"main\" ng-controller=\"LoginController\">\n" +
    "    <md-content layout=\"vertical\" flex id=\"content\" layout-align=\"center center\">\n" +
    "        <div layout=\"row\" layout-align=\"center center\" layout-fill>\n" +
    "            <md-whiteframe class=\"md-whiteframe-z1\" layout=\"column\" flex=\"30\" flex-xs=\"100\" layout-padding>\n" +
    "                <form autocomplete=\"false\" ng-submit=\"login(user.username, user.password)\">\n" +
    "\n" +
    "                    <input type=\"submit\" style=\"position: absolute; left: -9999px; width: 1px; height: 1px;\"/>\n" +
    "\n" +
    "                    <md-content layout=\"column\">\n" +
    "                        <md-input-container flex>\n" +
    "                            <h4>User name</h4>\n" +
    "                            <input ng-model=\"user.username\">\n" +
    "                        </md-input-container>\n" +
    "                        <md-input-container flex>\n" +
    "                            <h4>Password</h4>\n" +
    "                            <input ng-model=\"user.password\" type=\"password\">\n" +
    "                        </md-input-container>\n" +
    "                        <md-input-container layout-align=\"center center\">\n" +
    "                            <div layout=\"row\" layout-sm=\"column\" layout-margin>\n" +
    "                                <md-button class=\"md-raised\" flex=\"100\"\n" +
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


  $templateCache.put('js/modules/map/tpl/countryDialog.html',
    "<md-dialog aria-label=\"{{ props.name }}\" ng-cloak>\n" +
    "    <form>\n" +
    "        <md-toolbar>\n" +
    "            <div class=\"md-toolbar-tools\">\n" +
    "                <h2>{{ props.name }}</h2>\n" +
    "                <span flex></span>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-dialog-content>\n" +
    "            <md-list>\n" +
    "                <md-list-item class=\"md-1-line\" ng-repeat=\"item in scorecards\">\n" +
    "                    <a ng-click=\"open({id: item.id})\" href=\"\">{{ item.worksheet.title }}\n" +
    "                        - {{ item.worksheet.start|localDate }}</a>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item ng-show=\"!scorecards.length\">\n" +
    "                    <strong>There are no classified emergencies for this country.</strong>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "        </md-dialog-content>\n" +
    "        <md-dialog-actions layout=\"row\">\n" +
    "            <md-button ng-click=\"hide()\" style=\"margin-right:20px;\">\n" +
    "                Close\n" +
    "            </md-button>\n" +
    "        </md-dialog-actions>\n" +
    "    </form>\n" +
    "</md-dialog>\n"
  );


  $templateCache.put('js/modules/map/tpl/map.html',
    "<div ng-controller=\"MapController\" ng-init=\"scale=true\">\n" +
    "    <leaflet class=\"fill-screen map\" defaults=\"defaults\" lf-center=\"center\" id=\"map\"></leaflet>\n" +
    "    <div class=\"map-legend\" ng-class=\"{'map-legend-tall':  scale}\">\n" +
    "        <div ng-if=\"scale\" class=\"color-line\">\n" +
    "            <strong>Scale</strong>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!scale\" class=\"color-line\">\n" +
    "            <strong>Stance</strong>\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"c in colors\" ng-if=\"$index > 0 && scale\" class=\"color-line\">\n" +
    "            <span class=\"color-box\" ng-style=\"{'background-color': c}\"></span>\n" +
    "            {{ $index }}\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"c in stanceColors\" ng-if=\"($index > 0 && $index < 4) && !scale\" class=\"color-line\">\n" +
    "            <span class=\"color-box\" ng-style=\"{'background-color': c}\"></span>\n" +
    "            {{ stanceWording[$index] }}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"map-button-bar-right\">\n" +
    "        <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-info\" ng-click=\"scale = true\" ng-class=\"{'active': scale}\">Scale</button>\n" +
    "            <button class=\"btn btn-info\" ng-click=\"scale = false\" ng-class=\"{'active': !scale}\">Stance</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"map-button-bar-left hide-xs\">\n" +
    "        <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default\">Report</button>\n" +
    "            <a class=\"btn btn-default\" ui-sref=\"app.worksheets.create\">Classify an emergency</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <button class=\"btn btn-default\">More about classification</button>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
