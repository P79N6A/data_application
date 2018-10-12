const pm2 = require('pm2');

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script: 'app.js',
  }, (err, apps) => {
    pm2.disconnect();
    if (err) {
      throw err;
    }
  });
});
