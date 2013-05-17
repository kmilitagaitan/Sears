/**
* jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
* Common usage: wipe images (left and right to show the previous or next image)
*
* @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
* @version 1.0 (15th July 2010)
*/

(function($) {
$.fn.touchwipe = function(settings) {
var config = {
min_move_x: 20,
min_move_y: 20,
wipeLeft: function() { alert("left"); },
wipeRight: function() { alert("right"); },
preventDefaultEvents: false
};

if (settings) $.extend(config, settings);

this.each(function(index, elem) {
var startX;
var startY;
var isMoving = false;

function cancelTouch() {
this.removeEventListener('touchmove', onTouchMove);
startX = null;
startY = null;
isMoving = false;
}

function onTouchMove(e) {

    if(isMoving) {
        var x = e.touches[0].pageX;
        var dx = startX - x;
        var y = e.touches[0].pageY;
        var dy = startY - y;

        if(Math.abs(dy)/Math.abs(dx)<1.73){
            e.preventDefault();
            if(Math.abs(dx) >= config.min_move_x) {
                cancelTouch();
                if(dx > 0) {
                    config.wipeLeft();
                }
                else {
                    config.wipeRight();
                }
            }
        }else{
            if(Math.abs(dy) >= config.min_move_y){
                cancelTouch();
            }
        }
    }
}

function onTouchStart(e)
{
    if (e.touches.length == 1) {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
    isMoving = true;
    this.addEventListener('touchmove', onTouchMove, true);
    }
}

this.addEventListener('touchstart', onTouchStart, true);

});

return this;

};
})(jQuery); 