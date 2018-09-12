/*eslint-disable*/
angular.module("formEditor")
.directive('ngFlatpickr', flatpickrDirective);

function flatpickrDirective() {
    let directive = {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            fpOpts: '&',
            fpOnSetup: '&'
        },
        link: link,
    };

    function link(scope, element, attrs, ngModel){
        const options = scope.fpOpts();

        var vp = new window['Flatpickr'](element[0], options);

        if (scope.fpOnSetup) {
            scope.fpOnSetup({
                fpItem: vp
            });
        }
        element.on('click', function (e) {
            scope.$apply(function () {
                ngModel.$setViewValue(vp.selectedDateObj);
            });
        });

    }

    return directive;
}
/*eslint-enable*/
