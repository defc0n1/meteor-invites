Package.describe({
  name: 'defc0n1:invites',
  version: '1.1.5',
  summary: 'An invitation management system',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.2.2');
  // api.use('ecmascript');
  api.use('check');
  api.use(['templating', 'blaze-html-templates'], 'client');
  api.use(['random', 'email'], 'server');

  api.addFiles([
    'client/templates.html',
    'client/templates.js',
    'client/templates.css',
  ], 'client');

  api.addFiles([
    'lib/invites-common.js',
    'lib/collections.js'
  ]);

  api.addFiles([
    'server/invites-server.js',
    'server/methods.js',
    'server/publications.js'
  ], 'server');

  api.export(['Invites', 'InvitesCollection', 'RequestsCollection']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('defc0n1:invites');
  api.addFiles('meteor-invites-tests.js');
});
