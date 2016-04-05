Invites.configData = {
  from: "My App <hi@app.io>",
  inviteRequest: {
    subject: "Thanks for requesting an invitation to MyApp Beta",
    body: "Thanks for your interest in MyApp! We'll let you know when you've been invited."
  },
  invite: {
    subject: "Welcome to MyApp Beta",
    body: "Thanks for your interest in MyApp!"
  }
};

Invites.config = function(configObject){
  check(configObject, Object);
  
  Invites.configData = configObject;
}

Invites.createInviteRequest = function(requestEmail, sendEmail){
  // For beta signup requests
  
  if(RequestsCollection.findOne({"email":requestEmail})){
    // this email is already present
    throw new Meteor.Error("invite-request-email-already-present", "This email address is already registered.");
    return;
  }

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
  var body = Invites.configData.inviteRequest.body;
  var options = {
      from: Invites.configData.from,
      to: requestEmail,
      subject: Invites.configData.inviteRequest.subject,
      text: Invites.configData.inviteRequest.body,
      // headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
  };

  Email.send(options);
}

Invites.sendInviteEmail = function(token, inviteEmail){
  var host = Meteor.absoluteUrl();
  var body = Invites.configData.invite.body + '\n\<a href="'+host+'acceptInvite/'+token+'">Click here</a> to claim your invitation and create an account.';
  var options = {
      from: Invites.configData.from,
      to: inviteEmail,
      subject: Invites.configData.invite.subject,
      text: body,
      // headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
  };

  Email.send(options);
}