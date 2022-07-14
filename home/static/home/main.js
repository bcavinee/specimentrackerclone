

var position
var positionText
var accessionPlusTubeTypeCounter= 0
var accessionPlusTubeType= []
var orginalPosition= []
var orginalPositionCounter= 0
var pulsingElement
var pulseCounter= 0
var pulseAfterFormEntry= []
var positionAfterFormEntry
var lastBoxInRow= ['n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15',]
var getNumberFromAlphaNum
var numFromAlphaNum
var nextRowAlphaNum
var clickCounter= 0
var everyClickArray= []
var x= []
multipleAccessionCounter= 0
tubetypeCss= {"31" : 'box edta-large', "21" : "box serum-large", "16" : "box pst-large"}
lockButtonCSs= {"31" : 'rgba(145,55,230,1)', "21" : "rgba(224,8,8,1)", "16" : "rgba(14,218,13,1)"}
var lockCounter= 0
var lockOnOff= false
var lockedTubeType
var getPositionId
var demographicTableCounter= 0
var validTubeTypes= ["21","31","16"]
var deleteAll= "pass"

$(document).ready(function(){
  $(".box").click(function(){



    $.ajax({

      url: '',
      type: 'GET',
      data: {

        getPositionId: $(this).attr("id")

      },

      success: function(response) {

        // When the user clicks on a position.  We add the following <td> to display patient demographic and storage information
        // Without the counter I ran into the issue of whenever the user would click a box it would add the following lines to the exisiting
        // demographic section.  By using a counter we will add the information the first time the user selects a box, then increment the counter.
        // Since the demographic section is already displayed now, when the counter is >= 1, so the second clicked box.  We then replace the text,
        // this allows the demographic section to be updated without adding duplicate sections to what already exist 

        if (demographicTableCounter == 0) {

          $(`<tr>
            <td class="patient-info-headers">Accession Number</td>
            <td class="fw-bold" style="text-align: right;" id="patient-accession-number">` + response.accession_number + ` 07/11/2022 1500</td></tr>`).insertAfter("#patient-name-row")

          $(`<tr>
            <td class="patient-info-headers">Patient Name</td>
            <td class="fw-bold" style="text-align: right;" id="patient-name-mrn">` + response.patient_name + " MRN " + response.mrn + `</td></tr>`).insertAfter("#patient-demographics")

          $(`<tr>
            <td class="patient-info-headers">Stored</td>
            <td class="fw-bold" style="text-align: right;" id="patient-storage-information">07/11/2022 BMC</td></tr>`).insertAfter("#stored-info")

          demographicTableCounter ++

        }
        
        else if (demographicTableCounter >= 1) {


          $("#patient-accession-number").text(response.accession_number +  " 07/11/2022 1500")
          $("#patient-name-mrn").text(response.patient_name + " MRN " + response.mrn)
          $("#patient-storage-information").text("07/11/2022 BMC")


        }

      }     

    })       


    // We have to use an if statment here to check if the lockOnOff switch is true or false.
    // Without this conditional you were not able to have the lock switch on and then click to another box.
    // If you did that it would not send data to the backend.  This is because on line 92 we clear the 
    // accessionPlusTubeType variable.  We have to do this so when the user clicks on the next box it will be empty 
    // and ready for a new accession/tubetype.  By using a conditional here when the lock switch is turned on
    // we do not clear the accessionPlusTubeType variable.  The accession number is already removed in the accession
    // form lock switch true function.

    if (lockOnOff == false) {


      position= $(this)
      positionText= position.children("p")
      $(this).addClass("pulse")




      // When a box is clicked the location of that box is saved to a hidden input field called remove-single-patient-hidden
      // This is then used in line 254 to remove a single patient
      singleCheckoutHidden= position.attr("id")
      $("#remove-single-patient-hidden").val(singleCheckoutHidden)

  // ****
  // First we increment the orginalPositionCounter by one when a user clicks into a box
  // Next we capture with Jquery the element that is pulsing.  We then push that element to the array pulsingElement
  // When the user clicks into a second box the conditional will then be true and the element that is pulsing will be pushed to the pulsingElement array
  // We have a pulse counter that is used to select the first element in the orginalPosition array which is the first element that pulsed
  // Pulse is then removed from that element.  The pulse counter is then incremented by one and the orginalPositionCounter set to one
  // Now the next time the user clicks the second element in the array will have pulse removed. 

      orginalPositionCounter ++

      pulsingElement= $(".pulse")

      orginalPosition.push(pulsingElement)
      
      if(orginalPositionCounter == 2) {


        orginalPositionRemovePulse= orginalPosition[pulseCounter]
        orginalPositionRemovePulse.removeClass("pulse")
        pulseCounter ++
        orginalPositionCounter= 1

      }

      // Setting variable = to the position the box that is set to flash directly after the box the user selected to store tube.
      // Removing the pulse class and then setting the array back to empty. 

      // We have to ue a for loop.  Intially I did not us a for loop and the logic worked fine for removing the pulse directly after the box
      // that the user chose, but if a user then entered another acccession/tubentype without clicking the logic did not work.  All of the boxes that
      // have been used after the orginal box are saved in the postionAfterFormEntry array.  We loop through this array and remove pulse from all the boxs.

      for(var i = 0; i < pulseAfterFormEntry.length; i++) {


        positionAfterFormEntry= pulseAfterFormEntry[i]
        positionAfterFormEntry.removeClass("pulse")      

      }


      pulseAfterFormEntry= []    

      accessionPlusTubeType= []

  }

  else if (lockOnOff == true) {



    position= $(this)
    positionText= position.children("p")
    $(this).addClass("pulse")



    // When a box is clicked the location of that box is saved to a hidden input field called remove-single-patient-hidden
    // This is then used in line 254 to remove a single patient
    singleCheckoutHidden= position.attr("id")
    $("#remove-single-patient-hidden").val(singleCheckoutHidden)

// ****
// First we increment the orginalPositionCounter by one when a user clicks into a box
// Next we capture with Jquery the element that is pulsing.  We then push that element to the array pulsingElement
// When the user clicks into a second box the conditional will then be true and the element that is pulsing will be pushed to the pulsingElement array
// We have a pulse counter that is used to select the first element in the orginalPosition array which is the first element that pulsed
// Pulse is then removed from that element.  The pulse counter is then incremented by one and the orginalPositionCounter set to one
// Now the next time the user clicks the second element in the array will have pulse removed. 

    orginalPositionCounter ++

    pulsingElement= $(".pulse")

    orginalPosition.push(pulsingElement)
    
    if(orginalPositionCounter == 2) {


      orginalPositionRemovePulse= orginalPosition[pulseCounter]
      orginalPositionRemovePulse.removeClass("pulse")
      pulseCounter ++
      orginalPositionCounter= 1

    }

    // Setting variable = to the position the box that is set to flash directly after the box the user selected to store tube.
    // Removing the pulse class and then setting the array back to empty. 

    // We have to ue a for loop.  Intially I did not us a for loop and the logic worked fine for removing the pulse directly after the box
    // that the user chose, but if a user then entered another acccession/tubentype without clicking the logic did not work.  All of the boxes that
    // have been used after the orginal box are saved in the postionAfterFormEntry array.  We loop through this array and remove pulse from all the boxs.

    for(var i = 0; i < pulseAfterFormEntry.length; i++) {


      positionAfterFormEntry= pulseAfterFormEntry[i]
      positionAfterFormEntry.removeClass("pulse")      

    }


    pulseAfterFormEntry= []    


  }


    
    // Displaying the position the user has clicked on
    $("#current-position").text(position.attr("id"))

    if (position.attr("class") == "box blank pulse") {

      $("#current-position").append("(Not in use)")


      // If the user clicks on a position that is not in use, we get rid of the currently displayed patient demographic
      // and storage information
      $("#patient-accession-number").remove()
      $("#patient-name-mrn").remove()
      $("#patient-storage-information").remove()
      $(".patient-info-headers").remove()


      // Setting the demographicTableCounter back to 0.  Since we removed the demographic section in the code above,
      // setting the counter to 0 will allow us to add new demographic information. 
      demographicTableCounter= 0

    }

   


  });
});






