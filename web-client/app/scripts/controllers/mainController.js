'use strict';

angular.module('webClientApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Article',
      function ($scope, $rootScope, $location, Article) {
    $scope.title = 'مَنْشَر';
    $scope.tagline = 'منصة النشر العربية';
    $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
    Article.query(function(articles) {
      $scope.articles = articles;
    });

    $scope.newArticle = function () {
      $location.path('/articles/new');
    };

    $scope.showArticle = function (articleId) {
      $location.path('/articles/' + articleId);
    };

  }]);
