	var app=angular.module("myApp",['ngRoute']);		
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/viewGaleries',{templateUrl:'./temp/viewGaleries.html',controller:'ViewGaleriesController'}).
		when('/viewArtists',{templateUrl:'./temp/viewArtists.html',controller:'ViewArtistsController'}).
		when('/addArtist',{templateUrl:'./temp/addArtist.html',controller:'AddArtistController'}).
		when('/addGalery',{templateUrl:'./temp/addGaleries.html',controller:'AddGaleryController'}).
		otherwise({redirectTo:'/viewArtists'});
	}]);

	app.controller('ViewGaleriesController', function($scope){
		$scope.message="this page will be used to display add student form";
	});
	app.controller('ViewArtistsController', function($scope){
		$scope.message="this page will be used to display all the students";
	});

	app.controller('AddGaleryController', function($scope){
		$scope.message="this page will be used to display all the students";
	});




	app.factory('ContactFactory' , function(){
		var service={};
		var uid=1;

		var contacts = [{
			id: 0,
			'name': 'pepe',
			'email': 'pepito22@gmail.com',
			'phone': '123-2343-44'
		}];

		service.save = function (contact) {
			if (contact.id == null) {
				contact.id = uid++;
				contacts.push(contact);
			} else {
				for (i in contacts) {
					if (contacts[i].id == contact.id) {
						contacts[i] = contact;
					}
				}
			}

		}

		service.get = function (id) {
			for (i in contacts) {
				if (contacts[i].id == id) {
					return contacts[i];
				}
			}

		}

		service.delete = function (id) {
			for (i in contacts) {
				if (contacts[i].id == id) {
					contacts.splice(i, 1);
				}
			}
		}


		service.list = function () {
			return contacts;
		}
		return service;

	});



	app.controller('AddArtistController', function($scope,ContactFactory){

		$scope.newcontact={};//se debe definir porq si no se agrega nada y se quiere editar al unico contacto de la lista tira un error, si hago un 	onfocus en algun campo para agregar hay ya no tira error ya que al tener la etiqueta ng-model te hace el objeto(vacio)

		$scope.showMe;
		//$scope.AUX="hola";


		$scope.contacts = ContactFactory.list();

		if(ContactFactory.list().length>0){
			$scope.showMe=true;
		}else{
			$scope.showMe=false;
		}



		$scope.saveContact=function(){

			if($scope.newcontact.name!=null && $scope.newcontact.email!=null && $scope.newcontact.phone!=null ){
				ContactFactory.save($scope.newcontact);
				if(ContactFactory.list().length>0){
					$scope.showMe=true;
				}else{
					$scope.showMe=false;
				}
				$scope.newcontact={};
			}
		}





		$scope.edit=function(id){
			var con;
		//$scope.AUX=id;
		$scope.newcontact=angular.copy(ContactFactory.get(id));
	};



	$scope.delete= function(id){
		var con;
		//$scope.AUX=id;
		ContactFactory.delete(id);


		if(ContactFactory.list().length>0){
			$scope.showMe=true;
		}else{
			$scope.showMe=false;
		}
		if(ContactFactory.list().length==0){
			$scope.newcontact={};
		}

	};


});