# meteor-invites

An invitation management system for Meteor.

## Features

- Built-in `invitesAdmin` template for quick and easy management of:
-- **Invite Requests:** So users can 'apply' for invitations via your own forms
-- **Invitations:** Which you can create from scratch or from the above requests.
- Built-in simple emails for request confirmation and/or invitation creation -OR-
- Custom email handlers, i.e. use your own email templator, etc.

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
-- There's also an included "Invite Request Confirmation" template at `confirmInviteRequest`
```
- Optional: There's a `requests-email` publication you can subscribe to with an email address and it will give you the request status for that email, i.e. if you want to check if someone's already requested an invite. Example:
```js
Meteor.subscribe('requests-email', 'test@test.com');
```
- Custom email handlers: for example, using `PrettyEmail`:
```js
Invites.configEmailHandlers({
  inviteRequestHandler: function(requestEmail){

    PrettyEmail.send('call-to-action', {
      to: requestEmail,
      subject: 'Thanks for requesting an invitation to MyApp',
      heading: '',
      message: "Thanks for your interest in MyApp! Just click below to verify your email address and we'll let you know when you've been invited.",
      buttonText: 'Confirm',
      // buttonUrl: '', // Coming soon
    });
  },
  inviteHandler: function(token, inviteEmail){
    var host = Meteor.absoluteUrl();

    PrettyEmail.send('call-to-action', {
      to: inviteEmail,
      subject: 'Welcome to MyApp',
      heading: "You've been invited to MyApp",
      message: "Click below to accept and get started.",
      buttonText: "Let's Go",
      buttonUrl: host+'acceptInvite/'+token,
    });
  }
});
```

Pull requests welcome!