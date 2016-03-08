Invites.createInviteRequest = function(requestEmail){
  // For beta signup requests
  var m = InvitesCollection.insert({
    "token": "",
    "status": "requested", // requested, invited, visited (reached accept page but didn't claim), claimed
    "email": requestEmail,
    "createdAt": new Date(),
    "userId": ""   // associated with actual user account when registered
  });

  // Send invite request confirmation

}

Invites.createInvitation = function(inviteEmail){
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
  AccountsInvite.sendInviteEmail(token, inviteEmail);
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