
    'use strict';
    
angular.forEach('hmTap:tap hmDoubletap:doubletap hmHold:hold hmTransformstart:transformstart hmTransform:transform hmTransforend:transformend hmDragstart:dragstart hmDrag:drag hmDragend:dragend hmSwipe:swipe hmRelease:release'.split(' '), function(name) {
                var directive = name.split(':');
                var directiveName = directive[0];
                var eventName = directive[1];
                angular.module('swordfish').directive(directiveName,
        ['$parse', '$compile', 'zoomImage', function ($parse, $compile, zoomImage) {
            return{
                restrict: 'AC',
                link: function (scope, element, attr) {
                    var fn = $parse(attr[directiveName]);
                    var opts = $parse(attr[directiveName + 'Opts'])(scope, {});
                    element.hammer(opts).bind(eventName, function (event) {
                        scope.$apply(function () {
                            //                            if(directiveName == "hmTap"&&event.target.outerHTML){
                            //                                console.log("Doing stuff", event);
                            //                                element[0].childNodes[1].innerHTML = '<iframe class="hm-swipe hm-tap" src="http://www.expotv.com/video/embed/399366/e8dab219d8223c925ff86b3224ba5786?ratio=16:9&autoplay=true&fullscreen=true&width=1720" width="720" height="265" scrolling="no" frameborder="0" allowtransparency="yes"></iframe>' ;
                            if (directiveName == "hmTap" && event.currentTarget.localName == "thumb-image") {

                                if (typeof scope.$parent.photo === 'string') {
                                    var photoURL = scope.$parent.photo;
                                } else {
                                    var photoURL = scope.$parent.photo.video_thumb_URL;
                                    var photo = scope.$parent.photo;
                                }
                                if (photoURL.match("expo") == null) {
                                    zoomImage.zoomService.selectedImage = photoURL;
                                    if(zoomImage.zoomService.isImage == "false"){
                                    zoomImage.zoomService.isImage = "true";
                                    }else {
                                        zoomImage.zoomService.isImage = "false";
                                    }
                                    scope.$parent.openZoomModal();
                                }
                            }
                            else if (directiveName == "hmTap" && event.target.outerHTML) {
                               console.log( event) ;
                                if (typeof scope.collections === 'string') {
                                    var photoURL = scope.collections;

                                }
                                scope.$parent.open();
                                //                                if(element[0].attributes[0].nodeValue.match("hhs1")){
                                //                                    element.html('<iframe class="hm-swipe" src="http://www.expotv.com/video/embed/399366/e8dab219d8223c925ff86b3224ba5786?ratio=16:9&autoplay=true&fullscreen=true" width="320" height="265" scrolling="no" frameborder="0" allowtransparency="yes"></iframe>');
                                //                                }
                            }
                            else if (directiveName == "hmDoubletap" && event.target.outerHTML) {


                            }
                            else if (directiveName == "hmSwipe") {
                                if (event.gesture.direction == 'right') {
                                    scope.moveLeft();
                                } else if (event.gesture.direction == 'left') {
                                    scope.moveRight();
                                }
                                //                                scope.$parent.moveRight();
                                console.log("Doing stuff", event);
                                //                                fn(scope, {$event: event});
                            }
                        });
                    });
                }
            };
        }]);
});
angular.module('swordfish').directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    }
});
    
    var directives = angular.module('imageGallery.directives', []);
    var directivesScrolling = angular.module('scrollPosition.directives', []);
    var myfilter =  angular.module('phoneFilter', []);

    directives.directive('fullImage', function() {
        return {
            restrict: 'E',
            scope: {
                imgSrc: '&'
            },
            // The linking function will add behavior to the template
            link: function(scope, element, attrs) {
                scope.$watch("imgSrc()", function(newVal, oldVal) {
                    //re-render the template each time "imgSrc()" changes
                    element.html('<img src="'+ newVal +'" class="image">');
                });
            }
        }
    });

