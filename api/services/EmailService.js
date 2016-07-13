/**
 * EmailService
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var ServerConstants = require('../constants/ServerConstants');
 var UserService = require('../services/UserService');

 module.exports = {

  sendEmail: function(userTo, whichTemplate, data) {

    var mandrill = require('mandrill-api/mandrill');
    var mandrill_client = new mandrill.Mandrill('YzjmMyB0xFU55ADogBFB8A');
    var template_name;
    var template_content = [
    {
      "name": "fname",
      "content": userTo.firstName
    },
    {
      "name": "company",
      "content": "Caption"
    },
    {
      "name": "current_year",
      "content": "2016"
    }
    ];

    var message = {
      "html": "<p>Example HTML content</p>",
      "text": "Example text content",
      "from_email": ServerConstants.EMAIL.SENDER,
      "from_name": "Tristan",
      "to": [{
        "email": userTo.email,
        "name": userTo.firstName,
        "type": "to"
      }],
      "headers": {
        "Reply-To": ServerConstants.EMAIL.SENDER
      },
      "important": false,
      "track_opens": null,
      "track_clicks": null,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "tracking_domain": null,
      "signing_domain": "fresq.co",
      "return_path_domain": null,
      "merge": true,
      "merge_language": "mailchimp",
      "global_merge_vars": template_content,
      "merge_vars": [],
      "tags": [
      "password-resets"
      ],
      
      "metadata": {
        "website": "www.fresq.co"
      },
      "recipient_metadata": [{
        "rcpt": "recipient.email@example.com",
        "values": {
          "user_id": 123456
        }
      }]
      
    };


    switch(whichTemplate){
      case ServerConstants.TEMPLATE_MAIL.CONFIRMATION:
      template_name = "Activation Email Template";
      template_content.push({
        "name": "subject",
        "content": "Activate your Caption account"
      });
      template_content.push({
        "name": "activationurl",
        "content": UserService.getAccountActivationUrl(userTo)
      });
      message["subject"] = "Activate your Caption account";
      break;

      case ServerConstants.TEMPLATE_MAIL.RESET_PASSWORD:
      template_name = "Password Reset Email Template";
      template_content.push({
        "name": "subject",
        "content": "Reset your Caption password"
      });
      template_content.push({
        "name": "activationurl",
        "content": UserService.getResetPasswordUrl(data)
      });
      message["subject"] = "Reset your Caption password";
      break;

      default:
      break;
    }

    
    
    var async = false;
    var ip_pool = "Main Pool";
    var send_at = "2015-12-12 23:59:59";
    mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
      console.log(result);
    
      }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
  }
};