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

      $scope.generateModal = function(n, p) {
       
        console.log("generateModal function invoked")

       //  return   "<h4>"+(p.peo)+"</h4><img src='"+(p.image)+"' style='width:200px'>"+"<table>"+
          // "<tr><td>Profession:</td><td>"+(p.prof)+"</td></tr>"+
          // "<tr><td>State:</td><td>"+(p.state)+"</td></tr>"+
          // "<tr><td>Heritage:</td><td>"+(p.desc)+"</td></tr></table>"+ "<a href='https://twitter.com/intent/tweet?screen_name=goldstein_andr' class='twitter-mention-button' data-related='goldstein_andr'>Tweet to @DanaRohrabacher </a>"+
       //      "<h1> TWITTER HERE </h1>" 
        return "<div each-state> THIS IS THE MODAL </div>"

        // get each state's template to render here using eachState directive 
        // Either cache templates, grab templates from url (use a library)

        }

  		$scope.drawMap = function(id, data){
  			
        function showModal(p){
          console.log("show modal invoked")
  				d3.select("#tooltip").transition().duration(200).style("opacity", .99);      
  				d3.select("#tooltip").html($scope.generateModal(p.n, data[p.id]))  
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

      $scope.drawMap("#statesvg", $scope.data);

      $scope.$watch('exp', function (newVal, oldVal) {
      });
    }
  };
});