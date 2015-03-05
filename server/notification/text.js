'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

// Load the twilio module
var twilio = require('twilio');

// Twilio Credentials 
var accountSid = 'ACb70bc33c96bfc11985cbd1cf76a239ef'; 
var authToken = '452f1f1d86c183097a96db390ca55590'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var exports = module.exports;

/*
exports.template.sendText = function(req, res) {
  console.log("Sending text.");
  client.messages.create({  
    to:'(858)-663-5737',
    from: "+16266711727",    
    body:'Testing Twilio and node.js'

  }, function(error, message) { 
     if(error) {
       console.log(error);
       res.json({message : "Error occurred sending text"});
     } else {
       res.json({message: "Text was sent."});
     }
  })
}; */

// sendText: Send text message to employees when patient is checked in.
exports.sendText = function(employees, done) {
  if(employees === null || (employees.length <= 0)) {
    if(done) return done();
  }

  var len = employees.length;
  var callback = function(i) {
    return function(error, message) { 
      if(error) {
        console.log(error);
        console.log("Error occurred sending text");
        //res.json({message : "Error occurred sending text"});
      } else {
        //res.json({message: "Text was sent."});
        console.log("Text was sent.");
      }
      if(done && len-1 == i) done();
    };
  };
  // iterate through all employees 
  for (var index = 0; index < employees.length; index++) {
    // create text message object that will be sent
    client.messages.create({  
      to: employees[index].phone_number,
      from: "+16266711727",    
      body:'Your patient is ready.'
    }, callback(index));
  }
};
