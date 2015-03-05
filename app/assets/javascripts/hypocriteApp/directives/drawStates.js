hypocriteApp.directive('drawStates', function () {
  // define constants and helpers used for the directive
  // ...
  return {
    restrict: 'A', // the directive can be invoked only by using <div my-directive></div> tag in the template
    scope: {
        stateBoundaries: '=',  // Object containing coordinates
        data: '=',
        tooltipFunction: '='   // Get rid of this later. Each state can be its own instance of a directive, with tooltip and everything.
    },
    templateUrl: "assets/hypocriteApp/templates/states.html",
    link: function ($scope, element, attrs) {		
		// Suggested idea:
		// 1) Click state: open the tooltip. Click again, close it
		$scope.open = false;
		$scope.draw = function(id, data, toolTip){
			function mouseOver(p){
				d3.select("#tooltip").transition().duration(200).style("opacity", .99);      
				
				d3.select("#tooltip").html(toolTip(p.n, data[p.id]))  
					.style("left", (d3.event.pageX) - 20 + "px")     
					.style("top", (d3.event.pageY - 180) + "px");
			}
			
			function mouseOut(){
				d3.select("#tooltip").transition().duration(200).style("opacity", 0);      
			}	

			function toggle(p) {
				if ($scope.open) {
					mouseOut();
					$scope.open = false;
				} else {
					mouseOver(p);
					$scope.open = true;
				}
			}
			
			d3.select(id).selectAll(".state")
				.data($scope.stateBoundaries)
				.enter()
				.append("path")
				.attr("class","state")
				.attr("d", function(p){ return p.d;})
				.style("fill",function(p){ return $scope.data[p.id].color; })
				.on("click", toggle);
		}

		// Draw states on the state svg
        $scope.draw("#statesvg", $scope.data, $scope.tooltipFunction);

        // We could keep track of a selected state, on click, etc
        // Nothing useful here.
        $scope.$watch('exp', function (newVal, oldVal) {
            // ...
        });
    }
  };
});