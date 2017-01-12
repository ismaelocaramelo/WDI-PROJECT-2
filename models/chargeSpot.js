const mongoose = require('mongoose');

const chargeSpotSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true, unique: true},
  Latitude: {type: Number},
  Longitude: {type: Number},
  PostTown: {type: String, required: true},
  PostCode: {type: String},
  Connector: {type: Array},
  PaymentRequiredFlag: {type: Boolean},
  SubscriptionRequiredFlag: {type: Boolean}
});



chargeSpotSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.updatedAt;
    delete ret.createdAt;
    return ret;
  }
});
module.exports = mongoose.model('ChargeSpot', chargeSpotSchema);
