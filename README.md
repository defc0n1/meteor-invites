# meteor-invites

An invitation management system for Meteor.

## Features

- Built-in `invitesAdmin` template for quick and easy management of:
-- **Invite Requests:** So users can 'apply' for invitations via your own forms
-- **Invitations:** Which you can create from scratch or from the above requests.
- Emails for request confirmation and/or invitation creation

## Usage

- `meteor add t3db0t:invites`
- ```js
Invites.config({
	from: "MyApp <notifications@myapp.io>",
	inviteRequest: {
    	subject: "Thanks for requesting an invitation to MyApp Beta",
    	body: "Thanks for your interest in MyApp! We'll let you know when you've been invited."
  	},
  	invite: {
    	subject: "Welcome to MyApp Beta",
    	body: "You've been invited to MyApp!"
  	}
});```
- Set up a route to the included `inviteAdmin` template, for example (Iron Router):
`Router.route('/invites', 'inviteAdmin');`
-- You can use your router to secure this route, for example (Iron Router):
```js
Router.route('/invites', {
    onBeforeAction: function(){
	    if(!Meteor.userId() || !Meteor.user().registered_emails) {
	      this.render('notfound');
	    } else if(Meteor.user().registered_emails[0].address == "my@email.com"){
	      this.next();
	    }
  	},
    template: 'inviteAdmin'
});
```

Pull requests welcome!