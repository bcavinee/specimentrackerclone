

var position
var positionText
var accessionPlusTubeTypeCounter= 0
var accessionPlusTubeType= []


$(document).ready(function(){
  $(".box").click(function(){



    position= $(this)
    positionText= position.children("p")
    $(this).addClass("pulse")






    //This clears the accessionPlusTubeType array when a user clicks on another box 
    accessionPlusTubeType= []


  });
});






$(document).on('submit',"#accession-form", function(e) {

    

    e.preventDefault();
    
    // Setting to value user inputs
    userAccessionTubeType= $('#accession-number-or-tubetype').val()

    
    // IF the array is empty and the user input an accession number
    // Push that accession to array
    if (accessionPlusTubeType.length == 0 && userAccessionTubeType.length == 6) {

       accessionPlusTubeType.push(userAccessionTubeType)     
    }

    // If the user has not entered an accession number and they try to entry a tubetype
    // Display a message to enter an accession first
    else if (accessionPlusTubeType.length == 0 && userAccessionTubeType.length == 2){

      alert("Enter Valid Accession First")
    }


    // If the user has entered an accession number and then enters a tubetype
    // Push that tubetype to the array
    if (accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 2) {

       accessionPlusTubeType.push(userAccessionTubeType)     
    }

  


    
    // Clearing the form input box.
    $("#accession-number-or-tubetype").val("")
    
    // If the user has entered two values into the form.  An array with these values will be passed into backend. 
    if (accessionPlusTubeType.length == 2) {



    $.ajax({

      url: '',
      type: 'POST',
      data: {

  

        positionId : position.attr("id"),
        'accessionPlusTubeType[]' : accessionPlusTubeType,
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()        

      },

      success: function(response) {

        // Setting array back to empty. 
        accessionPlusTubeType= []

        // Removing the pulse from orginal box
        position.removeClass("pulse")

        
        // Setting orginal box to whatever tubetype user entered
        if (response.tube_type_from_user == "21") {

          position.attr('class','box serum-large')
          position.text("21")          
        }



        // Making the next box pulse and setting position to that next box
        position.next().addClass("pulse")
        position= position.next()

        
      }
    })

    }

})    




