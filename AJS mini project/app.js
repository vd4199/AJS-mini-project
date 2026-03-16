// Core Architecture: Module definition injecting ngRoute and ngAnimate
var app = angular.module('eventApp', ['ngRoute', 'ngAnimate']);

// Routing (SPA): Configuring view templates and controllers
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/services', {
            templateUrl: 'views/home.html', // Reusing template for simplicity
            controller: 'HomeCtrl'
        })
        .when('/pricing', {
            templateUrl: 'views/pricing.html',
            controller: 'PricingCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

// Main Controller (Parent Scope)
app.controller('MainCtrl', ['$scope', function($scope) {
    // Scope Variables & Expressions
    $scope.menuActive = false;
    $scope.themeActive = false;
    $scope.themeColors = ['#ccff33', '#d35400', '#f39c12', '#1abc9c', '#3498db', '#9b59b6'];
    $scope.currentTheme = '#3867d6'; // Default

    // Event handling function
    $scope.toggleMenu = function() {
        $scope.menuActive = !$scope.menuActive;
    };

    $scope.changeTheme = function(color) {
        $scope.currentTheme = color;
    };

    // Advanced Concepts: Watchers
    // Watching the currentTheme variable to manipulate the root CSS variable
    $scope.$watch('currentTheme', function(newVal, oldVal) {
        if (newVal !== oldVal || newVal) {
            document.documentElement.style.setProperty('--theme-color', newVal);
        }
    });
}]);

// Child Controller: Inherits from MainCtrl
app.controller('HomeCtrl', ['$scope', function($scope) {
    // Data Binding: Array of objects for ng-repeat
    $scope.services = [
        { icon: 'fas fa-envelope', title: 'invitation card design', desc: '"Inviting Moments, Crafted with Elegance."' },
        { icon: 'fas fa-photo-video', title: 'photos and videos', desc: '"Capturing Moments, Crafting Memories"' },
        { icon: 'fas fa-music', title: 'entertainment', desc: '"Bringing Moments to Life: Your Ultimate Entertainment Experience!"' },
        { icon: 'fas fa-car', title: 'event vehicles', desc: '"Driving Success, One Event at a Time"' },
        { icon: 'fas fa-map-marker-alt', title: 'venue selection', desc: '"Find Your Perfect Venue: Where Dreams Meet Reality"' },
        { icon: 'fas fa-birthday-cake', title: 'food catering', desc: '"Savor the Moment: Your Culinary Journey Starts Here!"' }
    ];
}]);

// Pricing Controller
app.controller('PricingCtrl', ['$scope', function($scope) {
    $scope.pricingPlans = [
        { tier: 'basic', amount: 350, features: ['full services', 'decorations', 'invitation card'] },
        { tier: 'prime', amount: 799, features: ['full services', 'decorations', 'food and drinks', 'invitation card'] },
        { tier: 'luxury', amount: 1000, features: ['full services', 'decorations', 'music and photos', 'food and drinks', 'invitation card'] }
    ];
}]);

// Contact & Forms Controller
app.controller('ContactCtrl', ['$scope', function($scope) {
    $scope.user = {};

    // Validation & Form Submission
    $scope.submitForm = function(isValid) {
        if (isValid) {
            alert('Thank you, ' + $scope.user.name + '! Your message has been sent.');
            $scope.user = {}; // Reset form model
            $scope.contactForm.$setPristine(); // Reset form state
            $scope.contactForm.$setUntouched();
        } else {
            alert('Please fill out the form correctly.');
        }
    };
}]);

// Custom Directives: Creating a reusable component
app.directive('eventFooter', function() {
    return {
        restrict: 'E', // Restrict to Element
        template: `
        <section class="footer">
            <div class="credit">
                created by <span>Hemashree S, Namitha Anand & Rishina K</span> | all rights reserved
            </div>
        </section>`
    };
});