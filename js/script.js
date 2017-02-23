
/*
  Tamar E. Chalker
  Unit 3 - Interactive Form
*/

// Focus for first box when page loads
$(':input:enabled:visible:first').focus();

// Job Role - reveal text field when "other" option is selected
  // Hide text box initially
  $("#other-title").hide();

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

// T-Shirt Info
var designSel = document.getElementById("design");
var colorSel = document.getElementById("color");
