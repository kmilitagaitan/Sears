angular.module('deals_promos_filters',[])
.filter('groupedBy', function() {
        return function(input, filter) {
            var categories = {};
            var catArray=[];
            var products= input;

            for (i = 0; i < products.length; i++) {
                var product = products[i];
                product.indexPointer= i;
                var groupName= product[filter];

                if (!categories[groupName]) {
                    categories[groupName]={
                        name: groupName,
                        count: 1,
                        products: new Array(product),
                        checked:true
                    }
                } else {
                    var groupObj= categories[groupName];
                    groupObj.count=  groupObj.count + 1;
                    groupObj.products.push(product);
                    categories[groupName]= groupObj;
                }
            }

            for(var obj in categories){
                catArray.push(categories[obj]);
            }

            return catArray ;
        }
    });
