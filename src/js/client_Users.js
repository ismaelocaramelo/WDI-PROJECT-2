const $ = $;
const API = window.location.origin;
const googleMap = googleMap || {};

$(init);

function init() {
  if(getToken()){
    loggedInState();
  } else {
    loggedOutState();
  }
  $('body').on('click', '.logout', logout);
  $('body').on('click', '.userslogin', usersLogin);
  $('body').on('click', '.usersNew', usersNew);

  $('body').on('submit', '.usersCreate', usersCreate);
  $('body').on('submit', '.usersloginform', usersloginResponse);

  $('body').on('click', '.user_favourite', setFav);
  $('body').on('click', '.fav', getFavourites);
}


function loggedInState(user){
  $('#button1').addClass('userindex').removeClass('userslogin');
  $('#button2').addClass('logout').removeClass('usersNew').html('Log out');
  if(!user){ //When the user was logged and the page is refreshed
    googleMap.getUserInfo((output) =>{
      $('#button1').html(output.username);
      setFavourite(output.favourites.length);
    });
  }else{ //when the user has just loggined
    $('#button1').html(user.username);
    setFavourite(user.favourites.length);
  }
}

function loggedOutState(){
  $('#button1').addClass('userslogin').removeClass('userindex').html('Login');
  $('#button2').addClass('usersNew').removeClass('logout').html('Sign up');
}

function logout(e){
  e.preventDefault();
  setFavourite('');
  removeToken();
  loggedOutState();
}

function usersNew(e){
  if (e) e.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="${API}/register" class="usersCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Welcome to Green Points</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_name">Name</label>
          <input class="form-control" type="text" name="user[username]" id="user_name" placeholder="Name">
        </div>
        <div class="form-group">
          <label for="user_email">Email</label>
          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="user_password">Password</label>
          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="user_passwordConfirmation">Repeat password</label>
          <input class="form-control" type="password" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Repeat Password">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersCreate(e){
  if (e) e.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(() => {
    $('.modal').modal('hide');
  });
}

function usersLogin(e){
  if (e) e.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="${API}/login" class="usersloginform">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_email">Email</label>
          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="user_password">Password</label>
          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersloginResponse(e){
  if (e) e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done((data) => {
    $('.modal').modal('hide');
    if (data.token) { // token returned by the user's controllers
      setToken(data.token); //store the token in the browser
      loggedInState(data.user);
    }
  });
}

function setRequestHeader(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
}

function setToken(token){
  return window.localStorage.setItem('token', token);
}

function removeToken(){
  return window.localStorage.clear();
}

function getToken(){
  return window.localStorage.getItem('token');
}

function addFavourite(obj){
  $.ajax({
    url: `${API}/users/favourites/${obj.data('id')}`,
    method: 'GET',
    beforeSend: (xhr)=>{
      setRequestHeader(xhr);
    }
  }).done((data) => {
    setFavourite(data.favourites.length);
    $('.modal').modal('hide');
  });
}

function removeFavourite(obj){
  $.ajax({
    url: `${API}/users/favourites/${obj.data('id')}`,
    method: 'PUT',
    beforeSend: (xhr)=>{
      setRequestHeader(xhr);
    }
  }).done((data) => {
    setFavourite(data.favourites.length);
    $('.modal').modal('hide');
  });
}

function setFav(){
  if(getToken() !== null ){
    const action = $('.user_favourite').data('action');
    if(action === 'remove'){
      $('.user_favourite').removeClass('red-heart');
      $('.user_favourite').addClass('heart');
      $('.user_favourite').data('action', 'add');
      removeFavourite($('.user_favourite'));
    }else if(action === 'add'){
      $('.user_favourite').removeClass('heart');
      $('.user_favourite').addClass('red-heart');
      $('.user_favourite').data('action', 'remove');
      addFavourite($('.user_favourite'));
    }
    //if we're inside this functions is because a token exist
  }else{
    //if no token exist
    usersLogin();
  }
}

function setFavourite(num){
  $('.fav').html(num);
}

function getFavourites(e){
  if(e) e.preventDefault();
  if(getToken() !== null ){
    $.ajax({
      url: `${API}/users/:id/favourites`,
      method: 'GET',
      beforeSend: (xhr)=>{
        setRequestHeader(xhr);
      }
    }).done(googleMap.loopThroughChargeSpots);
  }else{
    usersLogin();
  }
}
