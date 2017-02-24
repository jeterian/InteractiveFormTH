
/*
  Tamar E. Chalker
  Unit 3 - Interactive Form
*/

// Focus for first box when page loads
$(':input:enabled:visible:first').focus();

// Job Role - reveal text field when "other" option is selected
  // Hide text box initially
$("#other-title").hide();

// T-Shirt Info
  // variables and initializations for starting form
var shirtDes = $('#design');
var shirtCol = $('#color');
shirtDes.find('option').first().val('default');
shirtCol.prepend('<option value="default">Select Color</option>').hide();
shirtCol.val('default');

shirtDes.change(function(){
   var choice = $(this).val();

   shirtCol.find('option').each(function(){
     var text = $(this).text().toLowerCase().replace('♥', 'heart');
     $(this).hide();

     if(new RegExp(choice).test(text)){
       $(this).show();
     }
   });

   var displayProp = (choice !== 'default') ? 'block' : 'none';

   shirtCol.attr('style', 'display:' + displayProp);
   shirtCol.val('default');
 });


// Job Roles
  // Changes whether the box appears depending on whether "Other" is selected
  var jobRole = $("select#title");
  var jobRoleSelect = function () {
    var jobRoles = jobRole.val();
    if (jobRoles == "other") {
        $("#other-title").slideDown(150).focus();
    } else {
        $("#other-title").slideUp(100).focus();
    }
}

  // calls function
  jobRole.change(function(e) {
      jobRoleSelect();
    });
