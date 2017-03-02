
/*
  Tamar E. Chalker
  Unit 3 - Interactive Form
*/
'use strict';
var form = $('form');
var payment = $('#payment');
var realtimeField = $('#name');
var activities = $('.activities');

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

shirtDes.change(function () {
  var choice = $(this).val();

  shirtCol.find('option').each(function () {
    var text = $(this).text().toLowerCase().replace('♥', 'heart');
    $(this).hide();

    if (new RegExp(choice).test(text)) {
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
    if (jobRoles === "other") {
      $("#other-title").slideDown(150).focus();
    } else {
        $("#other-title").slideUp(100).focus();
      }
  }

  // calls function
  jobRole.change(function(e) {
      jobRoleSelect();
  });

// Activities - choose what activities to participate in and calculate cost
  // attach event handler
  activities.on('click', 'input', function(event){

    //variables
    var target = this;
    var checkboxes = activities.find('input');
    var checked = $(this).is(':checked');
    var selected = getActivity(activityStr.call(this))[2] + ' ' + getActivity(activityStr.call(this))[1];
    var total = 0;

    // returns which activities are selected via checkboxes
    function activityStr(){
      return $(this).parent().text().toLowerCase();
    }

    function getActivity(activityStr){
      return activityStr.split(' ').reverse();
    }

    checkboxes.each(function(){
      var selActivity = activityStr.call(this);

      // Excludes the selected checkbox from loop and checks time strings for the various activities
      if(activityStr.call(target) !== selActivity && (getActivity(selActivity)[2] + ' ' + getActivity(selActivity)[1]) === selected){
        $(this).attr('disabled', checked);
      }

      // when a checkbox is selected, calculates the price
      if($(this).is(':checked')){
        var price = Number(getActivity(selActivity)[0].replace('$', ''));
        total += price;
      }
    });

    activities.find('.total').remove();
    activities.append(function(){
      return '<div class="total">Total: $' + total + '</div>';
    });
  });

// Payment Info
  // Show or Hide Credit Card info depending upon choice of payment method
  function payMethod(){
    var selection = $(this).val().replace(' ', '-');
    var creditCard = $('#credit-card');
    var parent = $(this).closest('fieldset');
    $('div:has(> p)').children('p').hide();

    if(selection !== 'credit-card'){
      creditCard.hide();
      parent.find('p').each(function(){
        var text = $(this).text().toLowerCase();
        $(this).hide();
        if(new RegExp(selection).test(text)){
          $(this).show();
        }
      });
    }else{
      creditCard.show();
    }
  };

  payment.change(payMethod);
  payMethod.call(payment);

// Submit form and check for errors
  function submission(event){
    var name = $('#name').val();
    var email = $('#mail');
    var selActivities = activities.find('input[type="checkbox"]');
    var paymentMethod = payment.val();
    var zipCode = $('#zip').val();
    var cvv = $('#cvv').val();

    var checkEmail = /^([\w]+)@([\w]+)\.([\D]){2,4}$/;
    var checkActivities;
    var errors = [];

    // simulate failed form submission and display errors
    function errorMessage(message){
      if(event.type === 'submit'){
        event.preventDefault();
      }
      errors.push(message);
    }

    $(this).find('.submitError').remove();

    if(name === ''){
      errorMessage('Please enter your name.');

    }else if(name.length < 2){
      errorMessage('Please enter a valid name.');
    }

    if(!checkEmail.test(email.val())){
      errorMessage('Please enter a valid email address.');
    }

    selActivities.each(function(){
      if($(this).prop('checked')){
        checkActivities = true;
      }
    });

    if(!checkActivities){
      errorMessage('You must choose at least one activity.');
    }

    if(paymentMethod === 'credit card'){
      var creditCard = $('#cc-num').val();

      if(creditCard === ''){
        errorMessage('Enter your credit card number.');

      }else if(!(creditCard.length > 12 && creditCard.length < 17)){
        errorMessage('Credit cards should have 13 to 16 digits.');

      }else if(isNaN(Number(creditCard))){
        errorMessage('Please only enter numbers for your credit card.');
      }

      if(zipCode.length !== 5){
        errorMessage('Your zip code should be five digits.');

      }else if(isNaN(Number(zipCode))){
        errorMessage('Please enter numbers for Zip Code.');
      }

      if(cvv.length !== 3){
        errorMessage('There should be three digits for CVV code.');

      }else if(isNaN(Number(cvv))){
        errorMessage('Please enter numbers for CVV code.');
      }
    }

    // Upon submission, outputs error messages at top of page
    if(errors.length > 0){
      var errorMessages = '';

      errors.forEach(function(value){
        errorMessages += '<p>' + value + '</p>';
      });

      $(this).prepend('<div style="color:tomato" class="submitError">' + errorMessages + '</div>');
      $(window).scrollTop(0);
    }
  }
  realtimeField.bind('keyup', $.proxy(submission, form));
  form.submit(submission);