$(document).on('submit',"#accession-form", function(e) {

    

    e.preventDefault();
    
    // Setting to value user inputs
    userAccessionTubeType= $('#accession-number-or-tubetype').val()

    
    // IF the array is empty and the user input an accession number
    // Push that accession to array
    // Making accession number button visible and adding the accession number to the button.
    if (accessionPlusTubeType.length == 0 && userAccessionTubeType.length == 6) {

       accessionPlusTubeType.push(userAccessionTubeType)
       $("#lock_one").css("visibility","visible")
       $("#lock_one").text(userAccessionTubeType)

       // Hidding alert message when user correctly enters accession number first
       $("#accession-alert").css("visibility", "hidden")

       // Setting width of accession/tubetype search bar to 55% to allow room
       // for two buttons.
       $("#accession-number-or-tubetype").css("max-width","55%")

    }

    // At this point our array that holds the accession number and tubetype should have our locked tubetype
    // If locked tubetype is true and accessionPlusTubeType lenght is one and the user inputs an accession number
    // We push that accession number the our array that already has the locked tubetype
    else if ((accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 6) && lockOnOff == true) {

       accessionPlusTubeType.push(userAccessionTubeType)
       // We have to resverse the order of what is passed in so the data is handled correctly on the backend
       // This is because typically we will get an accession number first and the backend code is set up to handle
       // the data accordingly.  Since we are passing a locked tubetype the tubetype will be in spot 1 of the array
       // where the backend is expecting it to be an accession number in spot one.  By using reverse we can remedy this issue
       accessionPlusTubeType.reverse()

    }

    // We were running into an issue when the user would enter a tubetype while the lock button was on.
    // This would send two tubetypes to the backend.  By using return if the accessionPlusTubeType array length
    // is == 1 and if the user input is == 2 and if the lock button is true, we can exit the function early.
    // By doing this nothing gets sent to the accessionPluseTubeType array.
    else if ((accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 2) && lockOnOff == true){

      alert("Could it be this easy")
      return
    }

    // If the user has not entered an accession number and they try to entry a tubetype
    // Display a message to enter an accession first
    else if (accessionPlusTubeType.length == 0 && userAccessionTubeType.length == 2){

      $("#accession-alert").css("visibility", "visible")
    }





    // The next two condtions fix the issue when a user puts in two accession numbers without
    // First we use a counter to count the number of times a user inputs an accession number without   
    // submitting the form.  If the user has entered multiple accession numbers without entering the form
    // We then set accessionPlusTubeType to that accession.  This works because the last accession entered
    // will be the accession we want to use.
    if (userAccessionTubeType.length == 6) {

      multipleAccessionCounter++
      $("#lock_one").text(userAccessionTubeType)
    }


    if (userAccessionTubeType.length == 6 && multipleAccessionCounter >= 2) {

      accessionPlusTubeType= [userAccessionTubeType]
      

      
    }

    // If the user has entered an accession number and then enters a tubetype
    // Push that tubetype to the array
    // Making tubetype button visible and adding the tubetype number
    // Made an object lockButtonCSs where the key corresponds to the background color of that key
    // Setting the background color of the lock button to the color that corresponds with the tubetype 
    // Added conditional to see if the tubetype the user inputs is in the validTubeTypes array
    if ((accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 2) && validTubeTypes.includes(userAccessionTubeType) == true) {

      $("#lock").css({"visibility" : "visible", "background" : lockButtonCSs[userAccessionTubeType]})
      $("#button-tubetype").text(userAccessionTubeType)
      $("#accession-number-or-tubetype").css("max-width","55%")      

      accessionPlusTubeType.push(userAccessionTubeType)

    }
    // Added this else if statement to check if the tubetype the user inputs is in the validTupeTypes array
    // If they are not we display a message
    else if ((accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 2) && validTubeTypes.includes(userAccessionTubeType) == false) {

      alert("Bro you did it good job man")

    }


    else if ((accessionPlusTubeType.length == 1 && userAccessionTubeType.length == 6) && lockOnOff == true) {

      // $("#lock").css({"visibility" : "visible", "background" : lockButtonCSs[userAccessionTubeType]})
      // $("#button-tubetype").text(userAccessionTubeType)
      // $("#accession-number-or-tubetype").css("max-width","55%")      

      // accessionPlusTubeType.push(userAccessionTubeType)
      console.log(accessionPlusTubeType)

    }
  


    
    // Clearing the form input box.
    $("#accession-number-or-tubetype").val("")
    
  

    // If the user has entered two values into the form.  An array with these values will be passed into backend. 
    if (accessionPlusTubeType.length == 2 && lockOnOff == false) {


    $.ajax({

      url: '',
      type: 'POST',
      data: {

  

        positionId : position.attr("id"),
        'accessionPlusTubeType[]' : accessionPlusTubeType,
        lockSwitch: lockOnOff,
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()        

      },

      success: function(response) {




        // Setting array back to empty.
        // Setting multipleAccessionCounter to 0
        accessionPlusTubeType= []
        multipleAccessionCounter= 0

        // Removing the pulse from orginal box
        position.removeClass("pulse")

        
        // We stored our css class in an object.  The key is the number that corresponds to a css class
        position.attr("class", tubetypeCss[response.tube_type_from_user])
        position.text(response.tube_type_from_user)                

       // We have an array that holds the id of the last box in a row
       // If the box the user selects is not in that array, so any other box beside
       // a box at the end of the row.  We set position to the next box
       if (lastBoxInRow.includes(position.attr("id")) == false) {


          // Making the next box pulse and setting position to that next box
          position.next().addClass("pulse")
          position= position.next()
          
          // Pushing the position that is set to flash after the form entry to an array. Now see line 52.
          pulseAfterFormEntry.push(position)

         
       }

       // If the position the user choses is a box that is at the end of a row we execute the logic below
       else if (lastBoxInRow.includes(position.attr("id")) == true) {

          // First we use a regex expression to get the number from the alphanumerical value of the box
          getNumberFromAlphaNum= /\d+$/.exec(position.attr("id"))
          // Next we turn the string that contains the alphanumerical into a number and add 1
          numFromAlphaNum= parseInt(getNumberFromAlphaNum[0],10) + 1
          
          // We then take that number and prefix the number with an A.
          // This will then give us the position of the next row
          nextRowAlphaNum= "#" + "a" + numFromAlphaNum.toString()           
 
          // We then set position to the first box in the next row.
          position= $(nextRowAlphaNum)
          position.addClass("pulse")

          // Pushing the position that is set to flash after the form entry to an array. Now see line 52.
          pulseAfterFormEntry.push(position)          


       }

        // We set the variable lockedTubeType to whatever tubetyp the user entered.
        // This tubetype has to be the tubetype the user will lock.
        // So we set lockedTubeTyup to this tubetype.
        lockedTubeType= response.tube_type_from_user
        
      }

      
    })

    }


    if (accessionPlusTubeType.length == 2 && lockOnOff == true) {

      
      console.log(accessionPlusTubeType)

    $.ajax({

      url: '',
      type: 'POST',
      data: {

  

        positionId : position.attr("id"),
        'accessionPlusTubeType[]' : accessionPlusTubeType,
        lockSwitch: lockOnOff,
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()        

      },

      success: function(response) {


        

        
        // We want to keep the locked tubetype in the array but remove the accession number.
        // That way we can save the next accession number that is entered
        accessionPlusTubeType.splice(0,1)
        // Setting multipleAccessionCounter to 0
        multipleAccessionCounter= 0

        // Removing the pulse from orginal box
        position.removeClass("pulse")

        
        // We stored our css class in an object.  The key is the number that corresponds to a css class
        position.attr("class", tubetypeCss[response.tube_type_from_user])
        position.text(response.tube_type_from_user)                

       // We have an array that holds the id of the last box in a row
       // If the box the user selects is not in that array, so any other box beside
       // a box at the end of the row.  We set position to the next box
       if (lastBoxInRow.includes(position.attr("id")) == false) {


          // Making the next box pulse and setting position to that next box
          position.next().addClass("pulse")
          position= position.next()
          
          // Pushing the position that is set to flash after the form entry to an array. Now see line 52.
          pulseAfterFormEntry.push(position)

         
       }

       // If the position the user choses is a box that is at the end of a row we execute the logic below
       else if (lastBoxInRow.includes(position.attr("id")) == true) {

          // First we use a regex expression to get the number from the alphanumerical value of the box
          getNumberFromAlphaNum= /\d+$/.exec(position.attr("id"))
          // Next we turn the string that contains the alphanumerical into a number and add 1
          numFromAlphaNum= parseInt(getNumberFromAlphaNum[0],10) + 1
          
          // We then take that number and prefix the number with an A.
          // This will then give us the position of the next row
          nextRowAlphaNum= "#" + "a" + numFromAlphaNum.toString()           
 
          // We then set position to the first box in the next row.
          position= $(nextRowAlphaNum)
          position.addClass("pulse")

          // Pushing the position that is set to flash after the form entry to an array. Now see line 52.
          pulseAfterFormEntry.push(position)          


       }


        
      }
    })

    }


})    




$(document).ready(function(){

  $("#delete-button").click(function() {
    
    let cookie = document.cookie
    var csrfToken = cookie.substring(cookie.indexOf('=') + 1)
    
    $.ajax({

      url: '',
      type: 'GET',
      data: {deleteAll : deleteAll

        

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

    // We set lockOnOff as false to default this variable to be false upon page load
    // If the user has not clicked on the lock yet we have lockCounter set to zero
    // So this if statement is when the user clicks the button we want the switch to 
    // turn to lock true
    if (lockCounter == 0) {

      $("#unlocked-image").attr("class", "bi bi-lock-fill")


      lockCounter ++
      lockOnOff= true

      accessionPlusTubeType.push(lockedTubeType)


    // If the user clicks the button again we then want to set the lock swith
    // back to false and clear out the accessionPlusTubeType array.
    // That array will then be ready for the next accession and tubetype.
    }
    
    else if (lockCounter == 1) {

      $("#unlocked-image").attr("class", "bi bi-unlock-fill")

      lockCounter= 0
      lockOnOff= false
      accessionPlusTubeType= []

    }

   

  });

});


