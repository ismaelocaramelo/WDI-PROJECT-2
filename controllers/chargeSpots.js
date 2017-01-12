module.exports = {
  index: chargeSpotsIndex
};

const ChargeSpot = require('../models/chargeSpot');

function chargeSpotsIndex(req, res){
  ChargeSpot.find({}, (err, spots) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ spots });
  });
}
