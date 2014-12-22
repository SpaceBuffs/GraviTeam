//--------------------------------------------------------------

if (Meteor.isClient) {
  Template.login.events({
    'submit login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var emailVar = t.find('#login-email').value;
      var passwordVar = t.find('#login-password').value;
        // Trim and validate your fields here.... 
        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(emailVar, passwordVar);
     }
  });

  Template.Dashboard.events({
    'click .logout' : function(event){
	event.preventDefault();
	Meteor.logout();
    }
  });

  Template.register.events({
    'submit register-form' : function(event, template) {
      console.log('submit registration form.');
      event.preventDefault();
      var emailVar = template.find('#account-email').value;
      var passwordVar = template.find('#account-password').value;
	// With Accounts.CreateUser, the passwrod is auto encrypted and the 
	//user is automatically logged in.
      Accounts.createUser({email: emailVar, password : passwordVar});
    }
  });

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  // At the bottom of the client code
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}

//--------------------------------------------------------------

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

//--------------------------------------------------------------

// simple-todos.js
Tasks = new Mongo.Collection("tasks");

//window.load = function() {
//  var div1 = document.getElementById('app_window').innerHTML;
//  var div2 = "There's the div 2 contents!";
//  var div3 = "There's the div 3 contents!";

// document.getElementById('div1').onclick = function() {
//   document.getElementById('app_window').innerHTML = div1;
// }
// document.getElementById('div2').onclick = function() {
//   document.getElementById('app_window').innerHTML = div2;
// }
// document.getElementById('div3').onclick = function() {
//   document.getElementById('app_window').innerHTML = div3;
// }
//}

//--------------------------------------------------------------

