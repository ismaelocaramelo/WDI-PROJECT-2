const mongoose = require('mongoose');
const ChargeSpot = require('../models/chargeSpot');
const rp       = require('request-promise');

const databaseURL = 'mongodb://localhost:27017/green-charge-vehicle';
mongoose.connect(databaseURL);

ChargeSpot.collection.drop();

const options = {
  uri: 'http://chargepoints.dft.gov.uk/api/retrieve/registry/format/json',
  json: true
};

rp(options)
    .then(body => {
      body.ChargeDevice.forEach(chargeDevice => {
        for (var i = 0; i < chargeDevice.Connector.length; i++) {
          delete chargeDevice.Connector[i].ConnectorId;
          delete chargeDevice.Connector[i].RatedOutputkW;
          delete chargeDevice.Connector[i].RatedOutputVoltage;
          delete chargeDevice.Connector[i].TetheredCable;
          delete chargeDevice.Connector[i].Information;
          delete chargeDevice.Connector[i].Validated;
        }
        ChargeSpot.create({
          name: chargeDevice.ChargeDeviceName,
          Latitude: chargeDevice.ChargeDeviceLocation.Latitude,
          Longitude: chargeDevice.ChargeDeviceLocation.Longitude,
          PostTown: chargeDevice.ChargeDeviceLocation.Address.PostTown,
          PostCode: chargeDevice.ChargeDeviceLocation.Address.PostCode,
          Connector: chargeDevice.Connector,
          PaymentRequiredFlag: chargeDevice.PaymentRequiredFlag,
          SubscriptionRequiredFlag: chargeDevice.SubscriptionRequiredFlag
        }, (err, chargeSpot) => {
          console.log('Created', chargeSpot);
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
