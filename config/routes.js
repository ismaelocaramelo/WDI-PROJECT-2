const router  = require('express').Router();

const staticsController = require('../controllers/statics');
const camerasController = require('../controllers/users');
const chargeSpots       = require('../controllers/chargeSpots');

router.route('/')
  .get(staticsController.home);

router.route('/users')
  .get(camerasController.index);

router.route('/api/chargespots')
  .get(chargeSpots.index);

module.exports = router;
