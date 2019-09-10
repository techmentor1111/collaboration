/**
 * Angular module "app"
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/registerUser',{controller:'UserCtrl',templateUrl:'views/registrationform.html'})
	.when('/login',{controller:'UserCtrl',templateUrl:'views/login.html'})
	.when('/protectedresource',{controller:'UserCtrl',templateUrl:'views/protectedview.html'})
	.when('/getuser',{controller:'UserCtrl',templateUrl:'views/updateform.html'})
	.otherwise({controller:'UserCtrl',templateUrl:'views/home.html'})
})
//ngRoute -> $routeProvider and ng-view
//ngCookies -> $cookieStore
//.when('/home',{controller:'NotificationCtrl',templateUrl:'views/home.html'})
app.run(function($rootScope,$cookieStore,UserService,$location){
	if($rootScope.user==undefined)
		$rootScope.user=$cookieStore.get('user')
		
    $rootScope.logout=function(){
		UserService.logout().then(function(response){
			delete $rootScope.user
			$cookieStore.remove('user')
			$location.path('/login')
		},function(response){
			if(response.status==401){//session attribute email is not there in HttpSession
			delete $rootScope.user
			$cookieStore.remove('user')
			$location.path('/login')
			}
		})
	}
})
