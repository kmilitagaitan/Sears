/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 var virtualCardBalance,virtualCardImgUrl,virtualCardPinNumber,virtualCardAccNumber;
 var isGcNumValid = false;
 var isPinValid = false;
 var iscaptchaEnteredflag = false;
function  checkBalanceCtrl($scope,$location,$rootScope,$http,CheckBalance){
        console.log("checkBalanceCtrl....");
         isGcNumValid = false;
		isPinValid = false;
		iscaptchaEnteredflag = false;
        $scope.submit = function() {
        console.log("Inside submit...");
		if(isGcNumValid == true && isPinValid == true && iscaptchaEnteredflag == true)
		{
						
        var giftCardNumber = $scope.giftCardNumber;
        var pin = $scope.pin;
        $rootScope.giftCardNumber= $scope.giftCardNumber;
        $rootScope.pin =  $scope.pin;
        
        
        console.log("Inside submit ....it is"+$scope.giftCardNumber);
        var validationResult = validate($rootScope);
        if(validationResult)
        {    
			CheckBalance.query(function(data){
                parseJson(data,$rootScope,$location);
			});
        }}
        }
        $scope.reloadRecaptcha = function ()
        {
            console.log("it is reloading");
            
            Recaptcha.reload();
        }
    }
	
	
     function validate($rootScope)
    {
		return true;
		//once validation messages are finalized below code to be executed.
        console.log("in validate");
       // console.log($rootScope.giftCardNumber);
        if($rootScope.giftCardNumber == null )
        { 
            
            showErrorDialog("GiftCard Number is empty");
            document.getElementById("giftCardNumber").focus();
            return false;
        }  
        else if($rootScope.pin == null )
        { 
            document.getElementById("pinNumber").focus();
            showErrorDialog("Pin Number is empty");
            
            return false;
        }else if($rootScope.giftCardNumber.length <16 )
        {
            document.getElementById("giftCardNumber").focus();
            showErrorDialog("Please enter 16 digit gift card number");
            
            return false;
        }else if($rootScope.pin.length <8 )
        {
             document.getElementById("pinNumber").focus();
            showErrorDialog("Please enter 8 digit gift card pin number");
            
            return false;
        }else if(document.getElementById("giftCardresponsefield").value == null || document.getElementById("giftCardresponsefield").value =="")
        {
             document.getElementById("giftCardresponsefield").focus();
            showErrorDialog("Please enter CAPTCHA");
            
            return false;
        }
           
        return true;
    }

    function showErrorDialog(errMsg)
    {
        document.getElementById('checkBalancealerttext').innerHTML = errMsg;
    }
	function parseJson(data,$rootScope,$location)
    {
        var statusCode = data.GiftCardBalanceResponse.StatusData.ResponseCode;
        var balance = data.GiftCardBalanceResponse.Balance;
      
        if(statusCode == "0"){
                console.log("Action is successful...");
                $rootScope.balance = balance;
                $location.path('/giftCard/giftCardResult');
            }else
            {
                console.log("Inside else...");
                showErrorDialog(data.GiftCardBalanceResponse.StatusData.ResponseDescription);
            }    
    }
    function parse(responseData){
        if (window.DOMParser)
            {
                var parser=new DOMParser();
                xmlDoc=parser.parseFromString(responseData,"text/xml");
            }
            var balanceNode = xmlDoc.getElementsByTagName("Balance");
            var balance = xmlDoc.getElementsByTagName("Balance")[0].childNodes[0].data;
            console.log(xmlDoc.getElementsByTagName("Balance")[0].childNodes[0].data);
            var statusCode = xmlDoc.getElementsByTagName("ResponseCode")[0].childNodes[0].data;
            if(statusCode == "0"){
                console.log("Action is successful...");
                $rootScope.balance = balance;
                $location.path('/giftCard/giftCardResult');
            }else
            {
                console.log("Inside else...");
                showErrorDialog(xmlDoc.getElementsByTagName("ResponseDescription")[0].childNodes[0].data);
            }    
    }
    function sendRequest($rootScope,$http,url,$location)
{
    var requestData = {};
    $http.post(url, requestData).success(
        function(responseData) {
            console.log(responseData);
            if (window.DOMParser)
            {
                var parser=new DOMParser();
                xmlDoc=parser.parseFromString(responseData,"text/xml");
            }
            var balanceNode = xmlDoc.getElementsByTagName("Balance");
            var balance = xmlDoc.getElementsByTagName("Balance")[0].childNodes[0].data;
            console.log(xmlDoc.getElementsByTagName("Balance")[0].childNodes[0].data);
            var statusCode = xmlDoc.getElementsByTagName("ResponseCode")[0].childNodes[0].data;
            if(statusCode == "0"){
                console.log("Action is successful...");
                $rootScope.balance = balance;
                $location.path('/giftCard/giftCardResult');
            }else
            {
                console.log("Inside else...");
                document.getElementById('checkBalancealerttext').innerHTML = xmlDoc.getElementsByTagName("ResponseDescription")[0].childNodes[0].data;
            }    
        });
}
function checkGCBalanceResultCtrl($scope,$rootScope,$location){

	if(getIOSVersion())
	{
		document.getElementById("pbbtn").style.display ="block";
	}
	else
	{
		document.getElementById("pbbtn").style.display = "none";
	}
    $scope.checkanothercard = function()
    {
        console.log("coming in location.path");
        $rootScope.giftCardNumber= "";
        $rootScope.pin = "";
        $location.path('/giftCard/checkBalance');
    };
    $scope.backpressed = function()
    {
		console.log("backpressed...");
        $location.path('/giftCard/checkBalance');
    };
}
    function  checkBalanceWSCtrl($scope,$rootScope){
    
            
    showRecaptcha();
    console.log("checkBalanceWSCtrl  ...");
//    console.log("PIN : "+pin);
//    console.log("Gift Card Number : "+giftCardNumber);
    console.log("using scope..." + $scope.giftCardNumber);
    console.log("using Rootscope..." + $rootScope.giftCardNumber);
    
}

