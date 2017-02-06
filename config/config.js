module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://isma:12345@localhost/green-charge-vehicle',
  secret: process.env.SECRET || 'supermega security'
};
