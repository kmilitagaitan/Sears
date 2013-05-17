function shareCtrl($scope, socialShare) {
    $scope.title = socialShare.shareService.nameofProd;
    $scope.facebooklike="//www.facebook.com/plugins/like.php?href="+ $scope.facelink+"&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21"
    $scope.subject="Check out This product from Sears";
    $scope.currentdate = new Date();
    $scope.price=socialShare.shareService.price;
    $scope.facelink = encodeURIComponent(socialShare.shareService.winLoc);
    $scope.linked = socialShare.shareService.winLoc;
    $scope.body="Hello%0D%0A%0D%0A" +
        "I came across this "+encodeURIComponent($scope.title)+" at Sears.com and I thought you might be interested. Check it out..." +
        "%0D%0A%0D%0A"+$scope.price+" As of : "+($scope.currentdate.getMonth()+1) +"/"+ $scope.currentdate.getDate()+"/"+$scope.currentdate.getFullYear()+
        "%0D%0A%0D%0A"+$scope.linked+"%0D%0A%0D%0AThanks,%0D%0A"+$scope.name  ;
    //$scope.button  =    $scope.linked;
    $scope.url= ("mailto:?subject="+$scope.subject+"&body="+$scope.body).replace(" ", "%20");
    $scope.tweetinfo="Buy "+$scope.title;



}



