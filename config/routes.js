const router  = require('express').Router();
const users    = require('../controllers/users');
const staticsController = require('../controllers/statics');
const chargeSpots       = require('../controllers/chargeSpots');
const authentications   = require('../controllers/authentications');

//this middleware verifies the token
router.use(authentications.verifyToken);

router.route('/')
  .get(staticsController.home);

//auth routes
router.route('/login')
  .post(authentications.login);
router.route('/register')
  .post(authentications.register);

//users routes
router.route('/users')
  .get(users.index)
  .post(users.create);
router.route('/users/favourites/:idPost') // first the routes that exist and then with the ones with :variables
  .get(users.addFavourite)
  .put(users.removeFavourite);
router.route('/users/token') // to get the user id back once we get the token.
  .get(users.getUser);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);
router.route('/users/:id/favourites')
  .get(users.FavouritesSpots);

//chargeSpots routes
router.route('/api/chargespots')
  .get(chargeSpots.index);
router.route('/api/chargespots/postcode')
  .post(chargeSpots.findPostCode);
router.route('/api/chargespots/:type')
  .get(chargeSpots.index);
module.exports = router;
