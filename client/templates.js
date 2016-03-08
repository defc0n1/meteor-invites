Template.inviteAdmin.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('invites-all');
    self.subscribe('users-all');
  });
});

Template.inviteAdmin.helpers({
  "datetime":function(){
    var d = new Date(this.createdAt);
    return d.toLocaleString();
  },
  "invites":function(){
    return InvitesCollection.find();
  },
  "users":function(){
    return Meteor.users.find();
  },
  "inviteToken":function(){
    var t = "";
    if(this.services.accountsInvite){
      t = this.services.accountsInvite.token;
    }
    return t;
  },
  "services":function(){
    // String of services registered to this user
    return _.chain(this.services)
      .map(function(v,k,l){ return k })
      .filter(function(k){ return k != "resume"})
      .value()
      .join(", ");
  }
});

Template.inviteAdmin.events = {
  'submit form.inviteRequest': function (event, template) {
    event.preventDefault();
    var inviteEmail = template.find('#requestInviteEmail').value;
    Meteor.call('invitesRequest', inviteEmail);
  },
  'submit form.inviteCreate': function (event, template) {
    event.preventDefault();
    var inviteEmail = template.find('#inviteEmail').value;
    Meteor.call('invitesCreate', inviteEmail);
  },
  'click a.invite-reset': function(e,t) {
    Meteor.call("invitesReset", $(e.currentTarget).attr('data-id'));
  },
  'click a.invite-revoke': function(e,t) {
    Meteor.call("invitesRevoke", $(e.currentTarget).attr('data-id'));
  },
  'click a.invite-delete': function(e,t) {
    Meteor.call("invitesDelete", $(e.currentTarget).attr('data-id'));
  },
  'click a.user-delete':function(e,t){
    Meteor.call("deleteUser", $(e.currentTarget).attr('data-id'));
  }
};