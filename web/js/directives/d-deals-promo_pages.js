/**
 * Created with JetBrains WebStorm.
 * User: sstalin
 * Date: 4/11/13
 * Time: 10:51 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('deals_promos_directives',[])
.directive('ellipsizeText', function(){
        return {
            restrict: 'A',
            link: function(scope, attrs, element){
                var el = element;

               /* console.log("into deals directive!!" + el.text) ;
                var keep = el.innerHTML;
                el.innerHTML('Maraba gazar!');*/

                while(el.scrollHeight > el.offsetHeight) {
                    console.log(el.scrollHeight + " and " + el.offsetHeight);
                    el.innerHTML = keep;
                    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
                    keep = el.innerHTML;
                    el.innerHTML = el.innerHTML + "...";

                }
            }
        }

    })
    .directive('reduceImage', function () {
        var hei, wid, hei, queryStr;

        return function (scope, element, attrs) {
            hei= attrs.hei;
            wid= attrs.wid;
            queryStr= '?hei='+ hei + '&wid=' + wid;

            var featuredProduct= attrs.reduceImage;
            if(scope[featuredProduct] && (featuredProduct != undefined)){
                 var oldUrl= undefined;
                if(scope[featuredProduct].hasOwnProperty('MainImageUrl')){
                    oldUrl= scope[featuredProduct].MainImageUrl;
                }else if(scope[featuredProduct].hasOwnProperty('mainImageUrl')){
                    oldUrl= scope[featuredProduct].mainImageUrl;
                }


                if(!(oldUrl.indexOf('?') < 0) && (oldUrl !== undefined)){

                    /*newUrl= oldUrl.split('?')[0] + queryStr;
                     attrs.ngSrc= newUrl;*/

                    attrs.ngSrc= oldUrl;
                }else{
                    attrs.ngSrc= oldUrl + queryStr;
                }
            }

        }
    });


