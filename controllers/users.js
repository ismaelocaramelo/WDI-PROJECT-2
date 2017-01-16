module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  addFavourite: usersAddFavourite,
  removeFavourite: usersRemoveFavourite,
  getUser: usersGetUser
};

const User = require('../models/user');

function usersIndex(req, res){
  User.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(users);
  });
}

function usersCreate(req, res){
  const user = new User(req.body.user);

  user.save((err, user) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(user);
  });
}

function usersShow(req, res){
  const id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ error: 'No user was found.' });
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res){
  const id = req.params.id;

  User.findByIdAndUpdate({ _id: id }, req.body.user, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ error: 'No user was found.' });
    return res.status(200).json(user);
  });
}

function usersDelete(req, res){
  const id = req.params.id;

  User.findByIdAndRemove({ _id: id }, err => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
}

function usersAddFavourite(req, res){
  console.log('add fav');
  //console.log(req.headers['host']);
  //console.log(req.decoded); // it has the id of the user
  if(req.decoded){ //query.findOneAndUpdate(conditions, update, options, callback)
    // addtoset is already veryfing if that favourite exits in that user
    // we add  {new: true} because findOneAndUpdate method returns the doc unaltered by default
    User.findOneAndUpdate({_id: req.decoded.id}, {$addToSet: {favourites: req.params.idPost }}, {new: true}, (err, user) => {
      if (!user) return res.status(304).json({ error: 'You already have this spot as favourite' });
      console.log(user.favourites.length);
      return res.status(200).json(user);
    });
  }else{
    return res.status(403).json({ error: 'Access Denied' });
  }
}

function usersRemoveFavourite(req, res){
  console.log('remove fav');
  if(req.decoded){
    //Model.findByIdAndRemove(id, [options], [callback])
    User.findOneAndUpdate({_id: req.decoded.id, favourites: {$in: [req.params.idPost]}}, {new: true}, {$pull: {favourites: req.params.idPost }}, (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(304).json({ error: 'You already have this spot as favourite' });
      console.log(user.favourites.length);
      return res.status(200).json(user);
    });
  }else{
    return res.status(403).json({ error: 'Access Denied' });
  }
}

function usersGetUser(req, res){
  if(req.decoded){
    User.findById(req.decoded.id, (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(404).json({ error: 'No user was found.' });
      return res.status(200).json(user);
    });
  }else{
    return res.status(403).json({ error: 'Access Denied' });
  }
}
