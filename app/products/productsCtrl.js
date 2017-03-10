(function() {
 const app = angular.module('myApp');
 
 app.controller('productsCtrl', [
    'tabs',
    '$http',
    '$scope', 
    productsController
  ]);
  
  app.filter('getTotalList', function() {
     return function(input) {
      input = input || [];
      let arr = [];
      let total = 0;

      for(let i in input) {
        total += input[i].price;
        arr.push(input[i]);
      }

      arr.push(total);
      return arr;
    }
  });

   


  function productsController(tabs, $http, $scope) {
    //garantido o scopo corretamente dentro do controller e das funções
    const vm = this;
    let idProduct = 3;
    vm.msgSuccess = false;
    const toggleMsgSuccess = function() {
      vm.msgSuccess = vm.msgSuccess === false ? true : false;
    };

    $http.get('./database.json').then(function(result) {
          vm.list = result.data;
    });

    vm.create = function() {
      idProduct++;
      vm.product._id = idProduct;
      vm.product.created_at = new Date();
      vm.list.push(vm.product);
      vm.msgSuccess = true;
      vm.refresh();
       setTimeout(function(){
        toggleMsgSuccess();
        $scope.$digest();
      }, 10000);
     
     
      
    };

    vm.update = function() {
      vm.list[vm.index] = vm.product;
      vm.refresh();
    }

    vm.delete = function() {
      vm.list.splice(vm.index, 1);
      vm.refresh();
    } 

    vm.refresh = function() {
      vm.product = {};
      tabs.show(vm, {tabList: true, tabCreate: true});
    }

    vm.showTabUpdate = function(product, index) {
      vm.product = product;
      vm.index = index;
      tabs.show(vm, {tabUpdate: true});
    }

    vm.showTabDelete = function(product, index) {
      vm.product = product;
      vm.index = index;
      tabs.show(vm, {tabDelete: true});
    }

    vm.refresh();

  }
})();