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
