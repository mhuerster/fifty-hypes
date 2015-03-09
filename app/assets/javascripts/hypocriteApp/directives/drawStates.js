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

      $scope.generateModal = function(stateData) {

        return   "<div ng-hide='hidden'>"+"<h4>"+(stateData.peo)+"</h4><img src='"+(stateData.image)+"' style='width:200px'>"+"<table>"+
          "<tr><td>Profession:</td><td>"+(stateData.prof)+"</td></tr>"+
          "<tr><td>State:</td><td>"+(stateData.stateName)+"</td></tr>"+
          "<tr><td>Heritage:</td><td>"+(stateData.desc)+"</td></tr></table>"+
          "<a href='https://twitter.com/intent/tweet?screen_name=goldstein_andr' class='twitter-mention-button' data-related='goldstein_andr'>Tweet to @DanaRohrabacher </a>"+
            "<a href='https://twitter.com/intent/tweet?screen_name=50hypocrites' class='twitter-mention-button'>Tweet to @50hypocrites</a>"+ 
            "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"+"</div>"
        }

  		$scope.drawMap = function(mapId, data){
  			
        function showModal(stateData){

          var hypStateData = data[stateData.id]; // p.id is state acronym/id

  				d3.select("#state-modal").transition().duration(200).style("opacity", .99);      
  				d3.select("#state-modal").html($scope.generateModal(hypStateData))  
          .style("left", (d3.event.pageX) - 120 + "px")     
          .style("top", (d3.event.pageY - 180) + "px");          
  			}
  			
  			function hideModal(){
          console.log("hide modal invoked")
  				d3.select("#state-modal").transition().duration(200).style("opacity", 0);      
  			}	

  			function toggleModal(stateData) {

          if($scope.open) {
  					hideModal();
  					$scope.open = false;
  				} else {
  					showModal(stateData);
  					$scope.open = true;
  				}
  			}

  			d3.select(mapId).selectAll(".state")
  				.data($scope.stateBoundaries)
  				.enter().append("path")
  				.attr("class","state")
          .attr("d", 
            function(stateData){ 
              return stateData.d;
          })
  				.style("fill",function(stateData){ 
            return $scope.data[stateData.id].color; 
          })
          .on("click", toggleModal);
  		}

      // Invoke drawMap() to create the map with data populated in $scope.data
      $scope.drawMap("#statesvg", $scope.data);

      $scope.$watch('exp', function (newVal, oldVal) {
      });
    }
  };
});