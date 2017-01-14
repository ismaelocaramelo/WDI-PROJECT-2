"use strict";function init(){$(".usersNew").on("click",usersNew),$(".userslogin").on("click",usersLogin),$("body").on("submit",".usersCreate",usersCreate),$("body").on("submit",".usersloginform",usersloginResponse),$("body").on("click",".usersEdit",usersEdit),$("body").on("submit",".usersUpdate",usersUpdate),$("body").on("click",".usersShow",usersShow)}function usersNew(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="'+API+'/register" class="usersCreate">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Add User</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <label for="user_name">Name</label>\n          <input class="form-control" type="text" name="user[username]" id="user_name" placeholder="Name">\n        </div>\n        <div class="form-group">\n          <label for="user_email">Email</label>\n          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <label for="user_password">Passwors</label>\n          <input class="form-control" type="text" name="user[password]" id="user_password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <label for="user_passwordConfirmation">Repeat password</label>\n          <input class="form-control" type="text" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Repeat Password">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Save</button>\n      </div>\n    </form>'),$(".modal").modal("show")}function usersCreate(e){e&&e.preventDefault(),$.ajax({url:$(this).attr("action"),type:$(this).attr("method"),data:$(this).serialize()}).done(function(){$(".modal").modal("hide")})}function usersEdit(e){e&&e.preventDefault(),$.ajax({method:"get",url:API+"/users/"+$(this).data("id")}).done(function(e){$(".modal-content").html('\n      <form method="put" action="'+API+"/users/"+e._id+'" class="usersUpdate">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n          <h4 class="modal-title">Add User</h4>\n        </div>\n        <div class="modal-body">\n          <div class="form-group">\n            <label for="user_name">Name</label>\n            <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name" value="'+e.name+'">\n          </div>\n          <div class="form-group">\n            <label for="user_image">Image</label>\n            <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image" value="'+e.image+'">\n          </div>\n          <div class="form-group">\n            <label for="user_github">Github</label>\n            <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github" value="'+e.github+'">\n          </div>\n          <div class="form-group">\n            <label for="user_bio">Bio</label>\n            <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio">'+e.bio+'</textarea>\n          </div>\n          <div class="form-group">\n            <label for="user_website">Website</label>\n            <input class="form-control" type="text" name="user[website]" id="user_image" placeholder="Website" value="'+e.website+'">\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n          <button type="submit" class="btn btn-primary">Save</button>\n        </div>\n      </form>'),$(".modal").modal("show")})}function usersUpdate(e){e&&e.preventDefault();var s=$(this).attr("action");$.ajax({method:$(this).attr("method"),url:s,data:$(this).serialize()}).done(function(){usersShow(null,s),$(".modal").modal("hide")})}function usersShow(e,s){e&&e.preventDefault(),$.ajax({method:"GET",url:s||$(this).attr("href")}).done(function(e){$("main").html('\n      <div class="user">\n        <div class="user-tile">\n          <img src="'+e.image+'">\n          <h2 id="username">'+e.name+"</h2>\n          <p>"+e.bio+'</p>\n          <ul class="list-inline">\n            <li><a href="https://github.com/'+e.github+'">Github</a></li>\n            <li><a href="'+e.portfolio+'">Portfolio</a></li>\n          </ul>\n          <ul class="list-inline">\n            <li><a href="#" class="usersEdit" data-id="'+e._id+'">Edit</a></li>\n            <li><a data-id="'+e._id+'" class="usersDelete" href="#">Delete</a></li>\n          </ul>\n        </div>\n      </div>')})}function usersLogin(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="'+API+'/login" class="usersloginform">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <label for="user_email">Email</label>\n          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <label for="user_password">Passwors</label>\n          <input class="form-control" type="text" name="user[password]" id="user_password" placeholder="Password">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Save</button>\n      </div>\n    </form>'),$(".modal").modal("show")}function usersloginResponse(e){e&&e.preventDefault(),$.ajax({url:$(this).attr("action"),type:$(this).attr("method"),data:$(this).serialize()}).done(function(){$(".modal").modal("hide"),console.log("si llega el paquete")}).fail(function(e){console.log(e.responseText)})}var $=$,API="http://localhost:3000";$(init);