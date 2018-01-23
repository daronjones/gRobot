/*global require, module*/
var apiBuilder = require('claudia-api-builder'),
  botBuilder = require('claudia-bot-builder'),
  watson = require('watson-developer-cloud'),
  api = new apiBuilder(),
  aws = require('aws-sdk'),
  lambda = new aws.Lambda(),
  fs = require('fs'),
  slackTemplate = apiBuilder.slackTemplate;

// Bot stuffs
var DEFAULT_ERR_REPLY = 'Sorry, I\'m taking a break right now. Please come back later.',
  WORKSPACE_ID = '981d924c-59b6-40e9-ab08-f0f4fdb124a6',
  conversation = watson.conversation({
    username: 'd6d634fb-c71b-4ef9-8cee-7a4a09f085b4',
    password: 'your-password',
    version_date: '2016-07-01',
    version: 'v1'
  });

module.exports = botBuilder(watBotBuilder);

/*
// just return the result value for synchronous processing
api.get('/hello', function () {
	'use strict';
	return 'hello world';
});
*/

function bBuilder(req) {
  if (request.type === 'slack') {
    var message = new slackTemplate('This is sample text');

    return message
      .addAttachment('A1')
      .addAction('Button 1', 'button', '1')
      .addAction('Button with confirm', 'button', '2')
      .addConfirmation('Ok?', 'This is confirm text', 'Ok', 'Cancel')
      .addAction('Button 3', 'button', '3')
      .get();
  }
}

function watBotBuilder(request) {
  console.log('Request:', request)

  var payload = {
    workspace_id: WORKSPACE_ID,
    input: {
      text: request.text
    },
    context: {}
  };

  conversation.message (payload, function (err, data) {
      if (err) {
        console.error('Error:', JSON.stringify(error));
        return DEFAULT_ERR_REPLY;
      }
  
      console.log('Response:', JSON.stringify(data));
      return data.output.text;
  });
}