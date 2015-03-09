hypocriteApp.directive('drawStates', function () {

  return {
    
    restrict: 'A', 
    
    scope: {
        stateBoundaries : '=',  
        data            : '=',
        modalFunction   : '='    
    },
    
    // templateUrl: "assets/hypocriteApp/templates/states.html",
    
    link: function ($scope, element, attrs) {		
  		
  		$scope.open = false;

  		$scope.drawMap = function(id, data, generateModal){
  			
        function showModal(p){
          console.log("show modal invoked")
  				d3.select("#tooltip").transition().duration(200).style("opacity", .99);      
  				d3.select("#tooltip").html(generateModal(p.n, data[p.id]))  
  			}
  			
  			function hideModal(){
          console.log("hide modal invoked")
  				d3.select("#tooltip").transition().duration(200).style("opacity", 0);      
  			}	

  			function toggle(p) {
  				if($scope.open) {
  					hideModal();
  					$scope.open = false;
  				} else {
  					showModal(p);
  					$scope.open = true;
  				}
  			}
  			
  			d3.select(id).selectAll(".state")
  				.data($scope.stateBoundaries)
  				.enter()
  				.append("path")
  				.attr("class","state")
  				.attr("d", function(p){ return p.d;})
  				.style("fill",function(p){ 
            return $scope.data[p.id].color; 
          })
  				
          .on("click", toggle);
  		}

      $scope.drawMap("#statesvg", $scope.data, $scope.modalFunction);

      $scope.$watch('exp', function (newVal, oldVal) {
      });
    }
  };
});