Meteor.methods({
    'invitesCreate': function(inviteEmail, sendEmail){
        Invites.createInvitation(inviteEmail, sendEmail);
    },
    'invitesRequest': function(inviteEmail, sendEmail){
        // Creates an invitation request
        Invites.createInviteRequest(inviteEmail, sendEmail);
    },
    'confirmInviteRequest': function(token){
        Invites.confirmInviteRequest(token);
    },
    'createInviteFromRequest': function(id){
        // Creates an invitation for an existing Request
        RequestsCollection.update({"_id":id}, {$set: {"status":"invited"}});
        var inviteEmail = RequestsCollection.findOne(id).email;
        Invites.createInvitation(inviteEmail, true);
    },
    'invitesVisited':function(token){
    	InvitesCollection.update({"token":token}, {$set: {"status":"visited"}});
    },
    'requestsDelete':function(id){
        RequestsCollection.remove({"_id":id});
    },
    'invitesDelete':function(id){
    	InvitesCollection.remove({"_id":id});
    },
    'invitesReset':function(id){
        InvitesCollection.update({"_id":id}, {$set: {"status":"invited"}});
    },
    'invitesRevoke':function(id){
    	InvitesCollection.update({"_id":id}, {$set: {"status":"revoked"}});
    },
    'deleteUser':function(id){
        Meteor.users.remove(id);
    },
    'getInvite':function(token){
        return InvitesCollection.findOne({"token":token});
    }
});