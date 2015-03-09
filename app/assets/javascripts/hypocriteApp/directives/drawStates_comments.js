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

        
        // return "something"
        // How do I reach test.html? 
        // return "./javascripts/hypocriteApp/templates/test.html"

        return   "<div ng-hide='hidden'>"+"<h4>"+(stateData.peo)+"</h4><img src='"+(stateData.image)+"' style='width:200px'>"+"<table>"+
          "<tr><td>Profession:</td><td>"+(stateData.prof)+"</td></tr>"+
          "<tr><td>State:</td><td>"+(stateData.stateName)+"</td></tr>"+
          "<tr><td>Heritage:</td><td>"+(stateData.desc)+"</td></tr></table>"+
          "<a href='https://twitter.com/intent/tweet?screen_name=50hypocrites' class='twitter-mention-button'>Tweet to @50hypocrites</a>"+ 
          "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"+"</div>"
        // return "<div each-state> THIS IS THE MODAL </div>"

        // get each state's template to render here using eachState directive 
        // Either cache templates, grab templates from url (use a library)

        }

      $scope.drawMap = function(mapId, data){
        
        function showModal(stateData){

          var hypStateData = data[stateData.id]; // p.id is state acronym/id
        
          console.log("show modal invoked p")

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
        
        // D3 STUFF 
        // Comments @andrew @date March 8

        d3.select(mapId).selectAll(".state")
          .data($scope.stateBoundaries)
          .enter().append("path")
          // applies css class .state
          .attr("class","state")
          // this runs for each datum
          // shape of an SVP path element is defined by one attribute: d
          // THIS FUNCTION IS KEY, WHERE I DEFINE STATEDATA, TO BE USED ELSEWHERE
          // This attribute, d, contains a series of commands and parameters in the SVG Path Mini-Language.
          // These commands and parameters are a sequential set of instructions for how to "move the pen over the paper".
          .attr("d", 
            function(stateData){ 
              console.log("p in d3 function")
              console.log(stateData)
              // We're basically telling it how to draw the map here! We're returning the instructions for how to draw
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

      $('html').click(function(){
        console.log("Clicked on html")
        $scope.hidden = true;
        console.log($scope.hidden);
      });
    }
  };
});