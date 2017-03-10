(function() {
  angular.module('myApp').controller('productsCtrl', [
    'tabs',
    '$http', 
    productsController
  ])

  function productsController(tabs, $http) {
    //garantido o scopo corretamente dentro do controller e das funções
    const vm = this;
    let idProduct = 3;
    vm.msgSuccess = false;

    $http.get('./database.json').then(function(result) {
          vm.list = result.data;
          vm.calculateValue();
    });

    vm.create = function() {
      idProduct++;
      vm.product._id = idProduct;
      vm.product.created_at = new Date();
      vm.list.push(vm.product);
      vm.refresh();
      vm.msgSuccess = true;
      setTimeout(function(){
        vm.msgSuccess = false;
      }, 5000);
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
      vm.calculateValue();
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

    vm.calculateValue = function() {
      let total = 0;
      let products = vm.list;
      
      for(let i in products) {
        total += products[i].price;
      }

      vm.total = total;
    }

    vm.refresh();

  }
})();