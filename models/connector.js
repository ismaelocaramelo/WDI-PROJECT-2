const mongoose = require('mongoose');

const connectorSchema = new mongoose.Schema({
  ChargePointStatus: String,
  ChargeMode: Number,
  RatedOutputkW: Number,
  ConnectorType: {type: String, trim: true}
});

connectorSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.updatedAt;
    delete ret.createdAt;
    return ret;
  }
});
module.exports = mongoose.model('Connector', connectorSchema);
