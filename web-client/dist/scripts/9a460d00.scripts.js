"use strict";angular.module("webClientApp",["ngCookies","ngResource","ngSanitize","ngRoute","AppConfig"]).config(["$routeProvider",function(a){var b=function(a){return{load:["$q","$location","LoginService",function(b,c,d){if(d.isAuthorized(a.isPublic)){var e=b.defer();return e.resolve(),e.promise}return b.reject({redirectTo:"/login",previous:c.path()})}]}};a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",resolve:b({isPublic:!0})}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",resolve:b({isPublic:!0})}).when("/articles/:articleId",{templateUrl:"views/articles/show.html",controller:"ArticleCtrl",resolve:b({isPublic:!1})}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){var b=["$location","$q",function(a,b){var c=function(a){return a},d=function(c){return 401===c.status?(a.path("/login"),b.reject(c)):b.reject(c)};return function(a){return a.then(c,d)}}];a.responseInterceptors.push(b),a.defaults.headers.common["Content-Type"]="application/json"}]).run(["$location","$rootScope","LoginService",function(a,b,c){c.initAuthHeaders(),b.$on("$routeChangeError",function(b,c,d,e){e&&e.redirectTo&&a.path(e.redirectTo).search("prev",e.previous)})}]),angular.module("AppConfig",[]).constant("ENV","development").constant("API_HOST","localhost:3000"),angular.module("webClientApp").controller("MainCtrl",["$scope","$location","Article",function(a,b,c){a.title="منشر",a.tagline="منصة نشر مخصصة بالعربية",a.articles=c.query(),a.showArticle=function(a){b.path("/articles/"+a)}}]),angular.module("webClientApp").controller("ArticleCtrl",["$scope","$routeParams","Article",function(a,b,c){a.article=c.get({articleId:b.articleId})}]),angular.module("webClientApp").controller("LoginCtrl",["$scope","$http","$location","$routeParams","LoginService",function(a,b,c,d,e){a.user={},a.error=null,a.login=function(a){e.login(a,f,g)};var f=function(){c.path(d.prev||"/").search("prev",null)},g=function(){a.error="Wrong username and/or password."}}]),angular.module("webClientApp").service("ArticleService").factory("Article",["$resource","API_HOST",function(a,b){return a("//"+b+"/api/v1/articles/:articleId")}]),angular.module("webClientApp").service("LoginService",["$http","API_HOST","StorageService",function(a,b,c){var d="//"+b+"/api/v1/";return{isAuthorized:function(a){return a||this.isLoggedIn()},isLoggedIn:function(){return!!c.get("user.email")},login:function(b,c,e){a.post(d+"sessions.json",{user:b}).then(angular.bind(this,function(a){this.storeAuthData(a.data),c&&c(a.data)}),function(a){e&&e(a.data)})},logout:function(b,c){a.delete(d+"sessions.json").then(angular.bind(this,function(a){this.reset(),b&&b(a.data)}),function(a){c&&c(a.data)})},storeAuthData:function(a){c.set("user.email",a.user.email),c.set("user.authToken",a.authToken),this.initAuthHeaders()},initAuthHeaders:function(){var b=c.get("user.authToken");if(b){var d='Token token="'+b+'"';a.defaults.headers.common.Authorization=d}},reset:function(){c.unset("user.email"),c.unset("user.authToken"),a.defaults.headers.common.Authorization=null}}}]),angular.module("webClientApp").service("StorageService",["$window",function(a){return{set:function(b,c){return a.localStorage.setItem(b,c)},get:function(b,c){return a.localStorage.getItem(b)||c},unset:function(b){return a.localStorage.removeItem(b)}}}]);