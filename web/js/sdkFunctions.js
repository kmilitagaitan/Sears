
/**
 * @name wlccLogin
 * @description LOGIN, Takes as input the users email id and teh password he uses for his account and returns the response
 * @function
 * @param emailLoginId = the email id the user uses for his account
 * @param loginPassword = the password that the user has for his account 
 * @returns JSON RESPONSE 
 */

function wlccLogin(emailLoginId, loginPassword){
	var loginUrl = "http://mobile303p.dev.ch3.s.com:8180/wlcc_dispatcher/service/rest/UtilService/Login?in_loginId="+emailLoginId+"&in_logonPassword="+loginPassword;
  	// var loginUrl = "http://mobile303p.dev.ch3.s.com:8180/wlcc_dispatcher/service/rest/UtilService/Login?in_loginId="+emailLoginId+"&in_logonPassword="+loginPassword+"&in_store=10153";

  var jsonResponse = {};
	$.ajax({
		url: loginUrl,
		type: "POST",
		async: false,
		success: function(data) {
//			console.log("Login Success: " + data.LoginResponse.LoginRespData.clientSessionKey); 
			jsonResponse = data;
		},
		error: function(data) {
//			console.log("Login Failure: " + JSON.stringify(data));
		}
	});
	
	return jsonResponse;
}

/**
 * SAMPLE RESPONSE FROM LOGIN
 * 
 * {
 *	"LoginResponse": {
 * 	"ServiceHeaders": {
 *	"store": "10153"
 *	},
 *	"LoginRespData": {
 *	"clientSessionKey": "0000Mne4Nf3TWKOnCp_UdRUK2Th:17jnai4tu",
 *	"globalID": "39079222"
 *	},
 *	"StatusData": {
 *	"ResponseCode": "0",
 *	"RespMessage": "LOGIN SUCCESSFUL"
 * },
 * "ApiTracking": "Server: PROD-SERVER-403-1|Tracking ID: {1362687387198}|API Client Session Key: null|Time : Thu Mar 07 14:16:27 CST 2013|UID : 2668261102216266103|From Cache : N"
 *	}
 *	}
 * 
 */

/**
 * @name wlccAddToCart
 *  ADD TO CART, with this function you will be able to add an item to the cart 
 * if you would like to go through the whole checkout process do not add any pick up or delivery items for now. Also 
 * do not add a pick up item since the response in that case will requires some further action from your part
 * @function
 * 
 * @param sessionKey = For a register user you get the session key from the login wlccLogin function (json path: 
 
 
 data.LoginResponse.LoginRespData.clientSessionKey
 
 
 
 * @param sessionKey = For Guest user flow: on the first add to cart sent  as an empty string. 
 
  When you get the response, look for the sessionKey and save it so you can use the same on the next add to cart for the same user)
 
 * @param catEntryId = This number is found in the response of product details for the item to be added
 * @param quantity = Quantity of the item to be added
 * @param loginType = can either be "Guest" or "User", depending on if it is a guest or a register user
 * @param fulfillmentType = Possible values: "ship" or "delivery" (third possible value is "pickup" however the response contains stores in order for the user to pick one)
 * @param zipcode = Mandatory for delivery or pick up items. For shipping should be empty string 
 * 
 * @returns JSON RESPONSE 
 */

function wlccAddToCart(sessionKey, catEntryId, quantity, loginType, fulfillmentType, zipcode, catalogId, store, storeId){
    var baseAddToCartUrl = "http://mobile303p.dev.ch3.s.com:8180/wlcc_dispatcher/service/rest/";

    if(sessionKey == "" || sessionKey == null || sessionKey == undefined || sessionKey == "undefined"){
        baseAddToCartUrl = baseAddToCartUrl + "UtilService/AddtoCart?";
    }else{
        baseAddToCartUrl = baseAddToCartUrl + "cart/AddtoCart?"
    }

	// var addToCartUrl = "http://mobile303p.dev.ch3.s.com:8180/wlcc_dispatcher/service/rest/cart/AddtoCart?"+
    var addToCartUrl = baseAddToCartUrl +
    'in_sessionKey='+sessionKey+
	'&in_catentryId='+catEntryId+
	'&in_quantity='+quantity+
	'&in_loginId='+loginType+
	'&in_IndicatorA='+fulfillmentType+
	'&in_zipCode='+zipcode+
	'&in_editFT=false'+
    '&in_catalogId='+catalogId+
    '&in_store='+store+
    '&in_storeId='+storeId;
	
	var jsonResponse = {};
	
	$.ajax({
		url: addToCartUrl,
		type: "GET",
		async: false,
		success: function(data) {
//			console.log("Add To Cart Success "); 
			jsonResponse = data;
		},
		error: function(data) {
//			console.log("Add To Cart Failure: " + JSON.stringify(data));
		}
	});
	
	return jsonResponse;
}




