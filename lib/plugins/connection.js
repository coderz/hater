var Sqlish = require('sqlish').Sqlish;

var PluginFactory = require('raffaello').PluginFactory,
    plugin = new PluginFactory();

plugin.extend({
  init: false,

  connect: function(dialect, url) {
    this.set('url', url);

    switch (dialect) {
      case 'pg':
      case 'postgre':
      case 'postgreSQL':
        var pg = require('pg');

        this.set('dialect', 'PostgreSQL 9.2');
        this.set('native', pg);
        this.set('connection', new pg.Client(url));
        this.get('connection').connect();
        break;

      case 'mysql':
        var mysql = require('mysql');

        this.set('dialect', 'MySQL55');
        this.set('native', mysql);
        this.set('connection', new mysql.createConnection(url));
        this.get('connection').connect();
        break;

      // Sqlite3?
    }

    this.set('sqlish', new Sqlish(this.get('dialect')));
  }
});

module.exports = plugin.plugin();