directives.directive('thumbImage', function() {
        return {
            restrict: 'E',
            scope: {
                imgSrc: '&'
            },
            link: function(scope, element, attrs) {
                var photoIndex = scope.$parent.$index;
                var photoElement = $(element);
                if(scope.$parent.photo == undefined){
                    var photoURL = "";
                    return;
                }
                if( typeof scope.$parent.photo === 'string')  {
                    var photoURL = scope.$parent.photo;
                } else{
                    var photoURL = scope.$parent.photo.video_thumb_URL;
                    var photo = scope.$parent.photo;
                }
                if(photoURL == "") return;

                var i;
                //bpc change hhs
                photoElement.addClass("hhs"+photoIndex);

                photoElement.html('<img src=' + photoURL + '>' + '<img class="playbutton" src="images/playbutton.png">');

                scope.$watch("imgSrc", function(newVal) {
                    var allThumbElems = $.makeArray($("div").find("thumb-image")),
                        isSelected = newVal === photoURL;

                    for(i = 0 ; i < allThumbElems.length; i++) {
                        $(allThumbElems[i]).removeClass("hhs0");
                        $(allThumbElems[i]).removeClass("hhs1");
                        $(allThumbElems[i]).removeClass("hhs2");
                        $(allThumbElems[i]).addClass("hhs"+i);
                    }

                    if(isSelected) {
                        for(i = 0 ; i < allThumbElems.length; i++) {
                            $(allThumbElems[i]).removeClass("selected")
                        }
                        photoElement.addClass("selected");
                        if( photoURL.match("expo")!= null){
                            var videourl =  "http://client.expotv.com/vurl/" + photoURL.slice(31,31+6)+"/e8dab219d8223c925ff86b3224ba5786";
                            photoElement.html('<a href="'+videourl+'">'+'<img src=' + photoURL + '><div class="playbutton showa" style=" color:#ffffff; text-align:center"><p style="width: 80%;margin-top: 3%;color:white!important">'+photo.review_title +' </p><img style= "margin-top:-13% !important; float:right; margin-right: 5%; vertical-align:text-top;width: 30px " src="images/playbutton.png"></div></a>');
                        }else{
                        photoElement.html('<div class="zoom-thumbnail"><img id="magglass" src=' + photoURL + '><div class="zoombutton show">' +
                            '<div class="inner-zoom"><img class="magnify-icon" src="images/zoom_in.png"></div></div>');
                    }
                } else {
                    if (photoURL.match("expo") != null) {
                        var videourl = "http://client.expotv.com/vurl/" + photoURL.slice(31, 31 + 6) + "/e8dab219d8223c925ff86b3224ba5786";
                        photoElement.html('<a href="' + videourl + '">' + '<img src=' + photoURL + '><div class="playbutton showa" style="color: #ffffff;text-align:center"><p style="width: 80%;margin-top: 3%;color:white!important">' + photo.review_title + ' </p><img  style="margin-top:-13% !important; float: right; margin-right: 5%; vertical-align:text-top;width: 30px" src="images/playbutton.png"></div></a>');
                    } else {
                        photoElement.html('<div class="zoom-thumbnail"><img id="magglass" src=' + photoURL + '><div class="zoombutton show">' +
                            '<div class="inner-zoom"><img class="magnify-icon" src="images/zoom_in.png"></div></div>');
                        }
                    }

                    function animate() {
                        var first = $(allThumbElems[0]);
                        first.css({left:200});
                        for (i = 1; i < allThumbElems.length; i++) {
                            var currentThumb = $(allThumbElems[i]);
                            var previousThumb = $(allThumbElems[i-1]);
                            currentThumb.css({left: previousThumb.position().left + 37})
                        }
                    }

                    if(isSelected) {
                        animate();
                    }
                });
            }
        }
    })


    directivesScrolling.directive('scrollPosition', function ($window) {
        return function (scope, element, attrs) {
            var w = element[0];
            //var w = $window;
            angular.element(w).bind('scroll', function () {
                scope.$apply(function () {
                    if (w.scrollTop + w.offsetHeight >= w.scrollHeight) {
                        scope.display_limit = scope.display_limit + 5;
                    }
                });
            });
        }
    });

    myfilter.filter('tel', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });


    directives.directive('thumbImagedesc', function() {
        return {
            restrict: 'E',
            scope: {
                imgSrc: '&'
            },
            link: function(scope, element, attrs) {
                var photoIndex = scope.$parent.$index,
                    photoElement = $(element),
                    photoX;
                scope.photo = scope.$parent.photo;
                //photoElement.html('<ul><li><img src=' + scope.photo.imgUrl + '></li><li>'+scope.photo.name+'</li><li>'+scope.photo.price+'</li> <ul>');
				 photoElement.html('<div class="pdprecommendation_carousel"><a href="#"><img src=' + scope.photo.image + '> <div class="pdpprices"><span class="tdesc">'+'$'+scope.photo.regularPrice+'</span> '+' <span class="pdpcarousel_regPrice">&nbsp;&nbsp;'+ '$'+scope.photo.salePrice+'</span><br> '+'member price' + '&nbsp;&nbsp;<span class="pdpcarousel_memberprice">'+'$'+scope.photo.SYWRPrice+'</span>'+'</div>'+ scope.photo.descriptionName +'</a></div>');


                scope.$watch("imgSrc()", function(newVal) {
                    var allThumbElems = $.makeArray($("div").find("thumb-image")),
                        isSelected = newVal === scope.photo,
                        index;

                    if(isSelected) {
                        photoIndex = 0;
                        //remove the selected class from previously selected item
                        for(index = 0 ; index < allThumbElems.length; index++) {
                            $(allThumbElems[index]).removeClass("selected")
                        }
                        photoElement.addClass("selected");
                    } else if ( photoIndex < newVal.index ) {
                        photoIndex = photoIndex + 1;
                        scope.photo.index = photoIndex;
                    }

                    function animate() {

                        var first = $(allThumbElems[0]),
                            last = $(allThumbElems[allThumbElems.length - 1]),
                            selectedX= photoElement.position().left + 25,
                           deltaX = selectedX - $(".imageContainer").width()*0.4;  //change the starting point of the thumnails
							//deltaX = selectedX;
                       // first.css({left:first.position().left - Math.floor(deltaX)});

                        for (index = 1; index < allThumbElems.length; index++) {
                            var currentThumb = $(allThumbElems[index]);
                            var previousThumb = $(allThumbElems[index-1]);
                            currentThumb.css({left: previousThumb.position().left + 37})
                        }
                        $('#thumbContainer').prepend(allThumbElems);
                    }
                    if(isSelected) {
                        animate();
                    }
                });
            }
        }
    })

