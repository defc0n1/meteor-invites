Invites.createInviteRequest = function(requestEmail, sendEmail){
  console.log("createInviteRequest: "+requestEmail+" / "+sendEmail);
  // For beta signup requests
  var m = RequestsCollection.insert({
    "email": requestEmail,
    "status": "requested",
    "createdAt": new Date()
  });

  // Send invite request confirmation
  if(sendEmail)
    Invites.sendInviteRequestConfirmation(requestEmail);
}

Invites.createInvitation = function(inviteEmail, sendEmail){
  // generate invite hash
  // insert beta invite record
  var token = Random.id(8);
  var m = InvitesCollection.insert({
    "token": token,
    "status": "invited", // requested, invited, visited (reached accept page but didn't claim), claimed
    "email": inviteEmail,
    "createdAt": new Date(),
    "userId": ""   // associated with actual user account when registered
  });

  // send Invite email
  if(sendEmail)
    Invites.sendInviteEmail(token, inviteEmail);
}

Invites.sendInviteRequestConfirmation = function(requestEmail){
  var body = "Thanks for your interest in our app! We'll let you know when you've been invited.";
  var options = {
      from: "My App <hi@app.io>",
      to: requestEmail,
      subject: 'Thanks for requesting an invitation to MyApp!',
      text: body,
      // headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
  };

  Email.send(options);
}

Invites.sendInviteEmail = function(token, inviteEmail){
  var host = Meteor.absoluteUrl();
  var body = 'Thanks for your interest in my app!\n\<a href="'+host+'acceptInvite/'+token+'">Click here</a> to claim your invitation and create an account.';
  var options = {
      from: "My App <hi@app.io>",
      to: inviteEmail,
      subject: 'Welcome to my App Beta!',
      text: body,
      // headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
  };

  Email.send(options);
}