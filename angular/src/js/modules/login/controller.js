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

               document.location = '/';
            });
        });
    };

});
