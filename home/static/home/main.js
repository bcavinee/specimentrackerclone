




// $(document).ready(function(){
//   $(".box.blank").click(function(){
//     $(this).attr("class", "box edta-large");
//     $(this).children("p").text("31")
//   });
// });


var position
var positionText
var elementArray= []
var arrayCounter= 0
var firstElement
var secondElement
var nextElement


$(document).ready(function(){
  $(".box.blank").click(function(){



    position= $(this)
    positionText= position.children("p")


    $(this).addClass("pulse")
    var $this= $(this)

    elementArray.push($this)

    arrayCounter += 1

    if (arrayCounter > 1) {

      arrayObject= elementArray[arrayCounter - 2]


      // arrayObject.replaceWith("<div class='box blank'><p class='tubetype'></p></div>")

      arrayObject.removeClass("pulse")
    } 


    
    try {
     


      if (secondElement[0] != position[0]) {
        
        secondElement.removeClass("pulse")
        

      }

      else if (secondElement[0] == position[0]) {

        secondElement.addClass("pulse")
      }



      if (firstElement[0] == $this[0]) {
        

        firstElement.addClass("pulse")

      }    


    }

    catch(err) {

      
    }    


  });
});




$(document).on('submit',"#accession-form", function(e) {


    e.preventDefault();
    
    

    $.ajax({

      url: '',
      type: 'POST',
      data: {
        accessionNumber : $('#accession-number').val(),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        
        
        
      },

      success: function(response) {

     
        
      if (response.accession_number == "31") {

        position.attr('class','box edta-large')
        position.text("31")
        position.next().addClass("pulse")
        firstElement= position
        secondElement= position.next()

      }


      else if (response.accession_number == "21") {

        position.attr('class','box serum-large')
        position.text("21")
        position.next().addClass("pulse")
        firstElement= position
        secondElement= position.next()        


      }

      else if (response.accession_number == "16") {

        position.attr('class','box pst-large')
        position.text("16")
        position.next().addClass("pulse")
        firstElement= position
        secondElement= position.next()        


      }

    

      // position= position.next()

      if (position.attr("id") == "e1") {
        
        position= $("#b2")
        position.addClass("pulse")
        
      }

      else (position=position.next())



      $("#accession-number").val("")  

      }     

    })
  })








