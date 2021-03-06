module.exports = {
  index: chargeSpotsIndex,
  findPostCode: chargeSpotsFindPostCode
};

const ChargeSpot = require('../models/chargeSpot');

// Range of the RatedOutputkW:
// 3
// 3,70
// 7
// 22
// 43
// 50
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
  ChargeSpot.find(filter).limit(1000).exec((err, spots) => { //limiting the number of spots to 1000

    if (err) return res.status(500).send();
    return res.status(200).json(spots);
  });
}


function chargeSpotsFindPostCode(req, res){
  const postCode = req.body.postcode;
  //regex is regular expression
  //new RegExp is a constructor passing two argu, 1st where is the variable, 2nd means insensitive in this case but it could be other options (see mongodb)
  //$or is an array of posibilities
  ChargeSpot.find({$or: [{'PostTown': { $regex: new RegExp( `^${postCode}$`, 'i') }}, {'PostCode': { $regex: new RegExp( `^${postCode}$`, 'i') }}]}, (err, spots) => {
    if (err) return res.status(500).send();
    return res.status(200).json(spots);
  });
}
