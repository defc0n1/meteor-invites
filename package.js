Package.describe({
  name: 't3db0t:invites',
  version: '0.0.1',
  summary: 'An invitation management system',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('meteor-invites.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('t3db0t:meteor-invites');
  api.addFiles('meteor-invites-tests.js');
});