directives.directive('footerstyle', [function(event) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('dragstart', function () {
                event.stopPropagation();
                event.preventDefault();
            });
        }
    }
}]);
directives.directive('navigate', [function() {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            //elem(0).trigger('click');
            elem.bind('click', function(e) {
                e.preventDefault();
            });
        }
    }
}]);


directives.directive('firstimage', [function ($compile, zoomImage) {
    return {
        restrict: 'CA',
        replace: false,
        transclude: false,
        scope: {
            index: '=index',
            item: '=itemdata',
            model: '=ngModel',
            isImage: '=imageCheck'
        },
        template: '<a href="{{item.img}}" class="navigate" data-size="500,400">' +
            '<img src="{{item.img}}" style="height: 15%"/></a>',
        link: function (scope, elem, attrs) {
            scope.$watch("isImage", function () {
                if(scope.index==0){
                jQuery(angular.element(attrs.options)).css({'display': 'none'}).smoothZoom('destroy');
                angular.element(attrs.firstoptions).css({'display': 'none'}).smoothZoom('destroy');
                var firstImg = scope.model;
                jQuery(angular.element(attrs.firstoptions)).attr('src', firstImg);
                jQuery(angular.element(attrs.firstoptions)).css({'display': 'block'}).smoothZoom('destroy').smoothZoom({
                    width: '100%',
                    height: '75%',
                    pan_BUTTONS_SHOW: "NO",
                    pan_LIMIT_BOUNDARY: "NO",
                    button_SIZE: 24,
                    button_ALIGN: "top left",
                    responsive: false,
                    responsive_maintain_ratio: true,
                    max_WIDTH: "",
                    max_HEIGHT: ""
                });
                }
            }, true);

            elem.bind('click', function () {
                angular.element(attrs.firstoptions).css({'display': 'none'}).smoothZoom('destroy');
                var src = scope.item.img;
                jQuery(angular.element(attrs.options)).css({'display': 'block'}).smoothZoom('destroy').css('background-image', 'url(css/zoom_assets/preloader.gif)').smoothZoom({
                    image_url: src,
                    width: '100%',
                    height: '75%',
                    max_WIDTH: 512,
                    max_HEIGHT: 300,
                    button_SIZE: 24,
                    button_ALIGN: "top left",
                    responsive: false,
                    pan_BUTTONS_SHOW: "NO",
                    pan_LIMIT_BOUNDARY: "NO",
                    responsive_maintain_ratio: true
                });
            })
        }
    }
}])
directives.directive('zoomdestroy', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                angular.element(attrs.options).css({'display': 'none'}).smoothZoom('destroy');
                angular.element(attrs.firstoptions).css({'display': 'none'}).smoothZoom('destroy');
            })
        }
    }
}])

directives.directive('videoscrollwrap', [function() {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            scope.images = scope.imageCount;
            scope.winWidth = window.innerWidth;
            scope.elemetWidth = scope.winWidth *0.8 +'px';
            scope.iScrollWidth = scope.winWidth *(scope.images+1) +'px';
            jQuery(angular.element(attrs.options)).css({'width':scope.iScrollWidth});
            jQuery(elem.css({'width':scope.elemetWidth}));

            var k_videoScroll = new iScroll(angular.element(attrs.scrollwrap)[0],{
                snap: true,
                bounce: false,
                checkDOMChanges: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
        }
    }
}])

    directives.directive('catimage', [function() {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                scope.image_count = scope.getCount();
                scope.winWidth = window.innerWidth;
                scope.elementWidth = scope.winWidth * 0.45 + 'px';
                scope.iScrollWidth = (scope.image_count-9.9)*scope.winWidth+'px';
                jQuery(angular.element(attrs.options)).css({'width':scope.iScrollWidth});
                jQuery(elem.css({'width':scope.elementWidth}));
                console.log("inside directive");
                var k_imageScroll = new iScroll(angular.element(attrs.scrollwrap)[0],{
                    snap: true,
                    bounce: false,
                    checkDOMChanges: false,
                    momentum: false,
                    hScrollbar: false,
                    vScrollbar: false

                });
            }
        }
    }])

directives.directive("scroll", function ($window) {
            return function(scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    if (this.pageYOffset >= 250) {
                        scope.boolChangeClass = true;

                    } else {
                        scope.boolChangeClass = false;

                    }
                    scope.$apply();
                });
            };
    });
