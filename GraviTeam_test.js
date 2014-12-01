// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
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
    
    
  // At the bottom of the client code
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
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


window.load = function() {
  var div1 = document.getElementById('app_window').innerHTML;
  var div2 = "There's the div 2 contents!";
  var div3 = "There's the div 3 contents!";

 document.getElementById('div1').onclick = function() {
   document.getElementById('app_window').innerHTML = div1;
 }
 document.getElementById('div2').onclick = function() {
   document.getElementById('app_window').innerHTML = div2;
 }
 document.getElementById('div3').onclick = function() {
   document.getElementById('app_window').innerHTML = div3;
 }
}

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}