function showRecaptcha() {
    console.log("above create");
    Recaptcha.create("6LfxHQgAAAAAAKXjHQOPd22G5ztJ3HPqlkl1kFEq", 'captchadiv', {
    
              
              
        tabindex: 1,
        theme: "clean",
        callback: function(){
            document.getElementById("recaptcha_reload").style.display="none";
            document.getElementById("recaptcha_switch_audio_btn").style.display="none";
            document.getElementById("recaptcha_whatsthis").style.display="none";
            document.getElementById("recaptcha_response_field").style.display="none";
            document.getElementById("recaptcha_logo").style.display="none";
            document.getElementById("recaptcha_tagline").style.display="none";
			setTimeout(function(){
			console.log('Inside timeout....');
			document.getElementById("recaptcha_image").style.width="304px";
			document.getElementById("recaptcha_image").style.height = "61px";
			document.getElementById("recaptcha_image").style.background = "black";
			document.getElementById("recaptcha_image").style.padding = "1px 0 0 0";
			document.getElementById("recaptcha_image").style.border = "1px #000 solid !important";
			document.getElementById("recaptcha_image").setAttribute("border", "1px #000 solid !important;");
			//document.getElementById("recaptcha_table").setAttribute("border", "1px gray !important;");
			$("#recaptcha_table").removeClass("recaptchatable");
           
			},3000);
            
		   
            console.log("Inside callback...");
        }
    });
}
function VirtualGiftCardRedirectionCtrl($location,$rootScope,$scope,GetVirtualGiftCardDetails,$routeParams)
{
  $("body").removeClass().addClass($rootScope.deviceType);
  
    console.log("param is" + $routeParams.param);
	if(getIOSVersion())
	{
		document.getElementById("pbimg").style.display ="block";
	}
	else
	{
		document.getElementById("pbimg").style.display = "none";
	}
     GetVirtualGiftCardDetails.query(function(data){
                // alert(data.Recommendations[0].title);
                // alert(data.VirtualGiftCardDetails.CardBalance);
                parseVirtualGC(data,$scope,$location);
				});
				$scope.goToHome = function()
                {
                      //$location.path('/');
					  window.open(window.location.origin,"_blank");
                };
                $scope.goToCheckBalance = function()
                {
                      $location.path('/giftCard/checkBalance');
                      $rootScope.giftCardNumber=virtualCardAccNumber ;
                };
}
function parseVirtualGC(data,$scope,$location){
                    
                virtualCardBalance=data.VirtualGiftCardDetails.CardBalance;
                virtualCardImgUrl  = data.VirtualGiftCardDetails.IMGURL;
                virtualCardPinNumber = data.VirtualGiftCardDetails.GiftCardAccountInfo.PinNumber;
                virtualCardAccNumber= data.VirtualGiftCardDetails.GiftCardAccountInfo.AccountNumber;
                $scope.virtualgiftCardBalance = virtualCardBalance;
                $scope.virtualgiftCardImageUrl = virtualCardImgUrl;
                $scope.virtualgiftCardAccountNumber = virtualCardAccNumber;
                $scope.virtualgiftCardPinNumber =virtualCardPinNumber;
                console.log('IN parse'+$scope.virtualgiftCardImageUrl);
               
    
}
function isNumberKeyGc(evt)
            {
				
				var charCode = (evt.which) ? evt.which : event.keyCode
				document.getElementById("gcnumerrimage").style.display="inline-block";
				console.log("length is"+document.getElementById("gcNumber").value.length);
				console.log("charCode"+charCode);
				if(document.getElementById("gcNumber").value.length > 15)
				{
					isGcNumValid = true;
					
					if(isGcNumValid == true && isPinValid == true && iscaptchaEnteredflag == true)
					{
					
						document.getElementById("checkBalance").className = "orange check-card";
					}
					
					document.getElementById("gcnumerrimage").src="/images/icon-confirmed.png";
					console.log("charCode is##"+charCode);
					if(charCode != 8)//for back key
					{	
						return false;
					}
					
					
				}
				else
				{
					
					isGcNumValid = false;
					document.getElementById("checkBalance").className = "check-card";
					document.getElementById("gcnumerrimage").src="/images/icon-error.png";
				}
                
                if (charCode!= 8 && (charCode < 48 || charCode > 57))
                    return false;
                
                return true;
            }
			
