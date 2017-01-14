const mongoose = require('mongoose');
const ChargeSpot = require('../models/chargeSpot');
const rp       = require('request-promise');
const Connector = require('../models/connector');

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
        const connector = [];
        for (var i = 0; i < chargeDevice.Connector.length; i++) {
          connector[i] = new Connector({
            ChargePointStatus: chargeDevice.Connector[i].ChargePointStatus,
            ChargeMode: chargeDevice.Connector[i].ChargeMode,
            RatedOutputkW: chargeDevice.Connector[i].RatedOutputkW,
            ConnectorType: chargeDevice.Connector[i].ConnectorType
          });
        }

        ChargeSpot.create({
          name: chargeDevice.ChargeDeviceName,
          Latitude: chargeDevice.ChargeDeviceLocation.Latitude,
          Longitude: chargeDevice.ChargeDeviceLocation.Longitude,
          PostTown: chargeDevice.ChargeDeviceLocation.Address.PostTown,
          PostCode: chargeDevice.ChargeDeviceLocation.Address.PostCode,
          Connector: connector,
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
