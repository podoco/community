var admin = require("firebase-admin");

var serviceAccount = require('../service/serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://minstagram-648ac-default-rtdb.firebaseio.com"
});

module.exports = admin