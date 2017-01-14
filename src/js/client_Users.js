const $ = $;
const API = 'http://localhost:3000';

$(init);

function init() {
  $('.usersNew').on('click', usersNew);
  $('.userslogin').on('click', usersLogin);

  $('body').on('submit', '.usersCreate', usersCreate);
  $('body').on('submit', '.usersloginform', usersloginResponse);
  $('body').on('click', '.usersEdit', usersEdit);
  $('body').on('submit', '.usersUpdate', usersUpdate);
  $('body').on('click', '.usersShow', usersShow);
}

function usersNew(e){
  if (e) e.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="${API}/register" class="usersCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add User</h4>
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
          <label for="user_password">Passwors</label>
          <input class="form-control" type="text" name="user[password]" id="user_password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="user_passwordConfirmation">Repeat password</label>
          <input class="form-control" type="text" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Repeat Password">
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


function usersEdit(e){
  if (e) e.preventDefault();

  $.ajax({
    method: 'get',
    url: `${API}/users/${$(this).data('id')}`
  }).done(user => {
    $('.modal-content').html(`
      <form method="put" action="${API}/users/${user._id}" class="usersUpdate">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="user_name">Name</label>
            <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name" value="${user.name}">
          </div>
          <div class="form-group">
            <label for="user_image">Image</label>
            <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image" value="${user.image}">
          </div>
          <div class="form-group">
            <label for="user_github">Github</label>
            <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github" value="${user.github}">
          </div>
          <div class="form-group">
            <label for="user_bio">Bio</label>
            <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio">${user.bio}</textarea>
          </div>
          <div class="form-group">
            <label for="user_website">Website</label>
            <input class="form-control" type="text" name="user[website]" id="user_image" placeholder="Website" value="${user.website}">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>`);

    $('.modal').modal('show');
  });
}

function usersUpdate(e){
  if (e) e.preventDefault();

  const url = $(this).attr('action');

  $.ajax({
    method: $(this).attr('method'),
    url: url,
    data: $(this).serialize()
  }).done(() => {
    usersShow(null, url);
    $('.modal').modal('hide');
  });
}

function usersShow(e, url){
  if (e) e.preventDefault();

  $.ajax({
    method: 'GET',
    url: url || $(this).attr('href')
  }).done(user => {
    $('main').html(`
      <div class="user">
        <div class="user-tile">
          <img src="${user.image}">
          <h2 id="username">${user.name}</h2>
          <p>${user.bio}</p>
          <ul class="list-inline">
            <li><a href="https://github.com/${user.github}">Github</a></li>
            <li><a href="${user.portfolio}">Portfolio</a></li>
          </ul>
          <ul class="list-inline">
            <li><a href="#" class="usersEdit" data-id="${user._id}">Edit</a></li>
            <li><a data-id="${user._id}" class="usersDelete" href="#">Delete</a></li>
          </ul>
        </div>
      </div>`
    );
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
          <label for="user_password">Passwors</label>
          <input class="form-control" type="text" name="user[password]" id="user_password" placeholder="Password">
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
  }).done(() => {
    $('.modal').modal('hide');
    console.log('si llega el paquete');
  }).fail(err =>{
    console.log(err.responseText);
  });
}
