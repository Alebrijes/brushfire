angular.module ('brushfire_videosPage', [])
.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
        ]);
});


angular.module('brushfire_videosPage').controller('PageCtrl', [
    '$scope', '$timeout', 
    function ($scope, $timeout) {

        $scope.videosLoading = true;

        $timeout(function afterRetrievingVideos () {
            var _videos = [{
            title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
            src: 'https://www.youtube.com/embed/9bZkp7q19f0'
        },
        {
            title: 'Justin Bieber - Baby ft. Ludacris',
            src: 'https://www.youtube.com/embed/kffacxfA7G4'
        },
        {
            title: 'Charlie bit my finger - again !',
            src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
         }];

         $scope.videosLoading = false;

         $scope.videos = _videos;
        }, 750);

        

        $scope.submitNewVideo = function () {
            if ($scope.busySubmittingVideo) {
                return;
            }

            var _newVideo = {
                title: $scope.newVideoTitle,
                src: $scope.newVideoSrc
            };

            var parser = document.createElement('a');

            var parser = document.createElement('a');
            parser.href = _newVideo.src;
            var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);
            _newVideo.src = 'https://www.youtube.com/embed/' +  youtubeID;

            $scope.busySubmittingVideo = true;

            $timeout(function() {
                $scope.videos.unshift(_newVideo);
                $scope.busySubmittingVideo = false;
                $scope.newVideoTitle = '';
                $scope.newVideoSrc = '';

            }, 750);

        };


}]);



/* $(function whenDomIsReady() {
    $('.submit-video-form').submit(function(e) {
        e.preventDefault();

        var newVideo = {
            title: $('.submit-video-form input[name="title"]').val(),
            src: $('.submit-video-form input[name="src"]').val()
        };

        $('.the-submit-video-form').val('');
        $('.submit-video-form button').text('Submitting...');
        $('.submit-video-form button').prop('disabled', true);

        var parser = document.createElement('a');
        parser.href = newVideo.src;
        var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);
        newVideo.src = 'https://www.youtube.com/embed/' +  youtubeID;

        console.log(newVideo.src);

        setTimeout(function() {
            var newVideoHtml = '<li class="video">' +
                    '<h2>' + newVideo.title + '</h2>' +
                    '<iframe width="640" height="390" src="' + newVideo.src + '" frameborder="0" allowfullscreen></iframe>' +
                    '</li>';

            $('.the-list-of-videos').prepend(newVideoHtml);
            $('.submit-video-form button').text('Submit Video');
            $('.submit-video-form button').prop('disabled', false);

        }, 750);
    });



    $('.the-list-of-videos .loading').show();

    setTimeout(function afterRetrievingVideos() {
        var videos = [{
            title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
            src: 'https://www.youtube.com/embed/9bZkp7q19f0'
        },
        {
            title: 'Justin Bieber - Baby ft. Ludacris',
            src: 'https://www.youtube.com/embed/kffacxfA7G4'
        },
        {
            title: 'Charlie bit my finger - again !',
            src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
         }];

        $('.the-list-of-videos .loading').hide();

        var videosHtml = _.reduce(videos, function(html, video) {
            html += '<li class="video">' +
                    '<h2>' + video.title + '</h2>' +
                    '<iframe width="640" height="390" src="' + video.src + '" frameborder="0" allowfullscreen></iframe>' +
                    '</li>';
            return html;
        }, '');

        $('.the-list-of-videos ul').replaceWith(videosHtml);

    }, 750);
});*/
