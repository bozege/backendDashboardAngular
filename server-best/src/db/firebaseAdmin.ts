const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "dashboardangular-3192c",
  "private_key_id": "43284086e135920a20016dbe4f5bc9af849c1775",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKTrHO7QE75Dzm\nkt+YdGplLrw3JWvVORQeIPdUAZ3FDx3PtI5BdZ9/cdEQ11byKMOl387D5OpO9rik\neTYX5BkUZgFqTlRZh7VWONAQ/+Rdqn3oYBxECsT7ZbSa0S5M2SNtO6thMJujLB4A\nsG95eyvAfT1pZhxTVhHrLg2rhAVqpS6xsIrx0ZqzzwTWBudY3F0BoRPo00R0xRZy\na2+l9mY6AHGoFEt/QE8/ixq9BolS1pfnlSdykW2bY7F9JY7UCxXO1XBclIuVTM5O\nBeMrtkrZff4+2LPduSUMFkmpSkpiq0ynUNKGxrvpOWbTwlzepxEbb30mbxfamCXy\nPm2BSlr3AgMBAAECggEAAwZd/zxcJ9z+RVGBEvXIP3hzuC/D87C1fcvVY6xDtrx5\n01WD4poThyOYnvO+HF0Cq+DATGQh74m3cgu3HnCHjxGe+zI61AnehFcEhjSLrnpy\na0taMNd0x/BNEBsiyGOSW+6n93CM6zApYXsOqtZuIL2R2DKxwSDVn/QU06TKMr5I\n69A5V8T/b5g+WcJhrYFroP+ad3Y+JUiu7gZo/QXE0IFzXsznIgp3Inga4W5mjvN8\nHoQPsScbpUkkUGX10Ly1TqB45pq+S4ud8ozeYlEGONHbosDwfutHlGRmrPWeH3Dn\nQLDCceEOIUddLowtFuHyEpa3yjPjSI8oR2OXAkLx/QKBgQDr8WdjbtShh7GYnEx6\nNCg8f/w7BhCLPwvWI/MVOiVOWPfVsKLnjURyFJSoeOWUf1Xpmphy/K8g6PguG04X\n32wPMF+lKEXLwpjo3b40EJgQQp+14PGcinGTrVsW+xwBRepjGUoU+yJJbZ7RuXvq\nLzsK6tART1YPvrRKi2nsp80xqwKBgQDbgU/8A9pNyyTUmDbgb9cFaOUfxbUBfbeF\n+uKtzdLBcA02qomgNFeRybBC5E6FcPk62onAmuCMtINkQbbowdqbDX9LzFgg2sxg\nmddCOGbzfcseVBYNGFkFDzYgAuFTXTk4WYmrlmE5ks30Z28CuUnCfaRdTyy1H5Ak\naMWCEGPH5QKBgQCDsJq3Oe3+NoGen2ZkMuZeVkUPIKRtRAQ0Qp5zs5+M6kVyBQP3\n37ZbQjdzDP9+8c+e8kWysGyDHuUevujIlFB47dQEl8TVJMk5+EIoRzbIpJcF6gaR\nDAi2l2SnIAMShtZ692uM6FrLxx6FClUqcbAvuL3nW3O6mAODM+ssRsBVvwKBgFRQ\n6b5uZG65d55KEdpIW5nyXwDDWvIFrndClcwZYbl4Jzs2asMlF/YiORiYxiiv6qxW\nwc9ALr0dodLjAzWJMUWZ+6nMBpYoNZVtwqfnLnSdf2ZY+ldxYNB2tV26fX8eMhqZ\nGi7VBuesonwdNyEet1yEEpzdCtlQFHhH3oZFcW6ZAoGBAIhrlwA+tOENjARSOVEH\nKFyYQXFSJuUwj/XoposIbqrX7cqevRZNwu8g2a5PansELS7tSsCsQbbDXL+npsRf\nDm8dSwLqnqvxE80Ei6cmRnkmtfvjvULXAdyaIIEjz3Lwh9zyZhjfrxYex1vO9Wm1\nfNh/cyXxg2kyiXAhDZAqBsa3\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-x2bfw@dashboardangular-3192c.iam.gserviceaccount.com",    "client_id": "102991073467044693798",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x2bfw%40dashboardangular-3192c.iam.gserviceaccount.com"
}
  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


