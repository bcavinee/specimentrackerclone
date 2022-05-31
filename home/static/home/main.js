




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
var accessionSelected
var userAccessionSelection
var userAccessionSelectionClass
var fromUserRemovePulse= 0
var singleCheckoutHidden
var fromHomePage

var lock_switch 
var lock_counter= 0

var tubeTypeLockCounter= 0
var tubeTypeLock= true
var locked_tubetype= null



$(document).ready(function(){
  $(".box").click(function(){


    // $("#id_patient_rack_location".val(this.atrr()))

    if (fromUserRemovePulse == 0) {

      var selectionFromHome= $(".pulse")

      selectionFromHome.removeClass("pulse")

      fromUserRemovePulse += 1
    }


    position= $(this)
    positionText= position.children("p")

    singleCheckoutHidden= position.attr("id")


    $("#remove-single-patient-hidden").val(singleCheckoutHidden)


    $(this).addClass("pulse")
    var $this= $(this)

    elementArray.push($this)

    arrayCounter += 1

    console.log(userAccessionSelectionClass)

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
    
    
    // Possibly try using logic here with lock variable.  If lock is turned on handle the logic on the back differently.

    // Find a way to save the tubetype when the lock button is hit.  Maybe transvere the DOM and go back one from the element that is currently pusling.

    // Get that tubetype and use that to save it on the backend.

    // So you will have two AJAX({})

    // Have one for handling without the lock and one with

    // The one with the lock should be simliar to the one with just edit it some.
   

    if (lock_switch == true) {


      getTubetype= $('#accession-number').val()

      if (tubeTypeLockCounter == 1) {

        tubeTypeLock= true
      }

      if (getTubetype.length == 2 && tubeTypeLock == true) {

        locked_tubetype= getTubetype
      }


      if (tubeTypeLock == false && getTubetype.length == 2) {

        alert("Lock feature is on")
        return false

      }


    

    $.ajax({

      url: '',
      type: 'POST',
      data: {

        lock_switch: lock_switch,
        locked_tubetype: locked_tubetype,
        positionId : position.attr("id"),
        accessionNumber : $('#accession-number').val(),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        
        
        
      },

      success: function(response) {

     
      

      if (response.accession_number.length == 6){

        accessionSelected= true
        $("#flash-message").css("visibility", "hidden")
        $("#flash-accession").css("visibility", "visible")
        $("#accession-flash-span").text(response.accession_number)

        $("#table-accession-number").text("")
       
      }

     

   
      if (accessionSelected == true && locked_tubetype != null){


        if (locked_tubetype == "31") {

          position.attr('class','box edta-large')
          position.text("31")
          position.next().addClass("pulse")
          firstElement= position
          secondElement= position.next()

        }


        else if (locked_tubetype == "21") {

          position.attr('class','box serum-large')
          position.text("21")
          position.next().addClass("pulse")
          firstElement= position
          secondElement= position.next()        


        }

        else if (locked_tubetype == "16") {

          position.attr('class','box pst-large')
          position.text("16")
          position.next().addClass("pulse")
          firstElement= position
          secondElement= position.next()        


        }

        

        // position= position.next()

        if (position.attr("id") == "e1") {
          
          position= $("#a2")
          position.addClass("pulse")
          
        }

        else (position=position.next())

        
        
        accessionSelected= false
        $("#flash-accession").css("visibility", "hidden")
        $("#table-accession-number").text("")
        
        
      }


    else if (response.accession_number.length == 2) {

      
      $("#flash-message").css("visibility", "visible")
      $("#flash-accession").css("visibility", "hidden")
      $("#lock-error").text("Whoaaa Buddy you're already locked")


    }      

      
      $("#patient-name").text(response.patient_name_from_model)

      if(response.accession_number.length == 6) {

        $("#table-accession-number").text(response.accession_number)


      }
      
      
      $("#medical-record-number").text(response.patient_mrn)
      $("#accession-number").val("")
      tubeTypeLockCounter ++
      tubeTypeLock= false


      }     

    })



    }

    else if(lock_switch == false){


    $.ajax({

      url: '',
      type: 'POST',
      data: {


        lock_switch: lock_switch,
        positionId : position.attr("id"),
        accessionNumber : $('#accession-number').val(),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        
        
        
      },

      success: function(response) {

     


      if (response.accession_number.length == 6){

        accessionSelected= true
        $("#flash-message").css("visibility", "hidden")
        $("#flash-accession").css("visibility", "visible")
        $("#accession-flash-span").text(response.accession_number)

        $("#table-accession-number").text("")
       
      }

     
   
      if (response.accession_number.length == 2 && accessionSelected == true){


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
          
          position= $("#a2")
          position.addClass("pulse")
          
        }

        else (position=position.next())

        
        
        accessionSelected= false
        $("#flash-accession").css("visibility", "hidden")
        $("#table-accession-number").text("")
        
        
      }


    else if (response.accession_number.length == 2) {

      
      $("#flash-message").css("visibility", "visible")
      $("#flash-accession").css("visibility", "hidden")
      


    }      

      
      $("#patient-name").text(response.patient_name_from_model)

      if(response.accession_number.length == 6) {

        $("#table-accession-number").text(response.accession_number)

      }
      
      
      $("#medical-record-number").text(response.patient_mrn)
      $("#accession-number").val("")
      


      }     

    })

    }



  })





$(document).ready(function() {

  var userAccessionSelection

  var userAccessionSelectionClass

  userAccessionSelection= $(".alpha-top-grid").attr("id")
  
  userAccessionSelection= userAccessionSelection.slice(4)

  userAccessionSelectionClass= $("#" + userAccessionSelection).attr("class")

  userAccessionSelectionClass= userAccessionSelectionClass + " pulse"



  $("#" + userAccessionSelection).attr("class", userAccessionSelectionClass, "id", "from-user")

});




// $(document).ready(function(){
//   $(".test").click(function(){
//     $("#flash-message").animate({marginRight: "+=200px"});
//   });
// });    




$(document).ready(function(){

  $("#delete-button").click(function() {
    
    let cookie = document.cookie
    var csrfToken = cookie.substring(cookie.indexOf('=') + 1)
    
    $.ajax({

      url: '',
      type: 'GET',
      data: {

        

      },
      success: function(response) {

          $('#removeAllModalLabel').html("<h3>Are you sure you want to delete</h3>")
          $('#remove-all-body').html(`


            <form method="POST" action="/hematology_first_rack_one" id="remove-all-form">
      
              <input type="hidden" name="delete_equation_answer" id="delete_equation_answer">
              <input type="hidden" name="csrfmiddlewaretoken" value=`+ csrfToken  + `>

            
              <p>Enter answer to equation to remove:</p>
              <p>`+ response.equation_x+ ` `+ "+" + ` `+ response.equation_y +` `+ "=" + `</p>
              <p id="if_answer_is_wrong"></p>
              <input type="text" class="form-control" name="user_answer" id="user_equation_answer" placeholder="Enter Result">
              <input type="submit" value="Submit" class="mt-4">
                            
            </form> 



            `)
         
          $('#delete_equation_answer').attr("value", response.delete_answer)

      }
    })
  })
})


$(document).on('submit', '#remove-all-form', function(e){

  var equation_answer= $("#delete_equation_answer").val()
  var user_answer= $("#user_equation_answer").val()

  if (equation_answer != user_answer) {

    $("#if_answer_is_wrong").text("Answer Incorrect")
    e.preventDefault()
  }

});


// $(document).ready(function(){

//   $("#single-remove-button").click(function(){

//     fromHomePage= $("div").find(".pulse")
//     fromHomePage.removeClass("pulse")

    
  
//   });
// });

// $(document).on('submit', '#remove-single-patient', function(e){


//   fromHomePage= $("div").find(".pulse")
//   fromHomePage.removeClass("pulse")

  

// });

$(document).on('submit',"#remove-single-patient", function(e) {


    e.preventDefault();
    
    

    $.ajax({

      url: '',
      type: 'POST',
      data: {

       
        removeSinglePatientHidden : $('#remove-single-patient-hidden').val(),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        
        
        
      },

      success: function(response) {

        if (response.location_to_remove != "empty") {

          $("#"+ response.location_to_remove).attr("class", "box blank")

          $("#"+ response.location_to_remove).children("p").text("")


        }


        else if (response.accession_rack_position != null) {


          $("#"+ response.accession_rack_position).attr("class", "box blank")
          $("#"+ response.accession_rack_position).children("p").text("")          
          $("#"+ response.accession_rack_position).removeClass("pulse")

        }

      }     

    })
  })


$(document).ready(function(){

  $("#lock").click(function(){

  
    if (lock_counter == 0) {

      lock_switch= true

      lock_counter++

      $(this).text("True")  

    }
  


    else if (lock_counter == 1) {

      
      lock_switch= false
      lock_counter= 0
      $(this).text("False")
    }

    

    // if (lock_switch == true)
    
  });

});