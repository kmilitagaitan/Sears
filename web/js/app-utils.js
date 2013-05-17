/* This is a place to consolidate all custom utility functions we create that can be used by multiple controllers, services, directives, etc. */

function isEmptyOrNull(str) {
    if (str != '' &&
        str != "" &&
        str != null &&
        str != "null" &&
        str != undefined &&
        str != "undefined" &&
        str.trim().length > 0) {
        return false;
    } else {
        return true;
    }
}

function getUrlParamValue(name) {
    var val = null;
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)'))
        .exec(location.href)) {
        val = decodeURIComponent(name[1]);
        if (val != null) {
            // Strip away AngularJS part of URL parameter if present
            if (val.indexOf('#/', val.length - '#/'.length) !== -1) {
                val = val.substring(0, val.length - '#/'.length);
            }
        }
    }
    return val;
};

function getAppConfigUrl(appId, envId) {
    if (!isEmptyOrNull(appId) && !isEmptyOrNull(envId)) {
        var jsonQuery = "q={application.id:'" + appId + "',environment.id:'" + envId + "'}";
        var configUrl = REMOTE_APP_CONFIG_URL.substring(0, REMOTE_APP_CONFIG_URL.indexOf('q=')) + jsonQuery;
        //console.log("App configUrl: " + configUrl);
        return configUrl;
    } else {
        console.log("Unable to construct a valid app config url from the input parameters provided. appId=" + appId + ", envId=" + envId);
        return null;
    }
};

function getIOSVersion(){
    console.log("User Agent: " + navigator.userAgent);
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    if( iOS ){
        var split = navigator.userAgent.split("CPU iPhone OS ");
        var version = split[1].charAt(0);
        if(version>=6){
            return true;
        }else{
            return false;
        }
//        var iOS6 = ( navigator.userAgent.match('CPU iPhone OS 6_') ? true : false )
//        return iOS6;
    }
    return iOS;
};


// A generic function to notify iOS native app that something of interest has happened in the main web view...
// We will add a way to pass arguments along with the function name next...
function invokeNativeMethod (methodName) {
    //console.log("I am tying to invoke native");
    // Device OS & isHybridApp
    var userAgent = navigator.userAgent;
                        
    //if (userAgent.indexOf('MobileDevice=ios') > -1) {
    if (localStorage.isHybridApp && localStorage.deviceOS == "ios") {
        console.log("I am iOS");
        var iFrame = document.createElement("IFRAME");
        iFrame.setAttribute("src", "nativeMethod://" + methodName);
        document.body.appendChild(iFrame);
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null; 
    }
};

function isKmart ()
{
    
}


function setOrCreateMetaTag(metaName, name, value) {
    console.log("Setting iTunes meta tag...");
    console.log("appId value:  ", localStorage.appId);
    myValue = value;

    if (getIOSVersion() && localStorage.appId == "sears") {
        myValue = "app-id=305449194";
    } else {
        if (getIOSVersion()) {
            myValue = "app-id=335989871";
        }
    }
    var t = 'meta['+metaName+'='+name+']';
    var mt = $(t);
    if (mt.length === 0) {
        t = '<meta '+metaName+'="'+name+'" />';
        mt = $(t).appendTo('head');
    }
    mt.attr('content', myValue);
    console.log("tag = ", myValue);
};

/*
function setOrCreateMetaTag(metaName, name, value) {
    console.log("Setting iTunes meta tag...");
    console.log("appId value:  ", localStorage.appId);
    myValue = value;
    if (getIOSVersion()) {
        if (localStorage.appId === "sears") {
            myValue = "app-id=305449194";
        } else if (localStorage.appId === "kmart") {
            myValue = "app-id=335989871";
        }
    }
    var t = 'meta['+metaName+'='+name+']';
    var mt = $(t);
    if (mt.length === 0) {
        t = '<meta '+metaName+'="'+name+'" />';
        mt = $(t).appendTo('head');
    }
    mt.attr('content', myValue);
    console.log("tag = ", myValue);
};
*/
