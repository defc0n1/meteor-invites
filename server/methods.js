Meteor.methods({
    'invitesCreate': function(inviteEmail){
        Invites.createInvitation(inviteEmail);
    },
    'invitesRequest': function(inviteEmail){
        Invites.createInviteRequest(inviteEmail);
    },
    'invitesVisited':function(token){
    	InvitesCollection.update({"token":token}, {$set: {"status":"visited"}});
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
    }
});