Meteor.publish("users-all", function(){
	return Meteor.users.find();
});

Meteor.publish("requests-all", function () {
  return RequestsCollection.find();
});

Meteor.publish("invites-all", function () {
  return InvitesCollection.find();
});

Meteor.publish("invites-status", function (token) {
  // check(token, String);
  // console.log("invites-status: "+token);
  return InvitesCollection.find({"token":token}, {fields: {'status':1, 'token':1}});
});