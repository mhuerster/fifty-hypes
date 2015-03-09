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
      
      $scope.open          = false;
      $scope.twitterLink   = "<a href='https://twitter.com/intent/tweet?screen_name=50hypocrites' class='twitter-mention-button'>Tweet to @50hypocrites</a>";
      $scope.twitterScript = "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";

      $scope.generateModal = function(stateData) {

        // If no image, use default. Refactor this
        console.log("This is statedata image")
        console.log(stateData.image)

        if(stateData.image == "  "){
          console.log(" NO IMAGE")
          stateData.image = "assets/shame_on_you.png";
        }

        return   "<div id='state-modal-container'>"+
          "<h4>"+(stateData.peo)+"</h4><img src='"+(stateData.image)+"' style='width:200px'>"+
          "<table>"+
            "<tr><td>Profession:</td><td>"+(stateData.prof)+"</td></tr>"+
            "<tr><td>State:</td><td>"+(stateData.stateName)+"</td></tr>"+
            "<tr><td>Heritage:</td><td>"+(stateData.desc)+"</td></tr>"+
          "</table>"+ 
          $scope.twitterLink +
          $scope.twitterScript +
          "</div>"

        }

      $scope.drawMap = function(mapId, data){
        
        function showModal(stateData){

          var hypStateData = data[stateData.id];

          d3.select("#state-modal").transition().duration(200).style("opacity", .99);             
          $("#state-modal").html($scope.generateModal(hypStateData));  
          d3.select("#state-modal").style("left", (d3.event.pageX) - 120 + "px").style("top", (d3.event.pageY - 180) + "px");      
          $scope.open = true;
        }
        
        function hideModal(){
          console.log("hide modal invoked")
          d3.select("#state-modal").transition().duration(200).style("opacity", 0);      
          $scope.open = false;
        } 

        function toggleModal(stateData) {
          console.log("toggle modal invoked")
          if($scope.open) {
            hideModal();
          } else {
            showModal(stateData);
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
          .on("click", toggleModal)
          .on("mouseover", function(){
            console.log("hover over state")
            console.log(this)
          });
      
        // Click outside map to close modal

        // document.getElementById('outer-container').onclick = function(e) {
        //   if(e.target == document.getElementById('outer-container')) {
        //     console.log("Clicked outside")  
        //     hideModal();  
        //   }
        //   else {
        //     console.log("Didnt click outside")    
        //   }
        // }
      }

      // Invoke drawMap() to create the map with data populated in $scope.data
      $scope.drawMap("#statesvg", $scope.data);

      // $watch function to potentially use later
      // $scope.$watch('exp', function (newVal, oldVal) {
      // });
    }
  };
});