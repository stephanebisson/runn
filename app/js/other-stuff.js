angular.module('otherStuff', [])
    .directive('forkMeOnGithub', 
        [function(){
            return {
                template: '<a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a>'
            };
        }]);