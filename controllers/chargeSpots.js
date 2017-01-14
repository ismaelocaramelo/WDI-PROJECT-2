module.exports = {
  index: chargeSpotsIndex
};

const ChargeSpot = require('../models/chargeSpot');

function chargeSpotsIndex(req, res){
  let filter = {};
  let voltage = '';
  if(req.params.type === 'S' || req.params.type === 'AC' || req.params.type === 'DC' || req.params.type === 'F' ){
    if(req.params.type === 'S' ){
      voltage = {$lt: 7};
    }else if(req.params.type === 'F' ){
      voltage = {$gte: 7, $lte: 22.0};
    }else if(req.params.type === 'AC' ){
      voltage = 43.0;
    }else{
      voltage = 50;
    }
    filter = {'Connector.RatedOutputkW': voltage };
  }
  ChargeSpot.find(filter, (err, spots) => {

    if (err) return res.status(500).send();
    return res.status(200).json(spots);
  });
}
// Range of the RatedOutputkW:
// 3
// 3,70
// 7
// 22
// 43
// 50