function chkGcLen(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if(document.getElementById("gcNumber").value.length > 15)
	{
		if(charCode != 8)
				return false;
	}
	if (charCode!= 8 && (charCode < 48 || charCode > 57))
                    return false;
					
		return true;
}
function chkPinLen(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if(document.getElementById("pinNumber").value.length > 7)
	{
		if(charCode != 8)
				return false;
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
					
		return true;
}				
function isNumberKeyPin(evt)
            {
				var charCode = (evt.which) ? evt.which : event.keyCode
				document.getElementById("gcpinerrimage").style.display ="inline-block";
				if(document.getElementById("pinNumber").value.length > 7)
				{
					isPinValid = true;
					if(isGcNumValid == true && isPinValid == true && iscaptchaEnteredflag == true)
					{
						document.getElementById("checkBalance").className = "orange check-card";
					}
					document.getElementById("gcpinerrimage").src="/images/icon-confirmed.png";
					if(charCode != 8)
						return false;
					
				}
				else
				{
					isPinValid = false;
					document.getElementById("checkBalance").className = "check-card";
					document.getElementById("gcpinerrimage").src="/images/icon-error.png";
				}
			
				console.log("charCode is"+charCode);
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
                
                return true;
            }
function isCaptchaEntered(evt)
			{
				
				var charCode = (evt.which) ? evt.which : event.keyCode;
				document.getElementById("captchaerrimage").style.display ="inline-block";
				if(document.getElementById("giftCardresponsefield").value.length > 0)
				{
					iscaptchaEnteredflag = true;
					if(isGcNumValid == true && isPinValid == true && iscaptchaEnteredflag == true)
					{
						document.getElementById("checkBalance").className = "orange check-card";
					}
					
					document.getElementById("captchaerrimage").src="/images/icon-confirmed.png";
				}
				else
				{
					iscaptchaEnteredflag = false;
					document.getElementById("checkBalance").className = "check-card";
					document.getElementById("captchaerrimage").src="/images/icon-error.png";
				}
			}
// This is the Controller which is called when "View all" button is clicked and is responsible for the card selection.

function PickCard($scope, $http,$rootScope,PickaCard) { 

$rootScope.deviceType="mobile";
console.log("app id : " + $rootScope.appId);
$rootScope.appId = "sears";
  $("body").removeClass().addClass($rootScope.deviceType).addClass($rootScope.appId);

  $("body").removeClass().addClass($rootScope.deviceType);

 //$scope.viewAll = function() {
     
  PickaCard.query(function(data) {
  //alert("data is:"+data);
          $scope.data= data;
          $scope.len=data.GiftCards.length;
         $scope.length=((data.GiftCards.length)/2-1);
          
          if(data.GiftCards.length%2==0)
              {
                   $scope.lengths=((data.GiftCards.length)/2-1);
              }
          
            else
              {
                   $scope.lengths=((data.GiftCards.length)/2);
              }
              
           var cards = {};
          for(var i=0,leng=data.GiftCards.length; i<leng ;i++)
              {
                 
                 cards[i] = data.GiftCards[i].IMGURL;
               
                    }
              
              $scope.cards = cards;
  });              

	$scope.test = function($index) {

for(var k=0;k<$scope.len;k++){
    document.getElementById("cardImg"+k).className ='original';
}
        document.getElementById("cardImg"+$index).className ='enlarge';
        
    }	

  $scope.firstColumn = function($index) {
document.getElementById("selectBtn").disabled = false;

$scope.id = $("#colmone"+$index).attr('pos'); 
for(var i=0;i<$scope.len;i++)
{
    if(i != $index){
        document.getElementById("colmone"+i).className ='original';
        document.getElementById("colmtwo"+i).className ='original';
    }
    else{
        document.getElementById("colmone"+$scope.id).className ='magnify';
        document.getElementById("colmtwo"+$scope.id).className ='original';
    }
}


$scope.image = $("#colmone"+$index).attr('src');  
};
 
 $scope.secondColumn = function($index) {
 $scope.image  = $("#colmtwo"+$index).attr('src'); 
 document.getElementById("selectBtn").disabled = false;
 $scope.id = $("#colmone"+$index).attr('pos'); 
for(var i=0;i<$scope.len;i++)
{
    if(i != $index){
        document.getElementById("colmtwo"+i).className ='original';
        document.getElementById("colmone"+i).className ='original';
    }
    else{
        document.getElementById("colmtwo"+$scope.id).className ='magnify';
        document.getElementById("colmone"+$scope.id).className ='original';
    }
}

};
 $scope.selectDesign="images/pickACard.jpg";
 
 //This function is for selecting the tapped image as a final design and exiting the popup on click of selectDesign button
 $scope.selectedDesign = function() {
document.getElementById("selectBtn").disabled = true;
$scope.SelectedImage = $scope.image ;
$scope.selectDesign=$scope.image ;

  $("#pickaCard").hide();
 for(var i=0;i<$scope.len;i++)
{
    document.getElementById("colmone"+i).className ='original';
    document.getElementById("colmtwo"+i).className ='original';
    }
    
}
//This function is for canceling the selection and exiting the popup

  $scope.cancel = function() {
  $("#pickaCard").hide();
 for(var i=0;i<$scope.len;i++)
{
    document.getElementById("colmone"+i).className ='original';
    document.getElementById("colmtwo"+i).className ='original';
    }
 };
 };
 

 function PersistHeader($scope, $http,$rootScope,PickaCard) { 
$rootScope.deviceType="mobile";
console.log("app id : " + $rootScope.appId);
$rootScope.appId = "sears";
  $("body").removeClass().addClass($rootScope.deviceType).addClass($rootScope.appId);
}

function isNumberKey(evt)
       {
          var charCode = (evt.which) ? evt.which : event.keyCode;
          if (charCode < 48 || charCode > 57)
             return false;

          return true;
       }

function AmountCheck(){
        var ref = document.referrer;
        var val = document.getElementById("giftCardAmountInput").value;
        if (val<10)
        {
            document.getElementById("giftCardAmountInput").value=10;
        }
        else if(val>500)
        {
            document.getElementById("giftCardAmountInput").value=500;
        }
    }
    
    
    
    function goBack()
    {
        window.history.back()
    }
    
    
    
    
  function checkValidation(){     
     var recipientEmail = document.getElementById('recipientEmail').value;
     var confirmEmail = document.getElementById('confirmEmail').value;  
      
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(recipientEmail)) {
    alert('Please provide a valid Recipient email address');
    document.getElementById('recipientEmail').focus;    
    }else if (!filter.test(confirmEmail)) {
    alert('Please provide a valid Confirm email address');
    document.getElementById('confirmEmail').focus;    
    }else if(recipientEmail!=confirmEmail){
            alert("Please provide same email address").show();
        }
 }