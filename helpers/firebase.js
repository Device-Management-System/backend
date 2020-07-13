// Initializer to for firebase auth
admin = require('firebase-admin');
module.exports = admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'device-manager-8a0a6',
    private_key_id: process.env.FIREBASE_PK_ID,
    private_key: process.env.FIREBASE_PK.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e99xi%40device-manager-8a0a6.iam.gserviceaccount.com',
  }),
});
