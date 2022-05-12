  // $(".box").click(function(){

      //   alert("hou")  
      // }


      // var nextBox= position.next()


      // $(".box.blank").click(function(){
         
      //    nextBox.removeClass("pulse")
      // });      

      }     

    })
  })








// $(document).ready(function(){
//   $(".box.blank").click(function(){
//     $(this).attr("class", "box edta-large");
//     $(this).children("p").text("31")
//   });
// });


// var position
// var positionText
// var elementArray= []
// var arrayCounter= 0

// $(document).ready(function(){
//   $(".box.blank").click(function(){

//     position= $(this)
//     positionText= position.children("p")


//     var $this= $(this)

//     elementArray.push($this)


//     var anim = (function() {
//     var i = 0;
//     var step = 10;
//     var up = true;
//     var timer = null;

//     var next = function() {
//         if (up) {
//             i += step;
//         }
//         else {
//             i -= step;
//         }
//         if(i<0){i=0; up=true;}
//         if(i>255){i=255; up=false;}
//         update(i);
//     };

//     var update = function(i) {
//         $($this).css("border-color", 'rgb(' + i + ',' + i + ',' + 0 + ')');
//     };

//     var go = function() {
//         next();
//         timer = window.setTimeout(anim.go, 30);
//     };

//     var stop = function() {
//         if (timer) {
//             window.clearTimeout(timer);
//             timer = null;
//         }
//     };

//     var addClickHandler = function() {
//         $($this).click(function() {
//             window.clearTimeout(timer);
//             update(0);

//         });
//     };



//     return {
//         go: go,
//         stop: stop,
//         addClickHandler: addClickHandler 
//     };
//     }());

//     anim.addClickHandler();
//     anim.go();

//     arrayCounter += 1
    
//     if (arrayCounter > 1) {

//       arrayObject= elementArray[arrayCounter - 2]

//       // arrayObject.replaceWith("<div class='box blank'><p class='tubetype'></p></div>")
      

//     } 


//   });
// });
