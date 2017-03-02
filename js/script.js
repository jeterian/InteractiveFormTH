
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

    // returns the activity checkbox info
    function getActivityStr(){
      return $(this).parent().text().toLowerCase();
    }

    function getActivity(activityStr){
      return activityStr.split(' ').reverse();
    }

    var target = this;
    var checkboxes = activities.find('input');  // returns array of checkbox elements
    var checked = $(this).is(':checked'); // determines whether the checkbox is being checked or unchecked
    var selected = getActivity(getActivityStr.call(this))[2] + ' ' + getActivity(getActivityStr.call(this))[1];  // isolates the target checkbox string's activity time
    var total = 0;


    checkboxes.each(function(){
      var currActivityStr = getActivityStr.call(this);

      // first condition excludes the targeted checkbox from the loop
      // second condition checks if the activity times strings are the same
      if(getActivityStr.call(target) !== currActivityStr && (getActivity(currActivityStr)[2] + ' ' + getActivity(currActivityStr)[1]) === selected){
        $(this).attr('disabled', checked);
      }

      // if the checkbox is checked, convert currency string to a number and add that number to the amount variable
      if($(this).is(':checked')){
        var amount = Number(getActivity(currActivityStr)[0].replace('$', ''));
        total += amount;
      }
    });

    activities.find('.total').remove();

    activities.append(function(){
      return '<div class="total">Total: $' + total + '</div>';
    });
  });


  function changePaymentMethod(){
    var selection = $(this).val().replace(' ', '-');
    var creditCard = $('#credit-card');
    var parent = $(this).closest('fieldset');

    $('div:has(> p)').children('p').hide();

    if(selection !== 'credit-card'){
      creditCard.hide();

      parent.find('p').each(function(){
        var textString = $(this).text().toLowerCase();

        $(this).hide();

        if(new RegExp(selection).test(textString)){
          $(this).show();
        }
      });

    }else{
      creditCard.show();
    }
  }
  payment.change(changePaymentMethod);
  changePaymentMethod.call(payment);


  function formSubmit(event){
    var name = $('#name').val();
    var email = $('#mail');
    var activitiesCheckbox = activities.find('input[type="checkbox"]');
    var paymentMethod = payment.val();
    var zipCode = $('#zip').val();
    var cvv = $('#cvv').val();

    var emailCheck = /^([\w]+)@([\w]+)\.([\D]){2,4}$/;
    var activityChecked;
    var errors = [];

    // simulate failed form submission and display errors
    function formError(message){
      if(event.type === 'submit'){
        event.preventDefault();
      }
      errors.push(message);
    }

    $(this).find('.submission-errors').remove();

    if(name === ''){
      formError('Please enter your name.');

    }else if(name.length < 2){
      formError('Please enter a valid name.');
    }

    if(!emailCheck.test(email.val())){
      formError('Please enter a valid email address.');
    }

    activitiesCheckbox.each(function(){
      if($(this).prop('checked')){
        activityChecked = true;
      }
    });

    if(!activityChecked){
      formError('You must choose at least one activity.');
    }

    if(paymentMethod === 'credit card'){
      var creditCard = $('#cc-num').val();

      if(creditCard === ''){
        formError('Enter your credit card number.');

      }else if(!(creditCard.length > 12 && creditCard.length < 17)){
        formError('Credit cards should have 13 to 16 digits.');

      }else if(isNaN(Number(creditCard))){
        formError('Please only enter numbers for your credit card.');
      }

      if(zipCode.length !== 5){
        formError('Your zip code should be five digits.');

      }else if(isNaN(Number(zipCode))){
        formError('Please enter numbers for Zip Code.');
      }

      if(cvv.length !== 3){
        formError('There should be three digits for CVV code.');

      }else if(isNaN(Number(cvv))){
        formError('Please enter numbers for CVV code.');
      }
    }

    // outputs form errors to the page
    if(errors.length > 0){
      var formErrors = '';

      errors.forEach(function(value){
        formErrors += '<p>' + value + '</p>';
      });

      $(this).prepend('<div style="color:red" class="submission-errors">' + formErrors + '</div>');
      $(window).scrollTop(0);
    }
  }
  realtimeField.bind('keyup', $.proxy(formSubmit, form));
  form.submit(formSubmit);
