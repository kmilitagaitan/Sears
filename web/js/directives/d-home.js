angular.module('scroll.directives', [])
.directive('sfScroll', function(){
    console.log('AdditionalPromos scroll directive running...');
    return {
        replace: false,
        restrict: 'A',
        link: function(scope, element, attr) {

            var scroll_timeout = 5;
            var myScroll;

            function setScroll() {

                myScroll = new iScroll(document.getElementById('carousel-promos'), {
                    momentum: true,
                    hScroll: true,
                    vScroll: false,
                    hScrollbar: false,
                    bounce: true,
                    checkDOMChanges: true,
                    onRefresh: function (e) {

                        var numberOfPromos = $('#carousel-promos-list').find('li').length;
                        //console.log("numberOfPromos: ", numberOfPromos);

                        var promosWidth = (numberOfPromos*145);
                        var promosWidthPx = ((numberOfPromos*145) + "px");
                        //console.log("promosWidth: ", promosWidthPx);

                        $('#carousel-promos').find('.carousel-content').css('width', promosWidthPx);
                        $('#carousel-promos').find('#carousel-promo-list').css('width', promosWidthPx);


                        // console.log($('#carousel-promos').find('.carousel-content'));
                        function getScreenWidth()
                        {
                            xWidth = null;
                            if(window.screen != null)
                                xWidth = window.screen.availWidth;
                            if(window.innerWidth != null)
                                xWidth = window.innerWidth;
                            if(document.body != null)
                                xWidth = document.body.clientWidth;
                            return xWidth;
                        }

                        // code to center screen for 4 promos
                        var screenWidth = getScreenWidth();
                        //console.log('WIDTH', screenWidth);
                        if(screenWidth >= 320) {
                            var scrollPosition = (promosWidth/2) - (screenWidth/2);
                            this.scrollTo(-scrollPosition,0,500);
                        } 
                    },
                    onBeforeScrollStart: function ( e ) {


                        if ( this.absDistX > (this.absDistY + 5 ) ) {
                            // user is scrolling the x axis, so prevent the browsers' native scrolling
                            e.preventDefault();
                        } 
                    }
                });
                
            }

            scope.$watch(attr.sfScroll, function(value) {
                setTimeout(setScroll, scroll_timeout);
            });
        }
    }
});